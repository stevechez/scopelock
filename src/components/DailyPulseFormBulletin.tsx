'use client';

import { useState, useRef } from 'react';
import { Camera, Send, Loader2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { submitDailyPulse } from '@/app/actions';

export function DailyPulseForm({ jobId }: { jobId: string }) {
	const [note, setNote] = useState('');
	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
		}
	};

	const handleSubmit = async () => {
		if (!file || !note) return;
		setIsSubmitting(true);

		try {
			// 1. Upload to Storage
			const fileName = `pulses/${jobId}/${Date.now()}-${file.name}`;
			const { error: uploadError } = await supabase.storage
				.from('proofs')
				.upload(fileName, file);

			if (uploadError) throw uploadError;

			const {
				data: { publicUrl },
			} = supabase.storage.from('proofs').getPublicUrl(fileName);

			// 📍 THE FIX: Package everything into a single FormData container
			const formData = new FormData();
			formData.append('jobId', jobId);
			formData.append('note', note);
			formData.append('publicUrl', publicUrl);

			// 📍 THE FIX: Pass the single formData object as required by the action
			await submitDailyPulse(formData);

			// 3. Reset UI state
			setNote('');
			setPreview(null);
			setFile(null);
			alert('Pulse Sent! Nice work.');
		} catch (error) {
			console.error('Pulse update failed:', error);
			alert('Failed to send pulse. Try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Step 1: The Camera Trigger / Preview */}
			<div className="relative w-full aspect-square bg-white border-2 border-dashed border-border rounded-3xl overflow-hidden flex items-center justify-center">
				{preview ? (
					<>
						<img
							src={preview}
							alt="Preview"
							className="w-full h-full object-cover"
						/>
						<button
							onClick={() => {
								setPreview(null);
								setFile(null);
							}}
							className="absolute top-4 right-4 bg-slate-900/50 backdrop-blur-md p-2 rounded-full text-white"
						>
							<X size={20} />
						</button>
					</>
				) : (
					<button
						onClick={() => fileInputRef.current?.click()}
						className="flex flex-col items-center gap-2 text-muted active:scale-95 transition-transform"
					>
						<div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
							<Camera size={32} />
						</div>
						<span className="font-bold text-sm tracking-tight">
							Snap Today&apos;s Progress
						</span>
					</button>
				)}
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					capture="environment"
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>

			{/* Step 2: The Note */}
			<div className="space-y-2">
				<label className="text-xs font-bold text-muted uppercase tracking-widest ml-1">
					Daily Note
				</label>
				<textarea
					value={note}
					onChange={e => setNote(e.target.value)}
					placeholder="What did the crew get done today?"
					className="w-full bg-white border border-border rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-slate-900 min-h-[100px]"
				/>
			</div>

			{/* Step 3: Action */}
			<button
				onClick={handleSubmit}
				disabled={isSubmitting || !file || !note}
				className="w-full bg-slate-900 text-white font-black text-xl py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:bg-slate-800 transition-all"
			>
				{isSubmitting ? (
					<Loader2 className="animate-spin" />
				) : (
					<Send size={24} />
				)}
				{isSubmitting ? 'Syncing...' : 'Send Daily Pulse'}
			</button>
		</div>
	);
}
