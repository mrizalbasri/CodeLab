import { describe, it, expect, vi, beforeEach } from "vitest";
import { initialPrograms } from "@/lib/data/programs";
import type { GalleryItem, Program } from "@/lib/types";

const createPublicClient = vi.fn();
vi.mock("@/lib/supabase/public", () => ({
  createPublicClient: () => createPublicClient(),
}));

const { getPublicPrograms, getPublicGalleryItems } = await import(
  "@/lib/data/public-content"
);

function createClientMock(result: { data?: unknown; error?: unknown }) {
  const builder: Record<string, unknown> = {};
  for (const method of ["select", "order"]) {
    builder[method] = () => builder;
  }
  builder.then = (
    onFulfilled: (value: typeof result) => unknown,
    onRejected?: (reason: unknown) => unknown,
  ) => Promise.resolve(result).then(onFulfilled, onRejected);

  return { from: () => builder };
}

describe("getPublicPrograms", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("memakai data statis saat Supabase belum dikonfigurasi", async () => {
    createPublicClient.mockReturnValue(null);

    await expect(getPublicPrograms()).resolves.toBe(initialPrograms);
  });

  it("mengembalikan data dari Supabase", async () => {
    const programs: Program[] = [
      { id: "p1", title: "Workshop", category: "Workshop" },
    ];
    createPublicClient.mockReturnValue(createClientMock({ data: programs, error: null }));

    await expect(getPublicPrograms()).resolves.toEqual(programs);
  });

  it("mengembalikan array kosong saat query gagal", async () => {
    createPublicClient.mockReturnValue(createClientMock({ error: { message: "boom" } }));

    await expect(getPublicPrograms()).resolves.toEqual([]);
  });
});

describe("getPublicGalleryItems", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mengembalikan array kosong tanpa konfigurasi Supabase", async () => {
    createPublicClient.mockReturnValue(null);

    await expect(getPublicGalleryItems()).resolves.toEqual([]);
  });

  it("mengembalikan item galeri dari Supabase", async () => {
    const items: GalleryItem[] = [
      { id: "g1", src: "/photo.webp", category: "kegiatan", title: "Meetup", date: "2026-01-01" },
    ];
    createPublicClient.mockReturnValue(createClientMock({ data: items, error: null }));

    await expect(getPublicGalleryItems()).resolves.toEqual(items);
  });
});
