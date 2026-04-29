import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import {
	CheckCircle2,
	ArrowRight,
	Home,
	ShieldCheck,
	Star,
	MapPin,
	Phone,
	Lock,
} from 'lucide-react';
import Link from 'next/link';

interface Props {
	params: {
		subdomain: string;
	};
}

export default async function PublicSubdomainPage({ params }: Props) {
	const supabase = await createClient();

	// 1. FETCH THE TENANT DATA BASED ON THE SUBDOMAIN
	const { data: tenant, error } = await supabase
		.from('tenants')
		.select('*')
		.eq('subdomain', params.subdomain)
		.single();

	// If no builder exists with this subdomain, show a 404
	if (error || !tenant) {
		notFound();
	}

	const accentColor = tenant.accent_color || '#f59e0b';

	return (
		<div className="min-h-screen bg-white font-sans text-foreground">
			{/* NAVBAR */}
			<nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md border-b border-border z-50">
				<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div
							className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-xl shadow-lg"
							style={{ backgroundColor: accentColor }}
						>
							<Home className="w-5 h-5" />
						</div>
						<span className="text-xl font-black tracking-tight uppercase">
							{tenant.name}
						</span>
					</div>

					<div className="flex items-center gap-4">
						<Link
							href="/login"
							className="hidden md:flex items-center gap-2 text-xs font-black text-muted uppercase tracking-widest hover:text-foreground transition-colors"
						>
							<Lock className="w-3 h-3" /> Client Login
						</Link>
						<button
							className="text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-transform hover:scale-105 active:scale-95"
							style={{ backgroundColor: accentColor }}
						>
							Get Estimate
						</button>
					</div>
				</div>
			</nav>

			{/* HERO SECTION */}
			<section className="pt-40 pb-20 px-6 relative overflow-hidden">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-6 border border-emerald-500/20">
							<CheckCircle2 className="w-4 h-4" /> Accepting New Projects
						</div>
						<h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6">
							{tenant.site_headline}
						</h1>
						<p className="text-lg md:text-xl text-muted font-medium leading-relaxed mb-8 max-w-lg">
							{tenant.site_subheadline}
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<button
								className="text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all hover:opacity-90"
								style={{ backgroundColor: accentColor }}
							>
								Start Your Project <ArrowRight className="w-4 h-4" />
							</button>
							<div className="flex items-center justify-center gap-2 text-sm font-bold text-muted px-6 py-4">
								<ShieldCheck
									className="w-5 h-5"
									style={{ color: accentColor }}
								/>{' '}
								Fully Licensed & Insured
							</div>
						</div>
					</div>

					{/* HERO IMAGE / TRUST BOX */}
					<div className="relative">
						<div className="aspect-square bg-slate-100 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-slate-50 relative">
							{/* Placeholder for Dynamic Gallery Image */}
							<div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center">
								<span className="text-slate-300 font-black text-4xl uppercase tracking-tighter opacity-20">
									Portfolio Preview
								</span>
							</div>
						</div>

						{/* Rating Card */}
						<div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] shadow-xl border border-border flex flex-col items-center rotate-3">
							<div className="flex gap-1 mb-2" style={{ color: accentColor }}>
								{[1, 2, 3, 4, 5].map(i => (
									<Star key={i} className="w-4 h-4 fill-current" />
								))}
							</div>
							<span className="font-black text-3xl tracking-tighter text-foreground">
								5.0
							</span>
							<span className="text-[9px] font-black uppercase tracking-widest text-muted">
								Verified Reviews
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* CONTACT / FOOTER BAR */}
			<section className="py-12 bg-slate-950 text-white mt-20">
				<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex items-center gap-3">
							<Phone className="w-4 h-4 text-muted" />
							<span className="font-bold tracking-widest text-sm uppercase">
								Contact Team
							</span>
						</div>
						<div className="flex items-center gap-3">
							<MapPin className="w-4 h-4 text-muted" />
							<span className="font-bold tracking-widest text-sm uppercase">
								Cupertino, CA
							</span>
						</div>
					</div>
					<p className="text-[10px] font-black text-muted uppercase tracking-widest">
						Powered by BuildRail HQ
					</p>
				</div>
			</section>
		</div>
	);
}
// import BuilderHQSandbox from '@/components/dashboard/BuilderHQSandbox';
// import CommVault from '@/components/dashboard/CommVault';
// export default function SandboxPage() {
// 	// 1. Create mock objects that match your CommVaultProps interface
// 	const mockJob = { id: '123', name: 'Sample Project' };
// 	const mockLogs = [];
// 	const mockFinancials = { total: 0, paid: 0 };

// 	return (
// 		<main className="bg-slate-950 min-h-screen">
// 			{/* 2. Pass them as props */}
// 			<CommVault
// 				jobData={mockJob}
// 				timelineLogs={mockLogs}
// 				financials={mockFinancials}
// 			/>
// 		</main>
// 	);
// }
