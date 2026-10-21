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
 * Normalizes input by removing all non-digit characters and limiting length to 10 digits.
 */
export function normalizePhone(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/\D/g, "").slice(0, 10);
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

