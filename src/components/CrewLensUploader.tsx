'use client';

import { useState, useRef } from 'react';
import {
	Camera,
	CheckCircle2,
	Image as ImageIcon,
	Loader2,
} from 'lucide-react';
import { createLog } from '@/app/actions';

interface CrewLensProps {
	tenantId: string;
	jobId: string;
}

export function CrewLensUploader({ tenantId, jobId }: CrewLensProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [notes, setNotes] = useState('');

	const fileInputRef = useRef<HTMLInputElement>(null);

	const triggerCamera = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			setSuccess(false); // Reset success state if they take a new photo
		}
	};

	// 📍 THE HANDLER: Standardized for Next.js 15
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!notes || !previewUrl) return;

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append('tenantId', tenantId);
			formData.append('jobId', jobId);
			formData.append('content', notes);
			formData.append('type', 'crew_lens');

			const file = fileInputRef.current?.files?.[0];
			if (file) {
				formData.append('photo', file);
			}

			const result = await createLog(formData);

			if (result?.success) {
				setSuccess(true);
				setNotes('');
				setPreviewUrl(null);
				if (fileInputRef.current) fileInputRef.current.value = '';
			}
		} catch (error) {
			console.error('Upload failed:', error);
			alert('Could not save update.');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl max-w-md w-full">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl">
					<Camera className="w-6 h-6" />
				</div>
				<div>
					<h3 className="font-black text-white text-lg">CrewLens Log</h3>
					<p className="text-muted text-xs uppercase tracking-widest font-bold">
						Field Update
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div
					onClick={triggerCamera}
					className="aspect-video bg-slate-950 border-2 border-dashed border-slate-700 hover:border-teal-500/50 transition-colors rounded-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group"
				>
					{previewUrl ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={previewUrl}
							alt="Preview"
							className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
						/>
					) : (
						<div className="text-center p-6">
							<ImageIcon className="w-8 h-8 text-muted mx-auto mb-2" />
							<p className="text-sm font-bold text-slate-300">
								Tap to Snap Photo
							</p>
							<p className="text-xs text-muted mt-1">Back camera enabled</p>
						</div>
					)}
				</div>

				<input
					ref={fileInputRef}
					type="file"
					name="photo"
					accept="image/*"
					capture="environment"
					onChange={handleFileChange}
					className="hidden"
				/>

				<textarea
					value={notes}
					onChange={e => setNotes(e.target.value)}
					placeholder="E.g., Slab poured. Inspection passed."
					rows={2}
					className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-teal-500/50 resize-none"
					required
				/>

				<button
					type="submit"
					disabled={isUploading || !previewUrl}
					className="w-full py-4 bg-teal-500 text-slate-950 font-black rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20"
				>
					{isUploading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" /> Syncing to Vault...
						</>
					) : success ? (
						<>
							<CheckCircle2 className="w-5 h-5 text-slate-950" /> Logged
							Successfully
						</>
					) : (
						'Save to Project Timeline'
					)}
				</button>
			</form>
		</div>
	);
}
