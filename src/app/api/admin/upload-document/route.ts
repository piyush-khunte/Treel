import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { WhitepaperFormat } from "@/types/content";

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

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function detectDocumentFormat(fileName: string, mimeType: string, buffer: Buffer): { format: WhitepaperFormat; contentType: string } | null {
  const lowerName = fileName.toLowerCase();

  // 1. PDF
  if (lowerName.endsWith(".pdf") || mimeType === "application/pdf") {
    // Magic bytes check: %PDF (0x25 0x50 0x44 0x46)
    if (buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
      return { format: "PDF", contentType: "application/pdf" };
    }
    // Permissive fallback if extension matches
    if (lowerName.endsWith(".pdf")) {
      return { format: "PDF", contentType: "application/pdf" };
    }
  }

  // 2. DOCX (Office Open XML, starts with ZIP magic bytes PK\x03\x04)
  if (lowerName.endsWith(".docx") || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    if (buffer.length >= 4 && buffer[0] === 0x50 && buffer[1] === 0x4B && buffer[2] === 0x03 && buffer[3] === 0x04) {
      return {
        format: "DOCX",
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
    }
    if (lowerName.endsWith(".docx")) {
      return {
        format: "DOCX",
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      };
    }
  }

  // 3. DOC (Legacy Compound File Binary, starts with 0xD0 0xCF 0x11 0xE0)
  if (lowerName.endsWith(".doc") || mimeType === "application/msword") {
    if (buffer.length >= 4 && buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0) {
      return { format: "DOC", contentType: "application/msword" };
    }
    if (lowerName.endsWith(".doc")) {
      return { format: "DOC", contentType: "application/msword" };
    }
  }

  return null;
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
      return NextResponse.json({ error: "No document file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const detected = detectDocumentFormat(file.name, file.type, buffer);
    if (!detected) {
      return NextResponse.json(
        {
          error:
            "Invalid file format. Please upload a PDF (.pdf) or Microsoft Word document (.doc, .docx).",
        },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || detected.format.toLowerCase();
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const safeName = `${Date.now()}_${cleanBase}.${ext}`;

    // 1. Save local disk backup to public/uploads/documents/
    const publicDir = path.join(process.cwd(), "public", "uploads", "documents");
    try {
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicDir, safeName), buffer);
    } catch (diskErr) {
      console.warn("Local disk backup failed for document (continuing):", diskErr);
    }

    // 2. Upload to Supabase Storage bucket 'documents'
    let publicUrl = `/uploads/documents/${safeName}`;
    try {
      const supabase = getAdminClient();
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(safeName, buffer, {
          contentType: detected.contentType,
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

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: safeName,
      originalFilename: file.name,
      format: detected.format,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
    });
  } catch (error: any) {
    console.error("Upload document error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload document" },
      { status: 500 }
    );
  }
}
