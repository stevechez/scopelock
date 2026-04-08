'use client';

import { useState, useRef } from 'react';
import { submitDailyPulse } from '@/app/actions';
import { supabase } from '@/lib/supabase'; // 👈 Make sure this path matches your setup
import { Send, Loader2, Camera, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export function PulseForm({ jobId }: { jobId: string }) {
	const [notes, setNotes] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Hidden file input reference
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;

		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		// Create a temporary local URL to show a preview instantly
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

			// 1. If a file was selected, upload it to Supabase first
			if (file) {
				const fileExt = file.name.split('.').pop();
				const fileName = `${jobId}-${Date.now()}.${fileExt}`;
				const filePath = `${fileName}`;

				const { error: uploadError } = await supabase.storage
					.from('site_photos')
					.upload(filePath, file);

				if (uploadError) throw new Error('Image upload failed');

				// 2. Get the public URL of the uploaded image
				const {
					data: { publicUrl },
				} = supabase.storage.from('site_photos').getPublicUrl(filePath);

				finalPhotoUrl = publicUrl;
			}

			// 3. Send the notes and the new URL to your existing Server Action
			await submitDailyPulse(jobId, notes, finalPhotoUrl);

			// 4. Reset the form
			setNotes('');
			clearFile();
		} catch (err) {
			console.error(err);
			alert('Failed to send pulse. Please check your connection.');
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mt-6"
		>
			<div className="space-y-4">
				{/* Notes Textarea */}
				<div>
					<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
						Field Notes
					</label>
					<textarea
						required
						value={notes}
						onChange={e => setNotes(e.target.value)}
						placeholder="e.g. Rough framing completed on main floor. Passed city inspection."
						className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm mt-1 focus:ring-2 focus:ring-slate-900 outline-none min-h-[100px] resize-none text-slate-900"
					/>
				</div>

				{/* Photo Upload Area */}
				<div>
					<label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
						Attach Photo
					</label>

					{previewUrl ? (
						/* Image Preview State */
						<div className="mt-1 relative h-40 w-full rounded-xl overflow-hidden border border-slate-200 group">
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
									className="bg-white text-red-500 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
								>
									<X size={14} /> Remove Photo
								</button>
							</div>
						</div>
					) : (
						/* Upload Button State */
						<div
							onClick={() => fileInputRef.current?.click()}
							className="mt-1 w-full bg-slate-50 border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-100 transition-colors rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer text-slate-400 group"
						>
							<Camera
								size={24}
								className="group-hover:text-slate-600 transition-colors mb-2"
							/>
							<span className="text-xs font-bold text-slate-500">
								Tap to take photo or upload
							</span>
						</div>
					)}

					{/* The actual hidden file input */}
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileSelect}
						accept="image/jpeg, image/png, image/webp, image/heic"
						capture="environment" /* Tells mobile to open the rear camera */
						className="hidden"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading || !notes}
					className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-bold text-sm shadow-md mt-2"
				>
					{loading ? (
						<Loader2 size={16} className="animate-spin" />
					) : (
						<Send size={16} />
					)}
					{loading ? 'Uploading & Transmitting...' : 'Send Daily Pulse'}
				</button>
			</div>
		</form>
	);
}
