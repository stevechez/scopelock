import EliteIntake from '@/components/EliteIntake';
import { notFound } from 'next/navigation';
// 📍 1. Import the raw client, bypassing your local server wrapper
import { createClient } from '@supabase/supabase-js';

export default async function PublicHirePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	console.log('--- SLEDGEHAMMER DB ATTEMPT ---');

	const sanitizedSlug = String(slug)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, '');

	// 📍 2. HARDCODE the connection. No environment variables. No caching.
	const url = 'https://tyvqrdzgjvyhbuakfifq.supabase.co';
	const anonKey =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

	const supabase = createClient(url, anonKey);

	// 3. The Query
	const { data: tenants, error } = await supabase
		.from('tenants')
		.select('id, name, slug')
		.eq('slug', sanitizedSlug)
		.limit(1);

	if (error) {
		console.error('SUPABASE ERROR:', error.message);
	}

	console.log('DATABASE RESULT:', tenants);

	if (!tenants || tenants.length === 0) {
		console.log('❌ NO TENANT FOUND IN ARRAY, TRIGGERING 404');
		notFound();
	}

	const tenant = tenants[0];

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
			<div className="mb-12 text-center">
				<h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2">
					{tenant.name}
				</h1>
				<p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">
					Inquiry Portal
				</p>
			</div>

			<EliteIntake tenantId={tenant.id} />
		</div>
	);
}
