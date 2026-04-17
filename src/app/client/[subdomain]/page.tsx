'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Loader2, Mailbox } from 'lucide-react';

export default function ClientPortalLogin() {
	const [email, setEmail] = useState('');
	const [token, setToken] = useState('');
	const [step, setStep] = useState<'email' | 'code'>('email');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const router = useRouter();

	// Create a Supabase client for the browser
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const handleSendCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					// This tells Supabase not to send a magic link, but a 6-digit code instead
					shouldCreateUser: true,
				},
			});

			if (error) throw error;
			setStep('code');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Failed to send code. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const { error } = await supabase.auth.verifyOtp({
				email,
				token,
				type: 'email',
			});

			if (error) throw error;

			// Success! Send them to the Switchboard which will route them to CommVault
			router.push('/dashboard');
			router.refresh();
		} catch (err) {
			// 1. Narrow the type: Check if it's a standard Error object
			if (err instanceof Error) {
				setError(err.message);
			} else {
				// 2. Fallback for weird edge cases where something non-Error was thrown
				setError('An unexpected error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
			<div className="w-full max-w-md">
				{/* Branding */}
				<div className="text-center mb-10">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-6 shadow-xl shadow-slate-900/20">
						<ShieldCheck className="w-8 h-8 text-amber-500" />
					</div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">
						Client Portal
					</h1>
					<p className="text-slate-500 font-medium mt-2">
						Secure access to your project timeline and financial documents.
					</p>
				</div>

				{/* Login Card */}
				<div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
					<AnimatePresence mode="wait">
						{step === 'email' ? (
							<motion.form
								key="email-form"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								onSubmit={handleSendCode}
								className="space-y-6"
							>
								<div>
									<label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
										Email Address
									</label>
									<input
										type="email"
										required
										value={email}
										onChange={e => setEmail(e.target.value)}
										className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
										placeholder="Enter your email"
									/>
								</div>

								{error && (
									<div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">
										{error}
									</div>
								)}

								<button
									type="submit"
									disabled={isLoading || !email}
									className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-slate-900/20"
								>
									{isLoading ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										'Send Secure Code'
									)}
								</button>
							</motion.form>
						) : (
							<motion.form
								key="code-form"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								onSubmit={handleVerifyCode}
								className="space-y-6"
							>
								<div className="text-center p-4 bg-amber-50 rounded-2xl mb-6">
									<Mailbox className="w-8 h-8 text-amber-500 mx-auto mb-2" />
									<p className="text-sm text-slate-700 font-medium">
										We sent a 6-digit code to <br />
										<strong className="text-slate-900">{email}</strong>
									</p>
								</div>

								<div>
									<label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
										Enter 6-Digit Code
									</label>
									<input
										type="text"
										required
										maxLength={6}
										value={token}
										onChange={e => setToken(e.target.value.replace(/\D/g, ''))} // Only allow numbers
										className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 font-black text-center tracking-[0.5em] text-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
										placeholder="000000"
									/>
								</div>

								{error && (
									<div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">
										{error}
									</div>
								)}

								<button
									type="submit"
									disabled={isLoading || token.length !== 6}
									className="w-full bg-amber-500 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-amber-500/20"
								>
									{isLoading ? (
										<Loader2 className="w-5 h-5 animate-spin" />
									) : (
										'Verify & Enter Vault'
									)}
								</button>

								<button
									type="button"
									onClick={() => setStep('email')}
									className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 mt-4"
								>
									Use a different email
								</button>
							</motion.form>
						)}
					</AnimatePresence>
				</div>

				<div className="text-center mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
					Powered by BUILDRAIL
				</div>
			</div>
		</div>
	);
}
