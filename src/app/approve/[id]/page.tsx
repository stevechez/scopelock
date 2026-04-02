'use client';

import { useState } from 'react';
import { CheckCircle2, ShieldCheck, FileSignature } from 'lucide-react';

// Placeholder data - later fetched via the [id] in the URL
const CHANGE_ORDER = {
	id: 'co_12345',
	contractorName: 'Apex Builders',
	jobName: 'Smith Kitchen Remodel',
	description:
		'Upgrade master bath tile to premium Carrara marble per client request.',
	price: 250.0,
	baseContract: 45000.0,
};

export default function ClientApprovalPage({
	params,
}: {
	params: { id: string };
}) {
	const [isApproved, setIsApproved] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleApprove = () => {
		setIsSubmitting(true);
		// Simulate API call to Supabase to update status to 'approved'
		setTimeout(() => {
			setIsApproved(true);
			setIsSubmitting(false);
		}, 1200);
	};

	const newTotal = CHANGE_ORDER.baseContract + CHANGE_ORDER.price;

	if (isApproved) {
		return (
			<div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white min-h-screen">
				<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
					<CheckCircle2 size={40} className="text-emerald-500" />
				</div>
				<h1 className="text-2xl font-bold text-slate-900 mb-2">
					Change Approved!
				</h1>
				<p className="text-slate-500 mb-8">
					Thank you. {CHANGE_ORDER.contractorName} has been notified and the
					contract has been updated.
				</p>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col bg-slate-50 min-h-screen pb-24">
			{/* Clean, unbranded header */}
			<header className="bg-white px-6 py-6 border-b border-slate-200 text-center shadow-sm">
				<h1 className="text-xl font-bold text-slate-900">
					{CHANGE_ORDER.contractorName}
				</h1>
				<p className="text-sm text-slate-500 font-medium">
					Change Order Request
				</p>
			</header>

			<div className="p-6 space-y-6 flex-1">
				{/* Project Context */}
				<div>
					<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
						Project
					</h2>
					<p className="text-lg font-medium text-slate-900">
						{CHANGE_ORDER.jobName}
					</p>
				</div>

				{/* The Change */}
				<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
					<h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
						Requested Change
					</h2>
					<p className="text-slate-800 text-lg leading-relaxed">
						&ldquo;{CHANGE_ORDER.description}&rdquo;
					</p>
				</div>

				{/* The Math */}
				<div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md space-y-3">
					<div className="flex justify-between items-center text-slate-300 text-sm">
						<span>Original Contract</span>
						<span>
							$
							{CHANGE_ORDER.baseContract.toLocaleString(undefined, {
								minimumFractionDigits: 2,
							})}
						</span>
					</div>
					<div className="flex justify-between items-center text-emerald-400 font-medium">
						<span>Additional Cost</span>
						<span>
							+ $
							{CHANGE_ORDER.price.toLocaleString(undefined, {
								minimumFractionDigits: 2,
							})}
						</span>
					</div>
					<div className="pt-3 border-t border-slate-700 flex justify-between items-center font-bold text-xl">
						<span>New Total</span>
						<span>
							$
							{newTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
						</span>
					</div>
				</div>

				{/* Legal/Trust text */}
				<div className="flex items-start gap-3 text-slate-500 text-sm bg-slate-100 p-4 rounded-xl">
					<ShieldCheck size={20} className="shrink-0 text-slate-400" />
					<p>
						By tapping approve, you authorize this change to the scope of work
						and agree to the updated contract total.
					</p>
				</div>
			</div>

			{/* Sticky Action Bar */}
			<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-10">
				<button
					onClick={handleApprove}
					disabled={isSubmitting}
					className="w-full bg-emerald-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3 active:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100"
				>
					{isSubmitting ? (
						<span className="animate-pulse">Processing...</span>
					) : (
						<>
							<FileSignature size={24} />
							Approve & Sign
						</>
					)}
				</button>
				<button className="w-full mt-4 text-slate-500 font-medium py-2 active:text-slate-700">
					I have a question about this
				</button>
			</div>
		</div>
	);
}
