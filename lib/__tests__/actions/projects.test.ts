import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  adminProfile,
  createFormData,
  createSupabaseMock,
  memberProfile,
  type QueryCall,
} from "@/lib/__tests__/helpers/supabase-mock";

const revalidatePath = vi.fn();
vi.mock("next/cache", () => ({
  revalidatePath: (...args: unknown[]) => revalidatePath(...args),
}));

const getCurrentProfile = vi.fn();
vi.mock("@/lib/actions/auth", () => ({
  getCurrentProfile: () => getCurrentProfile(),
}));

const handleFileUpload = vi.fn();
vi.mock("@/lib/supabase/storage", () => ({
  handleFileUpload: (...args: unknown[]) => handleFileUpload(...args),
}));

let supabaseMock = createSupabaseMock();
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => supabaseMock,
}));

const {
  createProject,
  updateProject,
  reviewProject,
  getMyProjects,
  getPublishedProjects,
} = await import("@/lib/actions/projects");

function findCall(calls: QueryCall[], operation: QueryCall["operation"]) {
  return calls.find((call) => call.operation === operation);
}

describe("createProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock();
    handleFileUpload.mockResolvedValue("/logo.webp");
  });

  it("menolak pengguna yang belum login", async () => {
    getCurrentProfile.mockResolvedValue(null);

    await expect(createProject(createFormData({ title: "Test" }))).rejects.toThrow(
      "Only members can submit projects.",
    );
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("menolak admin karena submit project hanya untuk member", async () => {
    getCurrentProfile.mockResolvedValue(adminProfile);

    await expect(createProject(createFormData({ title: "Test" }))).rejects.toThrow(
      "Only members can submit projects.",
    );
  });

  it("menyimpan project baru sebagai pending milik member yang login", async () => {
    getCurrentProfile.mockResolvedValue(memberProfile);

    await createProject(
      createFormData({
        title: "  Portfolio Web  ",
        summary: "  Showcase karya  ",
        description: "",
        demoUrl: "https://example.com",
        techStack: "Next.js, TypeScript, , Prisma",
      }),
    );

    const insertCall = findCall(supabaseMock.calls, "insert");
    expect(insertCall).toBeDefined();

    const payload = insertCall?.args[0] as Record<string, unknown>;
    expect(payload).toMatchObject({
      owner_id: memberProfile.id,
      title: "Portfolio Web",
      summary: "Showcase karya",
      description: null,
      demo_url: "https://example.com",
      repository_url: null,
      tech_stack: ["Next.js", "TypeScript", "Prisma"],
      status: "pending",
    });

    expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(revalidatePath).toHaveBeenCalledWith("/projects");
  });

  it("membatasi tech stack maksimal 12 item", async () => {
    getCurrentProfile.mockResolvedValue(memberProfile);
    const techStack = Array.from({ length: 20 }, (_, index) => `Tech${index}`).join(",");

    await createProject(createFormData({ title: "Test", techStack }));

    const payload = findCall(supabaseMock.calls, "insert")?.args[0] as {
      tech_stack: string[];
    };
    expect(payload.tech_stack).toHaveLength(12);
  });

  it("melempar error saat insert gagal", async () => {
    getCurrentProfile.mockResolvedValue(memberProfile);
    supabaseMock = createSupabaseMock(() => ({ error: { message: "db down" } }));

    await expect(createProject(createFormData({ title: "Test" }))).rejects.toThrow(
      "Unable to submit project.",
    );
  });
});

describe("updateProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock();
  });

  it("menolak non-member", async () => {
    getCurrentProfile.mockResolvedValue(adminProfile);

    await expect(updateProject(createFormData({ id: "p1" }))).rejects.toThrow(
      "Only members can edit projects.",
    );
  });

  it("memaksa status kembali ke pending dan menghapus alasan penolakan", async () => {
    getCurrentProfile.mockResolvedValue(memberProfile);

    await updateProject(
      createFormData({
        id: "project-1",
        title: "Judul Baru",
        summary: "Ringkasan",
        techStack: "React",
      }),
    );

    const payload = findCall(supabaseMock.calls, "update")?.args[0] as Record<
      string,
      unknown
    >;
    expect(payload).toMatchObject({
      title: "Judul Baru",
      status: "pending",
      rejection_reason: null,
      tech_stack: ["React"],
    });
  });
});

describe("reviewProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock();
  });

  it("menolak member yang mencoba review", async () => {
    getCurrentProfile.mockResolvedValue(memberProfile);

    await expect(reviewProject("project-1", "published")).rejects.toThrow(
      "Only admins can review projects.",
    );
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("menolak pengguna tanpa sesi", async () => {
    getCurrentProfile.mockResolvedValue(null);

    await expect(reviewProject("project-1", "published")).rejects.toThrow(
      "Only admins can review projects.",
    );
  });

  it("admin dapat publish dan mengisi reviewed_at", async () => {
    getCurrentProfile.mockResolvedValue(adminProfile);

    await reviewProject("project-1", "published");

    const payload = findCall(supabaseMock.calls, "update")?.args[0] as Record<
      string,
      unknown
    >;
    expect(payload.status).toBe("published");
    expect(payload.rejection_reason).toBeNull();
    expect(typeof payload.reviewed_at).toBe("string");
    expect(revalidatePath).toHaveBeenCalledWith("/admin");
  });

  it("admin dapat reject dengan alasan", async () => {
    getCurrentProfile.mockResolvedValue(adminProfile);

    await reviewProject("project-1", "rejected", "  Cover belum ada  ");

    const payload = findCall(supabaseMock.calls, "update")?.args[0] as Record<
      string,
      unknown
    >;
    expect(payload.status).toBe("rejected");
    expect(payload.rejection_reason).toBe("Cover belum ada");
  });

  it("reject tanpa alasan menyimpan null", async () => {
    getCurrentProfile.mockResolvedValue(adminProfile);

    await reviewProject("project-1", "rejected");

    const payload = findCall(supabaseMock.calls, "update")?.args[0] as Record<
      string,
      unknown
    >;
    expect(payload.rejection_reason).toBeNull();
  });
});

describe("pembacaan project", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock();
  });

  it("getMyProjects mengembalikan array kosong tanpa sesi", async () => {
    getCurrentProfile.mockResolvedValue(null);

    await expect(getMyProjects()).resolves.toEqual([]);
    expect(supabaseMock.from).not.toHaveBeenCalled();
  });

  it("getPublishedProjects mengembalikan kode error saat query gagal", async () => {
    supabaseMock = createSupabaseMock(() => ({ error: { message: "boom" } }));

    await expect(getPublishedProjects()).resolves.toEqual({
      projects: [],
      error: "PROJECTS_UNAVAILABLE",
    });
  });

  it("getPublishedProjects mengembalikan project published", async () => {
    const projects = [{ id: "p1", title: "Demo", status: "published" }];
    supabaseMock = createSupabaseMock(() => ({ data: projects, error: null }));

    await expect(getPublishedProjects()).resolves.toEqual({
      projects,
      error: null,
    });
  });
});
