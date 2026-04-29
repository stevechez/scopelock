'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Camera,
	CreditCard,
	FileSignature,
	CheckCircle2,
	ShieldCheck,
	ArrowRight,
} from 'lucide-react';
import dayjs from 'dayjs';

// Define the shape of the data we expect from the Switchboard
// Define the shape of the joined Tenant data
interface TenantData {
	company_name: string;
}

// Define the shape of the Job data
interface JobData {
	id: string;
	title: string;
	status: string;
	base_contract_value: number;
	tenants: TenantData | null;
}

// Define the shape of a CrewLens Log
interface TimelineLog {
	id: string;
	created_at: string;
	notes: string;
	image_url: string | null;
}

// Define the shape of a PayRail Milestone
interface FinancialItem {
	id: string;
	title: string;
	amount: number;
	status: 'pending' | 'invoiced' | 'paid';
}

// The final strict Props interface
interface CommVaultProps {
	jobData: JobData | null;
	timelineLogs: TimelineLog[];
	financials: FinancialItem[];
}

export default function CommVault({
	jobData,
	timelineLogs,
	financials,
}: CommVaultProps) {
	const [activeTab, setActiveTab] = useState<'timeline' | 'financials'>(
		'timeline',
	);

	// Calculate totals from real data
	const totalContract = jobData?.base_contract_value || 0;
	const paidToDate = financials
		.filter(f => f.status === 'paid')
		.reduce((sum, item) => sum + Number(item.amount), 0);

	return (
		<div className="min-h-screen bg-slate-50 md:bg-slate-100 font-sans pb-24">
			{/* HEADER */}
			<header className="bg-slate-900 text-white pt-12 pb-6 px-6 md:px-12 rounded-b-[2rem] md:rounded-none shadow-lg relative overflow-hidden">
				<div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

				<div className="max-w-4xl mx-auto relative z-10">
					<div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-4">
						<ShieldCheck className="w-4 h-4" /> Client Portal
					</div>
					<h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
						{jobData?.title || 'Your Project'}
					</h1>
					<p className="text-muted font-medium flex items-center gap-2">
						Managed by{' '}
						<strong className="text-white">
							{jobData?.tenants?.company_name || 'Your Contractor'}
						</strong>
					</p>

					{/* Quick Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
						<div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
							<div className="text-muted text-xs font-bold uppercase tracking-wider mb-1">
								Status
							</div>
							<div className="text-white font-black flex items-center gap-2 capitalize">
								<span
									className={`w-2 h-2 rounded-full ${jobData?.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}
								/>
								{jobData?.status || 'Active'}
							</div>
						</div>
						<div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
							<div className="text-muted text-xs font-bold uppercase tracking-wider mb-1">
								Paid to Date
							</div>
							<div className="text-emerald-400 font-black">
								${paidToDate.toLocaleString()}
							</div>
						</div>
						<div className="hidden md:block bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
							<div className="text-muted text-xs font-bold uppercase tracking-wider mb-1">
								Total Contract
							</div>
							<div className="text-white font-black">
								${totalContract.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* MAIN CONTENT AREA */}
			<main className="max-w-4xl mx-auto px-4 md:px-12 mt-8">
				{/* Custom Tabs */}
				<div className="flex bg-slate-200/50 p-1 rounded-2xl mb-8">
					<button
						onClick={() => setActiveTab('timeline')}
						className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'timeline' ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-slate-700'}`}
					>
						Project Timeline
					</button>
					<button
						onClick={() => setActiveTab('financials')}
						className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'financials' ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-slate-700'}`}
					>
						Financials & Docs
					</button>
				</div>

				{/* TAB 1: TIMELINE (CrewLens Feed) */}
				{activeTab === 'timeline' && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-8"
					>
						{timelineLogs.length === 0 && (
							<div className="text-center py-12 text-muted font-medium">
								No updates yet. Check back once the crew starts!
							</div>
						)}
						{timelineLogs.map(log => (
							<div key={log.id} className="relative pl-8 md:pl-0">
								<div className="md:hidden absolute left-[11px] top-8 bottom-[-32px] w-[2px] bg-slate-200" />
								<div className="bg-white border border-border rounded-3xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row gap-6">
									<div className="md:w-48 shrink-0">
										<div className="flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-widest mb-2 md:mb-0">
											<Camera className="w-4 h-4 text-amber-500" />
											{/* Format date here, e.g., dayjs(log.created_at).format('MMM D, h:mm A') */}
											{new Date(log.created_at).toLocaleDateString()}
										</div>
									</div>
									<div className="flex-1 space-y-4">
										<p className="text-slate-700 font-medium leading-relaxed">
											{log.notes}
										</p>
										{log.image_url && (
											<img
												src={log.image_url}
												alt="Project update"
												className="w-full h-48 md:h-64 object-cover rounded-2xl border border-border"
											/>
										)}
									</div>
								</div>
							</div>
						))}
					</motion.div>
				)}

				{/* TAB 2: FINANCIALS */}
				{activeTab === 'financials' && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-6"
					>
						{/* Action Needed Items */}
						<h3 className="text-sm font-black text-muted uppercase tracking-widest mb-4">
							Requires Attention
						</h3>
						{financials
							.filter(f => f.status === 'invoiced' || f.status === 'pending')
							.map(item => (
								<div
									key={item.id}
									className="bg-white border-2 border-amber-500/20 rounded-3xl p-6 shadow-md relative overflow-hidden"
								>
									<div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
									<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
										<div>
											<div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-widest mb-1">
												<CreditCard className="w-4 h-4" /> Action Required
											</div>
											<h4 className="text-xl font-bold text-foreground">
												{item.title}
											</h4>
											<div className="text-2xl font-black text-foreground mt-1">
												${Number(item.amount).toLocaleString()}
											</div>
										</div>
										<a
											href={`/pay/${item.id}`} // Route to your LemonSqueezy/Stripe link generator
											className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
										>
											Pay Securely <ArrowRight className="w-4 h-4" />
										</a>
									</div>
								</div>
							))}

						{/* History */}
						<h3 className="text-sm font-black text-muted uppercase tracking-widest mb-4 mt-12">
							Completed
						</h3>
						{financials
							.filter(f => f.status === 'paid')
							.map(item => (
								<div
									key={item.id}
									className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between opacity-75"
								>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
											<CheckCircle2 className="w-5 h-5" />
										</div>
										<div>
											<h4 className="font-bold text-foreground">
												{item.title}
											</h4>
										</div>
									</div>
									<div className="font-black text-muted">
										${Number(item.amount).toLocaleString()}
									</div>
								</div>
							))}
					</motion.div>
				)}
			</main>
		</div>
	);
}
