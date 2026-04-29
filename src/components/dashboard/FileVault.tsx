'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { registerProjectFile } from '@/app/actions';
import { FileText, UploadCloud, Trash2, Download, Loader2 } from 'lucide-react';

// Define the structure of our files
interface ProjectFile {
	id: string;
	file_name: string;
	file_url: string;
	file_size: number;
	created_at: string;
}

export default function FileVault({
	leadId,
	files,
}: {
	leadId: string;
	files: ProjectFile[]; // Use the interface here
}) {
	const [uploading, setUploading] = useState(false);
	const supabase = createClient();

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setUploading(true);
			if (!e.target.files || e.target.files.length === 0) return;

			const file = e.target.files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${leadId}/${Math.random()}.${fileExt}`;

			const { error: uploadError } = await supabase.storage
				.from('project-files')
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			const {
				data: { publicUrl },
			} = supabase.storage.from('project-files').getPublicUrl(filePath);

			await registerProjectFile(leadId, file.name, publicUrl, file.size);
		} catch (error: unknown) {
			// Safe Error Handling
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert('An unexpected error occurred during upload.');
			}
		} finally {
			setUploading(false);
		}
	};

	// ... rest of the return statement

	return (
		<div className="bg-white dark:bg-[#0B101E] border border-border dark:border-white/5 rounded-[2.5rem] p-8">
			<div className="flex justify-between items-center mb-8">
				<h3 className="text-xl font-black text-foreground text-foreground italic uppercase flex items-center gap-3">
					<FileText className="text-blue-500" /> Project Vault
				</h3>

				<label className="cursor-pointer bg-slate-900 dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all">
					{uploading ? (
						<Loader2 className="animate-spin" size={14} />
					) : (
						<UploadCloud size={14} />
					)}
					Upload Document
					<input
						type="file"
						className="hidden"
						onChange={handleUpload}
						disabled={uploading}
					/>
				</label>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{files.length === 0 ? (
					<p className="col-span-2 text-center py-10 text-muted font-bold uppercase text-[10px] tracking-widest">
						The vault is empty. Upload blueprints or permits.
					</p>
				) : (
					files.map(file => (
						<div
							key={file.id}
							className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-white/[0.02] border border-border dark:border-white/5 rounded-2xl hover:border-blue-500/30 transition-all"
						>
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600">
									<FileText size={20} />
								</div>
								<div className="truncate max-w-[150px] md:max-w-[200px]">
									<p className="font-black text-foreground text-foreground uppercase text-xs truncate italic">
										{file.file_name}
									</p>
									<p className="text-[9px] text-muted font-bold uppercase">
										{(file.file_size / 1024 / 1024).toFixed(2)} MB
									</p>
								</div>
							</div>
							<a
								href={file.file_url}
								target="_blank"
								className="p-2 text-muted hover:text-blue-500 transition-colors"
							>
								<Download size={18} />
							</a>
						</div>
					))
				)}
			</div>
		</div>
	);
}
