import type { Metadata } from 'next';
import manifest from '../../config/project-manifest.json';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

export async function generateMetadata(): Promise<Metadata> {
	const { metadata, identity } = manifest;

	return {
		title: {
			default: metadata.seo.title,
			template: `%s | ${identity.businessName}`,
		},
		description: metadata.seo.description,
		keywords: metadata.seo.keywords,
		metadataBase: new URL(metadata.seo.canonicalUrl),
		openGraph: {
			title: metadata.seo.title,
			description: metadata.seo.description,
			url: metadata.seo.canonicalUrl,
			siteName: identity.businessName,
			images: [
				{
					url: metadata.assets.ogImage,
					width: 1200,
					height: 630,
					alt: `${identity.businessName} Portfolio`,
				},
			],
			locale: 'en_US',
			type: 'website',
		},
		icons: {
			icon: metadata.assets.favicon,
		},
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster richColors position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
