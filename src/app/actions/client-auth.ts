// src/app/actions/client-auth.ts
'use server';

import { createClient } from '@/utils/supabase/server';

export type ClientAuthState = {
	error: string;
	success: boolean;
};

export async function sendMagicLinkAction(
	prevState: ClientAuthState,
	formData: FormData,
): Promise<ClientAuthState> {
	const email = formData.get('email') as string;
	const subdomain = formData.get('subdomain') as string;

	if (!email || !subdomain) {
		return { error: 'Email and subdomain are required.', success: false };
	}

	const supabase = await createClient();

	// The precise URL the user should land on after clicking the email link.
	// In development, this dynamically points back to dunn.localhost:3000/auth/callback
	const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
	const baseDomain =
		process.env.NODE_ENV === 'development'
			? 'localhost:3000'
			: 'getbuildrail.com';
	const redirectUrl = `${protocol}://${subdomain}.${baseDomain}/auth/callback`;

	// Fire the Magic Link
	const { error } = await supabase.auth.signInWithOtp({
		email: email.toLowerCase().trim(),
		options: {
			emailRedirectTo: redirectUrl,
			// You can also add 'shouldCreateUser: false' if you ONLY
			// want people you've explicitly invited to be able to log in.
		},
	});

	if (error) {
		return { error: error.message, success: false };
	}

	return { error: '', success: true };
}
