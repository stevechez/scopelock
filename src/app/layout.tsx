import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ScopeLock | BlueprintOS',
	description: 'Lock job scope and capture change requests instantly.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={clsx(inter.className, 'bg-gray-100 text-slate-900')}>
				{/* Mobile App Container Constraint */}
				<main className="mx-auto max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col ">
					{children}
				</main>
			</body>
		</html>
	);
}
