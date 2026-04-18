'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

interface PayButtonProps {
	milestoneId: string;
}

export function PayButton({ milestoneId }: PayButtonProps) {
	const [loading, setLoading] = useState(false);

	const handlePayment = async () => {
		setLoading(true);
		// This is where you'll eventually trigger the Stripe checkout
		console.log('Processing milestone:', milestoneId);

		// Simulating a delay for the "World-Class" feel
		await new Promise(resolve => setTimeout(resolve, 1500));
		setLoading(false);
	};

	return (
		<button
			onClick={handlePayment}
			disabled={loading}
			className="w-full bg-white text-black font-black uppercase text-[10px] tracking-widest py-5 rounded-2xl hover:bg-amber-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/10 active:scale-[0.98]"
		>
			{loading ? (
				<Loader2 size={16} className="animate-spin" />
			) : (
				<CreditCard size={16} />
			)}
			{loading ? 'Initiating...' : 'Pay Milestone Now'}
		</button>
	);
}
