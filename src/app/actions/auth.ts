'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export type AuthState = {
	error: string;
	success: boolean;
};

// ==========================================
// 1. LOGIN ACTION
// ==========================================
export async function loginAction(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		return { error: 'Email and password are required.', success: false };
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email: email.toLowerCase().trim(),
		password: password,
	});

	if (error) {
		return { error: error.message, success: false };
	}

	// Success! Send them to the command center
	redirect('/dashboard');
}

// ==========================================
// 2. SIGN UP ACTION
// ==========================================
export async function signUpAction(
	prevState: AuthState,
	formData: FormData,
): Promise<AuthState> {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	if (!email || !password) {
		return { error: 'Email and password are required.', success: false };
	}

	if (password.length < 6) {
		return { error: 'Password must be at least 6 characters.', success: false };
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email: email.toLowerCase().trim(),
		password: password,
	});

	if (error) {
		return { error: error.message, success: false };
	}

	// Success! The dashboard will auto-route them to /onboarding
	redirect('/dashboard');
}
