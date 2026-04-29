'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	LayoutDashboard,
	Zap,
	HardHat,
	Settings,
	Layers,
	LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
	{ href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
	{ href: '/leads', icon: Zap, label: 'Pipeline' },
	{ href: '/projects', icon: HardHat, label: 'Projects' },
	{ href: '/blueprints', icon: Layers, label: 'Blueprints' },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed left-0 top-0 z-[100] h-screen w-20 flex flex-col items-center py-8 bg-[#0a0f1d]/50 border-r border-white/5 backdrop-blur-xl">
			{/* Logo Area */}
			<div className="mb-12">
				<div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center font-black italic text-foreground shadow-[0_0_20px_rgba(245,158,11,0.4)]">
					BR
				</div>
			</div>

			{/* Navigation Loop */}
			<nav className="flex flex-col gap-6 flex-1">
				{NAV_ITEMS.map(item => {
					const isActive = pathname === item.href;
					return (
						<Link key={item.href} href={item.href} className="relative group">
							<div
								className={cn(
									'p-3 rounded-2xl transition-all duration-300 relative z-10',
									isActive
										? 'bg-amber-500 text-slate-950'
										: 'text-muted hover:text-white hover:bg-white/5',
								)}
							>
								<item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
							</div>

							{/* Tooltip on Hover */}
							<div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1 bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all ml-2 whitespace-nowrap z-50">
								{item.label}
							</div>

							{/* Active Indicator Glow */}
							{isActive && (
								<motion.div
									layoutId="activeGlow"
									className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"
								/>
							)}
						</Link>
					);
				})}
			</nav>

			{/* Bottom Actions */}
			<div className="flex flex-col gap-6">
				<Link
					href="/settings"
					className={cn(
						'p-3 rounded-2xl transition-all',
						pathname === '/settings'
							? 'text-amber-500'
							: 'text-muted hover:text-white',
					)}
				>
					<Settings size={24} />
				</Link>
				<button className="p-3 rounded-2xl text-muted hover:text-red-400 transition-all">
					<LogOut size={24} />
				</button>
			</div>
		</aside>
	);
}
