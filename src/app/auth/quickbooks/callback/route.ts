import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const code = searchParams.get('code');
	const realmId = searchParams.get('realmId'); // QuickBooks Company ID
	const state = searchParams.get('state'); // This is the User ID we passed in Step 1

	if (!code || !state) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?error=qb_auth_failed`,
		);
	}

	try {
		// 1. Prepare the Token Exchange Request
		const tokenUrl =
			'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

		// Basic Auth Header: base64(client_id:client_secret)
		const authHeader = Buffer.from(
			`${process.env.QUICKBOOKS_CLIENT_ID}:${process.env.QUICKBOOKS_CLIENT_SECRET}`,
		).toString('base64');

		const response = await fetch(tokenUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${authHeader}`,
				Accept: 'application/json',
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/quickbooks/callback`,
			}),
		});

		const tokens = await response.json();

		if (!response.ok) {
			console.error('QBO Token Exchange Error:', tokens);
			throw new Error('Failed to exchange tokens');
		}

		// 2. Save Tokens to Supabase
		const supabase = await createClient();

		// We use the 'state' variable which contains the user/tenant ID
		const { error: updateError } = await supabase
			.from('tenants')
			.update({
				qbo_access_token: tokens.access_token,
				qbo_refresh_token: tokens.refresh_token,
				qbo_realm_id: realmId,
				qbo_connected_at: new Date().toISOString(),
			})
			.eq('id', state); // Matching the tenant ID

		if (updateError) throw updateError;

		// 3. Redirect back to settings with success
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?success=qb_connected`,
		);
	} catch (error) {
		console.error('QuickBooks Callback Catch:', error);
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings?error=server_error`,
		);
	}
}
