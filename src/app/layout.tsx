import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // 👈 This brings Tailwind and all your styles back to life!

// Load a clean, modern font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'BlueprintOS | The OS for Elite Builders',
	description: 'Eliminate payment friction and automate project transparency.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/* The antialiased class makes text look ultra-crisp on Apple devices */}
			<body
				className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen`}
			>
				{children}
			</body>
		</html>
	);
}
