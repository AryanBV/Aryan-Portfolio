import { describe, it, expect } from "vitest";
import {
  projects,
  getFeaturedProject,
  getRestProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";

describe("projects data", () => {
  it("is non-empty", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has kebab-case slugs", () => {
    for (const p of projects) expect(p.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("every project has non-empty tech array", () => {
    for (const p of projects) expect(p.tech.length).toBeGreaterThan(0);
  });

  it("featured project is index 0", () => {
    expect(getFeaturedProject()).toBe(projects[0]);
  });

  it("getRestProjects returns all non-featured", () => {
    expect(getRestProjects().length).toBe(projects.length - 1);
  });

  it("getProjectBySlug finds existing projects", () => {
    const featured = projects[0];
    expect(getProjectBySlug(featured.slug)).toBe(featured);
  });

  it("getProjectBySlug returns undefined for missing", () => {
    expect(getProjectBySlug("nonexistent-slug-xyz")).toBeUndefined();
  });

  it("getProjectSlugs only returns projects with caseStudy", () => {
    const slugs = getProjectSlugs();
    for (const slug of slugs) {
      const project = getProjectBySlug(slug);
      expect(project?.caseStudy).toBeDefined();
    }
  });
});

describe("trade-code entry", () => {
  it("is at index 5, between lumina-crafts and smart-med", () => {
    expect(projects[4]?.slug).toBe("lumina-crafts");
    expect(projects[5]?.slug).toBe("trade-code");
    expect(projects[6]?.slug).toBe("smart-med");
  });

  it("is returned by getProjectBySlug with the expected title", () => {
    const tc = getProjectBySlug("trade-code");
    expect(tc).toBeDefined();
    expect(tc?.title).toBe("TradeCode");
  });

  it("appears in getProjectSlugs (case study route resolves)", () => {
    expect(getProjectSlugs()).toContain("trade-code");
  });

  it("exposes the three required metric tiles in order", () => {
    expect(getProjectBySlug("trade-code")?.metrics).toEqual([
      { label: "HS codes", value: "10,468" },
      { label: "classification", value: "<30s" },
      { label: "model", value: "GPT-4o-mini" },
    ]);
  });
});
