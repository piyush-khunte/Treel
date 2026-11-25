import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { guardLeadSubmission } from "@/lib/security/lead-guard";

const DELETE_TOKEN_HEADER = "x-review-delete-token";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function tokenMatches(token: string, storedHash: unknown): boolean {
  if (typeof storedHash !== "string" || storedHash.length !== 64) return false;
  const a = Buffer.from(hashToken(token), "hex");
  const b = Buffer.from(storedHash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Fields safe to return publicly — never email or the delete-token hash. */
function toPublicReview(r: any) {
  return {
    id: r.id,
    name: r.name,
    vehicle: r.vehicle,
    stars: r.stars,
    title: r.title,
    body: r.body,
    date: r.date,
    verified: r.verified,
    mediaUrl: r.mediaUrl ?? null,
    mediaType: r.mediaType ?? "image",
    created_at: r.created_at,
  };
}

/** Only accept media produced by our own upload route (local path or our Supabase storage). */
function sanitizeMediaUrl(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  if (/^\/uploads\/reviews\/[A-Za-z0-9._-]+$/.test(value)) return value;
  try {
    const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
    if (!supabaseUrl) return null;
    const u = new URL(value);
    const allowedHost = new URL(supabaseUrl).host;
    if (u.protocol === "https:" && u.host === allowedHost && u.pathname.startsWith("/storage/v1/object/public/reviews/")) {
      return u.toString();
    }
  } catch {
    // invalid URL
  }
  return null;
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "reviews-store.json");

function readStoredReviews(): any[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error("[Reviews Route] Read store error:", err);
  }
  return [];
}

function writeStoredReviews(reviews: any[]) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (err) {
    console.error("[Reviews Route] Write store error:", err);
  }
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export async function GET() {
  const stored = readStoredReviews();
  return NextResponse.json({
    success: true,
    reviews: stored.map(toPublicReview),
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => null);

    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const blocked = await guardLeadSubmission("personal-reviews", req.headers, data);
    if (blocked) return blocked;

    const { name, email, vehicle, rating, title, review, mediaUrl, mediaType } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const stars = Number(rating);
    if (isNaN(stars) || stars < 1 || stars > 5) {
      return NextResponse.json(
        { success: false, error: "A valid star rating between 1 and 5 is required" },
        { status: 400 }
      );
    }

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Review headline/title is required" },
        { status: 400 }
      );
    }

    if (!review || typeof review !== "string" || review.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Review description is required" },
        { status: 400 }
      );
    }

    if (name.length > 100 || title.length > 200 || review.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Review is too long." },
        { status: 400 }
      );
    }

    // Secret returned only to the author so they (and nobody else) can delete it later.
    const deleteToken = crypto.randomBytes(24).toString("base64url");

    const newReview = {
      id: `rev_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      name: name.trim(),
      email: email ? String(email).trim().slice(0, 254) : null,
      vehicle: vehicle ? String(vehicle).trim().slice(0, 100) : "Personal Vehicle",
      stars,
      title: title.trim(),
      body: review.trim(),
      date: "Just now",
      verified: true,
      mediaUrl: sanitizeMediaUrl(mediaUrl),
      mediaType: mediaType === "video" ? "video" : "image",
      created_at: new Date().toISOString(),
      deleteTokenHash: hashToken(deleteToken),
    };

    // 1. Save locally to server filesystem (shared for localhost & port forwarding)
    const existing = readStoredReviews();
    const updated = [newReview, ...existing];
    writeStoredReviews(updated);

    // 2. Try persisting to Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("personal_reviews").insert([
          {
            name: newReview.name,
            email: newReview.email,
            vehicle: newReview.vehicle,
            rating: newReview.stars,
            title: newReview.title,
            body: newReview.body,
            verified: true,
          },
        ]);
      } catch (dbErr) {
        console.warn("[Reviews Route] Supabase write failed, falling back to local file:", dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been submitted successfully.",
        review: toPublicReview(newReview),
        deleteToken,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Reviews Route] Submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while saving your review." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Review ID is required to delete." },
        { status: 400 }
      );
    }

    // Only the review's author (holding its delete token) or an admin may delete it.
    const existing = readStoredReviews();
    const target = existing.find((r) => r.id === id);
    const token = req.headers.get(DELETE_TOKEN_HEADER) || "";
    const isAuthor = Boolean(target && token && tokenMatches(token, target.deleteTokenHash));
    const isAdmin = isAuthor ? false : Boolean(await getAdminSession());
    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "You are not allowed to delete this review." },
        { status: 403 }
      );
    }

    // 1. Delete from local server filesystem
    const filtered = existing.filter((r) => r.id !== id);
    writeStoredReviews(filtered);

    // 2. Delete from Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("personal_reviews").delete().eq("id", id);
      } catch (dbErr) {
        console.warn("[Reviews Route] Supabase delete warning:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully.",
      deletedId: id,
    });
  } catch (err: any) {
    console.error("[Reviews Route] Delete error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete review." },
      { status: 500 }
    );
  }
}
