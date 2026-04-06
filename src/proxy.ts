import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
	const url = request.nextUrl;
	const hostname = request.headers.get('host') || '';

	let response = NextResponse.next({ request });

	// 1. SUPABASE HANDSHAKE
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					response = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// 2. THE AGGRESSIVE TRAFFIC COP

	// --- APP SUBDOMAIN (app.localhost:3000) ---
	if (hostname.startsWith('app.')) {
		const isAuthPage = url.pathname === '/login' || url.pathname === '/signup';

		// Kick to login if no user
		if (!user && !isAuthPage) {
			return NextResponse.redirect(new URL('/login', request.url));
		}

		// Kick to dashboard if already logged in and hitting login page
		if (user && isAuthPage) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		// FORCE REWRITE TO /app FOLDER
		// This ensures http://app.localhost:3000/ becomes /app/
		const path = url.pathname === '/' ? '' : url.pathname;
		return NextResponse.rewrite(new URL(`/app${path}`, request.url));
	}

	// --- TENANT SUBDOMAINS (dunn.localhost:3000) ---
	if (!hostname.startsWith('localhost') && !hostname.startsWith('app.')) {
		const subdomain = hostname.split('.')[0];
		return NextResponse.rewrite(
			new URL(`/client/${subdomain}${url.pathname}`, request.url),
		);
	}

	// --- MARKETING ROOT (localhost:3000) ---
	return response;
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
