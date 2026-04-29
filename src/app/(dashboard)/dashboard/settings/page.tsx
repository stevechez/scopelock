import { createClient } from '@/utils/supabase/server';
import { createStripeConnectLink, verifyStripeAccount } from '@/app/actions';
import AppShell from '@/components/dashboard/AppShell';
import {
	Building2,
	CreditCard,
	CheckCircle2,
	AlertCircle,
	ArrowRight,
	Globe,
} from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// 1. Fetch Tenant/Contractor data
	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('owner_id', user?.id)
		.single();

	if (!tenant) return null;

	// 2. Refresh Stripe status if they just returned from onboarding
	let isStripeVerified = tenant.stripe_onboarding_complete;

	if (tenant.stripe_account_id && !isStripeVerified) {
		const verifyResult = await verifyStripeAccount(tenant.id);
		isStripeVerified = verifyResult?.success || false;
	}

	return (
		<AppShell>
			<div className="max-w-4xl mx-auto space-y-10 pb-20">
				<div>
					<h1 className="text-3xl font-black text-foreground text-foreground tracking-tight">
						Settings
					</h1>
					<p className="text-muted font-medium">
						Manage your business profile and payment integrations.
					</p>
				</div>

				{/* SECTION 1: PAYMENTS (STRIPE CONNECT) */}
				<section className="bg-background text-foreground border border-border border-border rounded-3xl overflow-hidden shadow-sm">
					<div className="p-8 border-b border-border border-border flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
								<CreditCard className="w-6 h-6" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-foreground text-foreground">
									PayRail Gateway
								</h2>
								<p className="text-sm text-muted">
									Powering your client invoices and payouts via Stripe.
								</p>
							</div>
						</div>
						{isStripeVerified ? (
							<div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full">
								<CheckCircle2 className="w-4 h-4" /> Connected
							</div>
						) : (
							<div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest rounded-full">
								<AlertCircle className="w-4 h-4" /> Setup Required
							</div>
						)}
					</div>

					<div className="p-8 bg-slate-50/50 dark:bg-slate-950/20">
						{isStripeVerified ? (
							<div className="space-y-4">
								<p className="text-slate-600 dark:text-muted text-sm leading-relaxed max-w-2xl">
									Your Stripe account is fully linked. You can now request
									milestone payments from clients and receive direct deposits to
									your bank account.
								</p>
								<button className="text-sm font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1">
									View Stripe Dashboard <ArrowRight className="w-4 h-4" />
								</button>
							</div>
						) : (
							<div className="space-y-6">
								<p className="text-slate-600 dark:text-muted text-sm leading-relaxed max-w-2xl">
									To begin accepting payments through BUILDRAIL, you must link
									your business bank account. We use Stripe to ensure your
									financial data is secure and compliant.
								</p>
								<form
									action={async () => {
										'use server';
										const { redirect } = await import('next/navigation');
										// FIX: Removed the second argument so it matches your actions.ts signature perfectly
										const url = await createStripeConnectLink(tenant.id);
										redirect(url);
									}}
								>
									<button
										type="submit"
										className="px-8 py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
									>
										Connect Stripe Account <ArrowRight className="w-5 h-5" />
									</button>
								</form>
							</div>
						)}
					</div>
				</section>

				{/* SECTION 2: COMPANY PROFILE */}
				<section className="bg-background text-foreground border border-border border-border rounded-3xl overflow-hidden shadow-sm">
					<div className="p-8 border-b border-border border-border flex items-center gap-4">
						<div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-muted rounded-2xl flex items-center justify-center">
							<Building2 className="w-6 h-6" />
						</div>
						<div>
							<h2 className="text-xl font-bold text-foreground text-foreground">
								Company Profile
							</h2>
							<p className="text-sm text-muted">
								This information appears on your public Site Engine.
							</p>
						</div>
					</div>

					<div className="p-8 space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-xs font-black text-muted dark:text-muted uppercase tracking-widest mb-2 ml-1">
									Company Name
								</label>
								<input
									readOnly
									value={tenant.name || ''}
									className="w-full bg-slate-50 dark:bg-slate-950 border border-border border-border rounded-xl px-4 py-3 text-foreground text-foreground font-medium focus:ring-2 focus:ring-blue-500 outline-none"
								/>
							</div>
							<div>
								<label className="block text-xs font-black text-muted dark:text-muted uppercase tracking-widest mb-2 ml-1">
									Public Site URL
								</label>
								<div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-border border-border rounded-xl text-muted font-medium overflow-hidden text-ellipsis whitespace-nowrap">
									<Globe className="w-4 h-4 shrink-0" /> buildrail.com/site/
									{tenant.slug || 'your-slug'}
								</div>
							</div>
						</div>

						<div className="pt-4 border-t border-border border-border">
							{/* NOTE: You previously built an active SettingsForm component for this. 
                                Right now it is just a static layout. Whenever you want to make this functional, 
                                you can swap this section out for the <SettingsForm /> we built! */}
							<button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-foreground font-black rounded-xl hover:opacity-90 transition-all">
								Save Changes
							</button>
						</div>
					</div>
				</section>
			</div>
		</AppShell>
	);
}
