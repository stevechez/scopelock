import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all request paths except for:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};

export default function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const hostname = req.headers.get('host') || '';
	const path = url.pathname;

	// Detect environment
	const rootDomain =
		process.env.NODE_ENV === 'production'
			? 'getblueprintos.com'
			: 'localhost:3000';

	const appDomain = `app.${rootDomain}`;
	const demoDomain = `demo.${rootDomain}`;

	// 1. Handle the App Dashboard (app.localhost:3000)
	if (hostname === appDomain) {
		// Rewrite EVERYTHING (including the root "/") straight to the /app folder
		// Example: app.localhost:3000/ -> src/app/(dashboard)/app/page.tsx
		return NextResponse.rewrite(new URL(`/app${path}`, req.url));
	}

	// 2. Handle the Demo Funnel
	if (hostname === demoDomain) {
		return NextResponse.rewrite(new URL(`/demo${path}`, req.url));
	}

	// 3. Handle Wildcard/Tenant Subdomains (e.g., dunn.localhost:3000)
	const subdomain = hostname.replace(`.${rootDomain}`, '');

	if (
		subdomain !== hostname &&
		subdomain !== 'www' &&
		subdomain !== rootDomain
	) {
		return NextResponse.rewrite(
			new URL(`/client/${subdomain}${path}`, req.url),
		);
	}

	// 4. Default: Render the Marketing Site (root domain)
	return NextResponse.next();
}
