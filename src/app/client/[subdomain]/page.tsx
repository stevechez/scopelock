import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
// import { acceptProposalAction } from '@/app/actions/client';
import { createDepositCheckoutAction } from '@/app/actions/billing'; // Import from billing
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
	// ... your webhook logic ...
}

export default async function ClientVaultPage({
	params,
}: {
	params: { subdomain: string };
}) {
	const supabase = await createClient();

	// In Next.js 15, params must be awaited
	const { subdomain } = await params;

	// 1. Fetch the Brand (Tenant)
	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('subdomain', subdomain)
		.single();

	if (!tenant) notFound();

	// 2. Fetch the Proposals for this Homeowner
	const { data: proposals } = await supabase
		.from('proposals')
		.select('*')
		.eq('tenant_id', tenant.id)
		.order('created_at', { ascending: false });

	// Use the tenant's brand color, fallback to a nice blue
	const brandColor = tenant.primary_color || '#3b82f6';

	return (
		<div className="min-h-screen bg-[#020617] text-white selection:bg-white/20">
			{/* Branded Header */}
			<header
				className="py-8 px-6 border-b border-white/10"
				style={{ borderBottomColor: `${brandColor}40` }}
			>
				<div className="max-w-4xl mx-auto flex items-center gap-4">
					{tenant.logo_url && (
						<img
							src={tenant.logo_url}
							alt="Logo"
							className="h-10 w-auto rounded-md"
						/>
					)}
					<h1
						className="text-2xl font-black tracking-tighter"
						style={{ color: brandColor }}
					>
						{tenant.name}
					</h1>
				</div>
			</header>

			{/* Client Content */}
			<main className="max-w-4xl mx-auto py-16 px-6">
				<div className="mb-12">
					<h2 className="text-4xl font-black italic tracking-tight">
						Your Client Vault
					</h2>
					<p className="text-slate-400 mt-2 font-medium">
						Review and approve your active project scopes below.
					</p>
				</div>

				<div className="space-y-8">
					{!proposals || proposals.length === 0 ? (
						<p className="text-slate-500 italic">
							No active proposals at this time.
						</p>
					) : (
						proposals.map(proposal => (
							<div
								key={proposal.id}
								className="bg-slate-900/60 border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl"
							>
								<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
									<div>
										<h3 className="text-3xl font-black mb-2">
											{proposal.title}
										</h3>
										<div
											className="inline-block px-3 py-1 rounded-full border border-white/10 text-xs font-bold tracking-widest uppercase mb-4"
											style={{
												color:
													proposal.status === 'accepted'
														? '#10b981'
														: brandColor,
											}}
										>
											{proposal.status}
										</div>
									</div>
									<div className="text-left md:text-right">
										<p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
											Total Investment
										</p>
										<p className="text-4xl font-black">
											${Number(proposal.amount).toLocaleString()}
										</p>
									</div>
								</div>

								<div className="bg-black/40 rounded-2xl p-6 mb-8 border border-white/5">
									<h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
										Scope of Work
									</h4>
									<p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
										{proposal.description}
									</p>
								</div>

								{/* The Handshake Action */}
								{proposal.status !== 'accepted' && (
									<form
										action={async () => {
											'use server';
											await createDepositCheckoutAction(proposal.id, subdomain);
										}}
									>
										<button
											type="submit"
											className="w-full md:w-auto px-10 py-5 rounded-2xl font-black text-black hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] text-lg flex items-center justify-center gap-3"
											style={{ backgroundColor: brandColor }}
										>
											<svg
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												className="w-6 h-6"
											>
												<rect x="3" y="5" width="18" height="14" rx="2" />
												<line x1="3" y1="10" x2="21" y2="10" />
												<path d="M7 15h.01M11 15h2" />
											</svg>
											Accept & Pay 20% Deposit
										</button>
									</form>
								)}
							</div>
						))
					)}
				</div>
			</main>
		</div>
	);
}
