// src/app/dashboard/welcome/page.tsx
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { HardHat, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default async function WelcomePage() {
	const supabase = await createClient();

	// Verify the user is logged in
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect('/login');
	}

	// Fetch the brand new company profile
	const { data: tenant } = await supabase
		.from('tenants')
		.select('company_name, owner_name')
		.eq('owner_id', user.id)
		.single();

	if (!tenant) {
		redirect('/onboarding');
	}

	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 font-sans selection:bg-amber-500/30">
			<div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden text-center">
				{/* Decorative background element */}
				<div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>

				<div className="mx-auto w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-8 relative z-10">
					<HardHat className="w-10 h-10 text-amber-500" />
				</div>

				<h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase italic relative z-10">
					Welcome to the Vault.
				</h1>

				<p className="text-xl text-muted font-medium mb-10 relative z-10">
					<span className="text-white font-bold">{tenant.company_name}</span> is
					officially online. Your command center is provisioned and ready for
					your first project.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 relative z-10 text-left">
					<div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
						<ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
						<h3 className="text-white font-bold">ScopeLock Active</h3>
						<p className="text-muted text-sm">
							Change orders are strictly enforced.
						</p>
					</div>
					<div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
						<Zap className="w-6 h-6 text-amber-500 mb-2" />
						<h3 className="text-white font-bold">PayRail Standby</h3>
						<p className="text-muted text-sm">
							Connect Stripe to start invoicing.
						</p>
					</div>
				</div>

				<Link
					href="/dashboard"
					className="inline-flex w-full items-center justify-center gap-2 bg-amber-500 text-slate-950 font-black py-5 px-8 rounded-2xl hover:bg-amber-400 active:scale-[0.98] transition-all text-lg shadow-xl shadow-amber-500/10 relative z-10"
				>
					Enter Dashboard <ArrowRight className="w-5 h-5" />
				</Link>
			</div>
		</div>
	);
}
