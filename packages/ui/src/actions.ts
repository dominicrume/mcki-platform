"use server";

import { submitData } from "./supabase";

/**
 * Handles lead capture securely on the server.
 * 1. Submits to Supabase database.
 * 2. Pushes the contact to Brevo (Sendinblue) mailing list.
 */
export async function captureLead(formId: string, email: string) {
  // 1. Submit to Supabase
  await submitData("leads", { form_id: formId, email });

  // 2. Submit to Brevo (if API key is present)
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    console.log(`[Brevo Fallback] Would have added ${email} to Brevo list.`);
    return { success: true };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": brevoApiKey
      },
      body: JSON.stringify({
        email,
        listIds: [2], // Adjust list ID as needed for MCKI
        updateEnabled: true,
        attributes: {
          SOURCE: formId
        }
      })
    });

    if (!res.ok) {
      console.error("[Brevo Error] Failed to sync contact", await res.text());
    }
  } catch (error) {
    console.error("[Brevo Error]", error);
  }

  // 3. Trigger Onboarding Email Pipeline
  try {
    const emailService = await import("./email");
    await emailService.sendWelcomeEmail({ name: "Future Agent", email });
  } catch (err) {
    console.error("[Email Pipeline Error] Failed to send welcome email:", err);
  }

  return { success: true };
}
