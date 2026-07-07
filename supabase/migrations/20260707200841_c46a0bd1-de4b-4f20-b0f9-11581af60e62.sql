DROP POLICY IF EXISTS "Anyone can view leads" ON public.leads;
REVOKE SELECT ON public.leads FROM anon, authenticated;
CREATE POLICY "No public read access" ON public.leads FOR SELECT USING (false);