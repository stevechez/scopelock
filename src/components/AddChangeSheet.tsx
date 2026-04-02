'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X } from 'lucide-react';
import { clsx } from 'clsx';
// 1. We import the Server Action here at the very top
import { createChangeOrder } from '@/app/actions';

interface AddChangeSheetProps {
	isOpen: boolean;
	onClose: () => void;
	jobId: string;
}

const QUICK_PRICES = [150, 250, 500];

export function AddChangeSheet({
	isOpen,
	onClose,
	jobId,
}: AddChangeSheetProps) {
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState<number | ''>('');
	// 2. Add the submitting state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [isOpen]);

	// 3. The updated async handleSend function
	const handleSend = async () => {
		if (!price || !description) return;

		setIsSubmitting(true);
		try {
			// Calls the secure server action to write to Supabase
			await createChangeOrder(jobId, description, Number(price));

			console.log('Change Order Saved to Supabase!');
			onClose();
			setDescription('');
			setPrice('');
		} catch (error) {
			console.error('Failed to save change order:', error);
			alert('Failed to send. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Dark Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-slate-900/60 z-40"
					/>

					{/* Bottom Sheet */}
					<motion.div
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-6 shadow-2xl flex flex-col gap-6 max-h-[85vh] overflow-y-auto"
					>
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-bold text-slate-900">
								Add Quick Change
							</h3>
							<button
								onClick={onClose}
								className="p-2 bg-slate-100 rounded-full text-slate-500 active:bg-slate-200"
							>
								<X size={20} />
							</button>
						</div>

						{/* Step 1: Voice / Text Input */}
						<div className="relative">
							<input
								ref={inputRef}
								type="text"
								value={description}
								onChange={e => setDescription(e.target.value)}
								placeholder="What changed? (e.g. Premium tile)"
								className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
							/>
							<button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-2 hover:text-slate-900 transition-colors">
								<Mic size={24} />
							</button>
						</div>

						{/* Step 2: Quick Pricing Chips */}
						<div>
							<p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
								Estimated Cost
							</p>
							<div className="flex flex-wrap gap-3">
								{QUICK_PRICES.map(p => (
									<button
										key={p}
										onClick={() => setPrice(p)}
										className={clsx(
											'flex-1 py-3 rounded-xl font-bold text-lg border-2 transition-all active:scale-95',
											price === p
												? 'bg-slate-900 border-slate-900 text-white shadow-md'
												: 'bg-white border-slate-200 text-slate-700',
										)}
									>
										${p}
									</button>
								))}
								<div className="flex-1 relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
										$
									</span>
									<input
										type="number"
										placeholder="Custom"
										value={
											price === ''
												? ''
												: !QUICK_PRICES.includes(price as number)
													? price
													: ''
										}
										onChange={e => setPrice(Number(e.target.value))}
										className={clsx(
											'w-full py-3 pl-8 pr-4 rounded-xl font-bold text-lg border-2 transition-all focus:outline-none placeholder:font-normal',
											price !== '' && !QUICK_PRICES.includes(price as number)
												? 'bg-slate-900 border-slate-900 text-white shadow-md'
												: 'bg-white border-slate-200 text-slate-700 focus:border-slate-400',
										)}
									/>
								</div>
							</div>
						</div>

						{/* Step 3: Send Action */}
						<AnimatePresence>
							{price !== '' && description.length > 2 && (
								<motion.button
									initial={{ opacity: 0, height: 0, marginTop: 0 }}
									animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
									exit={{ opacity: 0, height: 0, marginTop: 0 }}
									onClick={handleSend}
									disabled={isSubmitting}
									className="w-full bg-emerald-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:bg-emerald-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100"
								>
									<Send size={24} />
									{/* 4. Update the button text based on loading state */}
									{isSubmitting ? 'Saving...' : 'Send for Approval'}
								</motion.button>
							)}
						</AnimatePresence>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
