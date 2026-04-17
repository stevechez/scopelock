'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthErrorPage() {
	return (
		<div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
			<div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6">
				<AlertCircle className="w-8 h-8" />
			</div>
			<h1 className="text-2xl font-black text-white mb-4">
				Link Expired or Invalid
			</h1>
			<p className="text-slate-400 mb-8 max-w-sm">
				For your security, magic links can only be used once and expire after a
				short time. Please request a new one.
			</p>
			<Link
				href="/login" // Assuming they will hit the middleware and be redirected
				className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 transition-all"
			>
				Try Again
			</Link>
		</div>
	);
}
