/**
 * Safe, robust clipboard copy utility for browser environments.
 * Prevents "Document is not focused" (svgNotAllowedError / NotAllowedError) DOMExceptions
 * by trying the modern Clipboard API and gracefully falling back to document.execCommand('copy').
 *
 * Never throws uncaught exceptions.
 */

export interface ClipboardResult {
  success: boolean;
  error?: string;
}

export async function copyToClipboardSafe(text: string): Promise<ClipboardResult> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { success: false, error: "Window/document unavailable in SSR" };
  }

  if (text === null || text === undefined) {
    return { success: false, error: "No text provided to copy" };
  }

  const str = String(text);

  // 1. Try modern navigator.clipboard if supported, in secure context, and document is focused
  if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
    try {
      // If the document is focused, writeText works reliably without permissions errors
      if (typeof document.hasFocus === "function" && document.hasFocus()) {
        await navigator.clipboard.writeText(str);
        return { success: true };
      }
    } catch {
      // Failed (e.g. document not focused, SVG click target, or permission denied)
      // Fall through immediately to execCommand fallback
    }
  }

  // 2. Safe Fallback: document.execCommand('copy') with hidden temporary textarea
  try {
    const textArea = document.createElement("textarea");
    textArea.value = str;

    // Prevent scrolling to bottom of screen and make invisible
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "-9999px";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.style.opacity = "0";
    textArea.setAttribute("readonly", "");
    textArea.setAttribute("aria-hidden", "true");

    document.body.appendChild(textArea);

    // Focus and select the text
    textArea.focus({ preventScroll: true });
    textArea.select();
    textArea.setSelectionRange(0, str.length);

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true };
    }
  } catch {
    // Both modern API and execCommand failed
  }

  return {
    success: false,
    error: "Clipboard access is restricted or document is not focused. Please copy manually."
  };
}
