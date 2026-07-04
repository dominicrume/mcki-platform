// @mcki/ui/src/email.ts

/**
 * Centralized Email Service using Brevo (Sendinblue)
 * Handles the 4 core communication pipelines for the MCKI ecosystem.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER = { name: "MCKI Solutions", email: "hello@mckisolutions.com" };

/**
 * Core function to send an email via Brevo REST API
 */
export async function sendEmail(to: { name: string; email: string }, subject: string, htmlContent: string) {
  if (!BREVO_API_KEY) {
    console.warn("⚠️ BREVO_API_KEY is not set. Email not sent:", subject, "to", to.email);
    return false;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [to],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo API Error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

// ---------------------------------------------------------
// PIPELINE A: ONBOARDING
// ---------------------------------------------------------
export async function sendWelcomeEmail(user: { name: string; email: string }) {
  const subject = "Welcome to the MCKI Ecosystem";
  const content = `
    <h1>Welcome, ${user.name}!</h1>
    <p>You have successfully joined the MCKI ecosystem. We are thrilled to have you onboard.</p>
    <h3>Immediate Next Steps:</h3>
    <ol>
      <li><strong>Join the Mastermind:</strong> <a href="${process.env.NEXT_PUBLIC_LIVE_URL || 'https://live.mckisolutions.com'}">Access the WhatsApp Community</a></li>
      <li><strong>Start Learning:</strong> <a href="https://voerm.co">Access your free AI foundation course</a></li>
    </ol>
    <p>Best regards,<br/>The MCKI Team</p>
  `;
  return sendEmail(user, subject, content);
}

// ---------------------------------------------------------
// PIPELINE B: TRANSACTIONAL
// ---------------------------------------------------------
export async function sendSubscriptionConfirmation(user: { name: string; email: string }, productName: string) {
  const subject = "Purchase Confirmed & Access Granted";
  const content = `
    <h1>Thank you for your purchase!</h1>
    <p>Your subscription to <strong>${productName}</strong> has been confirmed.</p>
    <p><a href="${process.env.NEXT_PUBLIC_EDUCATION_URL || 'https://education.mckisolutions.com'}">Click here to access your portal.</a></p>
  `;
  return sendEmail(user, subject, content);
}

export async function sendUpcomingChargeNotice(user: { name: string; email: string }, amount: string, date: string) {
  const subject = "Upcoming Charge Notice";
  const content = `
    <p>Hi ${user.name},</p>
    <p>This is a quick reminder that your subscription will renew on ${date} for ${amount}.</p>
    <p>If you need to make any changes, please manage your billing in the portal.</p>
  `;
  return sendEmail(user, subject, content);
}

// ---------------------------------------------------------
// PIPELINE C: GAMIFICATION & AFFILIATE
// ---------------------------------------------------------
export async function sendReferralMilestone(user: { name: string; email: string }, newTier: string, reward: string) {
  const subject = `🏆 You unlocked ${newTier} Tier!`;
  const content = `
    <h1>Congratulations ${user.name}!</h1>
    <p>You have just reached the <strong>${newTier}</strong> tier in the MCKI Ambassador Program.</p>
    <h3>Your Reward:</h3>
    <p><strong>${reward}</strong></p>
    <p><a href="${process.env.NEXT_PUBLIC_PARTNERS_URL || 'https://partners.mckisolutions.com'}">View your dashboard to claim your reward.</a></p>
  `;
  return sendEmail(user, subject, content);
}

// ---------------------------------------------------------
// PIPELINE D: RE-ENGAGEMENT
// ---------------------------------------------------------
export async function sendInactivityNudge(user: { name: string; email: string }) {
  const subject = "Don't lose your momentum 🚀";
  const content = `
    <p>Hi ${user.name},</p>
    <p>We noticed you haven't logged into the system for a few days. The AI landscape moves fast—jump back in and continue building your agents.</p>
    <p><a href="${process.env.NEXT_PUBLIC_WEB_URL || 'https://mckisolutions.com'}">Log In Here</a></p>
  `;
  return sendEmail(user, subject, content);
}
