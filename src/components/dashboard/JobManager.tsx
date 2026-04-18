'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createLog, sendProposal } from '@/app/actions';
import {
	HardHat,
	Camera,
	CreditCard,
	FileSignature,
	Plus,
	ArrowUpRight,
	MessageSquare,
	X,
	Loader2,
	UploadCloud,
} from 'lucide-react';

// --- STRICT TYPES ---
interface ProposalTier {
	name: string;
	price: number;
	description: string;
	features: string[];
}

interface BidForgeProposal {
	projectTitle: string;
	tiers: ProposalTier[];
}

interface JobData {
	id: string;
	tenant_id: string;
	title: string;
	client_email: string;
	client_phone: string;
	base_contract_value: number;
	status: string;
}

interface MilestoneData {
	id: string;
	title: string;
	amount: number;
	status: 'pending' | 'invoiced' | 'paid';
}

interface LogData {
	id: string;
	created_at: string;
	notes: string;
	image_url: string | null;
}

interface JobManagerProps {
	job: JobData | null;
	milestones: MilestoneData[];
	logs: LogData[];
}

type TabId = 'overview' | 'proposals' | 'financials' | 'timeline';

export default function JobManager({
	job,
	milestones = [],
	logs = [],
}: JobManagerProps) {
	const [activeTab, setActiveTab] = useState<TabId>('overview');

	// MODAL STATES
	const [isCrewLensOpen, setIsCrewLensOpen] = useState(false);
	const [isBidForgeOpen, setIsBidForgeOpen] = useState(false);

	// CREWLENS FORM STATE
	const [photoFile, setPhotoFile] = useState<File | null>(null);
	const [crewNotes, setCrewNotes] = useState('');
	const [isUploading, setIsUploading] = useState(false);

	// BIDFORGE FORM STATE
	const [roughNotes, setRoughNotes] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const [proposalResult, setProposalResult] = useState<BidForgeProposal | null>(
		null,
	);

	// --- HANDLERS ---
	const handleCrewLensSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!photoFile || !job) return;
		setIsUploading(true);

		const formData = new FormData();
		formData.append('photo', photoFile);
		formData.append('notes', crewNotes);
		formData.append('tenantId', job.tenant_id);
		formData.append('projectId', job.id);

		try {
			setIsCrewLensOpen(false);
			setPhotoFile(null);
			setCrewNotes('');
		} catch (error) {
			alert('Upload failed. Please try again.');
		} finally {
			setIsUploading(false);
		}
	};

	const handleBidForgeSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!roughNotes) return;
		setIsGenerating(true);

		try {
			// const result = await generateBidForgeProposal(roughNotes);
			// setProposalResult(result);
		} catch (error) {
			alert('Generation failed. Please try again.');
		} finally {
			setIsGenerating(false);
		}
	};

	// Calculate quick stats
	const totalInvoiced = milestones.reduce(
		(sum, m) => sum + Number(m.amount),
		0,
	);
	const totalPaid = milestones
		.filter(m => m.status === 'paid')
		.reduce((sum, m) => sum + Number(m.amount), 0);

	// Define the strictly typed array here
	const TABS: { id: TabId; icon: React.ElementType; label: string }[] = [
		{ id: 'overview', icon: HardHat, label: 'Overview' },
		{ id: 'proposals', icon: FileSignature, label: 'BidForge (Proposals)' },
		{ id: 'timeline', icon: Camera, label: 'CrewLens (Timeline)' },
	];

	return (
		<div className="space-y-8 pb-24">
			{/* ... PROJECT HEADER & KPI GRID ... */}
			<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
				<div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
				<div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
					<div>
						<div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-500 font-bold text-xs rounded-full uppercase tracking-widest mb-4">
							<span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />{' '}
							Active Build
						</div>
						<h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
							{job?.title || 'The Coastal Build'}
						</h1>
						<p className="text-slate-400 font-medium flex items-center gap-2">
							Client:{' '}
							<span className="text-white font-bold">{job?.client_email}</span>
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
					<div>
						<div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
							Base Contract
						</div>
						<div className="text-2xl font-black text-white">
							${(job?.base_contract_value || 0).toLocaleString()}
						</div>
					</div>
					<div>
						<div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
							Invoiced
						</div>
						<div className="text-2xl font-black text-slate-300">
							${totalInvoiced.toLocaleString()}
						</div>
					</div>
					<div>
						<div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
							Collected
						</div>
						<div className="text-2xl font-black text-emerald-400">
							${totalPaid.toLocaleString()}
						</div>
					</div>
				</div>
			</div>

			{/* NAVIGATION TABS */}
			<div className="flex overflow-x-auto hide-scrollbar gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800">
				{TABS.map(tab => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)} // 👈 Completely type-safe. No 'any'!
						className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 ${
							activeTab === tab.id
								? 'bg-slate-800 text-white shadow-sm'
								: 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
						}`}
					>
						<tab.icon className="w-4 h-4" /> {tab.label}
					</button>
				))}
			</div>

			{/* TAB CONTENT PANELS */}
			<AnimatePresence mode="wait">
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{activeTab === 'overview' && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">
								<h3 className="text-xl font-bold text-white mb-4">
									Project Notes
								</h3>
								<p className="text-slate-400 leading-relaxed">
									Use this space to track lockbox codes, permit numbers, and
									internal crew details.
								</p>
							</div>
							<div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
								<h3 className="text-xl font-bold text-white mb-4">
									Quick Actions
								</h3>
								<div className="space-y-3">
									<button
										onClick={() => {
											setActiveTab('proposals');
											setIsBidForgeOpen(true);
										}}
										className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 font-medium text-sm transition-colors"
									>
										+ Draft AI Proposal
									</button>
									<button
										onClick={() => {
											setActiveTab('timeline');
											setIsCrewLensOpen(true);
										}}
										className="w-full text-left px-4 py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 font-medium text-sm transition-colors"
									>
										+ Log Daily Photo (CrewLens)
									</button>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'proposals' && (
						<div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
							<FileSignature className="w-12 h-12 text-amber-500 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-white mb-2">
								BidForge AI Estimator
							</h3>
							<p className="text-slate-400 mb-6 max-w-md mx-auto">
								Generate a 3-tier (Good/Better/Best) proposal from rough truck
								notes in 15 seconds.
							</p>
							<button
								onClick={() => setIsBidForgeOpen(true)}
								className="px-6 py-3 bg-amber-500 text-slate-900 font-black rounded-xl hover:bg-amber-400 transition-colors inline-flex items-center gap-2 shadow-lg"
							>
								Launch BidForge <ArrowUpRight className="w-4 h-4" />
							</button>
						</div>
					)}

					{activeTab === 'timeline' && (
						<div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
							<Camera className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
							<h3 className="text-xl font-bold text-white mb-2">
								CrewLens Tracker
							</h3>
							<p className="text-slate-400 mb-6 max-w-md mx-auto">
								Snap photos from the job site. They will automatically sync to
								the client&quot;s Comm Vault.
							</p>
							<button
								onClick={() => setIsCrewLensOpen(true)}
								className="px-6 py-3 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-200 transition-colors inline-flex items-center gap-2 shadow-lg"
							>
								Open CrewLens <UploadCloud className="w-4 h-4" />
							</button>

							{/* Render existing logs if any */}
							{logs.length > 0 && (
								<div className="mt-12 text-left space-y-4">
									<h4 className="text-sm font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
										Recent Logs
									</h4>
									{logs.map(log => (
										<div
											key={log.id}
											className="flex gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800"
										>
											{log.image_url && (
												<img
													src={log.image_url}
													alt="Site"
													className="w-24 h-24 object-cover rounded-xl"
												/>
											)}
											<div>
												<div className="text-xs text-slate-500 mb-1">
													{new Date(log.created_at).toLocaleDateString()}
												</div>
												<p className="text-sm text-slate-300">{log.notes}</p>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</motion.div>
			</AnimatePresence>

			{/* --- CREWLENS MODAL --- */}
			<AnimatePresence>
				{isCrewLensOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
						>
							<div className="p-6 border-b border-slate-800 flex justify-between items-center">
								<h2 className="text-xl font-black text-white flex items-center gap-2">
									<Camera className="w-5 h-5 text-emerald-500" /> Log Progress
								</h2>
								<button
									onClick={() => setIsCrewLensOpen(false)}
									className="text-slate-400 hover:text-white"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
							<form onSubmit={handleCrewLensSubmit} className="p-6 space-y-5">
								<div>
									<label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
										Site Photo (Required)
									</label>
									<input
										type="file"
										accept="image/*"
										required
										onChange={e => setPhotoFile(e.target.files?.[0] || null)}
										className="w-full text-slate-300 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-800 file:text-white hover:file:bg-slate-700 transition-all"
									/>
								</div>
								<div>
									<label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
										Daily Notes
									</label>
									<textarea
										required
										rows={4}
										value={crewNotes}
										onChange={e => setCrewNotes(e.target.value)}
										placeholder="What got done today? Any blockers?"
										className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
									/>
								</div>
								<button
									type="submit"
									disabled={isUploading || !photoFile}
									className="w-full bg-emerald-500 text-slate-900 font-black py-4 rounded-xl hover:bg-emerald-400 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
								>
									{isUploading ? (
										<>
											<Loader2 className="w-5 h-5 animate-spin" /> Uploading...
										</>
									) : (
										'Save & Notify Client'
									)}
								</button>
							</form>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* --- BIDFORGE MODAL --- */}
			<AnimatePresence>
				{isBidForgeOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
						>
							<div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900/90 backdrop-blur-md">
								<h2 className="text-xl font-black text-white flex items-center gap-2">
									<FileSignature className="w-5 h-5 text-amber-500" /> BidForge
									AI
								</h2>
								<button
									onClick={() => {
										setIsBidForgeOpen(false);
										setProposalResult(null);
									}}
									className="text-slate-400 hover:text-white"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{!proposalResult ? (
								<form onSubmit={handleBidForgeSubmit} className="p-6 space-y-5">
									<div>
										<label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
											Rough Notes
										</label>
										<textarea
											required
											rows={6}
											value={roughNotes}
											onChange={e => setRoughNotes(e.target.value)}
											placeholder="e.g. Master bath remodel, gut to studs, standard subway tile for budget option, marble for high end. Client wants heated floors if possible."
											className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
										/>
									</div>
									<button
										type="submit"
										disabled={isGenerating}
										className="w-full bg-amber-500 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
									>
										{isGenerating ? (
											<>
												<Loader2 className="w-5 h-5 animate-spin" /> Forging
												Tiers...
											</>
										) : (
											'Generate 3-Tier Proposal'
										)}
									</button>
								</form>
							) : (
								<div className="p-6 space-y-6">
									<h3 className="text-2xl font-black text-white mb-2">
										{proposalResult.projectTitle}
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{proposalResult.tiers.map(
											(tier: ProposalTier, idx: number) => (
												<div
													key={idx}
													className={`p-5 rounded-2xl border ${idx === 1 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 bg-slate-950'}`}
												>
													<div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
														Tier {idx + 1}
													</div>
													<h4 className="font-bold text-white text-lg">
														{tier.name}
													</h4>
													<div className="text-2xl font-black text-amber-500 my-3">
														${tier.price.toLocaleString()}
													</div>
													<p className="text-sm text-slate-400 mb-4">
														{tier.description}
													</p>
													<ul className="space-y-2">
														{tier.features.map((feat: string, i: number) => (
															<li
																key={i}
																className="text-xs text-slate-300 flex items-start gap-2"
															>
																<span className="text-emerald-500 font-bold">
																	✓
																</span>{' '}
																{feat}
															</li>
														))}
													</ul>
												</div>
											),
										)}
									</div>
									<div className="flex gap-4 pt-4 border-t border-slate-800">
										<button
											onClick={() => setProposalResult(null)}
											className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700"
										>
											Discard & Retry
										</button>
										<button className="flex-1 py-3 bg-amber-500 text-slate-900 font-black rounded-xl hover:bg-amber-400">
											Save as Official Proposal
										</button>
									</div>
								</div>
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
}
