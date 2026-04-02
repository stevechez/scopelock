import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { PayButton } from '@/components/PayButton';

// --- TYPES TO PREVENT ERRORS ---
interface LogPhoto {
	id: string;
	photo_url: string;
}

interface DailyLog {
	id: string;
	notes: string;
	created_at: string;
	log_photos: LogPhoto[];
}

interface BlueprintJob {
	title: string;
	daily_logs: DailyLog[];
}

interface MilestoneData {
	id: string;
	title: string;
	amount: number;
	status: string;
	proof_image_url: string | null;
	jobs: BlueprintJob;
}

export default async function PublicPaymentPage({
	params,
}: {
	params: Promise<{ milestoneId: string }>;
}) {
	const { milestoneId } = await params;

	// 1. Fetch Milestone, the Job, and ALL Daily Logs (with photos)
	const { data, error } = await supabase
		.from('milestones')
		.select(
			`
            id, title, amount, status, proof_image_url,
            jobs (
                title,
                daily_logs (
                    id, notes, created_at,
                    log_photos (id, photo_url)
                )
            )
        `,
		)
		.eq('id', milestoneId)
		.single();

	if (error || !data) return notFound();

	// Cast the data to our interface
	const milestone = data as unknown as MilestoneData;

	// 2. Sort logs by newest first
	const logs =
		milestone.jobs.daily_logs?.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		) || [];

	const isPaid = milestone.status === 'paid';

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pb-20">
			{/* Brand Header */}
			<div className="w-full max-w-md flex justify-between items-center mb-8">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
						<ShieldCheck className="text-white" size={18} />
					</div>
					<span className="font-bold text-slate-900 tracking-tight">
						BlueprintOS
					</span>
				</div>
				<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
					Secure Portal
				</span>
			</div>

			<div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
				{/* Main Proof of Work Image */}
				<div className="relative h-72 bg-slate-200">
					{milestone.proof_image_url ? (
						<img
							src={milestone.proof_image_url}
							alt="Proof of work"
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="flex items-center justify-center h-full text-slate-400 italic text-sm p-10 text-center">
							Awaiting completion photo...
						</div>
					)}
					<div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
						Completion Proof
					</div>
				</div>

				<div className="p-8">
					<div className="mb-8">
						<h2 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
							Current Request
						</h2>
						<h1 className="text-3xl font-black text-slate-900 leading-tight">
							{milestone.title}
						</h1>
						<p className="text-slate-500 font-medium mt-1">
							{milestone.jobs.title}
						</p>
					</div>

					{/* --- PROJECT PULSE FEED (The Social Proof) --- */}
					<div className="mb-10">
						<div className="flex items-center gap-2 mb-6">
							<h2 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
								Project Progress
							</h2>
							<div className="h-px flex-1 bg-slate-100"></div>
						</div>

						{logs.length === 0 ? (
							<p className="text-slate-400 text-sm italic text-center py-4">
								Project timeline beginning...
							</p>
						) : (
							<div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
								{logs.map(log => (
									<div key={log.id} className="relative pl-10">
										{/* Timeline Icon */}
										<div className="absolute left-0 top-0 w-9 h-9 bg-white border border-slate-100 rounded-full flex items-center justify-center z-10 shadow-sm">
											<Clock size={14} className="text-slate-400" />
										</div>

										<div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
											<span className="text-[10px] font-bold text-slate-400 uppercase">
												{new Date(log.created_at).toLocaleDateString(
													undefined,
													{
														month: 'short',
														day: 'numeric',
													},
												)}
											</span>
											<p className="text-slate-700 text-sm leading-relaxed mt-1 mb-3">
												{log.notes}
											</p>

											<div className="grid grid-cols-2 gap-2">
												{log.log_photos?.map(photo => (
													<div
														key={photo.id}
														className="aspect-video rounded-xl overflow-hidden border border-slate-200"
													>
														<img
															src={photo.photo_url}
															alt="Progress"
															className="w-full h-full object-cover"
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* --- FINANCIAL CALL TO ACTION --- */}
					<div className="bg-slate-900 rounded-3xl p-6 mb-8 text-center">
						<span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
							Amount Due
						</span>
						<div className="text-4xl font-black text-white mt-1">
							$
							{Number(milestone.amount).toLocaleString(undefined, {
								minimumFractionDigits: 2,
							})}
						</div>
					</div>

					{isPaid ? (
						<div className="w-full bg-emerald-50 text-emerald-700 font-bold py-6 rounded-2xl flex items-center justify-center gap-3 border-2 border-emerald-100 shadow-sm">
							<CheckCircle2 size={24} />
							Payment Confirmed
						</div>
					) : (
						<PayButton milestoneId={milestoneId} />
					)}

					<p className="text-center text-slate-400 text-[10px] mt-8 leading-relaxed px-4">
						Securely processed via <strong>Lemon Squeezy</strong>. <br />
						BlueprintOS uses 256-bit encryption to protect your data.
					</p>
				</div>
			</div>
		</div>
	);
}
