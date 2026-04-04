import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import {
	ArrowLeft,
	ShieldAlert,
	CreditCard,
	Activity,
	CheckCircle2,
	XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ScopeLockForm } from './ScopeLockForm';
import { QuickChangeTrigger } from '@/components/QuickChangeTrigger';

interface ChangeOrder {
	id: string;
	job_id: string;
	description: string;
	price: number; // Supabase decimals sometimes return as strings, but typing as number is standard here
	status: 'pending' | 'approved' | 'rejected';
	created_at: string;
}

export default async function JobDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// 1. Await params for Next.js 15 compatibility
	const resolvedParams = await params;
	const jobId = resolvedParams.id;

	// 2. Fetch Job Data
	const { data: job, error: jobError } = await supabase
		.from('jobs')
		.select('*')
		.eq('id', jobId)
		.single();

	if (jobError || !job) return notFound();

	// 3. Fetch Scope Items & Change Orders
	const { data: scopeItems } = await supabase
		.from('scope_items')
		.select('*')
		.eq('job_id', jobId)
		.order('created_at', { ascending: true });

	const { data: changes } = await supabase
		.from('change_orders')
		.select('*')
		.eq('job_id', jobId)
		.order('created_at', { ascending: false });

	const totalChanges =
		changes?.reduce((sum, order) => sum + Number(order.price), 0) || 0;
	const newContractValue = Number(job.base_contract_value) + totalChanges;

	return (
		<div className="min-h-screen bg-[#F8FAFC] pb-32 relative flex flex-col">
			<header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
				<Link
					href="/dashboard"
					className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
				>
					<ArrowLeft size={14} /> Command Center
				</Link>
				<div className="text-right">
					<h2 className="text-sm font-black text-slate-900 leading-none">
						{job.title}
					</h2>
					<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
						Project Hub
					</p>
				</div>
			</header>

			<main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-10 space-y-8 pb-32">
				{/* Module Navigation */}
				<div className="flex gap-4">
					<div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
						<ShieldAlert size={16} /> ScopeLock
					</div>
					<Link
						href={`/dashboard/jobs/${jobId}/payments`}
						className="bg-white text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
					>
						<CreditCard size={16} /> SiteDraft
					</Link>
					<Link
						href={`/dashboard/jobs/${jobId}/pulse`}
						className="bg-white text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
					>
						<Activity size={16} /> CrewLens
					</Link>
				</div>

				{/* Scope Dashboard Header */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
						<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
							Base Contract
						</p>
						<h2 className="text-3xl font-black text-slate-900">
							${Number(job.base_contract_value).toLocaleString()}
						</h2>
					</div>
					<div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
						<div className="relative z-10">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
								Adjusted Contract Value
							</p>
							<h2 className="text-3xl font-black text-emerald-400">
								${newContractValue.toLocaleString()}
							</h2>
							<p className="text-xs font-bold text-slate-400 mt-2">
								+{totalChanges.toLocaleString()} in Scope Changes
							</p>
						</div>
					</div>
				</div>

				{/* Scope Action Area */}
				<div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
					<h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">
						Original Scope & Changes
					</h3>

					{/* The original Scope Items list */}
					<div className="mb-8">
						<h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
							Base Scope Items
						</h4>
						{scopeItems?.length === 0 ? (
							<p className="text-slate-400 italic text-sm">
								No initial scope items recorded.
							</p>
						) : (
							<ul className="space-y-3">
								{scopeItems?.map(item => (
									<li
										key={item.id}
										className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100"
									>
										{item.is_included ? (
											<CheckCircle2
												className="text-emerald-500 shrink-0"
												size={18}
											/>
										) : (
											<XCircle className="text-red-400 shrink-0" size={18} />
										)}
										<span
											className={`text-sm font-medium ${item.is_included ? 'text-slate-700' : 'text-slate-400 line-through'}`}
										>
											{item.description}
										</span>
									</li>
								))}
							</ul>
						)}
					</div>

					<hr className="border-slate-100 mb-8" />

					{/* The New Change Orders System */}
					<div>
						<h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
							Approved Changes
						</h4>
						<ScopeLockForm jobId={job.id} />

						<div className="mt-6 space-y-3">
							{!changes || changes.length === 0 ? (
								<p className="text-slate-500 text-sm font-medium text-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
									No scope changes recorded yet.
								</p>
							) : (
								changes.map((change: ChangeOrder) => (
									<div
										key={change.id}
										className="bg-slate-50 p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
									>
										<div>
											<h4 className="font-bold text-slate-900 text-sm">
												{change.description}
											</h4>
											<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
												Status: {change.status}
											</p>
										</div>
										<span className="bg-emerald-100 text-emerald-700 font-black px-3 py-1 rounded-lg text-sm">
											+ ${Number(change.price).toLocaleString()}
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</main>

			{/* Keeping your QuickChangeTrigger at the bottom */}
			<div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent pt-10 pointer-events-none z-40">
				<div className="max-w-4xl mx-auto pointer-events-auto">
					<QuickChangeTrigger jobId={job.id} />
				</div>
			</div>
		</div>
	);
}
