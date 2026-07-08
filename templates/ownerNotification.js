const { escapeHtml, emailShell, button } = require("./emailLayout");

function ownerNotificationTemplate({ name, email, message }) {
  const receivedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  });

  const bodyHtml = `
    <p style="margin:0 0 6px; font-size:13px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:#8B5CF6; font-family:ui-monospace,'SF Mono',Consolas,monospace;">
      New Portfolio Inquiry
    </p>
    <h1 style="margin:0 0 20px; font-size:22px; line-height:1.3; color:#0f172a;">
      You've got a new message from your portfolio 👋
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border:1px solid #eef1f6; border-radius:12px; margin-bottom:24px;">
      <tr>
        <td style="padding:20px 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:14px; font-size:13px; color:#94a3b8; width:90px; vertical-align:top;">Name</td>
              <td style="padding-bottom:14px; font-size:14.5px; color:#0f172a; font-weight:600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding-bottom:14px; font-size:13px; color:#94a3b8; vertical-align:top;">Email</td>
              <td style="padding-bottom:14px; font-size:14.5px;">
                <a href="mailto:${escapeHtml(email)}" style="color:#3B82F6; text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#94a3b8; vertical-align:top;">Received</td>
              <td style="font-size:14.5px; color:#0f172a;">${escapeHtml(receivedAt)} IST</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px; font-size:13px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Message</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #22D3EE; background-color:#f8fafc; border-radius:0 10px 10px 0; margin-bottom:28px;">
      <tr>
        <td style="padding:16px 20px; font-size:15px; line-height:1.6; color:#1e293b; white-space:pre-wrap;">${escapeHtml(message)}</td>
      </tr>
    </table>

    ${button(`Reply to ${name.split(" ")[0]}`, `mailto:${email}`)}
  `;

  return emailShell({
    preheader: `New portfolio inquiry from ${name} — ${message.slice(0, 80)}`,
    bodyHtml
  });
}

module.exports = ownerNotificationTemplate;
