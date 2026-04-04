'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	React.useEffect(() => {
		setMounted(true);
	}, []);

	// During SSR (Server Side Rendering), we render a blank button
	// of the exact same size to prevent layout shifts and hydration errors.
	if (!mounted) {
		return (
			<button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 opacity-50 cursor-wait">
				<span className="sr-only">Loading theme</span>
			</button>
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
