const express = require("express");
const { sendContactEmails } = require("../utils/mailer");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small in-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Good enough to deter casual spam without adding a database.
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

router.post("/contact", async (req, res) => {
  try {
    const ip = req.ip || req.connection?.remoteAddress || "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many messages sent recently. Please try again later." });
    }

    const { name, email, message } = req.body || {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }
    if (name.trim().length > 100) {
      return res.status(400).json({ error: "Name is too long." });
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (message.trim().length > 5000) {
      return res.status(400).json({ error: "Message is too long (5000 character max)." });
    }

    await sendContactEmails({ name: name.trim(), email: email.trim(), message: message.trim() });

    return res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("Contact form error:", err.message);
    return res.status(500).json({
      error: "Couldn't send your message right now. Please try again later or email directly."
    });
  }
});

module.exports = router;
