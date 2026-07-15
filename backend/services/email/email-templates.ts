// ─────────────────────────────────────────────────────────────
//  AlwaysThere Vault — Professional Email Template System v3.0
//  Minimal dark design. Enterprise-grade. Inbox-safe HTML.
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

const LOGO_URL = 'https://raw.githubusercontent.com/subodh-001/decentralized-digital-will-protocol/main/frontend/web/public/logo-simple.png';
const LOGO_FALLBACK = 'https://raw.githubusercontent.com/subodh-nmims-workshop/always-there-vault/main/frontend/web/public/logo-simple.png';

/** Core email shell — minimal, professional dark layout */
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
  const { accentColor, icon, headline, subline, body, footerNote, logoUrl } = opts;
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
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Preheader -->
<div style="display:none;font-size:1px;color:#0a0a0a;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  ${headline} — AlwaysThere Vault &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
</div>

<!-- Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;min-height:100vh;">
  <tr>
    <td align="center" style="padding:40px 16px 56px;">

      <!-- MAIN CARD -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
        style="max-width:600px;width:100%;background-color:#111111;border-radius:16px;
               border:1px solid #222222;overflow:hidden;">

        <!-- TOP ACCENT LINE — thin, single color, no gradient -->
        <tr>
          <td style="background-color:${accentColor};height:3px;font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- HEADER / BRAND -->
        <tr>
          <td style="padding:24px 32px;border-bottom:1px solid #1a1a1a;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="44" valign="middle">
                  <!--[if !mso]><!-->
                  <img src="${finalLogoUrl}"
                    width="38" height="38"
                    alt="AlwaysThere"
                    style="display:block;border-radius:8px;border:0;outline:none;text-decoration:none;"
                    onerror="this.onerror=null;this.src='${LOGO_FALLBACK}';this.onerror=function(){this.style.display='none';};"
                  />
                  <!--<![endif]-->
                </td>
                <td valign="middle" style="padding-left:12px;">
                  <div style="font-size:16px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;line-height:1.2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">AlwaysThere</div>
                  <div style="font-size:10px;color:#444444;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Vault Protocol</div>
                </td>
                <td align="right" valign="middle">
                  <span style="display:inline-block;border:1px solid #2a2a2a;color:#555555;font-size:9px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;padding:4px 10px;border-radius:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    Secure Mail
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- HERO SECTION -->
        <tr>
          <td style="padding:44px 36px 36px;text-align:center;border-bottom:1px solid #1a1a1a;">
            <!-- Icon -->
            <div style="display:inline-block;width:64px;height:64px;background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;text-align:center;line-height:64px;font-size:28px;margin-bottom:24px;">
              ${icon}
            </div>
            <!-- Headline -->
            <h1 style="margin:0 0 12px;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              ${headline}
            </h1>
            <!-- Subline -->
            <p style="margin:0;font-size:12px;color:#555555;font-weight:500;letter-spacing:1px;text-transform:uppercase;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              ${subline}
            </p>
          </td>
        </tr>

        <!-- BODY CONTENT -->
        <tr>
          <td style="padding:36px 36px 28px;">
            ${body}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background-color:#0d0d0d;border-top:1px solid #1a1a1a;padding:20px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="top">
                  <p style="margin:0 0 3px;font-size:11px;color:#333333;line-height:1.6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    Automated notification from <strong style="color:#3a3a3a;">AlwaysThere Vault</strong>.
                  </p>
                  <p style="margin:0;font-size:11px;color:#2e2e2e;line-height:1.6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    ${footerNote || 'End-to-End Encrypted &nbsp;·&nbsp; Decentralized Digital Will Protocol'}
                  </p>
                </td>
                <td align="right" valign="top" style="padding-left:24px;white-space:nowrap;">
                  <p style="margin:0;font-size:10px;color:#2a2a2a;text-transform:uppercase;letter-spacing:1px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                    © 2026 AlwaysThere
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- END MAIN CARD -->

      <!-- Sub-footer -->
      <p style="margin:20px 0 0;font-size:11px;color:#2a2a2a;text-align:center;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
        <a href="https://alwaystherevault.com" style="color:#333333;text-decoration:none;">alwaystherevault.com</a>
        &nbsp;·&nbsp;
        <a href="https://alwaystherevault.com/privacy" style="color:#333333;text-decoration:none;">Privacy</a>
        &nbsp;·&nbsp;
        <a href="https://alwaystherevault.com/terms" style="color:#333333;text-decoration:none;">Terms</a>
      </p>

    </td>
  </tr>
</table>

</body>
</html>`;
}

/** Clean stat row inside info box */
export function statRow(label: string, value: string, valueColor = '#cccccc', last = false): string {
  return `<tr>
    <td style="padding:12px 0;color:#555555;font-size:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;${last ? '' : 'border-bottom:1px solid #1e1e1e;'}">
      ${label}
    </td>
    <td style="padding:12px 0;font-size:12px;color:${valueColor};font-weight:600;text-align:right;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;${last ? '' : 'border-bottom:1px solid #1e1e1e;'}">
      ${value}
    </td>
  </tr>`;
}

/** Dark info box with subtle border */
export function infoBox(content: string): string {
  return `<div style="background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:4px 20px 2px;margin:24px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${content}
    </table>
  </div>`;
}

/** Left-border alert strip — minimal */
export function alertStrip(color: string, text: string): string {
  return `<div style="border-left:3px solid ${color};padding:14px 16px;margin:24px 0;background:#111111;border-radius:0 8px 8px 0;">
    <p style="margin:0;font-size:13px;color:#888888;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">${text}</p>
  </div>`;
}

/** Clean CTA button — solid, no glow */
export function ctaButton(url: string, label: string, color: string): string {
  return `<div style="text-align:center;margin:32px 0 8px;">
    <a href="${url}"
      style="display:inline-block;
             background-color:${color};
             color:#ffffff;
             padding:14px 40px;
             text-decoration:none;
             border-radius:8px;
             font-size:14px;
             font-weight:600;
             letter-spacing:0.3px;
             font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;
             mso-padding-alt:14px 40px;">
      ${label}
    </a>
  </div>`;
}
