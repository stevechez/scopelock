'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="w-10 h-10 rounded-full bg-background border border-border opacity-50" />
		);
	}

	const isDark = resolvedTheme === 'dark';

	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className="relative flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-muted/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<Sun
				className={`h-[1.2rem] w-[1.2rem] transition-all text-amber-500 ${
					isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
				}`}
			/>
			<Moon
				className={`absolute h-[1.2rem] w-[1.2rem] transition-all text-indigo-400 ${
					isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'
				}`}
			/>
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
