import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const hostname = req.headers.get('host') || '';
	const path = url.pathname;

	// 1. SKIP STATICS & AUTH CALLBACKS
	// We don't want to rewrite the actual auth exchange or static assets
	if (
		path.startsWith('/_next') ||
		path.startsWith('/api') ||
		path.startsWith('/auth') ||
		path.includes('.')
	) {
		return NextResponse.next();
	}

	// Detect environment
	const rootDomain =
		process.env.NODE_ENV === 'production'
			? 'getbuildrail.com'
			: 'localhost:3000';

	// 2. HANDLE THE APP DASHBOARD (app.localhost:3000)
	// This stays at the root or goes to /(dashboard)
	// 2. HANDLE THE APP DASHBOARD (app.localhost:3000)
	if (hostname.startsWith('app.')) {
		// If Steve goes to the bare app.domain, push him to his dashboard
		if (path === '/') {
			return NextResponse.redirect(new URL('/dashboard', req.url));
		}
		// Let him access /dashboard, /login, etc. normally
		return NextResponse.next();
	}

	// 3. HANDLE WILDCARD SUBDOMAINS (e.g., dunn2.localhost:3000)
	const subdomain = hostname.replace(`.${rootDomain}`, '');

	// If it's a valid subdomain (not www and not the root itself)
	if (
		subdomain &&
		subdomain !== rootDomain &&
		subdomain !== 'www' &&
		subdomain !== 'app'
	) {
		// This is the magic line: it takes /vault and turns it into /client/dunn2/vault internally
		console.log(
			`🔄 Rewriting ${hostname}${path} to /client/${subdomain}${path}`,
		);
		return NextResponse.rewrite(
			new URL(`/client/${subdomain}${path}`, req.url),
		);
	}

	// 4. DEFAULT: Marketing Site / Root
	return NextResponse.next();
}
