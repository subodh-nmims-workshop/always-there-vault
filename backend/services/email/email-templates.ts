// ─────────────────────────────────────────────────────────────
//  AlwaysThere Vault — Premium Email Template System v2.0
//  Inbox-safe, enterprise-grade HTML email builder
// ─────────────────────────────────────────────────────────────

export function escapeHtml(str: any): string {
  if (str === null || str === undefined) return '';
  const stringified = typeof str === 'string' ? str : String(str);
  return stringified
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// Hosted logo — served from public GitHub repositories for robust, inbox-safe loading
const LOGO_URL = 'https://raw.githubusercontent.com/subodh-001/decentralized-digital-will-protocol/main/frontend/web/public/logo-simple.png';

// Backup CDN
const LOGO_FALLBACK = 'https://raw.githubusercontent.com/subodh-nmims-workshop/always-there-vault/main/frontend/web/public/logo-simple.png';

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
  const finalLogoUrl = logoUrl || LOGO_URL;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>${headline} — AlwaysThere Vault</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#04080f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Preheader (hidden preview text) -->
<div style="display:none;font-size:1px;color:#04080f;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  ${headline} — AlwaysThere Vault Notification ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ 
</div>

<!-- Outer Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#04080f;min-height:100vh;">
  <tr>
    <td align="center" style="padding:32px 16px 48px;">

      <!-- ═══════════════════════════════════════ -->
      <!-- MAIN CARD                               -->
      <!-- ═══════════════════════════════════════ -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
        style="max-width:600px;width:100%;background-color:#0b1220;border-radius:20px;
               border:1px solid rgba(255,255,255,0.07);
               box-shadow:0 40px 80px rgba(0,0,0,0.7), 0 0 80px ${accentGlow};
               overflow:hidden;">

        <!-- ─── TOP ACCENT LINE ─── -->
        <tr>
          <td style="background:linear-gradient(90deg, transparent 0%, ${accentColor} 40%, ${accentColor} 60%, transparent 100%);height:2px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- ─── HEADER / BRAND ─── -->
        <tr>
          <td style="background:linear-gradient(135deg,#0d1527 0%,#0b1220 100%);padding:24px 32px 22px;border-bottom:1px solid rgba(255,255,255,0.05);">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Logo -->
                <td width="48" valign="middle">
                  <!--[if !mso]><!-->
                  <img src="${finalLogoUrl}"
                    width="42" height="42"
                    alt="AlwaysThere"
                    style="display:block;border-radius:10px;border:0;outline:none;text-decoration:none;"
                    onerror="this.onerror=null;this.src='${LOGO_FALLBACK}';this.onerror=function(){this.style.display='none';};"
                  />
                  <!--<![endif]-->
                </td>
                <!-- Brand Name -->
                <td valign="middle" style="padding-left:14px;">
                  <div style="font-size:19px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;line-height:1.1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">AlwaysThere</div>
                  <div style="font-size:10px;color:#4a6080;letter-spacing:2px;text-transform:uppercase;margin-top:3px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Vault Protocol</div>
                </td>
                <!-- Badge -->
                <td align="right" valign="middle">
                  <span style="display:inline-block;background:${accentColor}15;border:1px solid ${accentColor}35;color:${accentColor};font-size:9.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 12px;border-radius:100px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    Secure Delivery
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ─── HERO BANNER ─── -->
        <tr>
          <td style="background:linear-gradient(180deg,#0d1527 0%,#08101e 100%);padding:44px 32px 40px;text-align:center;border-bottom:2px solid ${accentColor};">
            <!-- Icon Circle -->
            <div style="display:inline-block;width:80px;height:80px;background:${accentColor}12;border:2px solid ${accentColor}45;border-radius:50%;text-align:center;line-height:78px;font-size:36px;margin-bottom:22px;box-shadow:0 0 40px ${accentGlow},0 0 80px ${accentGlow};">
              ${icon}
            </div>
            <!-- Headline -->
            <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.8px;line-height:1.15;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              ${headline}
            </h1>
            <!-- Subline -->
            <p style="margin:0;font-size:11.5px;color:${accentColor};font-weight:600;letter-spacing:2px;text-transform:uppercase;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              ${subline}
            </p>
          </td>
        </tr>

        <!-- ─── BODY CONTENT ─── -->
        <tr>
          <td style="padding:38px 36px 32px;">
            ${body}
          </td>
        </tr>

        <!-- ─── FOOTER ─── -->
        <tr>
          <td style="background:#060d1a;border-top:1px solid rgba(255,255,255,0.05);padding:22px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <!-- Footer Text -->
                <td valign="top">
                  <p style="margin:0 0 4px;font-size:11px;color:#2d4060;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    This is an automated message from <strong style="color:#3d5070;">AlwaysThere Vault</strong>.
                  </p>
                  <p style="margin:0;font-size:11px;color:#2d4060;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    ${footerNote || 'End-to-End Encrypted &nbsp;·&nbsp; Decentralized Digital Will Protocol'}
                  </p>
                </td>
                <!-- Copyright -->
                <td align="right" valign="top" style="padding-left:24px;white-space:nowrap;">
                  <p style="margin:0;font-size:10px;color:#1e3554;text-transform:uppercase;letter-spacing:1.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    © 2026 AlwaysThere
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ─── BOTTOM ACCENT LINE ─── -->
        <tr>
          <td style="background:linear-gradient(90deg, transparent 0%, ${accentColor}60 50%, transparent 100%);height:1px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

      </table>
      <!-- END MAIN CARD -->

      <!-- Sub-footer link -->
      <p style="margin:20px 0 0;font-size:11px;color:#1e3554;text-align:center;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <a href="https://alwaystherevault.com" style="color:#2a4a70;text-decoration:none;">alwaystherevault.com</a>
        &nbsp;·&nbsp;
        <a href="https://alwaystherevault.com/privacy" style="color:#2a4a70;text-decoration:none;">Privacy</a>
        &nbsp;·&nbsp;
        <a href="https://alwaystherevault.com/terms" style="color:#2a4a70;text-decoration:none;">Terms</a>
      </p>

    </td>
  </tr>
</table>

</body>
</html>`;
}

/** Reusable stat row inside a dark info box */
export function statRow(label: string, value: string, valueColor = '#e2e8f0', last = false): string {
  return `<tr>
    <td style="padding:11px 0;color:#4a6080;font-size:12.5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;${last ? '' : 'border-bottom:1px solid rgba(255,255,255,0.04);'}">
      ${label}
    </td>
    <td style="padding:11px 0;font-size:12.5px;color:${valueColor};font-weight:700;text-align:right;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;${last ? '' : 'border-bottom:1px solid rgba(255,255,255,0.04);'}">
      ${value}
    </td>
  </tr>`;
}

/** Info box wrapper — dark card with subtle border */
export function infoBox(content: string): string {
  return `<div style="background:#060d1a;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:6px 22px 4px;margin:24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${content}
    </table>
  </div>`;
}

/** Left-border alert strip */
export function alertStrip(color: string, text: string): string {
  return `<div style="background:${color}0d;border-left:3px solid ${color};border-radius:0 10px 10px 0;padding:14px 18px;margin:24px 0;">
    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">${text}</p>
  </div>`;
}

/** Premium CTA button */
export function ctaButton(url: string, label: string, color: string): string {
  return `<div style="text-align:center;margin:34px 0 10px;">
    <a href="${url}"
      style="display:inline-block;
             background:linear-gradient(135deg,${color} 0%,${color}bb 100%);
             color:#ffffff;
             padding:16px 44px;
             text-decoration:none;
             border-radius:12px;
             font-size:15px;
             font-weight:700;
             letter-spacing:0.4px;
             font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
             box-shadow:0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${color}50;
             mso-padding-alt:16px 44px;">
      ${label}
    </a>
  </div>`;
}
