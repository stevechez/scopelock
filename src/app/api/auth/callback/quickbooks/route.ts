import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const realmId = searchParams.get('realmId'); // The Company ID from Intuit

	if (!code || !realmId) {
		return NextResponse.redirect(
			new URL('/dashboard/settings?error=qb_auth_failed', request.url),
		);
	}

	try {
		// 1. Exchange the temporary 'code' for 'tokens'
		const tokenResponse = await fetch(
			'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${Buffer.from(
						`${process.env.QB_CLIENT_ID}:${process.env.QB_CLIENT_SECRET}`,
					).toString('base64')}`,
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code,
					redirect_uri: process.env.QB_REDIRECT_URI!,
				}),
			},
		);

		const tokens = await tokenResponse.json();

		if (tokens.error) {
			console.error('QB Token Exchange Error:', tokens.error);
			throw new Error(tokens.error);
		}

		// 2. Initialize Supabase Admin (Service Role)
		const supabase = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.SUPABASE_SERVICE_ROLE_KEY!,
		);

		// Calculate expiration (Access tokens usually last 3600 seconds)
		const expiresAt = new Date(
			Date.now() + tokens.expires_in * 1000,
		).toISOString();

		// 3. Update the tenant record
		// NOTE: In a real app, you'd get the current tenant ID from the session/cookie
		// For now, we'll target your test tenant ID
		const { error: dbError } = await supabase
			.from('tenants')
			.update({
				qb_realm_id: realmId,
				qb_access_token: tokens.access_token,
				qb_refresh_token: tokens.refresh_token,
				qb_connected: true,
				qb_token_expires_at: expiresAt,
			})
			.eq('id', '9e443a67-0cfe-4260-a2ce-7f258f681ce1'); // Your test tenant UUID

		if (dbError) throw dbError;

		// 4. Success! Send them back to settings
		return NextResponse.redirect(
			new URL('/dashboard/settings?success=qb_connected', request.url),
		);
	} catch (error) {
		console.error('QuickBooks Callback Crash:', error);
		return NextResponse.redirect(
			new URL('/dashboard/settings?error=server_error', request.url),
		);
	}
}
