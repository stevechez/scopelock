import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSubdomainUrl } from '@/utils/urls';

export default async function DashboardPage() {
	const supabase = await createClient();

	// 1. Verify Authentication
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	// 2. Fetch Tenant and Proposals in parallel for speed
	const [tenantRes, proposalsRes] = await Promise.all([
		supabase.from('tenants').select('*').eq('owner_id', user.id).single(),
		supabase
			.from('proposals')
			.select('*')
			.order('created_at', { ascending: false }),
	]);

	const tenant = tenantRes.data;
	// Filter proposals just in case, though RLS should handle this
	const proposals =
		proposalsRes.data?.filter(p => p.tenant_id === tenant?.id) || [];

	// 3. Force onboarding if they somehow bypassed it
	if (!tenant) redirect('/app/settings');

	return (
		<div className="max-w-5xl mx-auto py-12 px-6">
			{/* Header Section */}
			<header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
				<div>
					<h1 className="text-5xl font-black italic tracking-tighter text-white drop-shadow-lg">
						Blueprint<span className="text-slate-600">OS</span>
					</h1>
					<p className="text-slate-500 mt-3 font-bold uppercase tracking-[0.3em] text-[10px]">
						Command Center /{' '}
						<span className="text-amber-500">
							{tenant.name || 'Active Session'}
						</span>
					</p>
				</div>
				<Link
					href="/proposals/new"
					className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform text-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]"
				>
					+ NEW PROPOSAL
				</Link>
			</header>

			{/* Pipeline Section */}
			<section className="space-y-6">
				<div className="flex items-center gap-4 mb-8">
					<span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
						Active Pipeline
					</span>
					<div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
				</div>

				{proposals.length === 0 ? (
					/* Empty State */
					<div className="bg-slate-900/40 border border-dashed border-slate-700 rounded-[2.5rem] p-24 text-center backdrop-blur-sm">
						<div className="text-4xl mb-4 opacity-50">📂</div>
						<h3 className="text-white font-bold text-xl mb-2">
							No Active Proposals
						</h3>
						<p className="text-slate-500 font-medium mb-6">
							Your vault is currently empty.
						</p>
						<Link
							href="/proposals/new"
							className="text-white font-bold underline hover:text-amber-500 transition-colors"
						>
							Draft your first project scope →
						</Link>
					</div>
				) : (
					/* Populated List */
					<div className="grid gap-4">
						{proposals.map(proposal => (
							<div
								key={proposal.id}
								className="group bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between hover:border-slate-600 transition-all shadow-xl"
							>
								<div className="flex items-center gap-6 mb-4 sm:mb-0">
									<div className="w-14 h-14 bg-black rounded-2xl border border-slate-800 flex items-center justify-center font-black text-slate-500 text-xl shadow-inner">
										{proposal.status === 'published' ? '✨' : '📝'}
									</div>
									<div>
										<h3 className="text-white font-bold text-xl tracking-tight mb-1">
											{proposal.title}
										</h3>
										<p className="text-slate-500 text-xs font-medium tracking-wide">
											Created{' '}
											{new Date(proposal.created_at).toLocaleDateString(
												'en-US',
												{ month: 'short', day: 'numeric', year: 'numeric' },
											)}
										</p>
									</div>
								</div>

								<div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t border-slate-800 sm:border-0 pt-4 sm:pt-0">
									<div className="text-left sm:text-right">
										<p className="text-white font-black text-2xl tracking-tight">
											${Number(proposal.amount).toLocaleString()}
										</p>
										<div className="flex items-center gap-2 mt-1 justify-start sm:justify-end">
											<div
												className={`w-2 h-2 rounded-full ${proposal.status === 'published' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}
											/>
											<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
												{proposal.status}
											</p>
										</div>
									</div>
									<Link
										// Automatically swaps between http://sub.localhost:3000 and https://sub.getblueprintos.com
										href={getSubdomainUrl(tenant.subdomain)}
										target="_blank"
										className="opacity-100 sm:opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 rounded-xl transition-all font-bold text-xs"
									>
										View Vault
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
