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

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPG, PNG, WebP, GIF, or SVG image." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // 1. Save local backup to public/uploads/products/
    const publicDir = path.join(process.cwd(), "public", "uploads", "products");
    try {
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, safeName), buffer);
    } catch (e) {
      console.error("Local disk backup failed:", e);
    }

    // 2. Upload to Supabase Storage bucket 'products'
    let publicUrl = `/uploads/products/${safeName}`;
    try {
      const supabase = getAdminClient();
      const { data, error } = await supabase.storage
        .from("products")
        .upload(safeName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage.from("products").getPublicUrl(safeName);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      }
    } catch (uploadErr) {
      console.warn("Supabase Storage upload warning, falling back to local URL:", uploadErr);
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload product image error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload product image" },
      { status: 500 }
    );
  }
}
