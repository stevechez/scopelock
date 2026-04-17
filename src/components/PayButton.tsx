'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Lock } from 'lucide-react';

interface PayButtonProps {
	handleCheckout: () => Promise<void>;
	amount: number;
}

export function PayButton({ handleCheckout, amount }: PayButtonProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await handleCheckout();
		} catch (error) {
			console.error('Payment redirect failed:', error);
			setIsLoading(false);
			alert('Could not open secure checkout. Please try again.');
		}
	};

	return (
		<div className="space-y-4">
			<button
				onClick={handleClick}
				disabled={isLoading}
				className="w-full bg-white text-slate-900 font-black py-5 rounded-2xl hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl text-lg disabled:opacity-70"
			>
				{isLoading ? (
					<>
						<Loader2 className="w-6 h-6 animate-spin" />
						Securing Session...
					</>
				) : (
					<>
						Pay ${amount.toLocaleString()} Securely{' '}
						<ArrowRight className="w-5 h-5" />
					</>
				)}
			</button>

			<div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
				<Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
			</div>
		</div>
	);
}
