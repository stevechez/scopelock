import { supabase } from '@/lib/supabase';
import {
	ArrowLeft,
	ShieldAlert,
	CreditCard,
	Activity,
	CalendarDays,
} from 'lucide-react';
import Link from 'next/link';
import { PulseForm } from './PulseForm';
import Image from 'next/image';

interface LogPhoto {
	id: string;
	photo_url: string;
}

interface DailyLog {
	id: string;
	job_id: string;
	notes: string;
	crew_member_name: string;
	created_at: string;
	log_photos?: LogPhoto[];
}

export default async function CrewLensPage({
	params,
}: {
	params: Promise<{ id: string }>; // Updated to Next.js 15 Promise type
}) {
	const { id: jobId } = await params;

	const { data: job } = await supabase
		.from('jobs')
		.select('*')
		.eq('id', jobId)
		.single();

	// Fetch logs and manually join photos
	const { data: rawLogs } = await supabase
		.from('daily_logs')
		.select('*, log_photos(*)')
		.eq('job_id', jobId)
		.order('created_at', { ascending: false });

	// Cast the logs to our strict type
	const logs = (rawLogs as DailyLog[]) || [];

	if (!job) return <div>Job not found</div>;

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
					<Link
						href={`/dashboard/jobs/${jobId}`}
						className="bg-white text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
					>
						<ShieldAlert size={16} /> ScopeLock
					</Link>
					<Link
						href={`/dashboard/jobs/${jobId}/payments`}
						className="bg-white text-slate-500 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
					>
						<CreditCard size={16} /> SiteDraft
					</Link>
					<div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md">
						<Activity size={16} /> CrewLens
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Left Column: Form */}
					<div className="md:col-span-1">
						<h3 className="text-lg font-black text-slate-900 tracking-tight">
							New Log
						</h3>
						<p className="text-xs text-slate-500 font-medium mt-1">
							Keep the client updated.
						</p>
						<PulseForm jobId={job.id} />
					</div>

					{/* Right Column: Log Feed */}
					<div className="md:col-span-2">
						<h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">
							Activity Feed
						</h3>

						<div className="space-y-6">
							{logs.length === 0 ? (
								<div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
									<p className="text-slate-500 text-sm font-medium">
										No site activity recorded yet.
									</p>
								</div>
							) : (
								logs.map((log: DailyLog) => (
									<div
										key={log.id}
										className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
									>
										{/* Display the first photo if it exists */}
										{log.log_photos && log.log_photos.length > 0 && (
											<div className="h-48 w-full bg-slate-200 relative">
												<Image
													src={log.log_photos[0].photo_url}
													alt="Site Photo"
													fill
													className="object-cover"
													sizes="(max-width: 768px) 100vw, 800px"
												/>
											</div>
										)}

										<div className="p-6">
											<div className="flex items-center gap-2 mb-3">
												<CalendarDays size={14} className="text-slate-400" />
												<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
													{new Date(log.created_at).toLocaleDateString()}
												</span>
											</div>
											<p className="text-slate-700 text-sm leading-relaxed font-medium">
												{log.notes}
											</p>
											<div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
												<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
													Crew: {log.crew_member_name}
												</span>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
