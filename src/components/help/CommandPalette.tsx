'use client';

import {
	useEffect,
	useRef,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 1. Create a bulletproof strict interface for the props
interface CommandPaletteProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// This function finds the search term and wraps it in a highlight span
const HighlightMatch = ({ title, query }: { title: string; query: string }) => {
	if (!query) return <span>{title}</span>;

	const parts = title.split(new RegExp(`(${query})`, 'gi'));

	return (
		<span>
			{parts.map((part, i) =>
				part.toLowerCase() === query.toLowerCase() ? (
					<span
						key={i}
						className="text-amber-500 font-black underline decoration-amber-500/30 underline-offset-2"
					>
						{part}
					</span>
				) : (
					part
				),
			)}
		</span>
	);
};

// 2. Apply the interface to the component definition
export default function CommandPalette({
	isOpen,
	setIsOpen,
}: CommandPaletteProps) {
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	// The Master Close Function
	const closePalette = useCallback(() => {
		setIsOpen(false);
		setTimeout(() => setSearch(''), 200);
	}, [setIsOpen]);

	// The CMD+K & Escape Listener
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen(true);
			}
			if (e.key === 'Escape' && isOpen) {
				closePalette();
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [isOpen, closePalette, setIsOpen]);

	// Auto-focus input when opened
	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => inputRef.current?.focus(), 100);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	// Mock Database
	const articles = [
		{ title: 'How to send a PayRail link', id: '/help/payrail' },
		{ title: 'Configuring the Site Engine SEO', id: '/help/site-engine' },
		{ title: 'Setting up ScopeLock approvals', id: '/help/scopelock' },
	];

	const filtered = articles.filter(a =>
		a.title.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* BACKDROP BLUR */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closePalette}
						className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
					/>

					{/* MODAL */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -20 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className="fixed z-[101] top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background text-foreground rounded-2xl shadow-2xl overflow-hidden border border-border border-border"
					>
						<div className="flex items-center px-4 border-b border-border border-border">
							<Search className="w-5 h-5 text-muted" />
							<input
								ref={inputRef}
								value={search}
								onChange={e => setSearch(e.target.value)}
								placeholder="Search documentation..."
								className="w-full bg-transparent border-none text-foreground text-foreground px-4 py-5 focus:outline-none font-medium placeholder:text-muted"
							/>
							<kbd className="hidden sm:block px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black text-muted uppercase">
								ESC
							</kbd>
						</div>

						<div className="max-h-[60vh] overflow-y-auto p-2">
							{filtered.length === 0 ? (
								<div className="p-8 text-center text-muted font-medium">
									No results found for &ldquo;{search}&rdquo;
								</div>
							) : (
								filtered.map((article, i) => (
									<button
										key={i}
										onClick={() => {
											router.push(article.id);
											closePalette();
										}}
										className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors group"
									>
										<div className="flex items-center gap-3">
											<FileText className="w-4 h-4 text-muted group-hover:text-amber-500 transition-colors flex-shrink-0" />
											<span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-amber-500 transition-colors">
												{/* Pass the title and the current search query here */}
												<HighlightMatch title={article.title} query={search} />
											</span>
										</div>
										<ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-amber-500 transition-all -translate-x-2 group-hover:translate-x-0" />
									</button>
								))
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
