-- Harden public tables used only via Nest API (not Supabase Data API).
-- Enables RLS so anon/authenticated cannot read/write; postgres/service_role still can.

ALTER TABLE IF EXISTS public.poll_session ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.poll_answer ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."user" ENABLE ROW LEVEL SECURITY;

-- No permissive policies: deny-by-default for roles subject to RLS.
-- Drop any accidental open policies if present.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('poll_session', 'poll_answer', 'user')
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON %I.%I',
      r.policyname,
      r.schemaname,
      r.tablename
    );
  END LOOP;
END $$;

-- Explicitly revoke Data API roles from these tables (defense in depth).
REVOKE ALL ON TABLE public.poll_session FROM anon, authenticated;
REVOKE ALL ON TABLE public.poll_answer FROM anon, authenticated;
REVOKE ALL ON TABLE public."user" FROM anon, authenticated;

-- Keep Nest / migrations working (postgres + service_role).
GRANT ALL ON TABLE public.poll_session TO postgres, service_role;
GRANT ALL ON TABLE public.poll_answer TO postgres, service_role;
GRANT ALL ON TABLE public."user" TO postgres, service_role;
