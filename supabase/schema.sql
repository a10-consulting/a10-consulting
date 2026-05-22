-- ============================================================
-- A10 Consulting — Supabase Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor (Database → SQL Editor → New query)
-- This schema mirrors all data structures previously stored in localStorage.
-- ============================================================

-- Enable UUID extension (already enabled on Supabase by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- USERS
-- Mirrors auth.users for app-level profile data.
-- Supabase manages authentication; this table holds display info.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.users IS 'App-level user profiles linked to Supabase auth.users.';

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users: authenticated read" ON public.users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users: own row write" ON public.users
  FOR ALL TO authenticated USING (auth.uid() = id);


-- ============================================================
-- CLIENTS
-- External client organisations that projects are billed to.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                TEXT NOT NULL,
  contact             TEXT,
  email               TEXT,
  phone               TEXT,
  country             TEXT,
  notes               TEXT,
  billing_name        TEXT,
  vat_number          TEXT,
  billing_address     TEXT,
  billing_city        TEXT,
  billing_postal_code TEXT,
  billing_country     TEXT,
  payment_terms       TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.clients IS 'Client organisations that projects are billed to.';

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients: authenticated read" ON public.clients
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Clients: authenticated write" ON public.clients
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- SUPPLIERS
-- External suppliers engaged on projects.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  category   TEXT,
  contact    TEXT,
  email      TEXT,
  phone      TEXT,
  country    TEXT,
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.suppliers IS 'External suppliers engaged on projects.';

ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Suppliers: authenticated read" ON public.suppliers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Suppliers: authenticated write" ON public.suppliers
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- PROJECTS
-- Core entity. All other records reference a project.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name               TEXT NOT NULL,
  client             TEXT,
  status             TEXT,
  lead               TEXT,
  budget             NUMERIC(18, 2),
  primary_currency   TEXT,
  secondary_currency TEXT,
  start_date         DATE,
  end_date           DATE,
  description        TEXT,
  member_ids         JSONB NOT NULL DEFAULT '[]',   -- array of user/member id strings
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.projects IS 'Core project records. member_ids is a JSON array of participant identifiers.';

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects: authenticated read" ON public.projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Projects: authenticated write" ON public.projects
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- TASKS
-- Individual work items belonging to a project.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id   UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  phase        TEXT,
  assignee     TEXT,
  start_date   DATE,
  due_date     DATE,
  status       TEXT,
  percent_done INTEGER CHECK (percent_done BETWEEN 0 AND 100),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.tasks IS 'Work items / tasks scoped to a project.';

CREATE INDEX IF NOT EXISTS tasks_project_id_idx ON public.tasks(project_id);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks: authenticated read" ON public.tasks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Tasks: authenticated write" ON public.tasks
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- ACTION ITEMS
-- Tracked action items (issues, decisions, risks-in-action) per project.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.action_items (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id          UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  scope               TEXT,
  owner               TEXT,
  description         TEXT NOT NULL,
  details             TEXT,
  priority            TEXT,
  status              TEXT,
  start_date          DATE,
  due_date            DATE,
  operational_impact  TEXT,
  comments            TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.action_items IS 'Action items (issues, decisions) tracked against a project.';

CREATE INDEX IF NOT EXISTS action_items_project_id_idx ON public.action_items(project_id);

ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ActionItems: authenticated read" ON public.action_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "ActionItems: authenticated write" ON public.action_items
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- BUDGET ITEMS
-- Budget line items (planned vs actual spend) per project.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.budget_items (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  category   TEXT,
  wbs        TEXT,   -- Work Breakdown Structure code
  planned    NUMERIC(18, 2),
  actual     NUMERIC(18, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.budget_items IS 'Budget line items with planned and actual spend per project.';

CREATE INDEX IF NOT EXISTS budget_items_project_id_idx ON public.budget_items(project_id);

ALTER TABLE public.budget_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "BudgetItems: authenticated read" ON public.budget_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "BudgetItems: authenticated write" ON public.budget_items
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- PURCHASE ORDERS
-- POs raised against a budget item and supplier.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.purchase_orders (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id     UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  budget_item_id UUID REFERENCES public.budget_items(id) ON DELETE SET NULL,
  po_number      TEXT,
  supplier       TEXT,
  description    TEXT,
  amount         NUMERIC(18, 2),
  status         TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.purchase_orders IS 'Purchase orders linked to a project and optionally a budget item.';

CREATE INDEX IF NOT EXISTS purchase_orders_project_id_idx ON public.purchase_orders(project_id);
CREATE INDEX IF NOT EXISTS purchase_orders_budget_item_id_idx ON public.purchase_orders(budget_item_id);

ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "PurchaseOrders: authenticated read" ON public.purchase_orders
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "PurchaseOrders: authenticated write" ON public.purchase_orders
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- INVOICES
-- Supplier invoices received against a purchase order.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id     UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  po_id          UUID REFERENCES public.purchase_orders(id) ON DELETE SET NULL,
  invoice_number TEXT,
  supplier       TEXT,
  description    TEXT,
  amount         NUMERIC(18, 2),
  status         TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.invoices IS 'Supplier invoices received, linked to a project and optionally a PO.';

CREATE INDEX IF NOT EXISTS invoices_project_id_idx ON public.invoices(project_id);
CREATE INDEX IF NOT EXISTS invoices_po_id_idx ON public.invoices(po_id);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Invoices: authenticated read" ON public.invoices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Invoices: authenticated write" ON public.invoices
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- RISKS
-- Risk register entries per project.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.risks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  category    TEXT,
  probability TEXT,
  impact      TEXT,
  owner       TEXT,
  status      TEXT,
  mitigation  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.risks IS 'Risk register — probability, impact, mitigation per project.';

CREATE INDEX IF NOT EXISTS risks_project_id_idx ON public.risks(project_id);

ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Risks: authenticated read" ON public.risks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Risks: authenticated write" ON public.risks
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- DOCUMENTS
-- Project documents (reports, memos, meeting notes, etc.).
-- Content is stored as text / Markdown.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type       TEXT,
  title      TEXT NOT NULL,
  content    TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.documents IS 'Project documents. Content stored as plain text or Markdown.';

CREATE INDEX IF NOT EXISTS documents_project_id_idx ON public.documents(project_id);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Documents: authenticated read" ON public.documents
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Documents: authenticated write" ON public.documents
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- A10 INVOICES
-- Outgoing invoices raised by A10 Consulting to clients.
-- items[] is stored as JSONB because each invoice has a variable
-- number of line items (description, quantity, unit price, VAT).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.a10_invoices (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type           TEXT,                -- e.g. 'invoice', 'credit_note', 'proforma'
  invoice_number TEXT,
  client_id      UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  project_id     UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  date           DATE,
  due_date       DATE,
  items          JSONB NOT NULL DEFAULT '[]',  -- array of line-item objects
  total          NUMERIC(18, 2),
  status         TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.a10_invoices IS 'Outgoing invoices issued by A10 Consulting. Line items stored as JSONB.';

CREATE INDEX IF NOT EXISTS a10_invoices_client_id_idx ON public.a10_invoices(client_id);
CREATE INDEX IF NOT EXISTS a10_invoices_project_id_idx ON public.a10_invoices(project_id);

ALTER TABLE public.a10_invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "A10Invoices: authenticated read" ON public.a10_invoices
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "A10Invoices: authenticated write" ON public.a10_invoices
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- A10 SETTINGS
-- Singleton table holding the consulting firm's own details.
-- Only one row should ever exist (enforced by the check constraint).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.a10_settings (
  id              INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),  -- singleton
  name            TEXT,
  nif             TEXT,   -- tax identification number
  email           TEXT,
  phone           TEXT,
  address         TEXT,
  city            TEXT,
  postal_code     TEXT,
  country         TEXT,
  iban            TEXT,
  bic             TEXT,
  payment_terms   TEXT,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.a10_settings IS 'Singleton row with A10 Consulting firm settings (NIF, bank details, etc.).';

ALTER TABLE public.a10_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "A10Settings: authenticated read" ON public.a10_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "A10Settings: authenticated write" ON public.a10_settings
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- CURRENCY SETTINGS
-- Singleton table caching exchange rate data.
-- rates stored as JSONB: { "EUR": 1, "USD": 1.08, ... }
-- ============================================================
CREATE TABLE IF NOT EXISTS public.currency_settings (
  id          INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),  -- singleton
  rates       JSONB NOT NULL DEFAULT '{}',
  rates_date  DATE,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.currency_settings IS 'Singleton row caching currency exchange rates. rates is a JSONB map of code → rate.';

ALTER TABLE public.currency_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CurrencySettings: authenticated read" ON public.currency_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "CurrencySettings: authenticated write" ON public.currency_settings
  FOR ALL TO authenticated USING (true);


-- ============================================================
-- UPDATED_AT TRIGGER HELPER
-- Automatically keeps updated_at current on any row change.
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Attach the trigger to every table that has an updated_at column
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'users', 'clients', 'suppliers', 'projects', 'tasks',
    'action_items', 'budget_items', 'purchase_orders', 'invoices',
    'risks', 'documents', 'a10_invoices', 'a10_settings', 'currency_settings'
  ]
  LOOP
    EXECUTE format(
      'CREATE OR REPLACE TRIGGER set_%I_updated_at
       BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();',
      t, t
    );
  END LOOP;
END;
$$;


-- ============================================================
-- MIGRATION GUIDE (auth.users)
-- ============================================================
-- After enabling Email auth in the Supabase dashboard:
--
-- 1. Create the first user via Authentication → Users → Invite user
--    (or use the JS client: supabase.auth.signUp({ email, password }))
--
-- 2. The trigger below auto-inserts a row into public.users when a
--    new auth user is created:

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

-- ============================================================
-- END OF SCHEMA
-- ============================================================
