'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth'; // Ensure this action exists
import Link from 'next/link';

const initialState = { error: '', success: false };

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(
		loginAction,
		initialState,
	);

	return (
		<div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white selection:bg-amber-500/30">
			<div className="bg-[#0a0a0a] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md">
				<div className="text-center mb-10">
					<h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
						BuildRail
					</h1>
					<p className="text-zinc-500 font-bold text-sm tracking-widest uppercase">
						System Login
					</p>
				</div>

				<form action={formAction} className="space-y-5">
					<input
						name="email"
						type="email"
						required
						placeholder="Work Email"
						className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-amber-500 transition-all text-sm"
					/>
					<input
						name="password"
						type="password"
						required
						placeholder="Password"
						className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-amber-500 transition-all text-sm"
					/>

					<button
						disabled={isPending}
						className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-amber-500 hover:text-white transition-all shadow-xl active:scale-95 disabled:opacity-50"
					>
						{isPending ? 'AUTHORIZING...' : 'ACCESS DASHBOARD'}
					</button>
				</form>

				<div className="mt-8 text-center">
					<Link
						href="/signup"
						className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-amber-500 transition-colors"
					>
						New Contractor? Apply for Access
					</Link>
				</div>
			</div>
		</div>
	);
}
