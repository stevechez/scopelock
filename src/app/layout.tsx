import type { Metadata } from 'next';
import manifest from '../../config/project-manifest.json';
import './globals.css';
import { Toaster } from 'sonner';

// This function dynamically generates the SEO tags for the whole site
export async function generateMetadata(): Promise<Metadata> {
	const { metadata, identity } = manifest;

	return {
		title: {
			default: metadata.seo.title,
			template: `%s | ${identity.businessName}`, // Allows sub-pages to append the name
		},
		description: metadata.seo.description,
		keywords: metadata.seo.keywords,
		metadataBase: new URL(metadata.seo.canonicalUrl),

		// OpenGraph (Facebook, LinkedIn, iMessage)
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

		// Standard Favicon
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
	const { theme } = manifest;

	return (
		<html lang="en">
			<body
				style={{
					// @ts-expect-error because these are dynamic CSS variables, TypeScript doesn't recognize them as valid properties
					'--color-primary': theme.primaryColor,
					'--color-accent': theme.accentColor,
				}}
			>
				{children}
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
