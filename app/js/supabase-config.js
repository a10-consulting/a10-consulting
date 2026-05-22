/* ============================================================
   A10 Consulting — Supabase Configuration

   To enable Supabase:
   1. Create a project at https://supabase.com
   2. Go to Settings → API
   3. Copy your Project URL and anon/public key
   4. Paste them below
   5. Run the schema from /supabase/schema.sql in the SQL Editor
   ============================================================ */

const SUPABASE_CONFIG = {
  url: '',        // e.g. 'https://xxxx.supabase.co'
  anonKey: '',    // your anon/public key
};

/*
  Supabase is DISABLED when url/anonKey are empty.
  The app falls back to localStorage automatically.

  To test if Supabase is configured:
    if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) { ... }
*/

/*
  MIGRATION GUIDE — Moving from localStorage to Supabase:

  When you configure Supabase above, you can migrate existing localStorage
  data by running this in the browser console:

    await migrateToSupabase()

  This will:
  1. Read all data from localStorage
  2. Insert it into the Supabase database
  3. Keep localStorage as a cache (reads from Supabase, writes to both)

  Note: Authentication must be set up separately. See the migration
  guide in /supabase/schema.sql for the auth.users setup.
*/
