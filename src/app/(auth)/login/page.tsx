'use client';

import { useActionState, useEffect } from 'react';
import { loginAction } from '@/app/actions/auth';
import Link from 'next/link';
import { toast } from 'sonner';

const initialState = { error: '', success: false };

export default function LoginPage() {
	// 1. Hook into the Server Action
	const [state, formAction, isPending] = useActionState(
		loginAction,
		initialState,
	);

	// 2. Listen for changes in the 'state' to fire toasts
	useEffect(() => {
		if (state?.error) {
			toast.error(state.error);
		}
		if (state?.success) {
			toast.success('Welcome back, access granted.');
		}
	}, [state]);

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

				{/* 3. Use the formAction from the hook */}
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
						type="submit"
						disabled={isPending}
						className={`w-full font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 ${
							isPending
								? 'bg-zinc-800 text-zinc-500'
								: 'bg-white text-black hover:bg-amber-500 hover:text-white'
						}`}
					>
						{isPending ? 'AUTHORIZING...' : 'ACCESS DASHBOARD'}
					</button>
				</form>

				<div className="mt-8 text-center">
					<Link
						href="/apply"
						className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-amber-500 transition-colors"
					>
						New Contractor? Apply for Access
					</Link>
				</div>
			</div>
		</div>
	);
}
