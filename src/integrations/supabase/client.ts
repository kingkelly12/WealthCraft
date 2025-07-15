import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lllydwymcuulrsqxumvl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsbHlkd3ltY3V1bHJzcXh1bXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NTM0MjYsImV4cCI6MjA2ODEyOTQyNn0.O0uPQsBiFFTiAib-12YcFFMS7xzAEAS5vKmnoXVpE3I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});