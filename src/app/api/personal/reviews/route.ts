import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "reviews-store.json");

function readStoredReviews(): any[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error("[Reviews API] Read store error:", err);
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
    console.error("[Reviews API] Write store error:", err);
  }
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
    reviews: stored,
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json().catch(() => null);

    if (!data) {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

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

    const newReview = {
      id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email ? String(email).trim() : null,
      vehicle: vehicle ? String(vehicle).trim() : "Personal Vehicle",
      stars,
      title: title.trim(),
      body: review.trim(),
      date: "Just now",
      verified: true,
      mediaUrl: mediaUrl || null,
      mediaType: mediaType || "image",
      created_at: new Date().toISOString(),
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
        console.warn("[Reviews API] Supabase write failed, falling back to local file:", dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been submitted successfully.",
        review: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Reviews API] Submission error:", error);
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

    // 1. Delete from local server filesystem
    const existing = readStoredReviews();
    const filtered = existing.filter((r) => r.id !== id);
    writeStoredReviews(filtered);

    // 2. Delete from Supabase if configured
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from("personal_reviews").delete().eq("id", id);
      } catch (dbErr) {
        console.warn("[Reviews API] Supabase delete warning:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully.",
      deletedId: id,
    });
  } catch (err: any) {
    console.error("[Reviews API] Delete error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete review." },
      { status: 500 }
    );
  }
}
