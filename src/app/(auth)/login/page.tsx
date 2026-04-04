'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			if (data.user) {
				router.push('/dashboard');
				router.refresh(); // Forces Next.js to update the session state
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
			<h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
				Welcome back
			</h1>
			<p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
				Enter your credentials to access the command center.
			</p>

			{error && (
				<div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 text-rose-700 dark:text-rose-400 text-sm font-medium rounded-r-xl">
					{error}
				</div>
			)}

			<form onSubmit={handleLogin} className="space-y-5">
				<div>
					<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						required
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all dark:text-white"
						placeholder="steve@blueprintos.com"
					/>
				</div>

				<div>
					<div className="flex justify-between items-center mb-2">
						<label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
							Password
						</label>
						<Link
							href="/forgot-password"
							className="text-xs font-bold text-amber-600 dark:text-amber-500 hover:underline"
						>
							Forgot password?
						</Link>
					</div>
					<input
						type="password"
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all dark:text-white"
						placeholder="••••••••"
					/>
				</div>

				<button
					type="submit"
					disabled={isLoading}
					className="w-full py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 shadow-lg"
				>
					{isLoading ? (
						<Loader2 className="animate-spin" size={20} />
					) : (
						<>
							Sign In <ArrowRight size={20} />
						</>
					)}
				</button>
			</form>

			<p className="mt-8 text-center text-slate-500 dark:text-slate-400 font-medium">
				Don&apos;t have an account?{' '}
				<Link
					href="/signup"
					className="text-slate-900 dark:text-white font-bold hover:text-amber-500 transition-colors"
				>
					Start your free trial
				</Link>
			</p>
		</div>
	);
}
