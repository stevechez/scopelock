'use client';

import { useState, useRef } from 'react';
import {
	Camera,
	Loader2,
	CheckCircle2,
	Image as ImageIcon,
} from 'lucide-react';
import { uploadCrewLensLog } from '@/app/actions';

interface CrewLensProps {
	tenantId: string;
	projectId: string;
}

export default function CrewLensUploader({
	tenantId,
	projectId,
}: CrewLensProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle the image selection to show a quick preview before uploading
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			setSuccess(false);
		}
	};

	const triggerCamera = () => {
		fileInputRef.current?.click();
	};

	const handleSubmit = async (formData: FormData) => {
		setIsUploading(true);
		try {
			await uploadCrewLensLog(formData);
			setSuccess(true);
			setPreviewUrl(null);
			formRef.current?.reset();

			// Hide success message after 3 seconds
			setTimeout(() => setSuccess(false), 3000);
		} catch (error) {
			console.error(error);
			alert('Upload failed. Please check your connection and try again.');
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
					<p className="text-slate-400 text-xs uppercase tracking-widest font-bold">
						Field Update
					</p>
				</div>
			</div>

			<form ref={formRef} action={handleSubmit} className="space-y-4">
				{/* Hidden Inputs for Database linking */}
				<input type="hidden" name="tenantId" value={tenantId} />
				<input type="hidden" name="projectId" value={projectId} />

				{/* The Camera Trigger Area */}
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
							<ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-2" />
							<p className="text-sm font-bold text-slate-300">
								Tap to Snap Photo
							</p>
							<p className="text-xs text-slate-500 mt-1">
								Directly from device camera
							</p>
						</div>
					)}
				</div>

				{/* The actual input is hidden */}
				<input
					ref={fileInputRef}
					type="file"
					name="photo"
					accept="image/*"
					capture="environment" // Forces back camera on mobile
					onChange={handleFileChange}
					className="hidden"
					required
				/>

				{/* Notes Input */}
				<textarea
					name="notes"
					placeholder="E.g., Slab poured. Inspection passed."
					rows={2}
					className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-teal-500/50 resize-none"
					required
				/>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isUploading || !previewUrl}
					className="w-full py-4 bg-teal-500 text-slate-950 font-black rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20"
				>
					{isUploading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" /> Uploading to Vault...
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
