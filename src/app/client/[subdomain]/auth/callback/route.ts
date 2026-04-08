import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	// 1. Detect if we are on a subdomain (e.g., dunn22.localhost)
	const host = request.headers.get('host') || '';
	const isSubdomain = host.split('.').length > 2 && !host.startsWith('app.');

	// 2. Set the default destination
	// If we're on a subdomain, the middleware will handle /vault -> /client/[subdomain]/vault
	const next = requestUrl.searchParams.get('next') || '/vault';

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return NextResponse.redirect(new URL(next, request.url));
		}
	}

	// 3. If it fails, redirect back to the login page on THIS subdomain
	console.error('🚨 AUTH CALLBACK ERROR: Link expired or invalid.');
	return NextResponse.redirect(new URL('/login?error=expired', request.url));
}
