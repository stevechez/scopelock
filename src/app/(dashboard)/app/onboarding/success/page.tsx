'use client';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const subdomain = searchParams.get('subdomain');

	return (
		<div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className="max-w-md w-full"
			>
				<div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 border border-emerald-500/30">
					✓
				</div>
				<h1 className="text-4xl font-black text-white mb-4 italic">
					Platform Provisioned.
				</h1>
				<p className="text-slate-400 mb-8 leading-relaxed">
					Your &ldquo;Financial Control System&rdquo; is live at: <br />
					<span className="text-amber-500 font-bold">
						{subdomain}.getblueprintos.com
					</span>
				</p>

				<div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 text-left">
					<p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
						Next Step (Manual Proxy):
					</p>
					<p className="text-sm text-slate-300">
						Since we are in Stealth/Dev mode, hop into Vercel and add{' '}
						<strong>{subdomain}.getblueprintos.com</strong> to your project
						domains.
					</p>
				</div>

				<Link
					href="/app"
					className="block w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-slate-200 transition-all"
				>
					Go to Command Center
				</Link>
			</motion.div>
		</div>
	);
}
