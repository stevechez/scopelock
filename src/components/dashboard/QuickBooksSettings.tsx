'use client';

import { useState } from 'react';
import { getQuickBooksAuthUrl } from '@/app/actions/qb-auth';
import { CheckCircle2, Link, Loader2, RefreshCw } from 'lucide-react';

interface QBProps {
	isConnected: boolean;
	companyName?: string;
}

export default function QuickBooksSettings({
	isConnected,
	companyName,
}: QBProps) {
	const [loading, setLoading] = useState(false);

	const handleConnect = async () => {
		setLoading(true);
		try {
			const authUrl = await getQuickBooksAuthUrl();
			// Redirect the user to Intuit
			window.location.href = authUrl;
		} catch (error) {
			console.error('Auth failed', error);
			setLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 bg-[#2CA01C]/10 rounded-2xl flex items-center justify-center">
						<span className="text-[#2CA01C] font-black text-xl italic">qb</span>
					</div>
					<div>
						<h3 className="text-xl font-bold text-foreground">
							QuickBooks Online
						</h3>
						<p className="text-muted text-sm">
							Sync leads and generate invoices automatically.
						</p>
					</div>
				</div>

				{isConnected ? (
					<div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-bold">
						<CheckCircle2 size={16} /> Connected
					</div>
				) : (
					<div className="text-muted text-xs font-bold uppercase tracking-widest">
						Not Connected
					</div>
				)}
			</div>

			<div className="bg-slate-50 rounded-2xl p-6 border border-border mb-6">
				{isConnected ? (
					<div className="flex justify-between items-center">
						<div>
							<p className="text-[10px] font-black text-muted uppercase tracking-widest">
								Linked Company
							</p>
							<p className="text-lg font-bold text-foreground">
								{companyName || 'Sandbox Company'}
							</p>
						</div>
						<button className="text-muted hover:text-red-500 transition-colors text-sm font-bold">
							Disconnect
						</button>
					</div>
				) : (
					<p className="text-slate-600 leading-relaxed">
						Connect your account to eliminate double-entry. We&apos;ll
						automatically create Customers in QuickBooks when you verify a lead
						in BuildRail.
					</p>
				)}
			</div>

			{!isConnected && (
				<button
					onClick={handleConnect}
					disabled={loading}
					className="w-full bg-[#2CA01C] hover:bg-[#258a18] text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-95"
				>
					{loading ? <Loader2 className="animate-spin" /> : <Link size={20} />}
					Connect to QuickBooks
				</button>
			)}
		</div>
	);
}
