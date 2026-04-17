import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWidgetConfig } from '@/lib/db';
import ChatWidget from '@/components/chat/chat-widget';

interface Props {
	params: {
		tenantId: string;
	};
}

// Ensure the widget doesn't get indexed by search engines
export const metadata: Metadata = {
	title: 'Project Assistant | BUILDRAIL',
	robots: 'noindex, nofollow',
};

export default async function WidgetPage({ params }: Props) {
	const { tenantId } = params;

	// 1. Fetch the contractor-specific configuration from Supabase
	const config = await getWidgetConfig(tenantId);

	// 2. If the tenant doesn't exist or widget is disabled, return a 404
	// In an iframe context, this will show the Next.js error boundary or 404 page.
	if (!config) {
		return notFound();
	}

	return (
		<main className="h-screen w-full overflow-hidden bg-transparent">
			{/* We pass the database config directly into the client component.
          This ensures the widget feels 'branded' from the very first frame.
      */}
			<ChatWidget
				tenantId={tenantId}
				brandColor={config.brand_color}
				welcomeMessage={config.welcome_message}
			/>
		</main>
	);
}
