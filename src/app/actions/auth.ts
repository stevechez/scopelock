'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type AuthState = {
	error: string;
	success: boolean;
};

// ==========================================
// 1. LOGIN ACTION
// ==========================================
// src/app/actions/auth.ts

export async function loginAction(prevState: any, formData: FormData) {
	const supabase = await createClient();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) return { error: error.message, success: false };

	revalidatePath('/', 'layout');

	// 📍 FORCE the subdomain to prevent the root-domain bounce
	const baseUrl =
		process.env.NODE_ENV === 'production'
			? 'https://app.buildrailhq.com'
			: 'http://app.localhost:3000';

	return redirect(`${baseUrl}/dashboard`);
}

// ==========================================
// 2. SIGN UP ACTION
// ==========================================
export async function signUpAction(prevState: any, formData: FormData) {
	const supabase = await createClient();
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			// This ensures that even if they click a confirmation email,
			// they land on the onboarding flow, not the client portal.
			emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding`,
		},
	});

	if (error) {
		return { error: error.message, success: false };
	}

	// ✅ THE FIX: Force the user into the Onboarding flow immediately after signup
	// Do not redirect to '/' or '/dashboard' yet, as they have no Tenant ID.
	redirect('/onboarding');
}
