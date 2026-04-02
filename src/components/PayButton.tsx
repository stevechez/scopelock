'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { getPaymentLink } from '@/app/actions';

export function PayButton({ milestoneId }: { milestoneId: string }) {
	const [isLoading, setIsLoading] = useState(false);

	const handlePay = async () => {
		setIsLoading(true);
		try {
			const url = await getPaymentLink(milestoneId);
			if (url) {
				window.location.href = url;
			}
		} catch (error) {
			console.error(error);
			alert('Payment portal error. Please try again.');
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handlePay}
			disabled={isLoading}
			className="w-full bg-emerald-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-emerald-600 disabled:opacity-70"
		>
			{isLoading ? (
				<>
					<Loader2 className="animate-spin" />
					Securing Portal...
				</>
			) : (
				<>
					Securely Pay Now
					<ArrowRight size={20} />
				</>
			)}
		</button>
	);
}
