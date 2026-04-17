'use client';

import { useState, useEffect } from 'react'; // Added useEffect
import { useRouter } from 'next/navigation';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { convertLeadToProject } from '@/app/actions';
import { Loader2, HardHat } from 'lucide-react';

interface Lead {
	id: string;
	client_name: string;
	client_email: string;
	client_phone?: string;
	project_type?: string;
	budget?: string;
	timeline?: string;
	status?: string;
	created_at?: string;
}

interface ConvertLeadSheetProps {
	lead: Lead | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ConvertLeadSheet({
	lead,
	isOpen,
	onClose,
}: ConvertLeadSheetProps) {
	const [name, setName] = useState('');
	const [budget, setBudget] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const router = useRouter();

	// 📍 SYNC STATE: When the lead changes, update the local form fields
	useEffect(() => {
		if (lead) {
			setName(`${lead.client_name} - ${lead.project_type || 'New Build'}`);
			setBudget(lead.budget || '');
		}
	}, [lead]);

	const handleConvert = async () => {
		// 📍 SAFETY CHECK: Ensure lead exists before proceeding
		if (!lead) return;

		setIsSubmitting(true);
		try {
			const result = await convertLeadToProject(lead.id, { name, budget });
			if (result.success) {
				onClose(); // Close the sheet first
				router.push(`/projects`);
				router.refresh();
			}
		} catch (error) {
			console.error(error);
			alert('Conversion failed. Check logs.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="bg-slate-950 border-l border-white/10 text-white sm:max-w-md">
				<SheetHeader className="space-y-4">
					<div className="h-12 w-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
						<HardHat className="text-slate-950" size={24} />
					</div>
					<SheetTitle className="text-3xl font-black uppercase italic tracking-tighter text-white">
						Initialize Project
					</SheetTitle>
					<SheetDescription className="text-slate-400 font-medium">
						You are promoting this lead to an active build. This will provision
						a new project container.
					</SheetDescription>
				</SheetHeader>

				<div className="grid gap-6 py-10">
					<div className="space-y-2">
						<Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
							Project Identity
						</Label>
						<Input
							value={name}
							onChange={e => setName(e.target.value)}
							className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-amber-500 outline-none"
						/>
					</div>
					<div className="space-y-2">
						<Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
							Target Budget
						</Label>
						<Input
							value={budget}
							onChange={e => setBudget(e.target.value)}
							className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-amber-500 outline-none"
						/>
					</div>
				</div>

				<SheetFooter className="mt-8">
					<Button
						onClick={handleConvert}
						disabled={isSubmitting || !lead}
						className="w-full bg-amber-500 hover:bg-white text-slate-950 font-black py-6 rounded-2xl uppercase tracking-widest transition-all"
					>
						{isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							'Confirm & Provision'
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
