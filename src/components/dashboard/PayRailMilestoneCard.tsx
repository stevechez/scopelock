'use client';

import { useState } from 'react';
import { createMilestonePaymentLink } from '@/app/actions';
import { Loader2, Copy, Send, CheckCircle2 } from 'lucide-react';

interface MilestoneProps {
	tenantId: string;
	milestoneName: string;
	amount: number;
}

// 1. Define an expected response type to eliminate TypeScript "Property does not exist" errors
interface ActionResponse {
	error?: string;
	milestone?: string;
	url?: string;
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
			// Reverted back to `result` so the error checking below works!
			const result = (await createMilestonePaymentLink({
				tenantId,
				milestoneName,
				amount,
			})) as ActionResponse;

			if (result?.error) {
				alert(result.error);
				return;
			}

			const link = result?.milestone || result?.url;

			if (!link) {
				throw new Error('No payment link returned from the server.');
			}

			setPaymentLink(link);
		} catch (error) {
			console.error(error);
			alert('Failed to generate link. Ensure your bank is connected.');
		} finally {
			setIsLoading(false);
		}
	};

	const copyToClipboard = () => {
		if (!paymentLink) return;

		navigator.clipboard.writeText(paymentLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// Safely encode the SMS body so spaces, variables, and URLs don't break the native messaging app
	const smsBody = encodeURIComponent(
		`Hi! Here is the secure link to complete the ${milestoneName} milestone: ${paymentLink}`,
	);

	return (
		<div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border border-border shadow-sm max-w-sm">
			<div className="flex justify-between items-start mb-6">
				<div>
					<h4 className="font-bold text-foreground text-foreground">
						{milestoneName}
					</h4>
					<p className="text-xs font-black uppercase tracking-widest text-muted mt-1">
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
				<div className="space-y-3">
					<div className="p-3 bg-slate-200 dark:bg-slate-950 rounded-xl border border-slate-300 border-border text-xs font-medium text-slate-600 dark:text-muted break-all select-all">
						{paymentLink}
					</div>

					<div className="flex gap-2">
						<button
							onClick={copyToClipboard}
							className="flex-1 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 text-foreground font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm"
						>
							{copied ? (
								<CheckCircle2 className="w-4 h-4 text-emerald-500" />
							) : (
								<Copy className="w-4 h-4" />
							)}
							{copied ? 'Copied' : 'Copy'}
						</button>

						<a
							href={`sms:?body=${smsBody}`}
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
