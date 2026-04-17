'use client';

import { useState } from 'react';
import { createMilestonePaymentLink } from '@/app/actions';
import { Loader2, Copy, Send, CheckCircle2 } from 'lucide-react';

interface MilestoneProps {
	tenantId: string;
	milestoneName: string;
	amount: number;
}

export default function PayRailMilestoneCard({
	tenantId,
	milestoneName,
	amount,
}: MilestoneProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [paymentLink, setPaymentLink] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const generateLink = async () => {
		setIsLoading(true);
		try {
			const url = await createMilestonePaymentLink(
				tenantId,
				milestoneName,
				amount,
			);
			setPaymentLink(url);
		} catch (error) {
			console.error(error);
			alert('Failed to generate link. Ensure your bank is connected.');
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = () => {
		if (paymentLink) {
			navigator.clipboard.writeText(paymentLink);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-sm">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h4 className="font-bold text-slate-900 dark:text-white">
						{milestoneName}
					</h4>
					<p className="text-xs font-black uppercase tracking-widest text-slate-500 mt-1">
						Pending Milestone
					</p>
				</div>
				<div className="text-emerald-600 dark:text-emerald-400 font-black text-xl">
					${amount.toLocaleString()}
				</div>
			</div>

			{!paymentLink ? (
				<button
					onClick={generateLink}
					disabled={isLoading}
					className="w-full py-3 bg-amber-500 text-slate-950 font-black rounded-xl hover:bg-amber-400 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
				>
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						'Generate SMS Link'
					)}
				</button>
			) : (
				<div className="space-y-3 focus:outline-none focus:ring-0">
					<div className="p-3 bg-slate-200 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-400 break-all select-all">
						{paymentLink}
					</div>
					<div className="flex gap-2 focus:outline-none focus:ring-0">
						<button
							onClick={copyToClipboard}
							className="flex-1 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm"
						>
							{copied ? (
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
							) : (
								<Copy className="w-4 h-4" />
							)}
							{copied ? 'Copied' : 'Copy'}
						</button>
						<a
							href={`sms:?&body=Hi! Here is the secure link to complete the ${milestoneName} milestone: ${paymentLink}`}
							className="flex-1 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors flex items-center justify-center gap-2 text-sm"
						>
							<Send className="w-4 h-4" />
							Send SMS
						</a>
					</div>
				</div>
			)}
		</div>
	);
}
