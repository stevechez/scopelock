'use client';

import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { requestMilestonePayment } from '@/app/actions';

interface SubmitProofButtonProps {
	milestoneId: string;
	jobId: string;
}

export function SubmitProofButton({
	milestoneId,
	jobId,
}: SubmitProofButtonProps) {
	const [isUploading, setIsUploading] = useState(false);

	const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			// 1. Create a unique filename (e.g., job-123/milestone-456-1691234.jpg)
			const fileExt = file.name.split('.').pop();
			const fileName = `${jobId}/${milestoneId}-${Date.now()}.${fileExt}`;

			// 2. Upload the raw image directly to Supabase Storage
			const { error: uploadError } = await supabase.storage
				.from('proofs')
				.upload(fileName, file, {
					cacheControl: '3600',
					upsert: false,
				});

			if (uploadError) throw uploadError;

			// 3. Get the public URL for the uploaded photo
			const {
				data: { publicUrl },
			} = supabase.storage.from('proofs').getPublicUrl(fileName);

			// 4. Trigger the Server Action to update the DB and text the client
			await requestMilestonePayment(milestoneId, jobId, publicUrl);
		} catch (error) {
			console.error('Upload process failed:', error);
			alert(
				'Failed to upload proof. Please check your connection and try again.',
			);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="w-full mt-2 relative">
			{/* This hidden input is the magic. 
        capture="environment" forces the rear camera on mobile devices.
      */}
			<input
				type="file"
				accept="image/*"
				capture="environment"
				id={`camera-${milestoneId}`}
				onChange={handleCapture}
				className="hidden"
				disabled={isUploading}
			/>

			<label
				htmlFor={`camera-${milestoneId}`}
				className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all cursor-pointer shadow-md ${
					isUploading
						? 'bg-slate-200 text-slate-500 cursor-not-allowed'
						: 'bg-slate-900 text-white active:bg-slate-800 active:scale-[0.98]'
				}`}
			>
				{isUploading ? (
					<>
						<Loader2 size={18} className="animate-spin" />
						Uploading & Sending...
					</>
				) : (
					<>
						<Camera size={18} />
						Submit Proof & Request Payment
					</>
				)}
			</label>
		</div>
	);
}
