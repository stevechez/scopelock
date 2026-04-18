'use client';

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { generateAIProposal } from '@/app/actions';

export interface Lead {
	id: string;
	created_at: string;
	tenant_id: string;
	client_name: string;
	client_email: string;
	client_phone: string;
	project_type: string;
	budget: string;
	timeline: string;
	status?: string;
}

export default function ProposalGenerator({ lead }: { lead: Lead }) {
	const [loading, setLoading] = useState(false);
	const [proposal, setProposal] = useState<string | null>(null);

	const generateProposal = async () => {
		setLoading(true);
		try {
			const result = await generateAIProposal({ leadId: lead.id });

			// Fixed: Check for proposalText instead of content to match the server action
			if (result.success && result.proposalText) {
				setProposal(result.proposalText);
			} else {
				alert(result.error || 'AI Architect is busy. Try again in a second.');
			}
		} catch (err) {
			console.error(err);
			alert('An unexpected error occurred.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
			<div className="absolute top-0 right-0 p-8 opacity-10">
				<Sparkles size={120} className="text-amber-500" />
			</div>

			<div className="relative z-10">
				<h2 className="text-2xl font-black text-white italic uppercase mb-2 flex items-center gap-2">
					AI Architect <Sparkles className="text-amber-500" size={20} />
				</h2>
				<p className="text-slate-400 font-medium mb-8">
					Generate a professional 3-tier estimate based on lead budget and
					project type.
				</p>

				{!proposal ? (
					<button
						onClick={generateProposal}
						disabled={loading}
						className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
					>
						{loading ? (
							<Loader2 className="animate-spin" />
						) : (
							'Draft 3-Tier Proposal'
						)}
					</button>
				) : (
					<div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-slate-200 whitespace-pre-wrap font-mono text-sm">
						{proposal}
						<button className="w-full mt-6 bg-emerald-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2">
							<CheckCircle2 size={18} /> Finalize & Send to Client
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
