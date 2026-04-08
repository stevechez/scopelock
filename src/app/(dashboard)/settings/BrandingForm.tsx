'use client';

import { useActionState, useState } from 'react';
import { updateBrandingAction } from '@/app/actions/settings';

interface Tenant {
	id: string;
	primary_color: string | null;
	logo_url: string | null;
}

interface FormState {
	error: string;
	success: boolean;
}

const initialState: FormState = { error: '', success: false };

export default function BrandingForm({ tenant }: { tenant: Tenant }) {
	const [state, formAction, isPending] = useActionState(
		updateBrandingAction,
		initialState,
	);
	const [tempColor, setTempColor] = useState(
		tenant?.primary_color || '#f59e0b',
	);
	const [logoPreview, setLogoPreview] = useState(tenant?.logo_url || null);

	const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setLogoPreview(URL.createObjectURL(file));
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
			{/* --- LEFT: CONFIGURATION --- */}
			<div className="lg:col-span-7 space-y-10">
				<form action={formAction} className="space-y-10">
					<input type="hidden" name="tenantId" value={tenant?.id} />
					<input
						type="hidden"
						name="currentLogoUrl"
						value={tenant?.logo_url || ''}
					/>

					{/* Logo Section */}
					<section className="relative group">
						<div className="flex items-center gap-4 mb-6">
							<span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
								01 / Visual Brand
							</span>
							<div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
						</div>

						<div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 transition-all hover:border-white/10 shadow-2xl">
							<div className="flex flex-col sm:flex-row items-center gap-10">
								<div className="relative group/logo">
									<div className="w-28 h-28 bg-black rounded-3xl border border-white/10 flex items-center justify-center p-4 overflow-hidden transition-transform group-hover/logo:scale-105">
										{logoPreview ? (
											<img
												src={logoPreview}
												alt="Preview"
												className="w-full h-full object-contain"
											/>
										) : (
											<div className="text-4xl opacity-20">🏗️</div>
										)}
									</div>
									<div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover/logo:opacity-100 transition-opacity pointer-events-none" />
								</div>

								<div className="flex-1 w-full">
									<label className="inline-block px-6 py-3 bg-white text-black text-xs font-bold rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
										Upload New Logo
										<input
											type="file"
											name="logo"
											className="hidden"
											accept="image/*"
											onChange={handleLogoChange}
										/>
									</label>
									<p className="text-[11px] text-slate-500 mt-4 leading-relaxed font-medium">
										Recommend: High-res SVG or transparent PNG.
										<br />
										Will be displayed in the top-left of the client vault.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Color Section */}
					<section>
						<div className="flex items-center gap-4 mb-6">
							<span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
								02 / Color Signature
							</span>
							<div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent" />
						</div>

						<div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 transition-all hover:border-white/10 shadow-2xl">
							<div className="flex items-center gap-10">
								<div className="relative">
									<input
										name="primaryColor"
										type="color"
										value={tempColor}
										onChange={e => setTempColor(e.target.value)}
										className="w-24 h-24 bg-transparent border-none cursor-pointer rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-105"
									/>
									<div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
								</div>

								<div className="flex-1">
									<div className="bg-black/40 rounded-2xl border border-white/5 p-6 flex items-center justify-between">
										<div>
											<p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
												Active Hex
											</p>
											<code className="text-2xl font-mono font-black text-white">
												{tempColor.toUpperCase()}
											</code>
										</div>
										<div
											className="w-10 h-10 rounded-full shadow-2xl transition-all duration-300"
											style={{
												backgroundColor: tempColor,
												boxShadow: `0 0 20px ${tempColor}44`,
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</section>

					<div className="pt-6">
						{state?.success && (
							<div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold text-center">
								✨ Brand protocol successfully synced to the Vault.
							</div>
						)}
						<button
							type="submit"
							disabled={isPending}
							className="w-full bg-white text-black font-black py-6 rounded-[1.5rem] hover:bg-slate-100 transition-all disabled:opacity-50 text-base shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] active:scale-[0.98]"
						>
							{isPending ? 'Processing Sync...' : 'Apply Brand Settings'}
						</button>
					</div>
				</form>
			</div>

			{/* --- RIGHT: THE ARCHITECTURAL PREVIEW --- */}
			<div className="lg:col-span-5 lg:sticky lg:top-8">
				<div className="relative group">
					{/* Decorative glow background */}
					<div
						className="absolute -inset-4 rounded-[3rem] opacity-20 blur-3xl transition-colors duration-1000"
						style={{ backgroundColor: tempColor }}
					/>

					<div className="relative bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-2 shadow-3xl">
						<div className="bg-slate-900 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center">
							<div className="relative mb-12">
								<div className="w-48 h-48 bg-black rounded-[3rem] border border-white/10 flex items-center justify-center p-10 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
									{logoPreview ? (
										<img
											src={logoPreview}
											alt="Logo"
											className="w-full h-full object-contain"
										/>
									) : (
										<span className="text-6xl opacity-10">🏗️</span>
									)}
								</div>

								{/* Dynamic floating badge */}
								<div
									className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border-[8px] border-slate-900 shadow-2xl transition-all duration-300"
									style={{
										backgroundColor: tempColor,
										boxShadow: `0 0 40px ${tempColor}66`,
									}}
								/>
							</div>

							<h3 className="text-white font-black text-3xl tracking-tight mb-4">
								Vault Identity
							</h3>
							<p className="text-slate-500 text-sm max-w-[220px] leading-relaxed font-medium">
								Real-time preview of how your brand translates to the homeowner
								experience.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
