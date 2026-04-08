import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
	const cookieStore = await cookies();

	// Determine domain safely. Undefined in dev means "bind to current exact host"
	const cookieDomain =
		process.env.NODE_ENV === 'production' ? '.buildrail.com' : undefined;

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name) {
					return cookieStore.get(name)?.value;
				},
				set(name, value, options) {
					try {
						cookieStore.set({
							name,
							value,
							...options,
							domain: cookieDomain, // <--- THE FIX
							path: '/',
						});
					} catch (error) {
						// Silent catch for Server Components
					}
				},
				remove(name, options) {
					try {
						cookieStore.set({
							name,
							value: '',
							...options,
							domain: cookieDomain, // <--- THE FIX
							path: '/',
						});
					} catch (error) {
						// Silent catch for Server Components
					}
				},
			},
		},
	);
}
