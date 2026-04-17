-- 1. Let the anon user access the public schema
GRANT USAGE ON SCHEMA public TO anon;

-- 2. Let the anon user read the tenants table
GRANT SELECT ON public.tenants TO anon;

-- 3. FORCE THE API TO WAKE UP AND REFRESH ITS MEMORY
NOTIFY pgrst, 'reload schema';