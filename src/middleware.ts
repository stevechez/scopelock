import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	// Check if the user is authenticated
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// THE VAULT DOOR LOGIC:
	// If they are trying to access /dashboard AND they are not logged in, bounce them to /login
	if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// If they are logged in and try to go to the login page, bounce them to the dashboard
	if (request.nextUrl.pathname === '/login' && user) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
