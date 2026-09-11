import nodemailer from "nodemailer";
import type { EnquiryData } from "./excel.js";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = String(process.env.SMTP_SECURE || "true") === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailTo = process.env.MAIL_TO || smtpUser;

function getTransporter() {
  if (!smtpUser || !smtpPass || !mailTo) {
    throw new Error(
      "Email is not configured. Set SMTP_USER, SMTP_PASS and MAIL_TO environment variables.",
    );
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: unknown) {
  if (value === undefined || value === null || value === "") return "";
  return `<tr><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;width:180px;">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`;
}

export async function sendEnquiryEmail(
  data: EnquiryData,
  type: "registration" | "enquiry",
) {
  const transporter = getTransporter();
  const title = type === "registration" ? "New Registration" : "New Enquiry";

  const html = `
<!doctype html>
<html>
  <body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827;">
    <div style="padding:32px 16px;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="padding:24px;background:#111827;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">${title}</h1>
          <p style="margin:8px 0 0;color:#d1d5db;font-size:14px;">A new form submission has been received.</p>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Name", data.name)}
            ${row("Email", data.email)}
            ${row("Phone", data.phone)}
            ${row("Institution", data.institution)}
            ${row("Sport", data.sport)}
            ${row("Enquiry Type", data.enquiryType)}
            ${row("Preferred Timing", data.preferredTiming)}
            ${row("Attendance Type", data.attendanceType)}
            ${row("Number of Attendees", data.numberOfAttendees)}
            ${row("Friend Referral", data.friendReferral)}
            ${row("Referral Mobile", data.referralMobile)}
            ${row("Referral Email", data.referralEmail)}
          </table>
          <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;">
            <div style="font-weight:600;margin-bottom:8px;">Message</div>
            <div style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.message)}</div>
          </div>
          <p style="margin:24px 0 0;color:#6b7280;font-size:12px;">This email was generated automatically by the website enquiry system.</p>
        </div>
      </div>
    </div>
  </body>
</html>`;

  const text = [
    title,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Institution: ${data.institution || ""}`,
    `Sport: ${data.sport}`,
    `Enquiry Type: ${data.enquiryType}`,
    `Preferred Timing: ${data.preferredTiming || ""}`,
    `Attendance Type: ${data.attendanceType || ""}`,
    `Number of Attendees: ${data.numberOfAttendees || ""}`,
    `Friend Referral: ${data.friendReferral || ""}`,
    `Referral Mobile: ${data.referralMobile || ""}`,
    `Referral Email: ${data.referralEmail || ""}`,
    "",
    `Message: ${data.message}`,
  ].join("\n");

  await transporter.sendMail({
    from: `Website Forms <${smtpUser}>`,
    to: mailTo,
    replyTo: data.email,
    subject: `${title} - ${data.name}`,
    text,
    html,
  });
}
