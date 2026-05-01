/**
 * Email Service - Send emails to beneficiaries
 * Uses EmailJS (FREE - 200 emails/month)
 * NO BACKEND NEEDED!
 */

// EmailJS Configuration (FREE service)
const EMAILJS_SERVICE_ID = 'service_alwaysthere' // You'll get this from emailjs.com
const EMAILJS_TEMPLATE_ID = 'template_beneficiary' // You'll create this template
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // You'll get this from emailjs.com

/**
 * Initialize EmailJS
 */
function initEmailJS() {
  if (typeof window !== 'undefined' && !(window as any).emailjs) {
    // Load EmailJS SDK
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
    script.async = true
    script.onload = () => {
      (window as any).emailjs.init(EMAILJS_PUBLIC_KEY)
    }
    document.head.appendChild(script)
  }
}

/**
 * Send email to beneficiary with asset access details
 */
export async function sendBeneficiaryEmail(
  beneficiaryEmail: string,
  beneficiaryName: string,
  ownerName: string,
  ipfsCID: string,
  encryptedShare: string
): Promise<boolean> {
  try {
    initEmailJS()
    
    // Wait for EmailJS to load
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!(window as any).emailjs) {
      console.error('EmailJS not loaded')
      return false
    }
    
    const templateParams = {
      to_name: beneficiaryName,
      to_email: beneficiaryEmail,
      from_name: ownerName,
      ipfs_cid: ipfsCID,
      ipfs_url: `https://ipfs.io/ipfs/${ipfsCID}`,
      encrypted_share: encryptedShare,
      access_instructions: `
        1. Visit: https://ipfs.io/ipfs/${ipfsCID}
        2. Download the encrypted file
        3. Use your encrypted share to decrypt: ${encryptedShare.substring(0, 20)}...
        4. Contact other beneficiaries to combine shares
      `,
      message: `Dear ${beneficiaryName},\n\nYou have been designated as a beneficiary in ${ownerName}'s Digital Will.\n\nYour encrypted assets are now accessible on IPFS.\n\nIPFS CID: ${ipfsCID}\nDirect Link: https://ipfs.io/ipfs/${ipfsCID}\n\nYour Encrypted Share: ${encryptedShare}\n\nPlease store this information securely.\n\nBest regards,\nAlwaysThere`
    }
    
    const response = await (window as any).emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )
    
    console.log('Email sent successfully:', response)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Send notification email to beneficiary
 */
export async function sendNotificationEmail(
  beneficiaryEmail: string,
  beneficiaryName: string,
  subject: string,
  message: string
): Promise<boolean> {
  try {
    initEmailJS()
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!(window as any).emailjs) {
      console.error('EmailJS not loaded')
      return false
    }
    
    const templateParams = {
      to_name: beneficiaryName,
      to_email: beneficiaryEmail,
      subject: subject,
      message: message
    }
    
    const response = await (window as any).emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_notification',
      templateParams
    )
    
    console.log('Notification sent successfully:', response)
    return true
  } catch (error) {
    console.error('Failed to send notification:', error)
    return false
  }
}

/**
 * Send will triggered notification to all beneficiaries
 */
export async function notifyBeneficiaries(
  beneficiaries: Array<{ email: string; name: string }>,
  ownerName: string,
  ipfsCID: string
): Promise<{ success: number; failed: number }> {
  let success = 0
  let failed = 0
  
  for (const beneficiary of beneficiaries) {
    const sent = await sendNotificationEmail(
      beneficiary.email,
      beneficiary.name,
      'Digital Will Activated - Action Required',
      `Dear ${beneficiary.name},\n\nThe Digital Will of ${ownerName} has been activated.\n\nYour assets are now accessible on IPFS:\n${ipfsCID}\n\nPlease log in to the AlwaysThere to access your inheritance.\n\nBest regards,\nAlwaysThere`
    )
    
    if (sent) {
      success++
    } else {
      failed++
    }
    
    // Rate limiting - wait 1 second between emails
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return { success, failed }
}

/**
 * Test email configuration
 */
export async function testEmailService(testEmail: string): Promise<boolean> {
  try {
    return await sendNotificationEmail(
      testEmail,
      'Test User',
      'AlwaysThere - Email Test',
      'This is a test email from AlwaysThere. If you received this, email service is working correctly!'
    )
  } catch (error) {
    console.error('Email test failed:', error)
    return false
  }
}

/**
 * Store email log in localStorage
 */
export function logEmail(
  to: string,
  subject: string,
  status: 'sent' | 'failed'
) {
  const logs = JSON.parse(localStorage.getItem('email_logs') || '[]')
  logs.push({
    to,
    subject,
    status,
    timestamp: Date.now()
  })
  localStorage.setItem('email_logs', JSON.stringify(logs))
}

/**
 * Get email logs
 */
export function getEmailLogs(): any[] {
  return JSON.parse(localStorage.getItem('email_logs') || '[]')
}
