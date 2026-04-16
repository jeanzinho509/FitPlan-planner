import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("handles falsy values", () => {
    expect(cn("foo", undefined, null, false, "")).toBe("foo");
  });

  it("merges tailwind classes correctly", () => {
    // twMerge should resolve conflicts
    expect(cn("px-2 py-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("handles complex combinations", () => {
    expect(
      cn("base-class", { "conditional-true": true, "conditional-false": false }, [
        "array-class",
        { "array-conditional": true },
      ]),
    ).toBe("base-class conditional-true array-class array-conditional");
  });
});
