'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// React 19 strictly warns against script tags inside client components.
// However, next-themes explicitly needs to inject a script to prevent the
// Flash of Unstyled Content (FOUC). This intercepts the false-positive
// error to keep your development environment completely clean.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
	const originalConsoleError = console.error;
	console.error = (...args: unknown[]) => {
		if (
			typeof args[0] === 'string' &&
			args[0].includes('Encountered a script tag')
		) {
			return;
		}
		originalConsoleError(...args);
	};
}

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
