const { escapeHtml, emailShell, button, PROFILE } = require("./emailLayout");

function autoReplyTemplate({ name, message }) {
  const firstName = name.trim().split(" ")[0];

  const bodyHtml = `
    <p style="margin:0 0 6px; font-size:13px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#22D3EE; font-family:ui-monospace,'SF Mono',Consolas,monospace;">
      Message Received
    </p>
    <h1 style="margin:0 0 18px; font-size:22px; line-height:1.3; color:#0f172a;">
      Thanks for reaching out, ${escapeHtml(firstName)}! 🙌
    </h1>

    <p style="margin:0 0 16px; font-size:15px; line-height:1.7; color:#334155;">
      This confirms I've received your message through my portfolio. I read every message
      personally and will get back to you within <strong>1–2 business days</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #8B5CF6; background-color:#f8fafc; border-radius:0 10px 10px 0; margin:20px 0 28px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 6px; font-size:11.5px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.05em;">Your message</p>
          <p style="margin:0; font-size:14.5px; line-height:1.6; color:#1e293b; white-space:pre-wrap;">${escapeHtml(message)}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 22px; font-size:15px; line-height:1.7; color:#334155;">
      In the meantime, feel free to take a look at my work or connect with me directly:
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
      <tr>
        <td style="padding-right:10px; padding-bottom:10px;">${button("View Resume", PROFILE.resume, "#3B82F6")}</td>
        <td style="padding-right:10px; padding-bottom:10px;">${button("GitHub", PROFILE.github, "#0f172a")}</td>
        <td style="padding-bottom:10px;">${button("LinkedIn", PROFILE.linkedin, "#8B5CF6")}</td>
      </tr>
    </table>

    <p style="margin:0 0 4px; font-size:15px; color:#0f172a; font-weight:700;">${escapeHtml(PROFILE.name)}</p>
    <p style="margin:0 0 24px; font-size:13.5px; color:#64748b;">${escapeHtml(PROFILE.title)} · Bengaluru, India</p>

    <p style="margin:0; font-size:12px; color:#94a3b8; line-height:1.6;">
      This is an automated confirmation — replies to this email will reach me directly at
      ${escapeHtml(PROFILE.email)}.
    </p>
  `;

  return emailShell({
    preheader: `Thanks for reaching out — I've received your message and will reply within 1-2 business days.`,
    bodyHtml
  });
}

module.exports = autoReplyTemplate;
