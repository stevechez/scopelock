import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	// Safety check: Alert yourself if the environment variables go missing again
	if (!url || !anonKey) {
		console.error(
			'❌ SUPABASE ENV VARIABLES MISSING. Check your .env.local file.',
		);
	}

	return createBrowserClient(url!, anonKey!);
}
