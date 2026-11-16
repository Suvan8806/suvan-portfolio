import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

import { getExperience, EXPERIENCE } from "./experience";
import { AWARDS, PRIZE_SUMMARY, PROFILE } from "./profile";
import { getProject, PROJECTS } from "./projects";
import { BRAIN_REGIONS } from "./skills";

const SRC_DIR = fileURLToPath(new URL("..", import.meta.url));
const TEXT_EXTENSIONS = /\.(ts|tsx|js|jsx|mjs|css|md|json|svg)$/;

// Forbidden phrases are assembled at runtime so this file never contains them literally.
const FORBIDDEN_TITLE = ["AI", "Futures"].join(" ");
const FORBIDDEN_PRIZE_CLAIM = ["won", "3", "hackathons"].join(" ");
const PHONE_PATTERN = /\d{3}-\d{3}-\d{4}/;

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) return listSourceFiles(fullPath);
    return TEXT_EXTENSIONS.test(entry) ? [fullPath] : [];
  });
}

function filesContaining(predicate: (text: string) => boolean): string[] {
  return listSourceFiles(SRC_DIR).filter((file) => predicate(readFileSync(file, "utf8")));
}

describe("source-wide guardrails", () => {
  test("scans a non-empty set of source files", () => {
    // Arrange / Act
    const files = listSourceFiles(SRC_DIR);

    // Assert
    expect(files.length).toBeGreaterThan(0);
  });

  test("no phone number pattern appears in any file under src/", () => {
    // Arrange / Act
    const offenders = filesContaining((text) => PHONE_PATTERN.test(text));

    // Assert
    expect(offenders).toEqual([]);
  });

  test("the retired MITRE program name appears nowhere in src/", () => {
    // Arrange / Act
    const offenders = filesContaining((text) => text.includes(FORBIDDEN_TITLE));

    // Assert
    expect(offenders).toEqual([]);
  });

  test("the inaccurate hackathon win claim appears nowhere in src/", () => {
    // Arrange / Act
    const offenders = filesContaining((text) =>
      text.toLowerCase().includes(FORBIDDEN_PRIZE_CLAIM),
    );

    // Assert
    expect(offenders).toEqual([]);
  });
});

describe("profile facts", () => {
  test("email equals the public contact address", () => {
    // Arrange
    const expected = "suvan.kasina8@gmail.com";

    // Act
    const actual = PROFILE.email;

    // Assert
    expect(actual).toBe(expected);
  });

  test("prize summary uses the exact approved wording", () => {
    // Arrange / Act
    const summary = PRIZE_SUMMARY;

    // Assert
    expect(summary).toBe("3x Hackathon Prize Winner");
  });

  test("awards contain both exact hackathon titles", () => {
    // Arrange
    const titles = AWARDS.map((award) => award.title);

    // Act / Assert
    expect(titles).toContain("1st Place, NMC2 track, HackTX 2026");
    expect(titles).toContain(
      "1st Place Overall & Best Use of HydraDB, Frontier Tower Hackathon SF",
    );
  });
});

describe("experience facts", () => {
  test("MITRE role title is exactly AI Intern", () => {
    // Arrange / Act
    const mitre = getExperience("mitre");

    // Assert
    expect(mitre?.title).toBe("AI Intern");
  });

  test("vision lab bullets mention semantic segmentation", () => {
    // Arrange
    const visionLab = getExperience("vision-lab");

    // Act
    const bullets = visionLab?.tracks.flatMap((track) => track.bullets) ?? [];

    // Assert
    expect(bullets.some((bullet) => bullet.toLowerCase().includes("semantic segmentation"))).toBe(
      true,
    );
  });

  test("experience ids are unique", () => {
    // Arrange
    const ids = EXPERIENCE.map((role) => role.id);

    // Act
    const unique = new Set(ids);

    // Assert
    expect(unique.size).toBe(ids.length);
  });
});

describe("project facts", () => {
  test("project slugs are unique", () => {
    // Arrange
    const slugs = PROJECTS.map((project) => project.slug);

    // Act
    const unique = new Set(slugs);

    // Assert
    expect(unique.size).toBe(slugs.length);
  });

  test("Shipyard stack lists no Claude API entry", () => {
    // Arrange
    const shipyard = getProject("shipyard");

    // Act
    const claudeEntries = shipyard?.stack.filter((item) => /claude|anthropic/i.test(item)) ?? [];

    // Assert
    expect(shipyard).toBeDefined();
    expect(claudeEntries).toEqual([]);
  });

  test("Shipyard note says agents run on Gemini and Groq", () => {
    // Arrange
    const shipyard = getProject("shipyard");

    // Act
    const note = shipyard?.note ?? "";

    // Assert
    expect(note).toMatch(/Gemini/);
    expect(note).toMatch(/Groq/);
  });
});

describe("skill brain map", () => {
  test("every skill ref resolves to a real project or role", () => {
    // Arrange
    const refs = BRAIN_REGIONS.flatMap((region) =>
      region.skills.flatMap((skill) =>
        (skill.refs ?? []).map((ref) => ({ skill: skill.name, ref })),
      ),
    );

    // Act
    const unresolved = refs.filter(({ ref }) => {
      if (ref.kind === "project") return getProject(ref.id) === undefined;
      if (ref.kind === "role") return getExperience(ref.id) === undefined;
      return ref.id !== "hpml";
    });

    // Assert
    expect(refs.length).toBeGreaterThan(0);
    expect(unresolved).toEqual([]);
  });

  test("every region slot is unique per side", () => {
    // Arrange
    const keys = BRAIN_REGIONS.map((region) => `${region.side}:${region.slot}`);

    // Act
    const unique = new Set(keys);

    // Assert
    expect(unique.size).toBe(keys.length);
  });
});
