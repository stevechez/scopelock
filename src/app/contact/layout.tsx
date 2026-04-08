import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';

export default function SupportLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
			{/* SUPPORT NAVIGATION */}
			<nav className="flex justify-between items-center px-6 py-8 max-w-4xl mx-auto w-full">
				<Link
					href="/"
					className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity text-slate-900 dark:text-white"
				>
					BUILD<span className="text-amber-500">RAIL</span>
				</Link>

				<div className="flex items-center gap-6">
					<Link
						href="/"
						className="text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors"
					>
						← Back to Site
					</Link>
					<ModeToggle />
				</div>
			</nav>

			{/* PAGE CONTENT */}
			<main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12">
				{children}
			</main>

			{/* LIGHTWEIGHT FOOTER */}
			<footer className="py-12 text-center text-slate-400 dark:text-slate-600 font-bold border-t border-slate-100 dark:border-slate-900/50 text-sm">
				© 2026 BuildRail. Built for those who build the world.
			</footer>
		</div>
	);
}
