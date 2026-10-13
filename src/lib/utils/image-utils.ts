/**
 * Defensive image source normalization and validation.
 * Prevents Next.js Image error: 'Image is missing required "src" property: {}'
 * Safely handles null, undefined, empty strings, empty objects, and structured storage payloads.
 */

export function getValidImageSrc(img: unknown): string | null {
  if (img === null || img === undefined) {
    return null;
  }

  // If string, validate that it is non-empty and not a stringified object / placeholder error
  if (typeof img === "string") {
    const trimmed = img.trim();
    if (
      !trimmed ||
      trimmed === "{}" ||
      trimmed === "null" ||
      trimmed === "undefined" ||
      trimmed === "[object Object]"
    ) {
      return null;
    }
    return trimmed;
  }

  // If structured object, inspect supported properties (url, src, secure_url)
  if (typeof img === "object") {
    const obj = img as Record<string, unknown>;

    if (typeof obj.src === "string" && obj.src.trim() && obj.src !== "[object Object]") {
      return obj.src.trim();
    }

    if (typeof obj.url === "string" && obj.url.trim() && obj.url !== "[object Object]") {
      return obj.url.trim();
    }

    if (typeof obj.secure_url === "string" && obj.secure_url.trim() && obj.secure_url !== "[object Object]") {
      return obj.secure_url.trim();
    }
  }

  return null;
}

export function isValidImageSrc(img: unknown): boolean {
  return getValidImageSrc(img) !== null;
}
