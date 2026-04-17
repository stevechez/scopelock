'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 1. The Logic Component (Internal only)
function SuccessContent() {
	const searchParams = useSearchParams();
	const subdomain = searchParams.get('subdomain');
	const sessionId = searchParams.get('session_id');

	return (
		<motion.div
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			className="max-w-md w-full text-center"
		>
			<div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 border border-emerald-500/30">
				✓
			</div>

			<h1 className="text-4xl font-black text-white mb-4 italic uppercase">
				Platform Provisioned.
			</h1>

			<p className="text-slate-400 mb-8 leading-relaxed">
				Your &ldquo;Financial Control System&rdquo; is live at: <br />
				<span className="text-amber-500 font-bold">
					{subdomain}.buildrailhq.com
				</span>
			</p>

			<div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 text-left text-xs text-slate-500">
				<p className="font-bold uppercase tracking-widest mb-2 text-slate-400">
					Session ID: {sessionId}
				</p>
				<p className="text-sm text-slate-300">
					Since we are in Stealth/Dev mode, hop into Vercel and add{' '}
					<strong>{subdomain}.buildrailhq.com</strong> to your project domains.
				</p>
			</div>

			<Link
				href="/dashboard"
				className="block w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-200 transition-all uppercase italic"
			>
				Go to Command Center
			</Link>
		</motion.div>
	);
}

// 2. The Main Page (Default Export)
export default function OnboardingSuccessPage() {
	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
			<Suspense
				fallback={
					<div className="flex flex-col items-center">
						<div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
						<p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
							Provisioning Blueprint OS...
						</p>
					</div>
				}
			>
				<SuccessContent />
			</Suspense>
		</div>
	);
}
