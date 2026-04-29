'use client';

import { useState, use } from 'react'; // 👈 Import 'use' from React
import { TOOL_CONFIG } from '@/lib/tools-config';

export default function DynamicToolPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// 1. Unwrap the params Promise using React.use()
	const { slug } = use(params);

	// 2. Lookup the tool (using lowercase to prevent "Not Found" mismatches)
	const toolKey = slug.toLowerCase();
	const tool = TOOL_CONFIG[toolKey as keyof typeof TOOL_CONFIG];

	const [formData, setFormData] = useState<Record<string, string>>({});
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// 3. Debugging: If it's still not found, let's see why
	if (!tool) {
		return (
			<div className="p-20 text-white bg-slate-950 min-h-screen">
				<h1 className="text-2xl font-black text-red-500 uppercase italic">
					Tool Not Found
				</h1>
				<p className="text-muted mt-4">
					The URL slug was:{' '}
					<span className="text-amber-500 font-mono">&ldquo;{slug}&rdquo;</span>
				</p>
				<p className="text-muted text-sm mt-2">
					Make sure this matches a key in your{' '}
					<code className="bg-slate-900 px-2 py-1 rounded">TOOL_CONFIG</code>.
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto py-12 px-6">
			<div className="mb-8">
				<span className="px-3 py-1 bg-amber-500/10 text-amber-500 font-black text-[10px] rounded-md uppercase tracking-[0.2em] mb-4 inline-block">
					{tool.badge}
				</span>
				<h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">
					{tool.title}
				</h1>
			</div>

			<form className="bg-slate-900 border border-white/5 p-8 rounded-[2rem] space-y-6 shadow-2xl">
				{tool.fields.map(field => (
					<div key={field.id}>
						<label className="block text-xs font-black text-muted uppercase tracking-widest mb-3 ml-1">
							{field.label}
						</label>
						{field.type === 'textarea' ? (
							<textarea
								required
								rows={3}
								onChange={e =>
									setFormData({ ...formData, [field.id]: e.target.value })
								}
								className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
								placeholder={field.placeholder}
							/>
						) : (
							<input
								type="text"
								required
								onChange={e =>
									setFormData({ ...formData, [field.id]: e.target.value })
								}
								className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
								placeholder={field.placeholder}
							/>
						)}
					</div>
				))}

				<button
					type="submit"
					className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5 uppercase tracking-widest text-sm"
				>
					{isLoading ? 'Drafting...' : 'Generate Professional Script'}
				</button>
			</form>

			{result && (
				<div className="mt-12 p-8 bg-slate-900 border border-amber-500/30 rounded-[2.5rem] text-slate-200 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4">
					<div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6 border-b border-amber-500/10 pb-4">
						Generated Script
					</div>
					{result}
				</div>
			)}
		</div>
	);
}
