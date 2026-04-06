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
import Pricing from '@/components/marketing/Pricing';
// import JumpstartBanner from '@/components/marketing/JumpstartBanner';
// import FounderNote from '@/components/marketing/FounderNote';
import Testimonials from '@/components/marketing/Testimonials';
import CTA from '@/components/marketing/CTA';
import Footer from '@/components/marketing/Footer';

export default function BlueprintMarketingPage() {
	const [isDemoOpen, setIsDemoOpen] = useState(false);

	return (
		<div className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-amber-100 transition-colors duration-300 relative pb-24 md:pb-0">
			<StickyCTA />
			<VideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

			<Navbar />
			<Hero onOpenDemo={() => setIsDemoOpen(true)} />
			<SocialProof />
			<ProductModules />
			<BlueprintBreakdown />
			<PathToSystem />
			<Pricing />
			{/* <JumpstartBanner /> */}
			<Testimonials />
			<CTA />
			<Footer />
		</div>
	);
}
