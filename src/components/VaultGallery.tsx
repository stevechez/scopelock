import { createClient } from '@/utils/supabase/server';
import { FolderIcon, FileIcon, ImageIcon, FileTextIcon } from 'lucide-react';

export default async function VaultGallery({ tenantId }: { tenantId: string }) {
	const supabase = await createClient();

	// Fetch the files metadata from our new vault_files table
	const { data: files, error } = await supabase
		.from('vault_files')
		.select('*')
		.eq('tenant_id', tenantId)
		.order('created_at', { ascending: false });

	if (error) {
		return (
			<div className="text-red-400">Error loading files: {error.message}</div>
		);
	}

	// Empty State
	if (!files || files.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[3rem]">
				<div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
					<FolderIcon className="text-slate-600 w-8 h-8" />
				</div>
				<h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight italic">
					Your Vault is Empty
				</h3>
				<p className="text-slate-500 text-sm max-w-xs text-center">
					Your contractor hasn&quot;t uploaded any documents or photos yet.
					They&quot;ll appear here once ready.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{files.map(file => (
				<div
					key={file.id}
					className="group relative bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:border-amber-500/50 transition-all cursor-pointer shadow-xl shadow-black/20"
				>
					<div className="flex items-start justify-between mb-4">
						<div className="p-3 bg-slate-800 rounded-2xl group-hover:bg-amber-500/10 transition-colors">
							{file.category === 'photo' ? (
								<ImageIcon className="w-6 h-6 text-amber-500" />
							) : file.category === 'invoice' ? (
								<FileTextIcon className="w-6 h-6 text-emerald-500" />
							) : (
								<FileIcon className="w-6 h-6 text-blue-500" />
							)}
						</div>
						<span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-amber-500/50 transition-colors">
							{new Date(file.created_at).toLocaleDateString()}
						</span>
					</div>

					<h4 className="text-white font-bold truncate pr-4">{file.name}</h4>
					<p className="text-slate-500 text-xs mt-1 uppercase tracking-tighter font-medium">
						{(file.size_bytes / 1024 / 1024).toFixed(2)} MB • {file.category}
					</p>

					{/* Download Button (Visual placeholder for now) */}
					<div className="mt-6 flex items-center text-amber-500 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
						View Document →
					</div>
				</div>
			))}
		</div>
	);
}
