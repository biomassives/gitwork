import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yftzjlzrotejpqqdovyb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdHpqbHpyb3RlanBxcWRvdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTUzMjY1NDksImV4cCI6MTk3MDkwMjU0OX0.edZGvym_mX4Kz5VGfg4f6UZhV6_MUseugokWE5UCbyQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
