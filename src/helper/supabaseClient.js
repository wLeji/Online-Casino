import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://befcvfuxqwfawbscxsxm.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZmN2ZnV4cXdmYXdic2N4c3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzM1MTksImV4cCI6MjA1MDAwOTUxOX0.diYPNNfdUtT9usi6as7TA06NQB8Q7DMowcziR90URs0";

const supabase = createClient(supabaseUrl, anonKey);
export default supabase;