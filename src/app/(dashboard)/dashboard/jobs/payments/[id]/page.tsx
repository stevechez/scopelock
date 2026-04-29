import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock } from 'lucide-react';
import { AddMilestoneForm } from '@/components/AddMilestoneForm';
import { SubmitProofButton } from '@/components/SubmitProofButton';

export default async function JobPaymentsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolvedParams = await params;
	const jobId = resolvedParams.id;

	// 1. Fetch the Job and its Change Orders to calculate the TRUE contract value
	const { data: job, error: jobError } = await supabase
		.from('jobs')
		.select('*, change_orders(*)')
		.eq('id', jobId)
		.single();

	if (jobError || !job) return notFound();

	// 2. Fetch existing milestones
	const { data: milestones } = await supabase
		.from('milestones')
		.select('*')
		.eq('job_id', jobId)
		.order('created_at', { ascending: true });

	// 3. Calculate Financials
	let totalApprovedChanges = 0;

	// Using the strict type we added earlier
	job.change_orders?.forEach((co: { status: string; price: number }) => {
		if (co.status === 'approved') {
			totalApprovedChanges += Number(co.price);
		}
	});

	const trueContractValue =
		Number(job.base_contract_value) + totalApprovedChanges;

	const totalAllocated =
		milestones?.reduce((sum, m) => sum + Number(m.amount), 0) || 0;
	const remainingToAllocate = trueContractValue - totalAllocated;

	return (
		<div className="flex-1 flex flex-col h-full bg-slate-50 relative pb-32">
			{/* Header */}
			<header className="px-6 py-5 bg-white border-b border-border shadow-sm">
				<h1 className="text-2xl font-bold text-foreground">Payment Schedule</h1>
				<p className="text-muted font-medium">
					Total Value: $
					{trueContractValue.toLocaleString(undefined, {
						minimumFractionDigits: 2,
					})}
				</p>
				{remainingToAllocate > 0 && (
					<div className="mt-3 inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200">
						${remainingToAllocate.toLocaleString()} Left to Allocate
					</div>
				)}
			</header>

			{/* Milestones List */}
			<div className="p-6 space-y-4 overflow-y-auto">
				{milestones?.length === 0 ? (
					<div className="text-center p-8 text-muted border-2 border-dashed border-border rounded-2xl bg-white">
						No payment milestones set up yet.
					</div>
				) : (
					milestones?.map(milestone => (
						<div
							key={milestone.id}
							className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col gap-3"
						>
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-bold text-foreground">
										{milestone.title}
									</h3>
									<p className="text-xl font-black text-slate-700 mt-1">
										$
										{Number(milestone.amount).toLocaleString(undefined, {
											minimumFractionDigits: 2,
										})}
									</p>
								</div>
								{/* Dynamic Status Badge */}
								{milestone.status === 'paid' ? (
									<span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
										<CheckCircle2 size={12} /> Paid
									</span>
								) : milestone.status === 'pending' ? (
									<span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
										<Clock size={12} /> Pending Work
									</span>
								) : (
									<span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
										Invoiced
									</span>
								)}
							</div>

							{/* The Intelligent Camera Button Component */}
							{milestone.status === 'pending' && (
								<SubmitProofButton milestoneId={milestone.id} jobId={jobId} />
							)}
						</div>
					))
				)}
			</div>

			{/* Add Milestone Form Component */}
			{remainingToAllocate > 0 && (
				<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-10">
					<AddMilestoneForm jobId={jobId} remaining={remainingToAllocate} />
				</div>
			)}
		</div>
	);
}
