"use server";

import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "";
let sql: postgres.Sql | null = null;
if (connectionString) {
  sql = postgres(connectionString, { max: 5 });
}

let isInitialized = false;
async function initializeDB() {
  if (!sql || isInitialized) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        source VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS event_data (
        id SERIAL PRIMARY KEY,
        action VARCHAR(100) NOT NULL,
        value TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    isInitialized = true;
  } catch (err) {
    console.error("Failed to initialize DB:", err);
  }
}

export async function captureEventData(action: string, value: string) {
  if (sql) {
    await initializeDB();
    try {
      await sql`INSERT INTO event_data (action, value) VALUES (${action}, ${value})`;
    } catch (err) {
      console.error("[DB Error] Failed to insert event data:", err);
    }
  } else {
    console.log(`[DB Fallback] Would have inserted event_data:`, { action, value });
  }
}

/**
 * Handles lead capture securely on the server.
 * 1. Submits to PostgreSQL database (Railway).
 * 2. Pushes the contact to Brevo (Sendinblue) mailing list.
 */
export async function captureLead(formId: string, email: string) {
  // 1. Submit to Postgres
  if (sql) {
    await initializeDB();
    try {
      await sql`INSERT INTO leads (email, source) VALUES (${email}, ${formId})`;
    } catch (err) {
      console.error("[DB Error] Failed to insert lead:", err);
    }
  } else {
    console.log(`[DB Fallback] Would have inserted lead:`, { email, source: formId });
  }

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
