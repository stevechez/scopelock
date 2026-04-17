import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import LeadCaptureForm from '@/components/public/LeadCaptureForm';
import { HardHat, Ruler, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

export default async function PublicSitePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const supabase = await createClient();

	// 1. Fetch the contractor based on the URL slug
	// (Assuming you have a 'slug' column in your tenants table)
	let { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('slug', slug)
		.single();

	// MOCK FALLBACK FOR TESTING PURPOSES
	if (!tenant) {
		if (slug === 'demo') {
			tenant = {
				company_name: 'Steve Chez Construction',
				owner_name: 'Steve Chez',
				specialty: 'High-End Residential Remodeling',
			};
		} else {
			notFound(); // Returns a 404 page if no tenant exists
		}
	}

	return (
		<div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-500 selection:text-slate-900">
			{/* HERO SECTION */}
			<header className="relative bg-slate-900 pt-24 pb-32 overflow-hidden border-b-8 border-amber-500">
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
				<div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

				<div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 font-bold text-sm rounded-full mb-6">
							<Star className="w-4 h-4 fill-amber-400" /> Top Rated Local
							Builder
						</div>
						<h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
							{tenant.company_name}
						</h1>
						<p className="text-xl text-slate-300 font-medium mb-8 max-w-lg leading-relaxed">
							We specialize in{' '}
							{tenant.specialty || 'premium residential construction'}. Quality
							craftsmanship, transparent pricing, and a stress-free process.
						</p>

						<div className="flex items-center gap-6 text-white font-bold">
							<div className="flex items-center gap-2">
								<ShieldCheck className="w-5 h-5 text-amber-500" /> Fully
								Licensed
							</div>
							<div className="flex items-center gap-2">
								<Ruler className="w-5 h-5 text-amber-500" /> Custom Design
							</div>
						</div>
					</div>

					{/* LEAD FORM IN HERO */}
					<div className="lg:ml-auto w-full max-w-md">
						<LeadCaptureForm
							tenantId={tenant.id}
							tenantName={tenant.company_name}
						/>{' '}
					</div>
				</div>
			</header>

			{/* TRUST & PROCESS SECTION */}
			<section className="py-24 px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
							The {tenant.company_name} Difference
						</h2>
						<p className="text-lg text-slate-500 max-w-2xl mx-auto">
							We don&quot;t just build homes; we build trust. Here is what
							happens when you work with us.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
							<div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
								<span className="font-black text-xl">1</span>
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-3">
								Transparent Estimates
							</h3>
							<p className="text-slate-600 leading-relaxed">
								No hidden fees. We provide detailed 3-tier proposals so you can
								choose the exact scope that fits your budget.
							</p>
						</div>
						<div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
							<div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
								<span className="font-black text-xl">2</span>
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-3">
								Daily Client Portal
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Log into your private dashboard to see daily photo updates, crew
								notes, and track your project timeline in real-time.
							</p>
						</div>
						<div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
							<div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
								<span className="font-black text-xl">3</span>
							</div>
							<h3 className="text-xl font-bold text-slate-900 mb-3">
								Secure Payments
							</h3>
							<p className="text-slate-600 leading-relaxed">
								Approve milestones and pay securely via bank transfer or credit
								card right from your phone. No more paper checks.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FOOTER */}
			<footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-white/10">
				<div className="flex items-center justify-center gap-2 mb-4 text-white font-black">
					<HardHat className="w-6 h-6 text-amber-500" /> {tenant.company_name}
				</div>
				<p className="text-sm">
					© {new Date().getFullYear()} {tenant.company_name}. All rights
					reserved.
				</p>
				<Link
					href="/"
					className="text-xs mt-6 inline-block font-bold text-slate-600 hover:text-amber-500 transition-colors uppercase tracking-widest"
				>
					Powered by BUILDRAIL
				</Link>
			</footer>
		</div>
	);
}
