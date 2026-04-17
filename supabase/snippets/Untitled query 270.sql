-- Allow authenticated users to see leads that belong to their tenant
CREATE POLICY "Tenant owners can view their leads"
ON public.leads
FOR SELECT
TO authenticated
USING (
  tenant_id IN (
    SELECT id FROM public.tenants WHERE owner_id = auth.uid()
  )
);