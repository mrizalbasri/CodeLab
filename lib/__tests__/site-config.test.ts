import { describe, it, expect } from "vitest";
import { siteConfig } from "@/lib/data/site-config";
import { translations } from "@/lib/translations";
import { initialMembers } from "@/lib/data/members";
import { initialPrograms } from "@/lib/data/programs";

describe("Site Configuration & Translations", () => {
  it("should have correct branding info", () => {
    expect(siteConfig.name).toBe("PUPCL");
    expect(siteConfig.fullName).toBe("President University Pekanbaru Code Lab");
    expect(siteConfig.links.whatsapp).toContain("6287737476333");
  });

  it("should have valid members and programs data", () => {
    expect(initialMembers.length).toBeGreaterThan(0);
    expect(initialPrograms.length).toBeGreaterThan(0);
  });

  it("should have both Indonesian and English translations", () => {
    expect(translations.id).toBeDefined();
    expect(translations.en).toBeDefined();
    expect(translations.id.nav.home).toBe("Beranda");
    expect(translations.en.nav.home).toBe("Home");
  });
});
