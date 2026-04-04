'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Search,
	Globe,
	Zap,
	Blocks,
	CreditCard,
	ArrowRight,
	LifeBuoy,
} from 'lucide-react';

const startHere = [
	{
		title: 'Get your website live',
		desc: 'Launch your Site Engine in under 24 hours',
		href: '#',
	},
	{
		title: 'Send your first winning bid',
		desc: 'Use the 3-tier system to close higher-paying jobs',
		href: '#',
	},
	{
		title: 'Start getting leads',
		desc: 'Make sure customers can find and contact you',
		href: '#',
	},
];

const sections = [
	{
		title: 'Get More Leads',
		icon: Globe,
		iconColor: 'text-indigo-600 dark:text-indigo-400',
		iconBg: 'bg-indigo-50 dark:bg-indigo-500/10',
		articles: [
			'How to get your website live (step-by-step)',
			'How to edit your service area for local SEO',
			"Why your site isn't getting leads (and how to fix it)",
			'What project photos actually convert homeowners?',
			'How to add customer reviews to your Site Engine',
			'Connecting your Google Business Profile',
			'How to filter out tire-kickers from web forms',
		],
	},
	{
		title: 'Send Better Bids',
		icon: Zap,
		iconColor: 'text-amber-600 dark:text-amber-400',
		iconBg: 'bg-amber-50 dark:bg-amber-500/10',
		articles: [
			'How to send a 3-option bid that wins jobs',
			'How to stop unpaid change orders (scripts included)',
			'Set your pricing so you stop undercharging',
			'The "Good, Better, Best" psychology explained',
			'What to do when a client says "You\'re too expensive"',
			'How to automate follow-ups without being annoying',
			'Sending invoices that get paid in 24 hours',
		],
	},
	{
		title: 'Set Up Your System',
		icon: Blocks,
		iconColor: 'text-emerald-600 dark:text-emerald-400',
		iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
		articles: [
			'Get fully set up in under 30 minutes',
			'Connect your custom domain without tech headaches',
			'What to do right after your first login',
			'How to add your company logo and brand colors',
			'Setting up SMS notifications for new leads',
			'How to save the Blueprint OS app to your phone home screen',
			'Inviting your partner or office manager to the Vault',
		],
	},
	{
		title: 'Billing & Account',
		icon: CreditCard,
		iconColor: 'text-slate-600 dark:text-slate-400',
		iconBg: 'bg-slate-100 dark:bg-slate-800',
		articles: [
			'How billing works (simple breakdown)',
			'Update your credit card or billing address',
			'Cancel or pause your account',
			'Upgrading to the Full Blueprint (from Comm Vault)',
			'How the $497 Jumpstart fee works',
			'Accessing your monthly tax invoices',
			'What happens to my data if I cancel?',
		],
	},
];

// Framer Motion Variants for staggered animations
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 300, damping: 24 },
	},
};

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');

export default function HelpPage() {
	// 1. Setup the state for the search query
	const [searchQuery, setSearchQuery] = useState('');

	// 2. Real-time filtering logic
	const filteredSections = sections
		.map(section => {
			const query = searchQuery.toLowerCase();

			// Check if the section title matches the search
			const matchesTitle = section.title.toLowerCase().includes(query);

			// Filter the individual articles within the section
			const filteredArticles = section.articles.filter(article =>
				article.toLowerCase().includes(query),
			);

			return {
				...section,
				// If the section title matches, show all its articles. Otherwise, show only matching articles.
				articles: matchesTitle ? section.articles : filteredArticles,
			};
		})
		.filter(section => section.articles.length > 0); // Remove sections that have 0 matching articles

	const isSearching = searchQuery.trim().length > 0;

	return (
		<div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-24 font-sans selection:bg-amber-100">
			{/* HERO */}
			<div className="bg-slate-900 dark:bg-black pt-24 pb-32 px-6 text-center relative overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-amber-500/5 blur-[120px] pointer-events-none" />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="relative z-10"
				>
					<h1 className="text-4xl md:text-5xl font-black text-white mb-6 italic tracking-tight">
						Fix the problem. Get back to work.
					</h1>

					<p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg font-medium">
						The Blueprint Playbook shows you exactly how to get more leads, send
						better bids, and run your business like a pro.
					</p>

					<div className="max-w-2xl mx-auto relative group">
						<Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
						<input
							type="text"
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							placeholder="Search (e.g. 'get more leads', 'send bid')"
							className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white/15 backdrop-blur-md transition-all shadow-2xl text-lg"
						/>
					</div>
				</motion.div>
			</div>

			{/* START HERE OVERLAP CARD (Hides smoothly when searching) */}
			<AnimatePresence>
				{!isSearching && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
						transition={{ duration: 0.3 }}
						className="max-w-5xl mx-auto px-6 -mt-16 mb-20 relative z-20"
					>
						<div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 p-6 md:p-10">
							<h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
								Start Here
							</h2>

							<div className="grid sm:grid-cols-3 gap-4 md:gap-6">
								{startHere.map(item => (
									<Link
										key={item.title}
										href={item.href}
										className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-1"
									>
										<p className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
											{item.title}
										</p>
										<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
											{item.desc}
										</p>
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* MAIN SECTIONS GRID */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				// Adjust margin top if searching so it doesn't look weird when the "Start Here" card vanishes
				className={`max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-300 ${isSearching ? 'mt-12' : ''}`}
			>
				{/* EMPTY STATE */}
				{filteredSections.length === 0 && (
					<div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
						<Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
						<h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
							No results found
						</h3>
						<p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
							We couldn&apos;t find any articles matching &ldquo;{searchQuery}
							&rdquo;.
						</p>
					</div>
				)}

				{/* FILTERED RESULTS */}
				{filteredSections.map(section => (
					<motion.div
						key={section.title}
						variants={itemVariants}
						layout // This tells Framer Motion to smoothly animate the layout changes during filtering
						className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
					>
						<div
							className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${section.iconBg} ${section.iconColor}`}
						>
							<section.icon className="w-7 h-7" strokeWidth={2.5} />
						</div>

						<h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
							{section.title}
						</h3>

						<ul className="space-y-4 flex-grow">
							{section.articles.map(article => (
								<li key={article}>
									<Link
										href={`/help/${slugify(article)}`}
										className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm leading-snug group/link"
									>
										<ArrowRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-300 dark:text-slate-600 group-hover/link:text-amber-500 transition-colors" />
										<span>{article}</span>
									</Link>
								</li>
							))}
						</ul>
					</motion.div>
				))}
			</motion.div>

			{/* HUMAN SUPPORT CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				className="max-w-3xl mx-auto px-6 text-center"
			>
				<div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-[2.5rem] p-10 md:p-16">
					<LifeBuoy className="w-12 h-12 text-amber-500 mx-auto mb-6" />
					<h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">
						Too busy to search?
					</h3>
					<p className="text-slate-600 dark:text-slate-400 mb-8 font-medium text-lg">
						You didn&apos;t start a business to read software manuals. Email me
						directly and I’ll help you fix it fast.
					</p>

					<a
						href="mailto:Steve@BlueprintOS.com"
						className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform shadow-xl active:scale-95"
					>
						Email Steve Directly
					</a>
				</div>
			</motion.div>
		</div>
	);
}
