const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

async function main() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Always There Vault" <${user}>`;

  console.log('Testing SMTP with settings:');
  console.log('Host:', host);
  console.log('Port:', port);
  console.log('User:', user);
  console.log('Pass:', pass ? '******' : 'undefined');
  console.log('From:', from);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });

  try {
    console.log('Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified successfully!');

    console.log('Sending test email to nothingsubodh@gmail.com...');
    const info = await transporter.sendMail({
      from,
      to: 'nothingsubodh@gmail.com',
      subject: 'Test Email from SMTP Diagnostic Tool',
      text: 'If you are reading this, SMTP configuration is 100% correct.',
      html: '<b>If you are reading this, SMTP configuration is 100% correct.</b>'
    });
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ SMTP test failed:', error);
  }
}

main();
