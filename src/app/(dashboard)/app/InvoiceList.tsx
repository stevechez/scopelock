'use client';

import { motion, Variants } from 'framer-motion';
import { markInvoicePaidAction } from '@/app/actions/invoice';
import { useTransition } from 'react';

type Invoice = {
	id: string;
	description: string;
	status: string;
	amount: number | string;
};

export default function InvoiceList({ invoices }: { invoices: Invoice[] }) {
	const [isPending, startTransition] = useTransition();

	const handleMarkPaid = (id: string) => {
		startTransition(async () => {
			await markInvoicePaidAction(id);
		});
	};

	const container: Variants = {
		hidden: { opacity: 0 },
		show: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const item: Variants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 300, damping: 24 },
		},
	};

	if (!invoices || invoices.length === 0) {
		return (
			<p className="text-slate-500 font-bold text-center py-8 border border-dashed border-slate-700 rounded-xl">
				No active invoices.
			</p>
		);
	}

	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			className="space-y-4"
		>
			{invoices.map(inv => (
				<motion.div
					key={inv.id}
					variants={item}
					className={`flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700 border-l-4 ${inv.status === 'paid' ? 'border-l-emerald-500 opacity-60' : 'border-l-blue-500'}`}
				>
					<div>
						<div className="font-bold text-white">{inv.description}</div>
						<div
							className={`text-xs uppercase tracking-widest mt-1 font-bold ${inv.status === 'paid' ? 'text-emerald-400' : 'text-slate-400'}`}
						>
							Status: {inv.status}
						</div>
					</div>
					<div className="text-right flex flex-col items-end gap-2">
						<div className="font-black text-white text-lg">
							${Number(inv.amount).toLocaleString()}
						</div>

						{/* Only show the button if it's unpaid */}
						{inv.status === 'unpaid' && (
							<button
								onClick={() => handleMarkPaid(inv.id)}
								disabled={isPending}
								className="text-[10px] uppercase tracking-widest font-bold bg-slate-900 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full hover:bg-emerald-500 hover:text-slate-900 hover:border-emerald-500 transition-all disabled:opacity-50"
							>
								{isPending ? 'Updating...' : 'Mark Paid'}
							</button>
						)}
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
