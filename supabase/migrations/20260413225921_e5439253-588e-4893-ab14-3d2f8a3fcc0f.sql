DROP POLICY "Only authenticated users can view leads" ON public.leads;

CREATE POLICY "Anyone can view leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (true);