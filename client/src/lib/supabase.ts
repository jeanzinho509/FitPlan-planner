import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "http://localhost:3000";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "test-key-local-dev";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase credentials not found. Using placeholder values.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);