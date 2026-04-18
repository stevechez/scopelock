'use client';

import { useState } from 'react';
import { Camera, Loader2, Check } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { requestMilestonePayment } from '@/app/actions';

// 📍 Fix: Add jobId to the interface
interface SubmitProofButtonProps {
	milestoneId: string;
	jobId: string; // Add this line
}

export function SubmitProofButton({
	milestoneId,
	jobId,
}: SubmitProofButtonProps) {
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
	const supabase = createClient();

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.[0]) return;

		setLoading(true);
		const file = e.target.files[0];
		// Now using jobId for better storage organization
		const filePath = `proofs/${jobId}/${milestoneId}-${Date.now()}`;

		try {
			const { error: uploadError } = await supabase.storage
				.from('site_photos')
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			const {
				data: { publicUrl },
			} = supabase.storage.from('site_photos').getPublicUrl(filePath);

			const formData = new FormData();
			formData.append('milestoneId', milestoneId);
			formData.append('jobId', jobId); // Include jobId in the server action
			formData.append('proofUrl', publicUrl);

			await requestMilestonePayment(formData);
			setDone(true);
		} catch (err) {
			console.error(err);
			alert('Failed to submit proof.');
		} finally {
			setLoading(false);
		}
	};

	// ... rest of return statement stays the same

	return (
		<label className="cursor-pointer group">
			<input
				type="file"
				className="hidden"
				onChange={handleUpload}
				accept="image/*"
				capture="environment"
				disabled={loading}
			/>
			<div className="flex items-center gap-2 bg-white text-black font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-black/20">
				{loading ? (
					<Loader2 size={14} className="animate-spin" />
				) : (
					<Camera size={14} />
				)}
				{loading ? 'Processing...' : 'Submit Proof for Payment'}
			</div>
		</label>
	);
}
