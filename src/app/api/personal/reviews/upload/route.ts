import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function getSupabaseClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  ).replace(/^['"]|['"]$/g, "");

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit (handles photos and short video clips)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No media file provided." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed formats: JPG, PNG, WebP, GIF, MP4, WebM." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = `review_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // 1. Save local storage to public/uploads/reviews/
    const uploadDir = path.join(process.cwd(), "public", "uploads", "reviews");
    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, safeName), buffer);
    } catch (fsErr) {
      console.warn("Failed saving review file to local disk:", fsErr);
    }

    let fileUrl = `/uploads/reviews/${safeName}`;

    // 2. Upload to Supabase Storage bucket 'reviews' if configured
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase.storage
          .from("reviews")
          .upload(safeName, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: urlData } = supabase.storage.from("reviews").getPublicUrl(safeName);
          if (urlData?.publicUrl) {
            fileUrl = urlData.publicUrl;
          }
        }
      }
    } catch (cloudErr) {
      console.warn("Supabase Storage review upload fallback to local URL:", cloudErr);
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: safeName,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error("Review upload endpoint error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload review media file." },
      { status: 500 }
    );
  }
}

