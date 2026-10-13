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

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF document (.pdf)." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 25MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // 1. Save local backup to public/uploads/documents/
    const publicDir = path.join(process.cwd(), "public", "uploads", "documents");
    try {
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, safeName), buffer);
    } catch (e) {
      console.error("Local disk backup failed for document:", e);
    }

    // 2. Upload to Supabase Storage bucket 'documents'
    let publicUrl = `/uploads/documents/${safeName}`;
    try {
      const supabase = getAdminClient();
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(safeName, buffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (!error && data) {
        const { data: urlData } = supabase.storage.from("documents").getPublicUrl(safeName);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      }
    } catch (uploadErr) {
      console.warn("Supabase Storage upload warning, falling back to local URL:", uploadErr);
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("Upload document error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload document" },
      { status: 500 }
    );
  }
}
