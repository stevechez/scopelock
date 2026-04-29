'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronRight, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- 1. THE LOGIC TREE DATA STRUCTURE ---
// This is strictly typed so TypeScript will yell at you if you break the tree.
type Option = {
	label: string;
	nextStep?: string; // If it leads to another question
	articleUrl?: string; // If it's the final answer
};

type Step = {
	id: string;
	question: string;
	description?: string;
	options: Option[];
};

const DECISION_TREE: Record<string, Step> = {
	start: {
		id: 'start',
		question: 'What do you want to accomplish today?',
		description: 'Select an area to get step-by-step guidance.',
		options: [
			{ label: 'Win more jobs & get leads', nextStep: 'leads' },
			{ label: 'Manage an active project', nextStep: 'project' },
			{ label: 'Get paid faster', nextStep: 'billing' },
		],
	},
	leads: {
		id: 'leads',
		question: 'Where is the bottleneck in your sales?',
		options: [
			{
				label: 'I need more local traffic (Site Engine)',
				articleUrl: '/help/site-engine-setup',
			},
			{ label: 'I need to close bids at higher margins', nextStep: 'bids' },
			{
				label: 'Clients are ghosting my proposals',
				articleUrl: '/help/comm-vault-followups',
			},
		],
	},
	bids: {
		id: 'bids',
		question: 'How are you currently pricing?',
		options: [
			{
				label: 'Setting up the 3-Tier Proposal',
				articleUrl: '/help/comm-vault-tiers',
			},
			{
				label: 'Anchoring price psychology',
				articleUrl: '/help/pricing-strategy',
			},
		],
	},
	project: {
		id: 'project',
		question: 'What project issue are you facing?',
		options: [
			{
				label: 'The client wants to add more work (Scope Creep)',
				articleUrl: '/help/scopelock-change-orders',
			},
			{
				label: 'I need to update the crew (smCrewLens)',
				articleUrl: '/help/crew-lens',
			},
		],
	},
	billing: {
		id: 'billing',
		question: 'How do you want to collect this payment?',
		options: [
			{
				label: 'On-site via SMS link (PayRail)',
				articleUrl: '/help/payrail-sms',
			},
			{ label: 'Standard email invoice', articleUrl: '/help/payrail-invoices' },
			{ label: 'Connect my Stripe account', articleUrl: '/help/stripe-setup' },
		],
	},
};

// --- 2. THE WIZARD COMPONENT ---
interface DecisionWizardProps {
	isOpen: boolean;
	setIsOpen: (v: boolean) => void;
	initialStep?: string; // Allows Quick Actions to skip the 'start' node
}

export default function DecisionWizard({
	isOpen,
	setIsOpen,
	initialStep = 'start',
}: DecisionWizardProps) {
	const router = useRouter();
	const [currentStepId, setCurrentStepId] = useState<string>(initialStep);
	const [history, setHistory] = useState<string[]>([]); // Tracks path for the 'Back' button
	const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward (for animations)

	const step = DECISION_TREE[currentStepId];

	const handleClose = useCallback(() => {
		setIsOpen(false);
		// Reset state after exit animation finishes
		setTimeout(() => {
			setCurrentStepId(initialStep);
			setHistory([]);
			setDirection(1);
		}, 200);
	}, [setIsOpen, initialStep]);

	const handleOptionClick = (option: Option) => {
		if (option.articleUrl) {
			// It's a final destination! Route them.
			router.push(option.articleUrl);
			handleClose();
		} else if (option.nextStep) {
			// Move deeper into the tree
			setDirection(1);
			setHistory(prev => [...prev, currentStepId]);
			setCurrentStepId(option.nextStep);
		}
	};

	const handleBack = () => {
		if (history.length === 0) return;
		setDirection(-1);
		const newHistory = [...history];
		const prevStepId = newHistory.pop()!;
		setHistory(newHistory);
		setCurrentStepId(prevStepId);
	};

	// Animation Variants for smooth sliding
	const slideVariants = {
		enter: (dir: number) => ({
			x: dir > 0 ? 50 : -50,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (dir: number) => ({
			x: dir > 0 ? -50 : 50,
			opacity: 0,
		}),
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* BACKDROP */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleClose}
						className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm"
					/>

					{/* MODAL CONTAINER */}
					<div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={{ duration: 0.2, ease: 'easeOut' }}
							className="w-full max-w-xl bg-background text-foreground rounded-3xl shadow-2xl border border-border border-border overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
						>
							{/* HEADER */}
							<div className="flex items-center justify-between p-6 border-b border-border border-border/50">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
										<Map className="w-4 h-4" />
									</div>
									<span className="font-bold text-foreground text-foreground text-sm">
										Decision Wizard
									</span>
								</div>
								<button
									onClick={handleClose}
									className="p-2 text-muted hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* DYNAMIC CONTENT AREA */}
							<div className="p-8 flex-1 overflow-x-hidden overflow-y-auto relative min-h-[300px]">
								{/* BREADCRUMB / BACK BUTTON */}
								<div className="h-8 mb-2">
									<AnimatePresence>
										{history.length > 0 && (
											<motion.button
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: -10 }}
												onClick={handleBack}
												className="flex items-center gap-2 text-sm font-bold text-muted hover:text-amber-500 transition-colors"
											>
												<ArrowLeft className="w-4 h-4" /> Back
											</motion.button>
										)}
									</AnimatePresence>
								</div>

								<AnimatePresence mode="wait" custom={direction}>
									{step && (
										<motion.div
											key={step.id}
											custom={direction}
											variants={slideVariants}
											initial="enter"
											animate="center"
											exit="exit"
											transition={{ duration: 0.2, ease: 'easeOut' }}
											className="w-full"
										>
											<h2 className="text-2xl md:text-3xl font-black text-foreground text-foreground mb-3 tracking-tight">
												{step.question}
											</h2>
											{step.description && (
												<p className="text-muted dark:text-muted font-medium mb-8">
													{step.description}
												</p>
											)}

											<div className="space-y-3 mt-8">
												{step.options.map((option, idx) => (
													<button
														key={idx}
														onClick={() => handleOptionClick(option)}
														className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-border border-border hover:border-amber-500 text-left transition-all group"
													>
														<span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
															{option.label}
														</span>
														<ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
													</button>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
