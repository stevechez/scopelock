import React from 'react';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center">
			{/* This ensures the login card stays centered and styled */}
			<div className="w-full">{children}</div>
		</div>
	);
}
