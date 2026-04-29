'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	LayoutDashboard,
	FolderLock,
	ShieldCheck,
	Hammer,
	Settings,
	LogOut,
	Menu,
	Bell,
	Lock,
} from 'lucide-react';

const navigation = [
	{ name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
	{ name: 'Comm Vault™', href: '/dashboard/vault', icon: FolderLock },
	{ name: 'ScopeLock™', href: '/dashboard/scopelock', icon: ShieldCheck },
	{ name: 'PayRail™', href: '/dashboard/payrail', icon: Hammer },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans">
			{/* MOBILE HEADER */}
			<div className="md:hidden bg-background text-foreground border-b border-border border-border p-4 flex items-center justify-between sticky top-0 z-50">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center">
						<Lock className="w-4 h-4" />
					</div>
					<span className="font-black text-lg text-foreground text-foreground uppercase italic tracking-tight">
						Project <span className="text-amber-500">OS</span>
					</span>
				</div>
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="text-muted hover:text-foreground dark:hover:text-white"
				>
					<Menu className="w-6 h-6" />
				</button>
			</div>

			{/* SIDEBAR (Desktop + Mobile overlay) */}
			<div
				className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-background text-foreground border-r border-border border-border transform transition-transform duration-300 ease-in-out flex flex-col
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                md:relative md:h-screen md:sticky md:top-0
            `}
			>
				{/* BRANDING */}
				<div className="h-20 flex items-center gap-3 px-6 border-b border-border border-border shrink-0">
					<div className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-foreground rounded-xl flex items-center justify-center shadow-inner">
						<Lock className="w-5 h-5" />
					</div>
					<div className="flex flex-col">
						<span className="font-black text-lg text-foreground text-foreground leading-none tracking-tight uppercase italic">
							Blueprint <span className="text-amber-500">OS</span>
						</span>
						<span className="text-[9px] font-bold text-muted uppercase tracking-widest">
							Client Portal
						</span>
					</div>
				</div>

				{/* NAV LINKS */}
				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
					{navigation.map(item => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all
                                    ${
																			isActive
																				? 'bg-amber-500/10 text-amber-600 dark:text-amber-500'
																				: 'text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-foreground dark:hover:text-white'
																		}
                                `}
							>
								<item.icon
									className={`w-5 h-5 ${isActive ? 'fill-amber-500/20' : ''}`}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* USER / SETTINGS FOOTER */}
				<div className="p-4 border-t border-border border-border shrink-0 space-y-2">
					<Link
						href="/dashboard/settings"
						className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-muted hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-foreground dark:hover:text-white transition-all"
					>
						<Settings className="w-5 h-5" /> Settings
					</Link>
					<button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-500/10 transition-all text-left">
						<LogOut className="w-5 h-5" /> Sign Out
					</button>
				</div>
			</div>

			{/* MAIN CONTENT CANVAS */}
			<div className="flex-1 flex flex-col min-h-screen overflow-hidden">
				{/* TOP HEADER */}
				<header className="h-20 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-border border-border flex items-center justify-between px-8 sticky top-0 z-30 shrink-0 hidden md:flex">
					<h1 className="text-xl font-black text-foreground text-foreground tracking-tight">
						{navigation.find(n => n.href === pathname)?.name || 'Dashboard'}
					</h1>
					<div className="flex items-center gap-4">
						<button className="w-10 h-10 rounded-full bg-background text-foreground border border-border border-border flex items-center justify-center text-muted hover:text-foreground dark:hover:text-white transition-colors shadow-sm">
							<Bell className="w-5 h-5" />
						</button>
						<div className="h-10 px-4 rounded-full bg-background text-foreground border border-border border-border flex items-center justify-center shadow-sm">
							<span className="text-xs font-black uppercase tracking-widest text-muted">
								Client Vault
							</span>
						</div>
					</div>
				</header>

				{/* THE PAGE CONTENT */}
				<main className="flex-1 overflow-y-auto p-4 md:p-8">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="max-w-6xl mx-auto"
					>
						{children}
					</motion.div>
				</main>
			</div>

			{/* MOBILE OVERLAY BACKGROUND */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}
		</div>
	);
}
