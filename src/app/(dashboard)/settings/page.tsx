import { createClient } from '@/utils/supabase/server';
import { createStripeAccountAction } from '@/app/actions/stripe-connect';
import BrandingForm from './BrandingForm';

export default async function SettingsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('owner_id', user?.id)
		.single();

	return (
		<div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
			<header>
				<h1 className="text-4xl font-black italic text-white tracking-tight">
					Settings
				</h1>
				<p className="text-slate-500 font-medium mt-2">
					Manage your brand and payout accounts.
				</p>
			</header>

			{/* --- SECTION 01: BRANDING --- */}
			<section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem]">
				<h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 ml-1">
					01 / Visual Identity
				</h2>
				<BrandingForm tenant={tenant} />
			</section>

			{/* --- SECTION 02: PAYMENTS (THE NEW PART) --- */}
			<section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem]">
				<h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 ml-1">
					02 / Payout Method
				</h2>

				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div className="max-w-md">
						<h3 className="text-xl font-bold text-white mb-2">
							{tenant?.payments_enabled
								? '✅ Payments Active'
								: '🏦 Link Your Bank Account'}
						</h3>
						<p className="text-slate-400 text-sm leading-relaxed">
							{tenant?.payments_enabled
								? 'Your account is verified and ready to receive homeowner deposits directly to your bank.'
								: 'BuildRail uses Stripe to securely route homeowner deposits to you. You must link a bank account to publish paid proposals.'}
						</p>
					</div>

					{!tenant?.payments_enabled && (
						<form action={createStripeAccountAction}>
							<button className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 whitespace-nowrap">
								Connect with Stripe
							</button>
						</form>
					)}

					{tenant?.payments_enabled && (
						<div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-3 rounded-xl font-bold text-sm">
							Account Verified
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
