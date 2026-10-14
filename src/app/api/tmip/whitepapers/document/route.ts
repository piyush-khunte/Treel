import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { verifyWhitepaperAccessToken } from "@/lib/content/whitepaper-tokens";
import { getWhitepaperById } from "@/lib/content/whitepapers-storage";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  ).replace(/^['"]|['"]$/g, "");
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const action = searchParams.get("action") === "download" ? "download" : "view";
    const requestedId = searchParams.get("id");

    let whitepaperId: string | null = null;
    let isAdmin = false;

    // 1. Authorization check
    // Check if administrator
    const adminSession = await getAdminSession();
    if (adminSession) {
      isAdmin = true;
      if (requestedId) {
        whitepaperId = requestedId;
      }
    }

    // If not admin or no direct ID, verify access token
    if (!whitepaperId) {
      if (!token) {
        return NextResponse.json(
          { error: "Access token is required to view or download this document." },
          { status: 401 }
        );
      }

      const verified = verifyWhitepaperAccessToken(token);
      if (!verified) {
        return NextResponse.json(
          { error: "This document access link is invalid or has expired (valid for 48 hours). Please request access again." },
          { status: 403 }
        );
      }
      whitepaperId = verified.whitepaperId;
    }

    // 2. Fetch whitepaper record
    const whitepaper = await getWhitepaperById(whitepaperId);
    if (!whitepaper) {
      return NextResponse.json(
        { error: "The requested whitepaper document could not be found." },
        { status: 404 }
      );
    }

    // Check publication status
    if (whitepaper.publicationStatus !== "Published" && !isAdmin) {
      return NextResponse.json(
        { error: "This whitepaper is currently not published." },
        { status: 403 }
      );
    }

    if (!whitepaper.fileUrl) {
      return NextResponse.json(
        { error: "Document file has not been uploaded yet for this whitepaper." },
        { status: 404 }
      );
    }

    // 3. Resolve document buffer
    let fileBuffer: Buffer | null = null;
    const fileUrl = whitepaper.fileUrl;

    // Scenario A: Local file under /uploads/
    if (fileUrl.startsWith("/uploads/") || fileUrl.startsWith("uploads/")) {
      const cleanPath = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl;
      const localDiskPath = path.join(process.cwd(), "public", cleanPath);
      if (fs.existsSync(localDiskPath)) {
        try {
          fileBuffer = fs.readFileSync(localDiskPath);
        } catch (e) {
          console.warn("Could not read local file directly:", e);
        }
      }
    }

    // Scenario B: Remote URL or Supabase Storage fetch
    if (!fileBuffer && (fileUrl.startsWith("http://") || fileUrl.startsWith("https://"))) {
      try {
        const remoteRes = await fetch(fileUrl);
        if (remoteRes.ok) {
          const ab = await remoteRes.arrayBuffer();
          fileBuffer = Buffer.from(ab);
        }
      } catch (fErr) {
        console.warn("Failed to fetch remote document URL:", fErr);
      }
    }

    // Scenario C: Supabase Storage fallback
    if (!fileBuffer) {
      const supabase = getSupabaseClient();
      if (supabase) {
        const filename = whitepaper.originalFilename || path.basename(fileUrl);
        try {
          const { data: storageBlob, error: sErr } = await supabase.storage
            .from("documents")
            .download(filename);
          if (!sErr && storageBlob) {
            const ab = await storageBlob.arrayBuffer();
            fileBuffer = Buffer.from(ab);
          }
        } catch (e) {
          console.warn("Supabase storage download fallback failed:", e);
        }
      }
    }

    if (!fileBuffer) {
      return NextResponse.json(
        { error: "Document file could not be retrieved from storage. Please contact support@treel.in." },
        { status: 404 }
      );
    }

    // 4. Determine format, Content-Type, and Content-Disposition
    const format = whitepaper.fileFormat?.toUpperCase() || "PDF";
    let contentType = "application/pdf";
    let ext = "pdf";

    if (format === "DOCX") {
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      ext = "docx";
    } else if (format === "DOC") {
      contentType = "application/msword";
      ext = "doc";
    }

    const safeBaseName = (whitepaper.slug || "tmip-whitepaper")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const safeFilename = `${safeBaseName}.${ext}`;

    // Word documents cannot be safely viewed inline in standard browsers; force attachment download
    const dispositionType = format === "PDF" && action === "view" ? "inline" : "attachment";

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${dispositionType}; filename="${safeFilename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err: any) {
    console.error("Document access handler error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred while processing document access." },
      { status: 500 }
    );
  }
}
