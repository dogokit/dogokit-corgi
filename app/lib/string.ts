import { customAlphabet } from "nanoid";
import pluralize from "pluralize";
import slugify from "slugify";
import { z } from "zod/v4";

export function isValidUrl(url: string) {
  return z.url().safeParse(url).success;
}

export function convertToSlug(...texts: string[]) {
  const textToSlug = texts.join(" ");
  return slugify(textToSlug, { lower: true });
}

export function convertToSlugNanoId(...texts: string[]) {
  const textToSlug = texts.join(" ");
  return slugify(`${textToSlug}-${createNanoId()}`, { lower: true });
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

export function truncateText(
  text: string,
  charLimit = 30,
  withEllipsis = true
) {
  if (!text || typeof text !== "string" || text.length <= charLimit)
    return text;

  const trimmedLength = withEllipsis ? charLimit - 3 : charLimit;
  const trimmedText = text.substring(0, trimmedLength).trim();

  return withEllipsis ? `${trimmedText}...` : trimmedText;
}

export function createNanoId() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10);
  return nanoid();
}

export function createNanoIdShort() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 3);
  return nanoid();
}

export function createSlug(...args: string[]) {
  const textToSlug = args.join("-");
  return slugify(textToSlug, { lower: true, strict: true });
}

export function createUsername(...args: string[]) {
  const textToSlug = args.join("_").replace(/-/g, "_");
  return slugify(textToSlug, { lower: true, strict: true, replacement: "_" });
}

export function createUsernameGitHub(login: string) {
  return login.replace(/-/g, "_");
}

export function formatPlural(word: string, count: number) {
  return pluralize(word, count, true);
}

export function stringifyCode(code?: string | object) {
  return JSON.stringify(code, null, 2);
}

export function getUsernameFromEmail(email: string) {
  // Step 1: Remove the domain part
  const atIndex = email.indexOf("@");

  if (atIndex !== -1) {
    // Step 2: Replace '.' with '_'
    return email.substring(0, atIndex).replace(/\./g, "_");
  }
  // Handle the case where the string doesn't contain '@'
  return email;
}

export function getNameInitials(fullname = "First Last") {
  return fullname
    .split(" ")
    .map((word, index) => {
      if (index < 2) return word.charAt(0).toUpperCase();
      return "";
    })
    .join("");
}

export function getNameParts(fullname: string) {
  const parts = fullname.split(" ");
  if (parts.length === 1) {
    return {
      firstName: parts[0],
      lastName: "",
    };
  }
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.slice(-1).join(" "),
  };
}

export function joinStringsFallback(strings: string[], separator = ", ") {
  if (strings.length === 0) return "-";
  return strings.join(separator);
}
