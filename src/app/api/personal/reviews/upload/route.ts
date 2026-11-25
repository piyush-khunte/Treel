import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { consumeLeadRateLimit, getRequestIp } from "@/lib/security/lead-guard";

function getSupabaseClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  ).replace(/^['"]|['"]$/g, "");

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

type DetectedMedia = { mime: string; ext: string; kind: "image" | "video" };

/**
 * Identifies the file from its leading bytes ("magic numbers"). The browser-supplied
 * MIME type and file name are never trusted, so e.g. an HTML file renamed to .png is rejected.
 */
function detectMedia(buf: Buffer): DetectedMedia | null {
  if (buf.length < 12) return null;
  const ascii = (start: number, end: number) => buf.subarray(start, end).toString("latin1");

  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { mime: "image/jpeg", ext: "jpg", kind: "image" };
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { mime: "image/png", ext: "png", kind: "image" };
  }
  if (ascii(0, 6) === "GIF87a" || ascii(0, 6) === "GIF89a") return { mime: "image/gif", ext: "gif", kind: "image" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp", ext: "webp", kind: "image" };
  if (buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) {
    return { mime: "video/webm", ext: "webm", kind: "video" };
  }
  if (ascii(4, 8) === "ftyp") {
    const brand = ascii(8, 12);
    if (brand === "qt  ") return { mime: "video/quicktime", ext: "mov", kind: "video" };
    return { mime: "video/mp4", ext: "mp4", kind: "video" };
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Reject oversized bodies before parsing them.
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_VIDEO_SIZE + 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds the 50MB limit." }, { status: 413 });
    }

    const wait = await consumeLeadRateLimit("review-upload", getRequestIp(req.headers));
    if (wait > 0) {
      return NextResponse.json(
        { error: `Too many uploads. Please try again in ${Math.ceil(wait / 60)} minute(s).` },
        { status: 429, headers: { "Retry-After": String(wait) } }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No media file provided." }, { status: 400 });
    }

    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const media = detectMedia(buffer);

    if (!media) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed formats: JPG, PNG, WebP, GIF, MP4, MOV, WebM." },
        { status: 400 }
      );
    }

    if (media.kind === "image" && buffer.length > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: `Images must be 10MB or smaller (${(buffer.length / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    // Server-chosen name and extension; nothing from the client's file name is kept.
    const safeName = `review_${Date.now()}_${crypto.randomBytes(8).toString("hex")}.${media.ext}`;

    let fileUrl: string | null = null;

    // 1. Supabase Storage bucket 'reviews' (the persistent store in production)
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.storage.from("reviews").upload(safeName, buffer, {
          contentType: media.mime,
          upsert: false,
        });
        if (!error && data) {
          const { data: urlData } = supabase.storage.from("reviews").getPublicUrl(safeName);
          if (urlData?.publicUrl) fileUrl = urlData.publicUrl;
        } else if (error) {
          console.warn("Supabase Storage review upload failed:", error.message);
        }
      } catch (cloudErr) {
        console.warn("Supabase Storage review upload error:", cloudErr);
      }
    }

    // 2. Local disk fallback — development only (production filesystems are read-only/ephemeral)
    if (!fileUrl && process.env.NODE_ENV !== "production") {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "reviews");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        fs.writeFileSync(path.join(uploadDir, safeName), buffer);
        fileUrl = `/uploads/reviews/${safeName}`;
      } catch (fsErr) {
        console.warn("Failed saving review file to local disk:", fsErr);
      }
    }

    if (!fileUrl) {
      return NextResponse.json(
        { error: "Media upload is temporarily unavailable. You can submit your review without a photo." },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: safeName,
      fileType: media.mime,
      fileSize: buffer.length,
    });
  } catch (error) {
    console.error("Review upload endpoint error:", error);
    return NextResponse.json({ error: "Failed to upload review media file." }, { status: 500 });
  }
}
