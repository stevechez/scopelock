import { CheckCircle2, XCircle } from 'lucide-react';
import { QuickChangeTrigger } from '@/components/QuickChangeTrigger';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// 1. Notice how params is now typed as a Promise
export default async function JobDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// 2. We await the params before extracting the ID!
	const resolvedParams = await params;
	const jobId = resolvedParams.id;

	// 3. Fetch the Job using the awaited ID
	const { data: job, error: jobError } = await supabase
		.from('jobs')
		.select('*')
		.eq('id', jobId)
		.single();

	if (jobError || !job) return notFound();

	// 4. Fetch the Scope Items using the awaited ID
	const { data: scopeItems } = await supabase
		.from('scope_items')
		.select('*')
		.eq('job_id', jobId)
		.order('created_at', { ascending: true });

	return (
		<div className="flex-1 flex flex-col h-full bg-white relative">
			<header className="px-6 py-5 border-b border-slate-100">
				<h1 className="text-2xl font-bold text-slate-900">Project Details</h1>
				<p className="text-slate-500 font-medium">
					Base Contract: ${Number(job.base_contract_value).toLocaleString()}
				</p>
			</header>

			<div className="flex-1 overflow-y-auto p-6 pb-32">
				<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
					Locked Scope
				</h2>
				{scopeItems?.length === 0 ? (
					<p className="text-slate-400 italic">No scope items added yet.</p>
				) : (
					<ul className="space-y-4">
						{scopeItems?.map(item => (
							<li key={item.id} className="flex items-start gap-3">
								{item.is_included ? (
									<CheckCircle2
										className="text-emerald-500 shrink-0 mt-0.5"
										size={20}
									/>
								) : (
									<XCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
								)}
								<span
									className={
										item.is_included
											? 'text-slate-700'
											: 'text-slate-400 line-through'
									}
								>
									{item.description}
								</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-10 pointer-events-none">
				<div className="pointer-events-auto">
					<QuickChangeTrigger jobId={job.id} />
				</div>
			</div>
		</div>
	);
}
