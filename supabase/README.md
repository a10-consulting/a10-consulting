# A10 Consulting — Supabase Integration

This directory contains the database schema and setup instructions for connecting A10 Consulting to [Supabase](https://supabase.com) as a hosted PostgreSQL backend.

The app works entirely with **localStorage by default**. Supabase is an optional upgrade that adds multi-device sync, shared access, and persistent cloud storage.

---

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**, choose an organisation and a region close to your users.
3. Set a strong database password and save it somewhere safe.
4. Wait for the project to finish provisioning (~1 minute).

---

## 2. Run the schema

1. In your Supabase project, open **Database → SQL Editor**.
2. Click **New query**.
3. Open `/supabase/schema.sql` from this repository, copy the full contents, and paste them into the editor.
4. Click **Run** (or press Ctrl+Enter / Cmd+Enter).
5. Confirm that the output shows no errors. All tables, indexes, RLS policies, and triggers will be created.

---

## 3. Configure the app

1. In your Supabase project, go to **Settings → API**.
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon / public key** (a long JWT string under "Project API keys")
3. Open `/app/js/supabase-config.js` in this repository.
4. Paste the values into the `SUPABASE_CONFIG` object:

```js
const SUPABASE_CONFIG = {
  url: 'https://xxxx.supabase.co',
  anonKey: 'eyJhbGciOi...',
};
```

5. Save the file. The app will now use Supabase instead of localStorage.

> **Important:** The `anonKey` is safe to expose in front-end code — it is a public key. Row Level Security (see below) prevents unauthorised access to your data.

---

## 4. Set up authentication

The schema requires users to be authenticated before they can read or write any data.

### Enable Email auth

1. Go to **Authentication → Providers** in your Supabase dashboard.
2. Ensure **Email** is enabled (it is on by default).

### Create the first user

Option A — Dashboard:
1. Go to **Authentication → Users**.
2. Click **Invite user** and enter your email address.
3. Check your inbox and follow the confirmation link.

Option B — Browser console (once the app is open):
```js
const { data, error } = await supabase.auth.signUp({
  email: 'you@example.com',
  password: 'your-password',
});
```

The schema includes a trigger (`on_auth_user_created`) that automatically creates a matching row in `public.users` when a new auth user signs up.

---

## 5. Security — Row Level Security (RLS)

Every table in the schema has **Row Level Security enabled**. The policies applied are:

| Policy type | Rule |
|-------------|------|
| SELECT | Any authenticated user can read all rows |
| INSERT / UPDATE / DELETE | Any authenticated user can write all rows |

This is appropriate for a **single-tenant** app where all logged-in users are trusted colleagues within the same organisation.

If you need to restrict access further (e.g. each user only sees their own projects), update the RLS policies in `schema.sql` — for example:

```sql
-- Replace the broad write policy with a per-user check:
CREATE POLICY "Projects: owner write" ON public.projects
  FOR ALL TO authenticated
  USING (auth.uid()::text = ANY(SELECT jsonb_array_elements_text(member_ids)));
```

The `anon` role (unauthenticated) has **no access** to any table. Visiting the app without signing in will return empty data, not errors, because the Supabase JS client handles this gracefully.

---

## 6. Migrating from localStorage

Once Supabase is configured and you are signed in, run the following in your browser's developer console to migrate all existing data:

```js
await migrateToSupabase()
```

The migration function will:

1. Read every data collection from localStorage (`projects`, `tasks`, `actionItems`, `budgetItems`, `purchaseOrders`, `invoices`, `risks`, `documents`, `clients`, `suppliers`, `a10Invoices`, `a10Settings`, `currencySettings`).
2. Transform field names from camelCase to snake_case to match the database schema.
3. Insert all records into Supabase using `upsert` (safe to run multiple times).
4. Log a summary to the console showing how many records were migrated per table.

After migration, localStorage continues to function as a local cache. The app writes to both stores so the UI stays fast while data is persisted remotely.

---

## 7. Schema overview

| Table | Description |
|-------|-------------|
| `users` | App profiles linked to Supabase auth users |
| `clients` | Client organisations (billing details, VAT, payment terms) |
| `suppliers` | External suppliers engaged on projects |
| `projects` | Core project records with budget and currency settings |
| `tasks` | Work items with phase, assignee, and completion status |
| `action_items` | Issue/decision tracker with priority, owner, and due dates |
| `budget_items` | Budget lines with planned vs actual spend and WBS codes |
| `purchase_orders` | POs linked to projects and budget items |
| `invoices` | Supplier invoices linked to POs |
| `risks` | Risk register with probability, impact, and mitigation |
| `documents` | Project documents stored as text/Markdown |
| `a10_invoices` | Outgoing invoices from A10 Consulting to clients |
| `a10_settings` | Singleton row with firm details (NIF, IBAN, etc.) |
| `currency_settings` | Singleton row caching exchange rates |

All tables use:
- `UUID` primary keys generated by `uuid_generate_v4()`
- `TIMESTAMPTZ` for all date-time fields
- `updated_at` automatically maintained by a trigger
- Row Level Security enabled

---

## 8. Files in this directory

```
supabase/
  schema.sql   — Full PostgreSQL schema (run this in Supabase SQL Editor)
  README.md    — This file
```

Related file outside this directory:

```
app/js/supabase-config.js  — Paste your Project URL and anon key here
```
