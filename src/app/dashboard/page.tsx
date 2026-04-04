import { supabase } from '@/lib/supabase';
import {
	DollarSign,
	Camera,
	ArrowRight,
	Zap,
	Globe,
	Wrench,
} from 'lucide-react';
import Link from 'next/link';

// --- INTERFACES ---
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

export default async function CommandCenter() {
	// 1. Fetch live data for the feeds
	const { data: pulseData } = await supabase
		.from('daily_logs')
		.select('id, notes, created_at, jobs(title), log_photos(photo_url)')
		.order('created_at', { ascending: false })
		.limit(3);

	const { data: paymentData } = await supabase
		.from('milestones')
		.select('id, title, amount, status, updated_at, jobs(title)')
		.order('updated_at', { ascending: false })
		.limit(3);

	const pulses = (pulseData as unknown as DashboardPulse[]) || [];
	const payments = (paymentData as unknown as DashboardPayment[]) || [];

	return (
		<div className="flex-1 bg-slate-50 min-h-screen pb-32">
			{/* HEADER */}
			<header className="p-6 bg-white border-b border-slate-100 shadow-sm flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-black text-slate-900 tracking-tighter">
						Command Center
					</h1>
					<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
						System Online
					</p>
				</div>
				<div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
					<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{' '}
					Live
				</div>
			</header>

			<div className="max-w-5xl mx-auto p-4 md:p-8 space-y-12">
				{/* 1. THE LAUNCHPAD (Merged from Blueprint) */}
				<section>
					<h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
						Core Modules
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* MODULE 1: COMM VAULT */}
						<Link href="/dashboard/vault" className="group block">
							<div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-amber-500 transition-all shadow-sm hover:shadow-xl h-full flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
										<Zap size={24} />
									</div>
									<h2 className="text-lg font-black text-slate-900 mb-2">
										Comm Vault
									</h2>
									<p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
										AI sales scripts, proposals, and automated follow-ups.
									</p>
								</div>
								<div className="text-amber-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
									Open Vault <ArrowRight size={16} />
								</div>
							</div>
						</Link>

						{/* MODULE 2: PROJECT COMMAND */}
						<Link href="/dashboard/jobs" className="group block">
							<div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 transition-all shadow-sm hover:shadow-xl h-full flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
										<Wrench size={24} />
									</div>
									<h2 className="text-lg font-black text-slate-900 mb-2">
										Project Command
									</h2>
									<p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
										ScopeLock changes, SiteDraft payments, and active jobs.
									</p>
								</div>
								<div className="text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
									View Projects <ArrowRight size={16} />
								</div>
							</div>
						</Link>

						{/* MODULE 3: SITE ENGINE */}
						<a
							href="https://sites.blueprintos.com"
							target="_blank"
							rel="noreferrer"
							className="group block"
						>
							<div className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 transition-all shadow-sm hover:shadow-xl h-full flex flex-col justify-between">
								<div>
									<div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
										<Globe size={24} />
									</div>
									<h2 className="text-lg font-black text-slate-900 mb-2">
										Site Engine
									</h2>
									<p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
										Manage your marketing site, portfolio, and lead capture.
									</p>
								</div>
								<div className="text-emerald-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
									Edit Website <span className="text-lg leading-none">↗</span>
								</div>
							</div>
						</a>
					</div>
				</section>

				{/* 2. THE LIVE FEEDS (Merged from ScopeLock) */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* FEED A: SITEDRAFT PAYMENTS */}
					<section>
						<div className="flex justify-between items-end mb-4 px-2">
							<h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
								Cash Flow (SiteDraft)
							</h2>
						</div>
						<div className="space-y-3">
							{payments.length === 0 ? (
								<div className="p-8 text-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-medium bg-white">
									No payment activity yet
								</div>
							) : (
								payments.map(m => (
									<div
										key={m.id}
										className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
									>
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-xl ${m.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}
											>
												<DollarSign size={18} />
											</div>
											<div>
												<p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
													{m.jobs?.title || 'Untitled Job'}
												</p>
												<h3 className="font-bold text-slate-900 text-sm leading-tight truncate max-w-[120px]">
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

					{/* FEED B: CREWLENS ACTIVITY */}
					<section>
						<div className="flex justify-between items-end mb-4 px-2">
							<h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
								Field Ops (CrewLens)
							</h2>
						</div>
						<div className="space-y-4">
							{pulses.length === 0 ? (
								<div className="p-8 text-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl text-xs font-medium bg-white">
									Awaiting first daily log...
								</div>
							) : (
								pulses.map(pulse => (
									<div
										key={pulse.id}
										className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex"
									>
										{/* Thumbnail (if photo exists) */}
										{pulse.log_photos?.[0] ? (
											<div className="w-24 shrink-0 bg-slate-100">
												<img
													src={pulse.log_photos[0].photo_url}
													className="w-full h-full object-cover"
													alt="Progress"
												/>
											</div>
										) : (
											<div className="w-24 shrink-0 bg-slate-50 flex items-center justify-center border-r border-slate-100">
												<Camera size={20} className="text-slate-300" />
											</div>
										)}
										{/* Details */}
										<div className="p-4 flex-1 min-w-0">
											<div className="flex items-start justify-between mb-2">
												<p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter truncate pr-2">
													{pulse.jobs?.title || 'Untitled Job'}
												</p>
												<p className="text-[9px] font-bold text-slate-300 shrink-0">
													{new Date(pulse.created_at).toLocaleTimeString([], {
														hour: '2-digit',
														minute: '2-digit',
													})}
												</p>
											</div>
											<p className="text-sm text-slate-700 leading-snug font-medium italic truncate">
												&ldquo;{pulse.notes}&rdquo;
											</p>
										</div>
									</div>
								))
							)}
						</div>
					</section>
				</div>
			</div>

			{/* Quick Action FAB */}
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
				<Link
					href="/dashboard/jobs/new"
					className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2 active:scale-95 transition-all hover:bg-slate-800 whitespace-nowrap"
				>
					New Project <ArrowRight size={18} />
				</Link>
			</div>
		</div>
	);
}
