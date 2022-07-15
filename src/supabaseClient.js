import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqslsmjlommovcuyboqt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxc2xzbWpsb21tb3ZjdXlib3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI5NDQzMjEsImV4cCI6MTk2ODUyMDMyMX0.ja-vdKJ5Dkc3h39YhcXeoj5VHZw75VIJeYm7UGJzBgg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
