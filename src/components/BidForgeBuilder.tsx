'use client';

import { useState } from 'react';
import { generateBidForgeProposal } from '@/app/actions';
import { Loader2, Sparkles, Send } from 'lucide-react';

interface ProposalTier {
	name: string;
	price: number;
	description: string;
	features: string[];
}

interface ProposalData {
	projectTitle: string;
	tiers: ProposalTier[];
}

export default function BidForgeBuilder({ tenantId }: { tenantId: string }) {
	const [notes, setNotes] = useState('');
	const [isGenerating, setIsGenerating] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [proposal, setProposal] = useState<ProposalData | null>(null);

	const handleGenerate = async () => {
		if (!notes) return;
		setIsGenerating(true);
		try {
			const data = await generateBidForgeProposal(notes);
			setProposal(data);
		} catch (error) {
			console.error(error);
			alert('Failed to forge proposal. Check your API key.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			{/* INPUT SECTION */}
			<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
						<Sparkles className="w-6 h-6" />
					</div>
					<div>
						<h3 className="font-black text-white text-lg">BidForge AI</h3>
						<p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
							Proposal Generator
						</p>
					</div>
				</div>

				<textarea
					value={notes}
					onChange={e => setNotes(e.target.value)}
					placeholder="E.g., 400sqft trex deck, aluminum railing, taking out old wood deck, need permits, adding stairs."
					rows={4}
					className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none mb-4"
				/>

				<button
					onClick={handleGenerate}
					disabled={isGenerating || !notes}
					className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
				>
					{isGenerating ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" /> Forging Options...
						</>
					) : (
						'Generate 3-Tier Proposal'
					)}
				</button>
			</div>

			{/* OUTPUT SECTION */}
			{proposal && (
				<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="flex items-center justify-between border-b border-slate-800 pb-4">
						<h3 className="text-2xl font-black text-white italic">
							{proposal.projectTitle}
						</h3>
						<button className="text-xs font-bold bg-amber-500 text-slate-950 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-400 transition-colors">
							<Send className="w-4 h-4" /> Save to Comm Vault
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{proposal.tiers.map((tier, idx) => (
							<div
								key={idx}
								className={`p-6 rounded-2xl border ${idx === 1 ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] transform md:-translate-y-2' : 'bg-slate-900 border-slate-800'}`}
							>
								{idx === 1 && (
									<div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">
										Recommended
									</div>
								)}
								<h4 className="text-xl font-bold text-white mb-2">
									{tier.name}
								</h4>
								<div className="text-3xl font-black text-slate-300 mb-4">
									${tier.price.toLocaleString()}
								</div>
								<p className="text-sm text-slate-400 mb-6 line-clamp-3">
									{tier.description}
								</p>

								<ul className="space-y-2">
									{tier.features.map((feature, fIdx) => (
										<li
											key={fIdx}
											className="text-xs font-medium text-slate-300 flex items-start gap-2"
										>
											<span className="text-emerald-500">✓</span> {feature}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
