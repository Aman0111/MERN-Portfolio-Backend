const nodemailer = require("nodemailer");
const ownerNotificationTemplate = require("../templates/ownerNotification");
const autoReplyTemplate = require("../templates/autoReply");

let transporter = null;

// Created lazily so the server can boot even before SMTP env vars are set;
// the error only surfaces when someone actually submits the contact form.
function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured yet. Add SMTP_USER and SMTP_PASS to server/.env (see .env.example)."
    );
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : true,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  return transporter;
}

async function sendContactEmails({ name, email, message }) {
  const t = getTransporter();
  const fromName = process.env.FROM_NAME || "Portfolio Contact Form";
  const fromAddress = process.env.SMTP_USER;
  const ownerEmail = process.env.OWNER_EMAIL || fromAddress;

  // 1) Notify the site owner
  await t.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: ownerEmail,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    html: ownerNotificationTemplate({ name, email, message })
  });

  // 2) Auto-reply to the visitor
  await t.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to: email,
    subject: `Thanks for reaching out, ${name.split(" ")[0]}!`,
    html: autoReplyTemplate({ name, message })
  });
}

module.exports = { sendContactEmails };
