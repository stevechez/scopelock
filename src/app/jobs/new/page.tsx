import { supabase } from '@/lib/supabase';
import {
	DollarSign,
	Camera,
	ArrowRight,
	Zap,
	TrendingUp,
	Activity,
} from 'lucide-react';
import Link from 'next/link';

// --- TYPES ---
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
	jobs: { title: string };
}

export default async function WorldClassDashboard() {
	const { data: pulseData } = await supabase
		.from('daily_logs')
		.select('id, notes, created_at, jobs(title), log_photos(photo_url)')
		.order('created_at', { ascending: false })
		.limit(3);

	const { data: paymentData } = await supabase
		.from('milestones')
		.select('id, title, amount, status, jobs(title)')
		.order('updated_at', { ascending: false })
		.limit(4);

	const pulses = (pulseData as unknown as DashboardPulse[]) || [];
	const payments = (paymentData as unknown as DashboardPayment[]) || [];

	return (
		<div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
			{/* 1. Ultra-Minimal Header */}
			<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
						<Zap size={14} className="text-white fill-white" />
					</div>
					<span className="font-black text-lg tracking-tight italic">
						Blueprint
						<span className="text-slate-400 font-medium not-italic">OS</span>
					</span>
				</div>
				<div className="w-8 h-8 bg-slate-200 rounded-full border border-white shadow-sm overflow-hidden">
					<div className="w-full h-full bg-gradient-to-tr from-slate-400 to-slate-200" />
				</div>
			</header>

			<main className="max-w-xl mx-auto px-6 pt-8 space-y-10">
				{/* 2. Executive Summary (The "Pulse") */}
				<section className="grid grid-cols-2 gap-4">
					<div className="bg-white border border-slate-200 p-5 rounded-[2rem] shadow-sm">
						<div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
							<TrendingUp size={16} className="text-emerald-600" />
						</div>
						<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							Active Revenue
						</p>
						<p className="text-2xl font-black text-slate-900 mt-1">$42.8k</p>
					</div>
					<div className="bg-white border border-slate-200 p-5 rounded-[2rem] shadow-sm">
						<div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mb-3">
							<Activity size={16} className="text-blue-600" />
						</div>
						<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
							Active Jobs
						</p>
						<p className="text-2xl font-black text-slate-900 mt-1">12</p>
					</div>
				</section>

				{/* 3. SitePulse Stream (High-End Media Cards) */}
				<section>
					<div className="flex justify-between items-center mb-5">
						<h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
							<Camera size={16} /> Field Activity
						</h2>
						<Link
							href="/dashboard/jobs"
							className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors"
						>
							View All
						</Link>
					</div>

					<div className="space-y-6">
						{pulses.map(pulse => (
							<div key={pulse.id} className="group cursor-pointer">
								<div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-200 bg-slate-200 transition-transform duration-500 active:scale-[0.98]">
									{pulse.log_photos?.[0] ? (
										<img
											src={pulse.log_photos[0].photo_url}
											className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
											alt=""
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center text-slate-400 italic text-sm font-medium">
											Awaiting photo...
										</div>
									)}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
									<div className="absolute bottom-6 left-6 right-6">
										<p className="text-[10px] font-bold text-white/70 uppercase tracking-tighter mb-1">
											{pulse.jobs.title}
										</p>
										<p className="text-white font-bold text-lg leading-tight line-clamp-1">
											&ldquo;{pulse.notes}&rdquo;
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 4. PayRail Logic (Clean Transaction List) */}
				<section>
					<h2 className="text-sm font-black text-slate-900 mb-5 flex items-center gap-2">
						<DollarSign size={16} /> Pending Capital
					</h2>
					<div className="bg-white border border-slate-200 rounded-[2.5rem] p-2 shadow-sm">
						{payments.map((m, i) => (
							<div
								key={m.id}
								className={`flex items-center justify-between p-5 ${i !== payments.length - 1 ? 'border-b border-slate-100' : ''}`}
							>
								<div className="flex items-center gap-4">
									<div
										className={`w-10 h-10 rounded-2xl flex items-center justify-center ${m.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}
									>
										<DollarSign size={20} />
									</div>
									<div>
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
											{m.jobs.title}
										</p>
										<h4 className="font-bold text-slate-900 text-sm">
											{m.title}
										</h4>
									</div>
								</div>
								<div className="text-right">
									<p className="font-black text-slate-900 text-sm">
										${Number(m.amount).toLocaleString()}
									</p>
									<div
										className={`text-[9px] font-bold uppercase inline-block px-2 py-0.5 rounded-full mt-1 ${m.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
									>
										{m.status}
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>

			{/* 5. The "Action Bar" (High UX Float) */}
			<nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm">
				<div className="bg-slate-900/90 backdrop-blur-2xl rounded-full p-2 shadow-2xl border border-white/10 flex items-center justify-between">
					<Link
						href="/dashboard"
						className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
					>
						<Activity size={20} />
					</Link>
					<Link
						href="/dashboard/jobs/new"
						className="flex-1 bg-white text-slate-900 h-12 rounded-full flex items-center justify-center font-black text-sm gap-2 active:scale-95 transition-transform"
					>
						<Plus size={18} /> INITIALIZE JOB
					</Link>
					<Link
						href="/dashboard/settings"
						className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors"
					>
						<TrendingUp size={20} />
					</Link>
				</div>
			</nav>
		</div>
	);
}

// Minimal Icons for the Nav
function Plus({ size }: { size: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 5v14M5 12h14" />
		</svg>
	);
}
