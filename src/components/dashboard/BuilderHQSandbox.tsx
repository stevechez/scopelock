'use client';

import { motion } from 'framer-motion';
import {
	Briefcase,
	TrendingUp,
	AlertTriangle,
	Wallet,
	ArrowUpRight,
	Clock,
	CheckCircle2,
	Building2,
	ChevronRight,
	FileSignature,
	Hammer,
} from 'lucide-react';
import AppShell from '@/components/dashboard/AppShell';
import CrewLensUploader from '@/components/CrewLensUploader';
import BidForgeBuilder from '../BidForgeBuilder';

// 🔥 IMPORT THE NEW COMPONENT HERE
import PayRailMilestoneCard from '@/components/dashboard/PayRailMilestoneCard';

// Mock Data for the HQ
const STATS = [
	{
		label: 'Active Pipeline',
		value: '$2.4M',
		icon: TrendingUp,
		color: 'text-emerald-500',
		bg: 'bg-emerald-500/10',
	},
	{
		label: 'Active Builds',
		value: '4',
		icon: Hammer,
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
	},
	{
		label: 'Pending Approvals',
		value: '3',
		icon: AlertTriangle,
		color: 'text-amber-500',
		bg: 'bg-amber-500/10',
	},
	{
		label: 'Available to Draw',
		value: '$85K',
		icon: Wallet,
		color: 'text-emerald-500',
		bg: 'bg-emerald-500/10',
	},
];

const ACTIVE_PROJECTS = [
	{
		id: 1,
		name: 'The Coastal Build',
		client: 'John & Sarah Doe',
		progress: 65,
		phase: 'Drywall & Texture',
		status: 'on_track',
	},
	{
		id: 2,
		name: 'Maple Street Renovation',
		client: 'Michael Chen',
		progress: 20,
		phase: 'Foundation',
		status: 'action_needed',
	},
	{
		id: 3,
		name: 'Silicon Valley ADU',
		client: 'Elena Rodriguez',
		progress: 90,
		phase: 'Final Finishes',
		status: 'on_track',
	},
];

// Removed the Draw Request from here since we are using the live card for it now
const ACTION_ITEMS = [
	{
		id: 1,
		project: 'Maple Street Renovation',
		type: 'Change Order',
		title: 'Foundation Depth Adjustment',
		amount: '$4,500',
		urgency: 'high',
	},
	{
		id: 3,
		project: 'Silicon Valley ADU',
		type: 'Client Signature',
		title: 'Appliance Final Selection',
		amount: null,
		urgency: 'medium',
	},
];

export default function BuilderHQSandbox() {
	return (
		<AppShell>
			{/* HQ HEADER */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
				<div>
					<div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 uppercase tracking-widest">
						<span className="text-amber-500">Workspace</span>{' '}
						<span className="text-slate-300 dark:text-slate-700">/</span>
						<span>Overview</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
						<Building2 className="w-8 h-8 text-slate-400" />
						Steve Chez Construction
					</h2>
				</div>

				{/* QUICK ACTION */}
				<button className="bg-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]">
					+ New Project
				</button>
			</div>

			{/* HIGH LEVEL STATS */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{STATS.map((stat, i) => (
					<div
						key={i}
						className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4"
					>
						<div
							className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}
						>
							<stat.icon className="w-7 h-7" />
						</div>
						<div>
							<div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
								{stat.label}
							</div>
							<div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
								{stat.value}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT COLUMN: ACTIVE PROJECTS */}
				<div className="lg:col-span-2 space-y-6">
					<div className="flex items-center justify-between mb-4 px-2">
						<h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
							<Briefcase className="w-5 h-5 text-slate-400" />
							Active Projects
						</h3>
						<button className="text-xs font-bold text-slate-500 hover:text-amber-500 transition-colors uppercase tracking-widest">
							View All
						</button>
					</div>

					<div className="space-y-4">
						{ACTIVE_PROJECTS.map(project => (
							<motion.div
								key={project.id}
								whileHover={{ scale: 1.01 }}
								className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm cursor-pointer group transition-all hover:border-amber-500/50"
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-1">
											<h4 className="text-xl font-black text-slate-900 dark:text-white">
												{project.name}
											</h4>
											{project.status === 'action_needed' && (
												<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[9px] font-black uppercase tracking-widest">
													<AlertTriangle className="w-3 h-3" /> Action Needed
												</span>
											)}
										</div>
										<div className="text-sm font-medium text-slate-500">
											Client: {project.client}
										</div>
									</div>

									<div className="w-full md:w-64">
										<div className="flex justify-between text-xs font-bold mb-2">
											<span className="text-slate-400 uppercase tracking-widest">
												{project.phase}
											</span>
											<span className="text-slate-900 dark:text-white">
												{project.progress}%
											</span>
										</div>
										<div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
											<div
												className={`h-full rounded-full transition-all duration-1000 ${project.progress > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
												style={{ width: `${project.progress}%` }}
											/>
										</div>
									</div>

									<div className="hidden md:flex w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all shrink-0">
										<ChevronRight className="w-5 h-5" />
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* RIGHT COLUMN: ACTION ITEMS (The Money Board) */}
				<div className="lg:col-span-1 space-y-6">
					<div className="flex items-center justify-between mb-4 px-2">
						<h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
							<Wallet className="w-5 h-5 text-slate-400" />
							Revenue Actions
						</h3>
					</div>

					{/* The PayRail Card */}
					<PayRailMilestoneCard
						tenantId="test_tenant_id_123"
						milestoneName="Phase 2: Coastal Build"
						amount={45000}
					/>

					{/* 🔥 Drop CrewLens here to test it */}
					<div className="mt-6">
						<CrewLensUploader
							tenantId="test_tenant_id_123"
							projectId="project_12345"
						/>
					</div>
					<BidForgeBuilder tenantId="test_tenant_id_123" />
					{/* <BidForgeBuilder tenantId={tenant.id} /> */}

					<div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-6 shadow-xl relative overflow-hidden mt-6">
						{/* Background glow for urgency */}
						<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 opacity-30" />

						<div className="space-y-4">
							{ACTION_ITEMS.map(item => (
								<div
									key={item.id}
									className="p-4 bg-slate-950 border border-slate-800 rounded-2xl group hover:border-amber-500/30 transition-all cursor-pointer"
								>
									<div className="flex justify-between items-start mb-2">
										<span
											className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
												item.urgency === 'ready'
													? 'bg-emerald-500/10 text-emerald-500'
													: item.urgency === 'high'
														? 'bg-amber-500/10 text-amber-500'
														: 'bg-slate-800 text-slate-400'
											}`}
										>
											{item.type}
										</span>
										{item.amount && (
											<span className="text-sm font-black text-white">
												{item.amount}
											</span>
										)}
									</div>
									<h4 className="text-sm font-bold text-white mb-1 leading-tight group-hover:text-amber-400 transition-colors">
										{item.title}
									</h4>
									<p className="text-xs text-slate-500 font-medium">
										{item.project}
									</p>
								</div>
							))}
						</div>

						<button className="w-full mt-6 py-3 border border-slate-700 text-slate-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2">
							View All Items <ArrowUpRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</AppShell>
	);
}
