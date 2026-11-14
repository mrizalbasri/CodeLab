import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  adminProfile,
  createSupabaseMock,
  memberProfile,
} from "@/lib/__tests__/helpers/supabase-mock";

let supabaseMock = createSupabaseMock();
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => supabaseMock,
}));

const { checkAuth } = await import("@/lib/actions/utils");

describe("checkAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    supabaseMock = createSupabaseMock();
  });

  it("melempar Unauthorized tanpa sesi", async () => {
    await expect(checkAuth()).rejects.toThrow("Unauthorized");
  });

  it("melempar Forbidden untuk role member", async () => {
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { id: memberProfile.id } },
      error: null,
    });
    supabaseMock = createSupabaseMock(() => ({ data: { role: "member" }, error: null }));
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { id: memberProfile.id } },
      error: null,
    });

    await expect(checkAuth()).rejects.toThrow("Forbidden");
  });

  it("melempar error saat pengecekan role gagal", async () => {
    supabaseMock = createSupabaseMock(() => ({ error: { message: "db down" } }));
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { id: adminProfile.id } },
      error: null,
    });

    await expect(checkAuth()).rejects.toThrow("Unable to verify permissions.");
  });

  it("mengembalikan client Supabase untuk admin", async () => {
    supabaseMock = createSupabaseMock(() => ({ data: { role: "admin" }, error: null }));
    supabaseMock.auth.getUser.mockResolvedValue({
      data: { user: { id: adminProfile.id } },
      error: null,
    });

    await expect(checkAuth()).resolves.toBe(supabaseMock);
  });
});
