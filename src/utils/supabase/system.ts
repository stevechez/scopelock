// src/utils/supabase/system.ts
import { createClient } from '@supabase/supabase-js';

// This client is for Server-to-Server use ONLY.
// It uses the service_role key, meaning it BYPASSES all RLS policies.
// DANGER: Never use this client in a client component or middleware.
export const createSystemAdminClient = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!url || !serviceKey) {
		// During BUILD, these might be missing. We return a 'dummy'
		// client so the build doesn't crash, but it will error if executed.
		// This is our insurance policy.
		return createClient(url || 'http://dummy.build', serviceKey || 'dummy_key');
	}

	return createClient(url, serviceKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});
};
