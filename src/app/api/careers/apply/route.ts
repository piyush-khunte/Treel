import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { guardLeadSubmission } from "@/lib/security/lead-guard";
import { getJobBySlug } from "@/lib/content/careers-storage";
import { isSesConfigured, sendEmail } from "@/lib/integrations";

/**
 * Careers application intake.
 *
 * Stores each application as a row in the Supabase `leads` table
 * (form_id = "careers_application") so it shows up in Admin → Leads under
 * "Career Applications". The resume goes to the private Supabase Storage
 * bucket `resumes`; admins download it through a short-lived signed URL.
 */

const RESUME_BUCKET = "resumes";
// 4MB keeps the multipart request under Vercel's 4.5MB serverless body limit.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }
  return createClient(url.replace(/^['"]|['"]$/g, ""), key.replace(/^['"]|['"]$/g, ""), {
    auth: { persistSession: false },
  });
}

function detectResumeType(fileName: string, buffer: Buffer): { ext: string; contentType: string } | null {
  const lower = fileName.toLowerCase();
  const b = buffer;
  if (lower.endsWith(".pdf") && b.length >= 4 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) {
    return { ext: "pdf", contentType: "application/pdf" };
  }
  if (lower.endsWith(".docx") && b.length >= 4 && b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04) {
    return { ext: "docx", contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  }
  if (lower.endsWith(".doc") && b.length >= 4 && b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0) {
    return { ext: "doc", contentType: "application/msword" };
  }
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: NextRequest) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request payload format." }, { status: 400 });
    }

    const fields: Record<string, string> = {};
    form.forEach((val, key) => {
      if (typeof val === "string") fields[key] = val;
    });

    const blocked = await guardLeadSubmission("careers", req.headers, fields);
    if (blocked) return blocked;

    // 1. Validation
    const name = str(form.get("name"));
    const email = str(form.get("email")).toLowerCase();
    const phoneDigits = str(form.get("phone")).replace(/\D/g, "");
    const roleSlug = str(form.get("roleSlug"));
    const linkedin = str(form.get("linkedin")).slice(0, 300);
    const coverLetter = str(form.get("coverLetter")).slice(0, 2000);
    const source = str(form.get("source")).slice(0, 50);
    const consent = str(form.get("consent"));
    const resume = form.get("resume");

    if (name.length < 2) {
      return NextResponse.json({ success: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }
    if (consent !== "true") {
      return NextResponse.json(
        { success: false, error: "Please confirm your consent to process your application." },
        { status: 400 }
      );
    }
    if (linkedin && !/^https?:\/\//i.test(linkedin)) {
      return NextResponse.json({ success: false, error: "Please enter a valid LinkedIn URL." }, { status: 400 });
    }

    const role = roleSlug ? await getJobBySlug(roleSlug) : null;
    if (!role || role.status !== "Published") {
      return NextResponse.json(
        { success: false, error: "This opening is no longer accepting applications." },
        { status: 400 }
      );
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ success: false, error: "Please attach your resume." }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ success: false, error: "Resume file size exceeds 4MB." }, { status: 400 });
    }
    const buffer = Buffer.from(await resume.arrayBuffer());
    const detected = detectResumeType(resume.name, buffer);
    if (!detected) {
      return NextResponse.json(
        { success: false, error: "Please upload your resume as a PDF or Word document (.pdf, .doc, .docx)." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error("[Careers Application] Database configuration missing.");
      return NextResponse.json(
        { success: false, error: "We could not submit your application right now. Please email careers@treel.in." },
        { status: 500 }
      );
    }

    // 2. Resume upload to private bucket (created on first use)
    const safeBase = resume.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const resumePath = `${role.slug}/${Date.now()}_${crypto.randomUUID().slice(0, 8)}_${safeBase}.${detected.ext}`;

    let upload = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(resumePath, buffer, { contentType: detected.contentType, upsert: false });

    if (upload.error && /not found/i.test(upload.error.message)) {
      await supabase.storage.createBucket(RESUME_BUCKET, {
        public: false,
        fileSizeLimit: MAX_RESUME_BYTES,
      });
      upload = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(resumePath, buffer, { contentType: detected.contentType, upsert: false });
    }

    if (upload.error) {
      console.error("[Careers Application] Resume upload failed:", upload.error);
      return NextResponse.json(
        { success: false, error: "We could not upload your resume. Please try again or email careers@treel.in." },
        { status: 500 }
      );
    }

    // 3. Persist to leads table (same columns as /api/contact)
    const normalizedPhone = `+91${phoneDigits}`;
    const pagePath = `/careers/${role.slug}`;
    const insertPayload = {
      full_name: name,
      mobile_number: normalizedPhone,
      work_email: email,
      company: role.title,
      fleet_size: null,
      lead_source: "Careers Application",
      campaign_type: "careers_application",
      form_id: "careers_application",
      status: "new",
      landing_page: `https://treel.in${pagePath}`,
      page_path: pagePath,
      referrer: req.headers.get("referer") || null,
      user_agent: req.headers.get("user-agent") || null,
      attribution_metadata: {
        subject: `Application: ${role.title}`,
        role_title: role.title,
        role_slug: role.slug,
        role_team: role.team || null,
        role_location: role.location || null,
        linkedin: linkedin || null,
        cover_letter: coverLetter || null,
        heard_from: source || null,
        resume_path: resumePath,
        resume_bucket: RESUME_BUCKET,
        resume_file_name: resume.name,
        resume_size: resume.size,
        consent: true,
      },
      email_notification_status: "skipped",
    };

    const { data: inserted, error: insertError } = await supabase
      .from("leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertError) {
      console.error("[Careers Application] Supabase insert failed:", insertError);
      await supabase.storage.from(RESUME_BUCKET).remove([resumePath]);
      return NextResponse.json(
        { success: false, error: "We could not submit your application. Please try again or email careers@treel.in." },
        { status: 500 }
      );
    }

    // 4. Optional HR notification
    if (isSesConfigured()) {
      try {
        const to =
          process.env.SES_CAREERS_EMAIL ||
          process.env.SES_LEADS_EMAIL ||
          process.env.SES_TO_EMAIL ||
          process.env.SES_FROM_EMAIL ||
          "careers@treel.in";
        const rows: [string, string][] = [
          ["Role", role.title],
          ["Name", name],
          ["Email", email],
          ["Phone", normalizedPhone],
          ["LinkedIn", linkedin || "-"],
          ["Heard via", source || "-"],
          ["Resume", `${resume.name} (download from Admin → Leads → Career Applications)`],
        ];
        const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#1e293b">
<h2 style="margin:0 0 12px">New career application: ${escapeHtml(role.title)}</h2>
<table style="border-collapse:collapse">${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`
          )
          .join("")}</table>
${coverLetter ? `<h3 style="margin:16px 0 6px">Cover letter</h3><div style="white-space:pre-wrap;background:#f8fafc;padding:12px;border:1px solid #e2e8f0">${escapeHtml(coverLetter)}</div>` : ""}
</div>`;
        const sent = await sendEmail({
          to,
          subject: `[CAREERS] ${role.title} — ${name}`,
          html,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + (coverLetter ? `\n\nCover letter:\n${coverLetter}` : ""),
          replyTo: email,
        });
        await supabase
          .from("leads")
          .update({ email_notification_status: sent.success ? "sent" : "failed" })
          .eq("id", inserted.id);
      } catch (emailErr) {
        console.error("[Careers Application] Notification email failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, applicationId: inserted.id });
  } catch (err) {
    console.error("[Careers Application] Unexpected server error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong while submitting your application. Please try again." },
      { status: 500 }
    );
  }
}
