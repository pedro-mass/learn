import { describe, expect, it } from "vitest";
import * as palindrome from "./index.js";

const inputs = [
  {
    raw: "A man, a plan, a canal: Panama",
    sanitized: "amanaplanacanalpanama",
    isPalindrome: true,
  },
  {
    raw: "race a car",
    sanitized: "raceacar",
    isPalindrome: false,
  },
  {
    raw: " ",
    sanitized: "",
    isPalindrome: true,
  },
];

describe("palindrome", () => {
  describe("sanitize", () => {
    inputs.forEach(({ raw, sanitized }) => {
      it(raw, () => {
        expect(palindrome.sanitize(raw)).toEqual(sanitized);
      });
    });
  });

  describe("isPalindrome", () => {
    inputs.forEach(({ raw, isPalindrome }) => {
      it(raw, () => {
        expect(palindrome.isPalindrome(raw)).toEqual(isPalindrome);
      });
    });
  });
});
