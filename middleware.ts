import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
	// 1. Initialize the response first
	let response = NextResponse.next({
		request: {
			headers: req.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => req.cookies.getAll(),
				setAll: cookiesToSet => {
					// 2. Sync to the request so subsequent server calls see the cookie
					cookiesToSet.forEach(({ name, value }) =>
						req.cookies.set(name, value),
					);

					// 3. Create a fresh response to hold the new headers
					response = NextResponse.next({ request: req });

					// 4. Set the cookies on the response WITHOUT the domain flag
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, {
							...options,
							path: '/',
							sameSite: 'lax',
							secure: false, // Required for non-HTTPS localhost
						}),
					);
				},
			},
		},
	);

	// 5. Get the session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const url = req.nextUrl;
	const host = req.headers.get('host');

	// 📍 CRITICAL DEBUG LOG
	console.log(
		`[AUTH CHECK] Host: ${host} | Path: ${url.pathname} | Session: ${!!session}`,
	);

	// 6. Security Logic
	const isProtectedRoute =
		url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/leads');

	if (!session && isProtectedRoute) {
		// Force redirect to login on the SAME subdomain
		const loginUrl = new URL('/login', req.url);
		return NextResponse.redirect(loginUrl);
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - portal (Steve's entrance) <--- ADD THIS
		 */
		'/((?!_next/static|_next/image|favicon.ico|portal).*)',
	],
};
