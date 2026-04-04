import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// 👇 The function name changed from 'middleware' to 'proxy'
export async function proxy(request: NextRequest) {
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
	if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (request.nextUrl.pathname === '/login' && user) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
