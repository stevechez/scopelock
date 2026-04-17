'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	DollarSign,
	Smartphone,
	CreditCard,
	Send,
	CheckCircle2,
	Landmark,
	MessageSquare,
	ShieldCheck,
} from 'lucide-react';
import AppShell from '@/components/dashboard/AppShell';

export default function PayRailSandbox() {
	const [amount, setAmount] = useState('25,000');
	const [milestone, setMilestone] = useState('Phase 2: Framing & Drywall');
	const [phone, setPhone] = useState('(555) 123-4567');
	const [isSent, setIsSent] = useState(false);

	const handleSend = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSent(true);
	};

	return (
		<AppShell>
			{/* HEADER */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
				<div>
					<div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">
						<span>Projects</span>{' '}
						<span className="text-slate-300 dark:text-slate-700">/</span>
						<span>The Coastal Build</span>{' '}
						<span className="text-slate-300 dark:text-slate-700">/</span>
						<span className="text-amber-500">PayRail™</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
						<CreditCard className="w-8 h-8 text-slate-400" />
						Instant Draw Request
					</h2>
				</div>

				{/* TRUST BADGE */}
				<div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full">
					<Landmark className="w-4 h-4 text-slate-500" />
					<span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
						ACH & Card Processing Enabled
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* LEFT COLUMN: THE GENERATOR */}
				<div className="space-y-8">
					<AnimatePresence mode="wait">
						{!isSent ? (
							<motion.div
								key="form"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm"
							>
								<h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
									Configure Payment Link
								</h3>

								<form onSubmit={handleSend} className="space-y-6">
									{/* AMOUNT INPUT (Massive) */}
									<div>
										<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
											Draw Amount
										</label>
										<div className="relative mt-1">
											<DollarSign className="w-8 h-8 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
											<input
												type="text"
												required
												value={amount}
												onChange={e => setAmount(e.target.value)}
												className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 text-4xl font-black text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all tracking-tighter"
											/>
										</div>
									</div>

									{/* MILESTONE */}
									<div>
										<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
											Milestone / Description
										</label>
										<input
											type="text"
											required
											value={milestone}
											onChange={e => setMilestone(e.target.value)}
											className="w-full mt-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-sm"
										/>
									</div>

									{/* PHONE NUMBER */}
									<div>
										<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 flex justify-between">
											<span>Client Mobile Number</span>
											<span className="text-emerald-500 flex items-center gap-1">
												<CheckCircle2 className="w-3 h-3" /> Verified
											</span>
										</label>
										<div className="relative mt-1">
											<Smartphone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
											<input
												type="text"
												required
												value={phone}
												onChange={e => setPhone(e.target.value)}
												className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-sm"
											/>
										</div>
									</div>

									<button
										type="submit"
										className="w-full bg-amber-500 text-slate-950 py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-400 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.2)]"
									>
										Transmit SMS Link <Send className="w-4 h-4" />
									</button>
								</form>
							</motion.div>
						) : (
							<motion.div
								key="success"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-12 shadow-inner flex flex-col items-center justify-center text-center h-full min-h-[400px]"
							>
								<div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
									<Send className="w-10 h-10 ml-1" />
								</div>
								<h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight mb-2">
									Transmission Sent
								</h3>
								<p className="text-slate-500 dark:text-slate-400 font-medium">
									Secure link dispatched to {phone}. You will be notified when
									the funds clear.
								</p>
								<button
									onClick={() => setIsSent(false)}
									className="mt-8 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
								>
									Send Another Request
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* RIGHT COLUMN: THE SMS PREVIEW (The "Wow" Factor) */}
				<div className="hidden lg:flex items-center justify-center relative">
					{/* Abstract background glow */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full pointer-events-none" />

					{/* THE PHONE MOCKUP */}
					<div className="w-[320px] h-[650px] bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col">
						{/* Dynamic Island Notch */}
						<div className="absolute top-0 inset-x-0 h-7 flex justify-center">
							<div className="w-24 h-6 bg-slate-800 rounded-b-2xl" />
						</div>

						{/* Phone Header */}
						<div className="pt-12 pb-4 px-6 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-center gap-2">
							<div className="w-8 h-8 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shrink-0">
								<ShieldCheck className="w-4 h-4" />
							</div>
							<div className="flex flex-col items-center">
								<span className="text-xs font-black text-white tracking-widest uppercase">
									PayRail
								</span>
								<span className="text-[9px] text-slate-400">
									Verified Sender
								</span>
							</div>
						</div>

						{/* Text Message Canvas */}
						<div className="flex-1 bg-slate-950 p-4 flex flex-col justify-end gap-2">
							<p className="text-[10px] text-slate-500 text-center font-medium mb-2">
								Today{' '}
								{new Date().toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>

							{/* The Bubble */}
							<motion.div
								layout
								className="bg-slate-800 text-white p-4 rounded-2xl rounded-bl-sm max-w-[85%] border border-slate-700 shadow-sm"
							>
								<div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-slate-700">
									<MessageSquare className="w-3 h-3 text-amber-500" />
									<span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
										Secure Request
									</span>
								</div>
								<p className="text-sm font-medium leading-relaxed mb-4">
									<strong className="text-amber-500">
										Steve Chez Construction
									</strong>{' '}
									has requested a milestone payment of{' '}
									<strong className="text-white">${amount || '0'}</strong> for:
									<br />
									<br />
									<span className="italic text-slate-300">
										{milestone || '[Milestone]'}
									</span>
								</p>
								<div className="bg-amber-500 text-slate-950 text-center py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest cursor-pointer shadow-sm">
									Tap to Pay via Bank / ACH
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</AppShell>
	);
}
