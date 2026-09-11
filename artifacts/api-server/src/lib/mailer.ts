
import nodemailer from "nodemailer";

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  institution?: string;
  sport: string;
  enquiryType: string;
  preferredTiming?: string;
  attendanceType?: string;
  numberOfAttendees?: string | number;
  friendReferral?: string;
  referralMobile?: string;
  referralEmail?: string;
  message: string;
}

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure =
  String(process.env.SMTP_SECURE || "true") === "true";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailTo = process.env.MAIL_TO || smtpUser;

function getTransporter() {
  if (!smtpUser || !smtpPass || !mailTo) {
    throw new Error(
      "Email is not configured. Set SMTP_USER, SMTP_PASS and MAIL_TO environment variables."
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

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(
  label: string,
  value: unknown
): string {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "";
  }

  return `
    <tr>
      <td style="
        padding:13px 16px;
        border-bottom:1px solid #e8e8e8;
        color:#666666;
        font-size:13px;
        font-weight:600;
        width:190px;
        vertical-align:top;
      ">
        ${escapeHtml(label)}
      </td>

      <td style="
        padding:13px 16px;
        border-bottom:1px solid #e8e8e8;
        color:#171717;
        font-size:14px;
        vertical-align:top;
      ">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function getCurrentDateTime(): string {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }
  ).format(new Date());
}

export async function sendRegistrationEmail(
  data: RegistrationData
) {
  const transporter = getTransporter();

  const receivedAt = getCurrentDateTime();

  const subject =
    `New Registration – ${data.name} – ${data.sport}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>New Zenithh Registration</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f4f5f7;
  font-family:Arial,Helvetica,sans-serif;
  color:#171717;
">

  <div style="
    padding:35px 15px;
    background:#f4f5f7;
  ">

    <div style="
      max-width:700px;
      margin:0 auto;
      background:#ffffff;
      border-radius:14px;
      overflow:hidden;
      border:1px solid #e5e7eb;
      box-shadow:0 4px 20px rgba(0,0,0,0.06);
    ">

      <!-- Header -->
      <div style="
        padding:28px 30px;
        background:#111111;
        color:#ffffff;
      ">

        <div style="
          font-size:13px;
          font-weight:bold;
          letter-spacing:2px;
          color:#d4af37;
          margin-bottom:10px;
        ">
          ZENITHH SPORTS ARENA
        </div>

        <div style="
          font-size:26px;
          font-weight:700;
          line-height:1.3;
        ">
          New Registration Received
        </div>

        <div style="
          margin-top:8px;
          font-size:14px;
          color:#cfcfcf;
        ">
          A new registration has been submitted through
          zenithh.com.
        </div>

      </div>

      <!-- Status -->
      <div style="
        padding:18px 30px;
        background:#fafafa;
        border-bottom:1px solid #eeeeee;
      ">

        <span style="
          display:inline-block;
          padding:7px 12px;
          background:#f0f7ed;
          color:#3f6b32;
          border-radius:20px;
          font-size:12px;
          font-weight:700;
        ">
          NEW REGISTRATION
        </span>

        <span style="
          margin-left:10px;
          color:#777777;
          font-size:12px;
        ">
          ${escapeHtml(receivedAt)} IST
        </span>

      </div>

      <!-- Content -->
      <div style="padding:30px;">

        <div style="
          font-size:17px;
          font-weight:700;
          margin-bottom:16px;
          color:#111111;
        ">
          Registration Details
        </div>

        <table
          role="presentation"
          style="
            width:100%;
            border-collapse:collapse;
            border:1px solid #e8e8e8;
            border-radius:8px;
            overflow:hidden;
          "
        >

          ${row("Full Name", data.name)}
          ${row("Email Address", data.email)}
          ${row("Phone Number", data.phone)}
          ${row("Institution", data.institution)}
          ${row("Sport", data.sport)}
          ${row("Registration Type", data.enquiryType)}
          ${row("Preferred Timing", data.preferredTiming)}
          ${row("Attendance Type", data.attendanceType)}
          ${row(
            "Number of Attendees",
            data.numberOfAttendees
          )}
          ${row(
            "Friend Referral",
            data.friendReferral
          )}
          ${row(
            "Referral Mobile",
            data.referralMobile
          )}
          ${row(
            "Referral Email",
            data.referralEmail
          )}

        </table>

        <!-- Message -->
        <div style="
          margin-top:25px;
        ">

          <div style="
            font-size:17px;
            font-weight:700;
            margin-bottom:12px;
            color:#111111;
          ">
            Message
          </div>

          <div style="
            padding:18px;
            background:#f8f8f8;
            border-left:4px solid #d4af37;
            border-radius:6px;
            color:#333333;
            font-size:14px;
            line-height:1.7;
            white-space:pre-wrap;
          ">
            ${escapeHtml(data.message)}
          </div>

        </div>

        <!-- Reply button -->
        <div style="
          margin-top:28px;
          text-align:center;
        ">

          <a
            href="mailto:${encodeURIComponent(data.email)}"
            style="
              display:inline-block;
              padding:13px 24px;
              background:#111111;
              color:#ffffff;
              text-decoration:none;
              border-radius:7px;
              font-size:14px;
              font-weight:700;
            "
          >
            Reply to ${escapeHtml(data.name)}
          </a>

        </div>

      </div>

      <!-- Footer -->
      <div style="
        padding:20px 30px;
        background:#111111;
        text-align:center;
      ">

        <div style="
          color:#ffffff;
          font-size:13px;
          font-weight:700;
        ">
          Zenithh Sports Arena
        </div>

        <div style="
          margin-top:6px;
          color:#999999;
          font-size:11px;
          line-height:1.6;
        ">
          This notification was generated automatically
          from the registration form on zenithh.com.
        </div>

      </div>

    </div>

  </div>

</body>
</html>
`;

  const text = `
ZENITHH SPORTS ARENA
NEW REGISTRATION RECEIVED

Received: ${receivedAt} IST

REGISTRATION DETAILS

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Institution: ${data.institution || ""}
Sport: ${data.sport}
Registration Type: ${data.enquiryType}
Preferred Timing: ${data.preferredTiming || ""}
Attendance Type: ${data.attendanceType || ""}
Number of Attendees: ${data.numberOfAttendees || ""}
Friend Referral: ${data.friendReferral || ""}
Referral Mobile: ${data.referralMobile || ""}
Referral Email: ${data.referralEmail || ""}

MESSAGE

${data.message}

Reply to: ${data.email}

Zenithh Sports Arena
This notification was generated automatically from the registration form on zenithh.com.
`;

  await transporter.sendMail({
    from: `Zenithh Sports Arena <${smtpUser}>`,
    to: mailTo,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}

