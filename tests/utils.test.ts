import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  calculateTrendPercentage,
  formatKey,
  getFirstWord,
  parseMarkdownToJson,
  parseTripData,
} from "../lib/utils";

describe("calculateTrendPercentage", () => {
  it("returns 100% increment when last month was 0", () => {
    const result = calculateTrendPercentage(10, 0);
    expect(result).toEqual({ trend: "increment", percentage: 100 });
  });

  it("returns 'no change' when both months are 0", () => {
    const result = calculateTrendPercentage(0, 0);
    expect(result).toEqual({ trend: "no change", percentage: 0 });
  });

  it("returns increment for positive growth", () => {
    const result = calculateTrendPercentage(150, 100);
    expect(result.trend).toBe("increment");
    expect(result.percentage).toBe(50);
  });

  it("returns decrement for negative growth", () => {
    const result = calculateTrendPercentage(50, 100);
    expect(result.trend).toBe("decrement");
    expect(result.percentage).toBe(50);
  });

  it("returns 'no change' when values are equal", () => {
    const result = calculateTrendPercentage(100, 100);
    expect(result).toEqual({ trend: "no change", percentage: 0 });
  });
});

describe("formatKey", () => {
  it("converts camelCase to Title Case", () => {
    expect(formatKey("travelStyle")).toBe("Travel Style");
  });

  it("handles single word", () => {
    expect(formatKey("budget")).toBe("Budget");
  });

  it("handles multiple capitals", () => {
    expect(formatKey("groupType")).toBe("Group Type");
  });
});

describe("getFirstWord", () => {
  it("returns the first word", () => {
    expect(getFirstWord("Hello World")).toBe("Hello");
  });

  it("returns empty string for empty input", () => {
    expect(getFirstWord("")).toBe("");
  });

  it("handles extra whitespace", () => {
    expect(getFirstWord("  Hello  World  ")).toBe("Hello");
  });
});

describe("parseMarkdownToJson", () => {
  it("parses valid JSON in markdown code block", () => {
    const markdown = '```json\n{"key": "value"}\n```';
    const result = parseMarkdownToJson(markdown);
    expect(result).toEqual({ key: "value" });
  });

  it("returns null for invalid JSON", () => {
    const markdown = "```json\nnot json\n```";
    const result = parseMarkdownToJson(markdown);
    expect(result).toBeNull();
  });

  it("returns null when no code block found", () => {
    const result = parseMarkdownToJson("no code blocks here");
    expect(result).toBeNull();
  });
});

describe("parseTripData", () => {
  it("parses valid JSON string", () => {
    const result = parseTripData('{"name": "Test Trip"}');
    expect(result).toEqual({ name: "Test Trip" });
  });

  it("returns null for invalid JSON", () => {
    const result = parseTripData("not json");
    expect(result).toBeNull();
  });
});
