import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	// Grab the host to determine where to redirect later
	const host = request.headers.get('host') || '';
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
	const baseUrl = `${protocol}://${host}`;

	if (code) {
		const supabase = await createClient();

		// 1. EXHANGE VIP WRISTBAND (Get the session)
		const {
			data: { session },
			error,
		} = await supabase.auth.exchangeCodeForSession(code);

		if (!error && session) {
			const user = session.user;

			// 2. CHECK THE DATABASE: Is this a Builder (Tenant)?
			// We check if this user ID is the owner of any workspace
			const { data: tenant } = await supabase
				.from('tenants')
				.select('subdomain')
				.eq('owner_id', user.id)
				.single();

			if (tenant) {
				// SUCCESS: They are a Builder. Send them to their specific subdomain.
				console.log(
					`✅ [Dispatcher] Builder recognized. Routing to ${tenant.subdomain}...`,
				);
				const tenantUrl =
					process.env.NODE_ENV === 'production'
						? `https://${tenant.subdomain}.buildrailhq.com/dashboard`
						: `http://${tenant.subdomain}.localhost:3000/dashboard`;

				return NextResponse.redirect(tenantUrl);
			}

			// 3. CHECK THE DATABASE: Is this a Homeowner (Client)?
			// We check if a builder has invited this email address
			const { data: client } = await supabase
				.from('clients')
				.select('id, auth_user_id')
				.eq('email', user.email)
				.single();

			if (client) {
				// If this is their first time logging in, link their Auth ID to their Client profile
				if (!client.auth_user_id) {
					await supabase
						.from('clients')
						.update({ auth_user_id: user.id })
						.eq('id', client.id);
					console.log(
						`🔗 [Dispatcher] First-time Client login. Auth ID linked.`,
					);
				}

				// SUCCESS: They are a Client. Keep them on the current subdomain.
				console.log(`✅ [Dispatcher] Client recognized. Routing to Vault...`);
				return NextResponse.redirect(`${baseUrl}/dashboard`);
			}

			// 4. EDGE CASE: Brand New Signup (No Tenant or Client profile yet)
			// If they got a magic link from the main marketing page, we need to create their Tenant workspace
			if (user.user_metadata?.company_name && user.user_metadata?.subdomain) {
				console.log(`🏗️ [Dispatcher] Provisioning new Builder workspace...`);

				const { error: insertError } = await supabase.from('tenants').insert({
					owner_id: user.id,
					name: user.user_metadata.company_name,
					subdomain: user.user_metadata.subdomain,
				});

				if (!insertError) {
					const newTenantUrl =
						process.env.NODE_ENV === 'production'
							? `https://${user.user_metadata.subdomain}.buildrailhq.com/dashboard`
							: `http://${user.user_metadata.subdomain}.localhost:3000/dashboard`;
					return NextResponse.redirect(newTenantUrl);
				} else {
					console.error('Database Provisioning Error:', insertError);
				}
			}

			// If we hit this, they logged in but don't belong anywhere in the DB.
			return NextResponse.redirect(
				`${baseUrl}/auth/auth-code-error?msg=Account%20Not%20Provisioned`,
			);
		} else {
			console.error(`❌ [Auth Callback] Supabase Error:`, error?.message);
			return NextResponse.redirect(
				`${baseUrl}/auth/auth-code-error?msg=${encodeURIComponent(error?.message || 'Auth Failed')}`,
			);
		}
	}

	// No code in URL
	return NextResponse.redirect(`${baseUrl}/login`);
}
