-- 1. Create the Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name text NOT NULL,
    email text NOT NULL,
    project_type text,
    investment_range text,
    details text,
    created_at timestamptz DEFAULT now()
);

-- 2. Enable the Security System (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. The "Bank Deposit" Policy
-- Allows public (anon) users to INSERT leads
CREATE POLICY "Anyone can submit a lead" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. The "No Peeking" Policy
-- Ensures public users CANNOT see any leads (even their own after submission)
CREATE POLICY "Leads are not viewable by the public" 
ON public.leads 
FOR SELECT 
TO anon 
USING (false);

-- 5. Give the API permission to use the table
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;

-- 6. Refresh the API Cache
NOTIFY pgrst, 'reload schema';