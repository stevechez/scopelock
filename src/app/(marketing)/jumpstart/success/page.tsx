'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function JumpstartSuccess() {
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-6">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl border border-slate-200 p-8 md:p-16 text-center"
			>
				<div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner">
					✓
				</div>

				<h1 className="text-4xl font-black text-slate-900 mb-4 italic">
					You&apos;re on the Board, Steve.
				</h1>
				<p className="text-xl text-slate-500 font-medium mb-12">
					I&apos;ve received your request. My goal is to have your first draft
					ready for review within 24 hours.
				</p>

				<div className="space-y-6 text-left bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-10">
					<h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
						What happens now?
					</h3>

					<div className="flex gap-4">
						<div className="font-black text-amber-500 text-xl leading-none">
							1.
						</div>
						<p className="text-slate-700 font-bold">
							Check your texts.{' '}
							<span className="font-medium text-slate-500 block text-sm">
								I&apos;ll send a quick intro to confirm your service area
								details.
							</span>
						</p>
					</div>

					<div className="flex gap-4">
						<div className="font-black text-amber-500 text-xl leading-none">
							2.
						</div>
						<p className="text-slate-700 font-bold">
							The Blueprint Build.{' '}
							<span className="font-medium text-slate-500 block text-sm">
								I&apos;ll start the SEO copywriting and Site Engine deployment.
							</span>
						</p>
					</div>

					<div className="flex gap-4">
						<div className="font-black text-amber-500 text-xl leading-none">
							3.
						</div>
						<p className="text-slate-700 font-bold">
							The Handover.{' '}
							<span className="font-medium text-slate-500 block text-sm">
								We&apos;ll jump on a 15-minute call to walk through your new
								Comm Vault.
							</span>
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<Link
						href="mailto:Steve@BlueprintOS.com?subject=Photos%20for%20my%20Jumpstart"
						className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg"
					>
						Email My Project Photos Now
					</Link>
					<Link
						href="/"
						className="text-slate-400 font-bold hover:text-slate-600 transition-colors"
					>
						Back to Home
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
