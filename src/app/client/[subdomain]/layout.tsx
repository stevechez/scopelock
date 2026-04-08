// src/app/client/[subdomain]/login/layout.tsx

export default function ClientLoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="min-h-screen bg-slate-950 antialiased">
			{/* This 'children' is your actual login page.tsx */}
			{children}
		</section>
	);
}
