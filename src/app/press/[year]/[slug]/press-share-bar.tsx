"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export function PressShareBar({ headline, url }: { headline: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(headline);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-[#94A3B8] font-mono">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors"
      >
        LinkedIn
      </a>
      <span className="text-white/20">·</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors"
      >
        Twitter/X
      </a>
      <span className="text-white/20">·</span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors cursor-pointer"
        type="button"
      >
        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        <span>{copied ? "Copied" : "Copy Link"}</span>
      </button>
    </div>
  );
}
