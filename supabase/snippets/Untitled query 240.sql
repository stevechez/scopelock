-- This "stamps" your user with the required access keys
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || 
    jsonb_build_object(
        'onboarding_complete', true, 
        'tenant_id', (SELECT id FROM tenants LIMIT 1)
    )
WHERE email = 'wellspentwallet@aol.com';