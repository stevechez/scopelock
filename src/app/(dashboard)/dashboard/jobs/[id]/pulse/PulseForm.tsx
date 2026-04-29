'use client';

import { useState, useRef } from 'react';
import { submitDailyPulse } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';
import { Send, Loader2, Camera, X } from 'lucide-react';
import Image from 'next/image';

export function PulseForm({ jobId }: { jobId: string }) {
	const [notes, setNotes] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const supabase = createClient(); // 📍 Initialize the client

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreviewUrl(objectUrl);
	};

	const clearFile = () => {
		setFile(null);
		setPreviewUrl(null);
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			let finalPhotoUrl = '';

			// 1. Upload to Supabase Storage
			if (file) {
				const fileExt = file.name.split('.').pop();
				const fileName = `${jobId}-${Date.now()}.${fileExt}`;

				// Note: Ensure your bucket 'site_photos' is public-readable in Supabase
				const { error: uploadError } = await supabase.storage
					.from('site_photos')
					.upload(fileName, file);

				if (uploadError) throw new Error('Image upload failed');

				const {
					data: { publicUrl },
				} = supabase.storage.from('site_photos').getPublicUrl(fileName);

				finalPhotoUrl = publicUrl;
			}

			// 2. Prepare data for the Server Action
			const formData = new FormData();
			formData.append('jobId', jobId);
			formData.append('notes', notes);
			formData.append('photoUrl', finalPhotoUrl);

			// 3. Trigger the Server Action
			const result = await submitDailyPulse(formData);

			if (result?.error) throw new Error(result.error);

			// 4. Success Reset
			setNotes('');
			clearFile();
		} catch (err) {
			console.error(err);
			alert('Failed to send pulse. Please check your connection.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-[2.5rem] border border-border shadow-sm mt-6"
		>
			<div className="space-y-4">
				<div>
					<label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">
						Field Notes
					</label>
					<textarea
						required
						value={notes}
						onChange={e => setNotes(e.target.value)}
						placeholder="What happened on site today?"
						className="w-full bg-slate-50 border border-border rounded-2xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none min-h-[100px] resize-none text-foreground"
					/>
				</div>

				<div>
					<label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">
						Attach Photo
					</label>
					{previewUrl ? (
						<div className="mt-1 relative h-48 w-full rounded-2xl overflow-hidden border border-border group">
							<Image
								src={previewUrl}
								alt="Preview"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<button
									type="button"
									onClick={clearFile}
									className="bg-white text-red-500 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg"
								>
									<X size={14} /> Remove Photo
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={() => fileInputRef.current?.click()}
							className="mt-1 w-full bg-slate-50 border-2 border-dashed border-border hover:border-slate-400 hover:bg-slate-100 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer text-muted group"
						>
							<Camera
								size={24}
								className="group-hover:text-slate-600 transition-colors mb-2"
							/>
							<span className="text-xs font-bold text-muted text-center">
								Tap to capture site progress
							</span>
						</div>
					)}
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileSelect}
						accept="image/*"
						capture="environment"
						className="hidden"
					/>
				</div>

				<button
					type="submit"
					disabled={loading || !notes}
					className="w-full bg-slate-900 text-white px-6 py-5 rounded-2xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-xl"
				>
					{loading ? (
						<Loader2 size={18} className="animate-spin" />
					) : (
						<Send size={18} />
					)}
					{loading ? 'Transmitting...' : 'Send Daily Pulse'}
				</button>
			</div>
		</form>
	);
}
