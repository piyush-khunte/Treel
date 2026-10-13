/**
 * Treel Corporate Notice Board Utilities
 * Enforces word limits and validates/normalizes Google Drive document links.
 */

export const MAX_NOTICE_WORD_COUNT = 150;

/**
 * Counts the number of words in a string accurately across whitespace boundaries.
 */
export function countWords(text: string | null | undefined): number {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/**
 * Validates notice text against the configured maximum word count.
 */
export function validateNoticeWordCount(text: string | null | undefined): {
  valid: boolean;
  count: number;
  max: number;
  error?: string;
} {
  const count = countWords(text);
  if (count > MAX_NOTICE_WORD_COUNT) {
    return {
      valid: false,
      count,
      max: MAX_NOTICE_WORD_COUNT,
      error: `Notice text exceeds the maximum limit of ${MAX_NOTICE_WORD_COUNT} words (currently ${count} words). Please condense the short notice text.`,
    };
  }
  return {
    valid: true,
    count,
    max: MAX_NOTICE_WORD_COUNT,
  };
}

/**
 * Google Drive URL patterns:
 * 1. https://drive.google.com/file/d/{FILE_ID}/...
 * 2. https://drive.google.com/open?id={FILE_ID}
 * 3. https://drive.google.com/uc?id={FILE_ID}
 * 4. https://docs.google.com/document/d/{DOC_ID}/...
 * 5. https://docs.google.com/spreadsheets/d/{SHEET_ID}/...
 * 6. https://docs.google.com/presentation/d/{PRES_ID}/...
 */
const DRIVE_FILE_REGEX = /^https:\/\/(?:drive|docs)\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|document\/d\/|spreadsheets\/d\/|presentation\/d\/)([a-zA-Z0-9_-]+)/i;

/**
 * Validates and normalizes Google Drive document/PDF URLs for in-browser viewing.
 */
export function validateAndNormalizeDriveUrl(rawUrl: string | null | undefined): {
  valid: boolean;
  normalizedUrl?: string;
  error?: string;
} {
  if (!rawUrl || !rawUrl.trim()) {
    return { valid: true, normalizedUrl: undefined };
  }

  const trimmed = rawUrl.trim();

  // Basic URL syntax check
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      valid: false,
      error: "Please enter a valid URL starting with https://drive.google.com/ or https://docs.google.com/.",
    };
  }

  // Must be Google Drive or Google Docs host
  const hostname = parsed.hostname.toLowerCase();
  if (hostname !== "drive.google.com" && hostname !== "docs.google.com") {
    return {
      valid: false,
      error: "Only official Google Drive or Google Docs sharing URLs are permitted (e.g., https://drive.google.com/file/d/...).",
    };
  }

  const match = trimmed.match(DRIVE_FILE_REGEX);
  if (!match || !match[1]) {
    return {
      valid: false,
      error: "Could not identify a valid Google Drive file or document ID. Please paste a standard Google Drive share link.",
    };
  }

  const fileId = match[1];

  // Normalize to browser-viewable preview or view format
  if (trimmed.includes("docs.google.com/document/d/")) {
    return {
      valid: true,
      normalizedUrl: `https://docs.google.com/document/d/${fileId}/preview`,
    };
  } else if (trimmed.includes("docs.google.com/spreadsheets/d/")) {
    return {
      valid: true,
      normalizedUrl: `https://docs.google.com/spreadsheets/d/${fileId}/preview`,
    };
  } else if (trimmed.includes("docs.google.com/presentation/d/")) {
    return {
      valid: true,
      normalizedUrl: `https://docs.google.com/presentation/d/${fileId}/preview`,
    };
  }

  // Standard Google Drive file/PDF preview link
  return {
    valid: true,
    normalizedUrl: `https://drive.google.com/file/d/${fileId}/view`,
  };
}

