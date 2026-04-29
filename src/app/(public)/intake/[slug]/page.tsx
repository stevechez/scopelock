import { createClient } from '@/utils/supabase/server';
import LeadCaptureForm from '@/components/public/LeadCaptureForm';
import { notFound } from 'next/navigation';

// Keep the types clean
interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function IntakePage({ params }: PageProps) {
	// 📍 FIX 1: Unwrapping the params promise
	const { slug } = await params;

	// 📍 FIX 2: Awaiting the supabase client
	const supabase = await createClient();

	const { data: tenant, error } = await supabase
		.from('tenants')
		.select('id, name')
		.eq('slug', slug) // Use the unwrapped slug here
		.maybeSingle();

	if (error || !tenant) {
		console.error('Tenant lookup error:', error);
		return notFound();
	}

	return (
		<main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
			<div className="w-full max-w-xl">
				<div className="text-center mb-8">
					<h1 className="text-sm font-bold tracking-[0.2em] text-amber-600 uppercase mb-2">
						Project Inquiry
					</h1>
					<p className="text-muted text-sm font-medium uppercase tracking-tighter">
						BuildRail
					</p>
				</div>

				<LeadCaptureForm tenantId={tenant.id} tenantName={tenant.name} />
			</div>
		</main>
	);
}
