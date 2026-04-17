CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
    amount numeric NOT NULL,
    description text NOT NULL,
    status text DEFAULT 'pending', -- pending, paid, failed
    stripe_checkout_id text,
    stripe_url text
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow tenant owners to see and manage their own payments
CREATE POLICY "Owners can manage payments" ON public.payments
    FOR ALL TO authenticated
    USING (tenant_id IN (SELECT id FROM tenants WHERE owner_id = auth.uid()));