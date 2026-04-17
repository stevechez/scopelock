-- 1. Forcefully demolish the old table
DROP TABLE IF EXISTS public.leads CASCADE;

-- 2. Build the new table perfectly matching your UI
CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    client_name text NOT NULL,
    client_email text NOT NULL,
    client_phone text,
    project_type text,
    budget text,
    timeline text,
    status text DEFAULT 'new',
    created_at timestamptz DEFAULT now()
);

-- 3. Re-apply the Bank Vault Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead" 
ON public.leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Leads are not viewable by the public" 
ON public.leads FOR SELECT TO anon USING (false);

GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;

-- 4. Wake up the API
NOTIFY pgrst, 'reload schema';