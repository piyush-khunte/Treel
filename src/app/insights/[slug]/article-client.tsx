"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Link as LinkIcon, 
  Mail, 
  Check, 
  Loader2, 
  CheckCircle2, 
  Rss
} from "lucide-react";

interface ArticleShareProps {
  title: string;
  url: string;
}

export function ArticleShareBar({ title, url }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mr-2">Share:</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/10 hover:border-white/20 transition-all"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/10 hover:border-white/20 transition-all"
        aria-label="Share on Twitter / X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <button
        onClick={handleCopy}
        className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/10 hover:border-white/20 transition-all relative"
        aria-label="Copy article link"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
      </button>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/10 hover:border-white/20 transition-all"
        aria-label="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );
}

export function ArticleNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your work email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
      <div className="space-y-2">
        <h3 className="font-fraunces text-2xl font-bold text-[#FAF7F2]">
          Mobility intelligence in your inbox.
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed font-inter max-w-xl">
          A monthly note on what we&apos;re seeing across India&apos;s largest connected commercial vehicle dataset. No spam. Unsubscribe anytime.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>You are subscribed to Treel Insights. We&apos;ll be in touch with our monthly research dispatch.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="name@company.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/60 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
              aria-label="Work email address"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs text-[#D5573B] font-inter font-medium">{errorMessage}</p>
          )}
        </form>
      )}

      <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
        <Rss className="w-3.5 h-3.5 text-[#D5573B]" />
        <span>Also available via RSS feed:</span>
        <Link href="/insights/rss.xml" className="text-[#FAF7F2] underline hover:text-[#D5573B] transition-colors font-semibold">
          Subscribe via RSS
        </Link>
      </div>
    </div>
  );
}
