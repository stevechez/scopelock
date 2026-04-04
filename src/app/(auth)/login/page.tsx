'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/app/actions';
import { Zap, Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			await signIn(email, password);
			router.push('/dashboard');
			router.refresh(); // Forces Next.js to update the layout with the new auth state
		} catch (err: unknown) {
			// Narrow the type so TypeScript knows how to handle it
			const errorMessage =
				err instanceof Error ? err.message : 'Invalid login credentials.';
			setError(errorMessage);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 selection:bg-slate-900 selection:text-white">
			{/* Logo */}
			<Link
				href="/"
				className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity"
			>
				<div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
					<Zap size={20} className="text-white fill-white" />
				</div>
				<span className="font-black text-2xl tracking-tight italic text-slate-900">
					Blueprint
					<span className="text-slate-400 font-medium not-italic">OS</span>
				</span>
			</Link>

			{/* Login Card */}
			<div className="w-full max-w-md bg-white text-black rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
				<div className="mb-8 text-center">
					<div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
						<Lock size={20} className="text-slate-400" />
					</div>
					<h1 className="text-2xl font-black text-slate-900 tracking-tight">
						Command Center
					</h1>
					<p className="text-slate-500 text-sm mt-2 font-medium">
						Authorized personnel only.
					</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-5">
					{/* Error State Banner */}
					{error && (
						<div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-3 rounded-xl text-center border border-red-100">
							{error}
						</div>
					)}

					<div>
						<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
							Email
						</label>
						<input
							required
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
							placeholder="admin@blueprintos.com"
						/>
					</div>

					<div>
						<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
							Password
						</label>
						<input
							required
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading || !email || !password}
						className="w-full bg-slate-900 text-white font-black text-lg py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 mt-4 hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50"
					>
						{loading ? (
							<Loader2 size={20} className="animate-spin" />
						) : (
							'Authenticate'
						)}
						{!loading && <ArrowRight size={18} />}
					</button>
				</form>
			</div>
		</div>
	);
}
