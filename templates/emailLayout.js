const PROFILE = {
  name: "Aman Dixit",
  title: "Full-Stack MERN Developer",
  email: "dixitaman.nov.wwe@gmail.com",
  linkedin: "https://www.linkedin.com/in/aman-dixit-1a999117a/",
  github: "https://github.com/Aman0111",
  resume: "https://drive.google.com/file/d/1J7ONEkAnz4KgWist5mAUIrxnb7TC8uKK/view?usp=sharing"
};

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Wraps body content in a table-based shell that renders consistently
// across Gmail, Outlook, Apple Mail, and mobile clients.
function emailShell({ preheader, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(PROFILE.name)}</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f8; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <tr>
            <td style="background:linear-gradient(100deg,#3B82F6,#8B5CF6 60%,#22D3EE); padding:34px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block; width:9px; height:9px; border-radius:50%; background:#ffffff; margin-right:9px; vertical-align:middle;"></span>
                    <span style="color:#ffffff; font-size:15px; font-weight:700; letter-spacing:0.02em; vertical-align:middle; font-family:ui-monospace,'SF Mono',Consolas,monospace;">${escapeHtml(PROFILE.name)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 36px 32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 36px; background-color:#f8fafc; border-top:1px solid #eef1f6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px; color:#94a3b8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
                    ${escapeHtml(PROFILE.name)} · ${escapeHtml(PROFILE.title)} · Bengaluru, India
                  </td>
                  <td align="right">
                    <a href="${PROFILE.linkedin}" style="color:#64748b; font-size:12px; text-decoration:none; margin-left:12px;">LinkedIn</a>
                    <a href="${PROFILE.github}" style="color:#64748b; font-size:12px; text-decoration:none; margin-left:12px;">GitHub</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(label, href, color = "#3B82F6") {
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block; background-color:${color}; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600; padding:13px 24px; border-radius:9px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">${escapeHtml(label)}</a>`;
}

module.exports = { PROFILE, escapeHtml, emailShell, button };
