import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BuildRail | The Operating System for Elite Builders',
	description:
		'Build your site, win bigger bids, eliminate payment friction, and automate project transparency.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				'h-full antialiased',
				geistSans.variable,
				geistMono.variable,
				inter.variable,
				'font-sans',
			)}
		>
			<body className="min-h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
				<Navbar />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<Footer />
			</body>
		</html>
	);
}
