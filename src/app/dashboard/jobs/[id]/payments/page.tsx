import { supabase } from '@/lib/supabase';
import { ArrowLeft, CheckCircle2, CircleDashed, Clock } from 'lucide-react';
import Link from 'next/link';
import { NewMilestoneForm, RequestPaymentButton } from './ClientComponents';

type Milestone = {
	id: string;
	title: string;
	dueDate?: string;
	completed: boolean;
	amount: number;
	status: 'pending' | 'invoiced' | 'paid';
};

export default async function PaymentsPage({
	params,
}: {
	params: { id: string };
}) {
	// Note: In Next.js 15+, params is a Promise. We await it to be safe.
	const { id: jobId } = await params;

	// Fetch Job Info
	const { data: job } = await supabase
		.from('jobs')
		.select('*')
		.eq('id', jobId)
		.single();

	// Fetch Milestones
	const { data: milestones } = await supabase
		.from('milestones')
		.select('*')
		.eq('job_id', jobId)
		.order('created_at', { ascending: true });

	if (!job) return <div>Job not found</div>;

	return (
		<div className="min-h-screen bg-[#F8FAFC] pb-32">
			{/* Header */}
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
						PayRail™ Portal
					</p>
				</div>
			</header>

			<main className="max-w-2xl mx-auto px-6 pt-10 space-y-8">
				{/* Contract Summary */}
				<div className="bg-slate-900 rounded-[2rem] p-8 text-black shadow-xl">
					<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
						Total Contract Value
					</p>
					<h1 className="text-4xl font-black text-black">
						${job.base_contract_value.toLocaleString()}
					</h1>
					<p className="text-sm text-slate-400 mt-4 text-black font-medium">
						Client Phone: {job.client_phone}
					</p>
				</div>

				{/* Milestones List */}
				<div>
					<h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">
						Milestones
					</h3>

					{!milestones || milestones.length === 0 ? (
						<div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center">
							<p className="text-slate-500 text-sm font-medium">
								No milestones created yet. Add your first payment milestone
								below.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{milestones.map((ms: Milestone) => (
								<div
									key={ms.id}
									className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
								>
									<div className="flex items-center gap-4">
										{ms.status === 'paid' ? (
											<CheckCircle2 className="text-emerald-500" size={24} />
										) : ms.status === 'invoiced' ? (
											<Clock className="text-amber-500" size={24} />
										) : (
											<CircleDashed className="text-slate-300" size={24} />
										)}
										<div>
											<h4 className="font-black text-slate-900">{ms.title}</h4>
											<div className="flex items-center gap-2 mt-1">
												<span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
													${ms.amount.toLocaleString()}
												</span>
												<span
													className={`text-[10px] font-bold uppercase tracking-widest ${
														ms.status === 'paid'
															? 'text-emerald-500'
															: ms.status === 'invoiced'
																? 'text-amber-500'
																: 'text-slate-400'
													}`}
												>
													• {ms.status}
												</span>
											</div>
										</div>
									</div>

									{ms.status === 'pending' && (
										<RequestPaymentButton milestoneId={ms.id} jobId={job.id} />
									)}
								</div>
							))}
						</div>
					)}
				</div>

				{/* Add Milestone Form */}
				<NewMilestoneForm jobId={job.id} />
			</main>
		</div>
	);
}
