'use client';

export default function ContactPage() {
	return (
		<div className="max-w-4xl mx-auto py-24 px-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
				<div>
					<h1 className="text-5xl font-black text-slate-900 mb-6 italic">
						Let&apos;s Talk Shop.
					</h1>
					<p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
						Whether you&apos;re stuck on a technical issue or you just want to
						talk about how to better systemize your business, I&apos;m here.
					</p>
					<div className="space-y-4">
						<div className="p-6 bg-slate-100 rounded-2xl">
							<p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
								Direct Email
							</p>
							<p className="text-lg font-bold text-slate-900 underline decoration-amber-500 underline-offset-4">
								Steve@BlueprintOS.com
							</p>
						</div>
						<div className="p-6 bg-slate-100 rounded-2xl">
							<p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
								Office Hours
							</p>
							<p className="text-lg font-bold text-slate-900 italic">
								Mon-Fri: 8am - 5pm (PST)
							</p>
						</div>
					</div>
				</div>

				<form className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-6">
					<div>
						<label className="block text-sm font-black text-slate-700 mb-2">
							Your Name
						</label>
						<input
							type="text"
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50"
						/>
					</div>
					<div>
						<label className="block text-sm font-black text-slate-700 mb-2">
							Message
						</label>
						<textarea
							rows={5}
							className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none bg-slate-50 resize-none"
							placeholder="What's on your mind?"
						></textarea>
					</div>
					<button className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
