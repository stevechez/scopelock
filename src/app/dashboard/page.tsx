import { supabase } from '@/lib/supabase';
import { DollarSign, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// --- TYPES TO KILL THE ERRORS ---
interface DashboardPulse {
	id: string;
	notes: string;
	created_at: string;
	jobs: { title: string };
	log_photos: { photo_url: string }[];
}

interface DashboardPayment {
	id: string;
	title: string;
	amount: number;
	status: string;
	updated_at: string;
	jobs: { title: string };
}

export default async function ContractorDashboard() {
	// 1. Fetch recent Pulses
	const { data: pulseData } = await supabase
		.from('daily_logs')
		.select('id, notes, created_at, jobs(title), log_photos(photo_url)')
		.order('created_at', { ascending: false })
		.limit(5);

	// 2. Fetch recent Payments/Invoices
	const { data: paymentData } = await supabase
		.from('milestones')
		.select('id, title, amount, status, updated_at, jobs(title)')
		.order('updated_at', { ascending: false })
		.limit(5);

	// Cast data to our interfaces safely
	const pulses = (pulseData as unknown as DashboardPulse[]) || [];
	const payments = (paymentData as unknown as DashboardPayment[]) || [];

	return (
		<div className="flex-1 bg-slate-50 min-h-screen pb-32">
			<header className="p-6 bg-white border-b border-slate-100 shadow-sm">
				<h1 className="text-2xl font-black text-slate-900 text-center tracking-tighter">
					BlueprintOS
				</h1>
			</header>

			<div className="p-4 space-y-8">
				{/* Section: Revenue Pulse */}
				<section>
					<div className="flex justify-between items-end mb-4 px-2">
						<h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							Recent Cash Flow
						</h2>
						<span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
							Live
						</span>
					</div>

					<div className="space-y-3">
						{payments.length === 0 ? (
							<div className="p-8 text-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-medium">
								No payment activity yet
							</div>
						) : (
							payments.map(m => (
								<div
									key={m.id}
									className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform"
								>
									<div className="flex items-center gap-3">
										<div
											className={`p-2 rounded-xl ${m.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}
										>
											<DollarSign size={20} />
										</div>
										<div>
											<p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
												{m.jobs?.title || 'Untitled Job'}
											</p>
											<h3 className="font-bold text-slate-900 text-sm leading-tight">
												{m.title}
											</h3>
										</div>
									</div>
									<div className="text-right">
										<p className="font-black text-slate-900 text-sm">
											${Number(m.amount).toLocaleString()}
										</p>
										<p
											className={`text-[9px] font-bold uppercase ${m.status === 'paid' ? 'text-emerald-500' : 'text-slate-400'}`}
										>
											{m.status}
										</p>
									</div>
								</div>
							))
						)}
					</div>
				</section>

				{/* Section: Field Activity (SitePulse) */}
				<section>
					<div className="flex justify-between items-end mb-4 px-2">
						<h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							Field Activity
						</h2>
					</div>

					<div className="space-y-4">
						{pulses.length === 0 ? (
							<div className="p-8 text-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-medium">
								Awaiting first daily pulse...
							</div>
						) : (
							pulses.map(pulse => (
								<div
									key={pulse.id}
									className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
								>
									<div className="p-4 flex items-center justify-between border-b border-slate-50">
										<div>
											<p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
												{pulse.jobs?.title || 'Untitled Job'}
											</p>
											<p className="text-[9px] font-bold text-slate-400">
												{new Date(pulse.created_at).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})}
											</p>
										</div>
										<Camera size={14} className="text-slate-300" />
									</div>

									{pulse.log_photos?.[0] && (
										<div className="aspect-video w-full bg-slate-100">
											<img
												src={pulse.log_photos[0].photo_url}
												className="w-full h-full object-cover"
												alt="Progress"
											/>
										</div>
									)}

									<div className="p-4">
										<p className="text-sm text-slate-700 leading-snug font-medium italic">
											&ldquo;{pulse.notes}&rdquo;
										</p>
									</div>
								</div>
							))
						)}
					</div>
				</section>
			</div>

			{/* Float Action Button */}
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
				<Link
					href="/dashboard/jobs/new"
					className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 active:scale-95 transition-all hover:bg-slate-800 whitespace-nowrap"
				>
					New Job <ArrowRight size={18} />
				</Link>
			</div>
		</div>
	);
}
