// ─────────────────────────────────────────────────────────────
//  AlwaysThere Vault — Shared Email Template System
//  Enterprise-grade, inbox-safe HTML email builder
// ─────────────────────────────────────────────────────────────

const LOGO_SVG = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="36" rx="8" fill="#0ea5e9"/>
  <path d="M18 6L7 13.5V22.5L18 30L29 22.5V13.5L18 6Z" stroke="white" stroke-width="2" fill="none"/>
  <path d="M18 6V30M7 13.5L29 22.5M29 13.5L7 22.5" stroke="white" stroke-width="1.2" opacity="0.5"/>
  <circle cx="18" cy="18" r="3.5" fill="white"/>
</svg>`;

/** Wraps any email body in the AlwaysThere brand shell */
export function buildEmailShell(opts: {
  accentColor: string;
  accentGlow: string;
  icon: string;
  headline: string;
  subline: string;
  body: string;
  footerNote?: string;
  logoUrl?: string;
}): string {
  const { accentColor, accentGlow, icon, headline, subline, body, footerNote, logoUrl } = opts;
  const finalLogoUrl = logoUrl || 'https://raw.githubusercontent.com/subodh-001/decentralized-digital-will-protocol/main/frontend/web/public/logo-simple.png';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${headline}</title>
</head>
<body style="margin:0;padding:0;background:#060d1a;font-family:'Helvetica Neue',Arial,sans-serif;">
 
<!-- Email Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#060d1a;min-height:100vh;">
<tr><td align="center" style="padding:40px 16px;">
 
  <!-- Card -->
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#0d1b2e;border-radius:16px;border:1px solid rgba(255,255,255,0.08);box-shadow:0 32px 64px rgba(0,0,0,0.6),0 0 60px ${accentGlow};overflow:hidden;">
 
    <!-- Brand Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#0d1b2e 0%,#0a1628 100%);border-bottom:1px solid rgba(255,255,255,0.06);padding:24px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="44" valign="middle">
              <img src="${finalLogoUrl}" width="36" height="36" style="display:block;border-radius:8px;border:none;" alt="AlwaysThere Logo"/>
            </td>
            <td valign="middle" style="padding-left:12px;">
              <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;line-height:1;">AlwaysThere</div>
              <div style="font-size:11px;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;">Vault Protocol</div>
            </td>
            <td align="right" valign="middle">
              <span style="display:inline-block;background:${accentColor}18;border:1px solid ${accentColor}40;color:${accentColor};font-size:10px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;padding:4px 10px;border-radius:20px;">Secure Delivery</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Hero Banner -->
    <tr>
      <td style="background:linear-gradient(180deg,#0d1b2e 0%,#091221 100%);border-bottom:2px solid ${accentColor};padding:40px 32px 36px;text-align:center;">
        <div style="display:inline-block;width:72px;height:72px;background:${accentColor}15;border:2px solid ${accentColor}50;border-radius:50%;text-align:center;line-height:72px;font-size:34px;box-shadow:0 0 30px ${accentGlow};margin-bottom:20px;">${icon}</div>
        <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">${headline}</h1>
        <p style="margin:0;font-size:13px;color:${accentColor};font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">${subline}</p>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding:36px 32px;">
        ${body}
      </td>
    </tr>

    <!-- Divider -->
    <tr>
      <td style="padding:0 32px;"><hr style="border:0;border-top:1px solid rgba(255,255,255,0.06);"/></td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#060d1a;padding:24px 32px;border-top:1px solid rgba(255,255,255,0.04);">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-size:11px;color:#334155;line-height:1.7;">
                This is an automated message from <strong style="color:#475569;">AlwaysThere Vault</strong>.<br/>
                ${footerNote || 'End-to-End Encrypted · Decentralized Digital Will Protocol'}
              </p>
            </td>
            <td align="right" valign="top">
              <p style="margin:0;font-size:10px;color:#1e3a5f;text-transform:uppercase;letter-spacing:1px;">© 2026 AlwaysThere</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
  <!-- End Card -->

</td></tr>
</table>
</body>
</html>`;
}

/** Reusable stat row inside a dark info box */
export function statRow(label: string, value: string, valueColor = '#e2e8f0', last = false): string {
  return `<tr>
    <td style="padding:10px 0;color:#64748b;font-size:13px;${last ? '' : 'border-bottom:1px solid rgba(255,255,255,0.04);'}">${label}</td>
    <td style="padding:10px 0;font-size:13px;color:${valueColor};font-weight:600;text-align:right;${last ? '' : 'border-bottom:1px solid rgba(255,255,255,0.04);'}">${value}</td>
  </tr>`;
}

/** Info box wrapper */
export function infoBox(content: string): string {
  return `<div style="background:#060d1a;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px 24px;margin:24px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">${content}</table>
  </div>`;
}

/** Alert strip */
export function alertStrip(color: string, text: string): string {
  return `<div style="background:${color}08;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:14px 18px;margin:20px 0;">
    <p style="margin:0;font-size:13.5px;color:#cbd5e1;line-height:1.6;">${text}</p>
  </div>`;
}

/** CTA Button */
export function ctaButton(url: string, label: string, color: string): string {
  return `<div style="text-align:center;margin:32px 0 8px;">
    <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,${color},${color}cc);color:#ffffff;padding:15px 40px;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;letter-spacing:0.5px;box-shadow:0 8px 24px rgba(0,0,0,0.4),0 0 20px ${color}40;">
      ${label}
    </a>
  </div>`;
}
