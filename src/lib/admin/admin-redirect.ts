/**
 * Returns a safe post-login redirect target. Only same-site admin paths are allowed,
 * so `?next=https://evil.example` or `?next=//evil.example` can't send an admin off-site.
 */
export function safeAdminRedirect(next: string | null | undefined): string {
  if (!next) return "/admin";
  const value = next.trim();
  const isAdminPath = value === "/admin" || value.startsWith("/admin/") || value.startsWith("/admin?");
  if (!isAdminPath || value.includes("\\") || /[\u0000-\u001f]/.test(value)) return "/admin";
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}
