/**
 * Centralized Phone & Mobile Number Validation and Normalization Utilities for Treel
 *
 * Rules:
 * - Format must only be numeric digits (0-9).
 * - Maximum and required length: exactly 10 digits.
 * - Valid Indian mobile numbers start with 6, 7, 8, or 9.
 * - Submissions containing non-digits, shorter, or longer lengths must be rejected.
 */

export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export const PHONE_ERROR_MESSAGE =
  "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.";

/**
 * Normalizes input to a 10-digit Indian mobile number.
 * Removes non-digits, then strips a leading "91" country code or "0" trunk prefix
 * when more than 10 digits are present (e.g. "+91 98765 43210" or "098765 43210"),
 * so the prefix is never mistaken for the start of the number.
 */
export function normalizePhone(value: string | null | undefined): string {
  if (!value) return "";
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 10);
}

/**
 * Validates whether the given phone number string is an exact, valid 10-digit mobile number.
 */
export function isValidPhone(value: string | null | undefined): boolean {
  if (!value) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 && INDIAN_MOBILE_REGEX.test(digits);
}

/**
 * Validates whether an optional phone field is either completely empty OR a valid 10-digit mobile number.
 */
export function isValidOptionalPhone(value: string | null | undefined): boolean {
  if (!value || value.trim() === "") return true;
  return isValidPhone(value);
}

