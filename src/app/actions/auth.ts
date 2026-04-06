'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const initialState = { error: '', success: false };

export async function signUpAction(prevState: any, formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		return { error: 'Email and password are required.', success: false };
	}

	const supabase = await createClient();

	// 1. Create the user in Supabase Auth
	const { error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		return { error: error.message, success: false };
	}

	// 2. Success! Redirect them to the Onboarding flow to create their Tenant Vault
	redirect('/onboarding');
}

// Add this below your existing signUpAction in src/app/actions/auth.ts

export async function loginAction(prevState: any, formData: FormData) {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		return { error: 'Email and password are required.', success: false };
	}

	const supabase = await createClient();

	// 1. Authenticate the user securely on the server
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		// Supabase returns helpful errors like "Invalid login credentials"
		return { error: error.message, success: false };
	}

	// 2. Cookie is now securely locked in. Force the redirect to the Command Center root.
	redirect('/');
}
