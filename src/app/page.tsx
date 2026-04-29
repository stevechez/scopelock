'use client';

import { useState } from 'react';
import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import VideoModal from '@/components/marketing/VideoModal';
import StickyCTA from '@/components/marketing/StickyCTA';
import SocialProof from '@/components/marketing/SocialProof';
import ProductModules from '@/components/marketing/ProductModules';
import BlueprintBreakdown from '@/components/marketing/BlueprintBreakdown';
import PathToSystem from '@/components/marketing/PathToSystem';
import { Pricing } from '@/components/marketing/Pricing';
// import JumpstartBanner from '@/components/marketing/JumpstartBanner';
// import FounderNote from '@/components/marketing/FounderNote';
import { Testimonials } from '@/components/marketing/Testimonials';
import CTA from '@/components/marketing/CTA';
import Footer from '@/components/marketing/Footer';
import { getSubscriptionCheckoutURL } from '@/app/actions'; // 👈 Add this import

export default function BlueprintMarketingPage() {
	const [isDemoOpen, setIsDemoOpen] = useState(false);
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false); // 👈 Add this state

	// 👈 Add this function to handle the button click
	// 👈 Update this function to accept the ID
	const handleCheckout = async (variantId: string) => {
		setIsCheckoutLoading(true);
		try {
			// 📍 Pass the variantId to the action
			const checkoutUrl = await getSubscriptionCheckoutURL(variantId);
			if (checkoutUrl) {
				window.location.href = checkoutUrl;
			}
		} catch (error) {
			console.error(error);
			alert('Failed to load checkout. Please try again.');
			setIsCheckoutLoading(false);
		}
	};
	return (
		<div className="min-h-screen bg-background text-primary font-sans selection:bg-amber-100 transition-colors duration-300 relative pb-24 md:pb-0">
			<StickyCTA />
			<VideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

			<Navbar />
			<Hero onOpenDemo={() => setIsDemoOpen(true)} />
			<SocialProof />
			<ProductModules />
			<BlueprintBreakdown />
			<PathToSystem />
			<Testimonials />
			<Pricing onCheckout={handleCheckout} isLoading={isCheckoutLoading} />
			<CTA />
			<Footer />
		</div>
	);
}
