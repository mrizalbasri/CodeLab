import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createSupabaseMock,
  memberProfile,
  type QueryCall,
} from "@/lib/__tests__/helpers/supabase-mock";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/lib/supabase/storage", () => ({ handleFileUpload: vi.fn() }));

const getCurrentProfile = vi.fn();
vi.mock("@/lib/actions/auth", () => ({
  getCurrentProfile: () => getCurrentProfile(),
}));

let supabaseMock = createSupabaseMock();
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => supabaseMock,
}));

const { getPublicMemberProfile } = await import("@/lib/actions/profiles");

function resolver({ table, operation }: QueryCall) {
  if (table === "profiles") {
    return { data: memberProfile, error: null };
  }
  if (table === "projects" && operation === "select") {
    return { data: [], error: null };
  }
  return { data: null, error: null };
}

describe("getPublicMemberProfile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock(resolver);
  });

  it("mengembalikan null saat profil tidak ditemukan", async () => {
    supabaseMock = createSupabaseMock(() => ({ data: null, error: null }));

    await expect(getPublicMemberProfile("unknown-id")).resolves.toEqual({
      profile: null,
      projects: [],
    });
  });

  it("mengembalikan profil beserta project published", async () => {
    const projects = [{ id: "p1", title: "Demo", status: "published" }];
    supabaseMock = createSupabaseMock(({ table }) =>
      table === "profiles"
        ? { data: memberProfile, error: null }
        : { data: projects, error: null },
    );

    await expect(getPublicMemberProfile(memberProfile.id)).resolves.toEqual({
      profile: memberProfile,
      projects,
    });
  });

  it("melempar error saat query profil gagal", async () => {
    supabaseMock = createSupabaseMock(() => ({ error: { message: "db down" } }));

    await expect(getPublicMemberProfile(memberProfile.id)).rejects.toThrow(
      "Unable to load member profile.",
    );
  });
});
