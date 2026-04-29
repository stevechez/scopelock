'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ShieldAlert,
	Lock,
	Clock,
	DollarSign,
	CheckCircle2,
	FileSignature,
	ArrowRight,
	AlertTriangle,
} from 'lucide-react';
import AppShell from '@/components/dashboard/AppShell';

export default function ScopeLockSandbox() {
	const [signature, setSignature] = useState('');
	const [isApproved, setIsApproved] = useState(false);

	const handleApprove = (e: React.FormEvent) => {
		e.preventDefault();
		if (signature.trim().length > 2) {
			setIsApproved(true);
		}
	};

	return (
		<AppShell>
			{/* BREADCRUMBS & STATUS */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
				<div>
					<div className="flex items-center gap-2 text-sm font-bold text-muted mb-2 uppercase tracking-widest">
						<span>Projects</span>{' '}
						<span className="text-slate-300 dark:text-slate-700">/</span>
						<span>The Coastal Build</span>{' '}
						<span className="text-slate-300 dark:text-slate-700">/</span>
						<span className="text-amber-500">ScopeLock™</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-black text-foreground text-foreground tracking-tight">
						Change Order #04
					</h2>
				</div>

				{/* STATUS BADGE */}
				<div
					className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${
						isApproved
							? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
							: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-500'
					}`}
				>
					{isApproved ? (
						<CheckCircle2 className="w-5 h-5" />
					) : (
						<ShieldAlert className="w-5 h-5 animate-pulse" />
					)}
					<span className="font-black text-xs uppercase tracking-widest">
						{isApproved ? 'Approved & Locked' : 'Action Required'}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT COLUMN: THE DETAILS */}
				<div className="lg:col-span-2 space-y-6">
					{/* SCOPE DESCRIPTION */}
					<div className="bg-background text-foreground border border-border border-border rounded-3xl p-8 shadow-sm">
						<h3 className="text-lg font-black text-foreground text-foreground uppercase tracking-tight mb-6 flex items-center gap-2">
							<FileSignature className="w-5 h-5 text-muted" />
							Revised Scope of Work
						</h3>
						<div className="space-y-4">
							<h4 className="text-xl font-bold text-foreground text-foreground">
								Master Bath: Upgrade to Calacatta Gold Marble
							</h4>
							<p className="text-muted dark:text-muted font-medium leading-relaxed">
								Client requested to upgrade the standard porcelain shower tile
								to premium Calacatta Gold Marble. This change order covers the
								increased material cost, the specialized fabrication required
								for large-format natural stone, and the additional waterproofing
								membrane required.
							</p>
						</div>
					</div>

					{/* FINANCIAL IMPACT */}
					<div className="bg-background text-foreground border border-border border-border rounded-3xl p-8 shadow-sm">
						<h3 className="text-lg font-black text-foreground text-foreground uppercase tracking-tight mb-6 flex items-center gap-2">
							<DollarSign className="w-5 h-5 text-muted" />
							Financial Impact
						</h3>

						<div className="space-y-4">
							<div className="flex justify-between items-center py-3 border-b border-border border-border">
								<span className="text-muted dark:text-muted font-bold">
									Original Contract Total
								</span>
								<span className="text-foreground text-foreground font-black">
									$450,000.00
								</span>
							</div>
							<div className="flex justify-between items-center py-3 border-b border-border border-border">
								<span className="text-muted dark:text-muted font-bold">
									Previous Change Orders
								</span>
								<span className="text-foreground text-foreground font-black">
									$12,450.00
								</span>
							</div>
							<div className="flex justify-between items-center py-3">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">
										<AlertTriangle className="w-4 h-4" />
									</div>
									<span className="text-amber-600 dark:text-amber-500 font-black">
										This Change Order
									</span>
								</div>
								<span className="text-amber-600 dark:text-amber-500 font-black text-xl">
									+$4,850.00
								</span>
							</div>
						</div>

						<div className="mt-6 pt-6 border-t-2 border-dashed border-border border-border flex justify-between items-center">
							<span className="text-foreground text-foreground font-black uppercase tracking-tight">
								New Contract Total
							</span>
							<span className="text-3xl font-black text-foreground text-foreground tracking-tighter">
								$467,300.00
							</span>
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN: THE LOCK (SIGNATURE) */}
				<div className="lg:col-span-1 space-y-6">
					{/* SCHEDULE IMPACT */}
					<div className="bg-background text-foreground border border-border border-border rounded-3xl p-6 shadow-sm">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-muted dark:text-muted rounded-xl flex items-center justify-center shrink-0">
								<Clock className="w-6 h-6" />
							</div>
							<div>
								<h4 className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">
									Schedule Impact
								</h4>
								<div className="text-2xl font-black text-foreground text-foreground tracking-tight">
									+3 Days
								</div>
								<p className="text-xs text-muted font-medium mt-1">
									Due to stone fabrication lead times.
								</p>
							</div>
						</div>
					</div>

					{/* THE SIGNATURE BLOCK */}
					<AnimatePresence mode="wait">
						{!isApproved ? (
							<motion.div
								key="signing"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
							>
								<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 opacity-50" />

								<div className="mb-6">
									<h3 className="text-xl font-black text-white uppercase tracking-tight italic mb-2">
										Digital Authorization
									</h3>
									<p className="text-muted text-xs font-medium leading-relaxed">
										By typing your name below, you authorize this change to the
										scope of work and agree to the adjusted contract total and
										schedule impact.
									</p>
								</div>

								<form onSubmit={handleApprove} className="space-y-4">
									<div>
										<label className="text-[10px] font-black text-muted uppercase tracking-widest px-1">
											Type Full Name to Sign
										</label>
										<input
											type="text"
											required
											value={signature}
											onChange={e => setSignature(e.target.value)}
											placeholder="John Doe"
											className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all font-writing text-lg"
										/>
									</div>
									<button
										type="submit"
										disabled={signature.length < 3}
										className="w-full bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
									>
										Approve & Lock <Lock className="w-4 h-4" />
									</button>
								</form>
							</motion.div>
						) : (
							<motion.div
								key="approved"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 shadow-inner flex flex-col items-center justify-center text-center py-12"
							>
								<div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
									<CheckCircle2 className="w-8 h-8" />
								</div>
								<h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight mb-2">
									Scope Locked
								</h3>
								<p className="text-muted dark:text-muted text-sm font-medium">
									Authorized by{' '}
									<strong className="text-foreground text-foreground">
										{signature}
									</strong>{' '}
									on {new Date().toLocaleDateString()}
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</AppShell>
	);
}
