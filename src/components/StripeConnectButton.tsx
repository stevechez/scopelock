'use client';

import { useState } from 'react';
import { createStripeConnectLink } from '@/app/actions'; // Adjust path if needed
import { Loader2 } from 'lucide-react';

export default function StripeConnectButton({
	tenantId,
	email,
}: {
	tenantId: string;
	email: string;
}) {
	const [isLoading, setIsLoading] = useState(false);

	const handleConnectStripe = async () => {
		setIsLoading(true);
		try {
			const onboardingUrl = await createStripeConnectLink(tenantId, email);
			if (onboardingUrl) {
				window.location.href = onboardingUrl;
			}
		} catch (error) {
			console.error('Failed to connect Stripe:', error);
			alert('Something went wrong. Please try again.');
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handleConnectStripe}
			disabled={isLoading}
			className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50"
		>
			{isLoading ? (
				<Loader2 className="w-5 h-5 animate-spin" />
			) : (
				'Connect with Stripe'
			)}
		</button>
	);
}
