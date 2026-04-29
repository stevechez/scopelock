'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';

export interface ReviewItem {
	name: string;
	role: string;
	image: string;
	quote: string;
}

interface TestimonialsProps {
	reviews?: ReviewItem[];
}

const defaultReviews: ReviewItem[] = [
	{
		name: 'Julian & Claire V.',
		role: 'Coastal Estate Build',
		image: 'https://i.pravatar.cc/150?u=julian',
		quote:
			"I've built three homes, and this was the first time I didn't have to chase my contractor for a single PDF. The Comm Vault kept everything in one place. Truly a white-glove experience.",
	},
	{
		name: 'Marcus Thorne',
		role: 'Modern Penthouse Remodel',
		image: 'https://i.pravatar.cc/150?u=marcus',
		quote:
			"The 'Magic Link' system is brilliant. No passwords to remember—I just clicked my email and saw exactly where our budget stood. Total transparency from start to finish.",
	},
	{
		name: 'Sofia Moretti',
		role: 'Full Portfolio Restoration',
		image: 'https://i.pravatar.cc/150?u=sofia',
		quote:
			"Blueprint OS changed the dynamic. I never felt 'out of the loop.' Every change order was handled digitally, approved in seconds, and archived. This is how construction should work.",
	},
	{
		name: 'Harrison J.',
		role: 'Luxury Retail Build-out',
		image: 'https://i.pravatar.cc/150?u=harrison',
		quote:
			'The professional organization was night and day. Having a branded portal made us feel like our project was a priority. No lost texts, no missing blueprints, just pure execution.',
	},
	{
		name: 'Dr. Alana Wu',
		role: 'Historic Brownstone',
		image: 'https://i.pravatar.cc/150?u=alana',
		quote:
			'I used to dread project updates. Now, I just log into our Project OS. Seeing the progress photos categorized and chronologically ordered is incredibly satisfying.',
	},
	{
		name: 'Brooks Sterling',
		role: 'Smart Home Integration',
		image: 'https://i.pravatar.cc/150?u=brooks',
		quote:
			'Security was a big deal for us. Knowing our financials and contracts were in a bank-grade vault gave us huge peace of mind. Best-in-class service.',
	},
];

const ReviewCard = ({ review }: { review: ReviewItem }) => (
	<div className="relative w-[350px] md:w-[450px] shrink-0 rounded-[2.5rem] border border-border dark:border-white/10 bg-white dark:bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1">
		<div className="flex items-center gap-4 mb-6">
			{/* Avatar Border */}
			<div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-border dark:border-white/10 transition-colors duration-300">
				<Image
					src={review.image}
					alt={review.name}
					fill
					className="object-cover"
				/>
			</div>
			<div>
				<div className="flex items-center gap-2">
					{/* Name */}
					<h3 className="font-bold text-black tracking-tight transition-colors duration-300">
						{review.name}
					</h3>
					<CheckCircle2 className="w-4 h-4 text-amber-500" />
				</div>
				{/* Role */}
				<p className="text-sm font-medium text-muted transition-colors duration-300">
					{review.role}
				</p>
			</div>
		</div>

		{/* Stars */}
		<div className="flex gap-1 mb-5">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
			))}
		</div>

		{/* The Quote (Fixed Contrast) */}
		<p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium transition-colors duration-300">
			&quot;{review.quote}&quot;
		</p>
	</div>
);

export function Testimonials({ reviews = defaultReviews }: TestimonialsProps) {
	const midIndex = Math.ceil(reviews.length / 2);
	const firstRow = reviews.slice(0, midIndex);
	const secondRow = reviews.slice(midIndex);

	return (
		<section
			id="reviews"
			className="relative bg-background py-24 overflow-hidden transition-colors duration-500"
		>
			{/* Ambient Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

			<div className="container relative z-10 mx-auto px-6 mb-20 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
				>
					<h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 transition-colors duration-300 uppercase italic leading-[0.9]">
						Loved by thousands of <br className="hidden md:block" />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
							happy homeowners.
						</span>
					</h2>
					<p className="text-xl text-muted font-medium max-w-2xl mx-auto transition-colors duration-300">
						We let our work and our clients speak for us.
					</p>
				</motion.div>
			</div>

			<div
				className="relative flex flex-col gap-8 w-full"
				style={{
					maskImage:
						'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
					WebkitMaskImage:
						'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				}}
			>
				{/* Row 1: Scrolls Left */}
				<div className="flex w-max overflow-hidden">
					<motion.div
						className="flex gap-8 pr-8 hover:[animation-play-state:paused]"
						animate={{ x: ['0%', '-50%'] }}
						transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
					>
						{[...firstRow, ...firstRow].map((review, idx) => (
							<ReviewCard key={`row1-${idx}`} review={review} />
						))}
					</motion.div>
				</div>

				{/* Row 2: Scrolls Right */}
				<div className="flex w-max overflow-hidden">
					<motion.div
						className="flex gap-8 pr-8 hover:[animation-play-state:paused]"
						animate={{ x: ['-50%', '0%'] }}
						transition={{ ease: 'linear', duration: 45, repeat: Infinity }}
					>
						{[...secondRow, ...secondRow].map((review, idx) => (
							<ReviewCard key={`row2-${idx}`} review={review} />
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
