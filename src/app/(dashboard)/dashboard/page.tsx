import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {
	HardHat,
	Users,
	Briefcase,
	DollarSign,
	ArrowRight,
	Activity,
} from 'lucide-react';
import Link from 'next/link';
import { QuickStat } from '@/components/dashboard/QuickStat'; // Move your helper to a component file

export const revalidate = 0;

export default async function DashboardPage() {
	const supabase = await createClient();

	// 1. Auth & Tenant Guard
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) redirect('/login');

	const { data: tenant } = await supabase
		.from('tenants')
		.select('*')
		.eq('owner_id', user.id)
		.maybeSingle();

	if (!tenant) redirect('/onboarding');

	// 2. Parallel Data Fetching (Pro move for speed)
	const [leadsResponse, projectsResponse] = await Promise.all([
		supabase
			.from('leads')
			.select('*')
			.eq('tenant_id', tenant.id)
			.order('created_at', { ascending: false }),
		supabase.from('projects').select('*').eq('tenant_id', tenant.id),
	]);

	const safeLeads = leadsResponse.data || [];
	const safeProjects = projectsResponse.data || [];

	// 3. Data Intelligence
	const activeLeads = safeLeads.filter(l => l.status !== 'converted');

	const pipelineValue = activeLeads.reduce((acc, lead) => {
		const val =
			parseInt(String(lead.budget || '0').replace(/[^0-9]/g, '')) || 0;
		return acc + val;
	}, 0);

	const activeBuildsValue = safeProjects.reduce(
		(acc, p) => acc + (Number(p.budget_total) || 0),
		0,
	);

	return (
		<div className="space-y-12">
			{/* HEADER: Balanced & Premium */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
				<div>
					<div className="flex items-center gap-2 mb-2 text-amber-500 font-black uppercase tracking-[0.3em] text-[10px]">
						<Activity size={14} /> System Operational
					</div>
					<h1 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
						Command <span className="text-white/40">Center</span>
					</h1>
					<p className="text-muted font-medium text-lg mt-4">
						Provisioning engine for{' '}
						<span className="text-white font-bold tracking-tight">
							{tenant.name}
						</span>
					</p>
				</div>

				<div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-3xl flex items-center gap-4">
					<div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
					<span className="text-xs font-black uppercase tracking-widest text-muted">
						Node: {tenant.id.slice(0, 8)}
					</span>
				</div>
			</div>

			{/* STATS GRID */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<QuickStat
					title="Pipeline Value"
					value={`$${(pipelineValue / 1000).toFixed(0)}k`}
					description="Unconverted Briefs"
					iconName="DollarSign"
					trend="+12%"
				/>
				<QuickStat
					title="Active Builds"
					value={safeProjects.length}
					description="Provisioned Projects"
					iconName="HardHat"
				/>

				<QuickStat
					title="Contract Value"
					value={`$${(activeBuildsValue / 1000).toFixed(0)}k`}
					description="In-progress Revenue"
					iconName="Briefcase"
				/>
			</div>

			{/* RECENT LEADS PREVIEW */}
			<div className="bg-[#0a0f1d] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
				<div className="p-10 border-b border-white/5 flex justify-between items-center">
					<h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
						Incoming Signal
					</h2>
					<Link
						href="/leads"
						className="text-xs font-black uppercase tracking-widest text-amber-500 hover:text-white transition-colors"
					>
						View Full Pipeline →
					</Link>
				</div>

				<div className="overflow-x-auto px-4 pb-4">
					<table className="w-full text-left border-separate border-spacing-y-2">
						<thead>
							<tr className="text-muted font-black uppercase text-[10px] tracking-[0.2em]">
								<th className="px-6 py-4">Origin</th>
								<th className="px-6 py-4">Scope</th>
								<th className="px-6 py-4 text-right pr-10">Action</th>
							</tr>
						</thead>
						<tbody>
							{activeLeads.slice(0, 5).map(lead => (
								<tr
									key={lead.id}
									className="bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
								>
									<td className="px-6 py-6 rounded-l-2xl">
										<div className="font-bold text-white group-hover:text-amber-500 transition-colors">
											{lead.client_name}
										</div>
										<div className="text-muted text-xs mt-1 uppercase tracking-tight font-medium">
											{lead.client_email}
										</div>
									</td>
									<td className="px-6 py-6">
										<div className="text-slate-300 font-bold text-sm uppercase tracking-wide">
											{lead.project_type || 'General'}
										</div>
										<div className="text-muted text-[10px] mt-1 font-black uppercase tracking-widest">
											{lead.budget || 'TBD'}
										</div>
									</td>
									<td className="px-6 py-6 text-right rounded-r-2xl pr-10">
										<Link
											href="/leads"
											className="inline-flex p-3 bg-white/5 rounded-xl text-muted hover:bg-amber-500 hover:text-slate-950 transition-all"
										>
											<ArrowRight size={16} />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
