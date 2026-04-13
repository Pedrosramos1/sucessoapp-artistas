
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  plataforma TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);
