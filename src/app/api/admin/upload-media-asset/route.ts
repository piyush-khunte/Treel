import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function getAdminClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-treel.supabase.co").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key"
  ).replace(/^['"]|['"]$/g, "");
  return createClient(url, key, { auth: { persistSession: false } });
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const ALLOWED_EXTENSIONS = [
  "zip",
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "ai",
  "webp",
  "doc",
  "docx",
];

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Admin authentication required" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No media file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const ext = (file.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        {
          error: `Unsupported file format (.${ext}). Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const safeName = `${Date.now()}_${cleanBase}.${ext}`;

    // 1. Save local disk backup to public/uploads/media-kit/
    const publicDir = path.join(process.cwd(), "public", "uploads", "media-kit");
    try {
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, safeName), buffer);
    } catch (diskErr) {
      console.warn("Local disk backup failed for media asset (continuing):", diskErr);
    }

    // 2. Upload to Supabase Storage bucket 'media-kit' (or fallback 'documents')
    let publicUrl = `/uploads/media-kit/${safeName}`;
    try {
      const supabase = getAdminClient();
      const bucket = "media-kit";
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(safeName, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(safeName);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      }
    } catch (uploadErr) {
      console.warn("Supabase Storage upload warning, falling back to local URL:", uploadErr);
    }

    let formatLabel = ext.toUpperCase();
    if (ext === "zip") formatLabel = "ZIP Archive";
    else if (ext === "pdf") formatLabel = "PDF Document";
    else if (["png", "jpg", "jpeg", "webp"].includes(ext)) formatLabel = `Image (${ext.toUpperCase()})`;
    else if (ext === "svg" || ext === "ai") formatLabel = `Vector (${ext.toUpperCase()})`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeName,
      originalFilename: file.name,
      format: formatLabel,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
      data: {
        fileUrl: publicUrl,
        fileName: safeName,
        originalName: file.name,
        format: formatLabel,
        fileSize: file.size,
        fileSizeFormatted: formatBytes(file.size),
      },
    });
  } catch (error: any) {
    console.error("Upload media asset error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload media asset" },
      { status: 500 }
    );
  }
}

