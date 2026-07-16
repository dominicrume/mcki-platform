import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured = !!(supabaseUrl && supabaseKey);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Submits data to Supabase gracefully. If Supabase is not configured,
 * it logs the data locally and resolves successfully.
 */
export async function submitData(table: string, payload: Record<string, any>) {
  if (!isConfigured) {
    console.log(`[Supabase Fallback] Would have inserted into '${table}':`, payload);
    return { data: [payload], error: null };
  }
  
  return await supabase!.from(table).insert(payload);
}
