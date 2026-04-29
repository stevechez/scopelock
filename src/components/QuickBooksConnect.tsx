'use client';

import { connectQuickBooks } from '@/app/actions';
import { Button } from '@/components/ui/button'; // Assuming you're using shadcn or similar

export function QuickBooksConnect() {
	return (
		<div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
			<h3 className="text-lg font-bold text-slate-900 mb-2">Accounting Sync</h3>
			<p className="text-slate-500 text-sm mb-6">
				Connect BUILDRAIL to QuickBooks to sync invoices, expenses, and
				milestone payments.
			</p>
			<form action={connectQuickBooks}>
				<Button
					type="submit"
					className="bg-[#2CA01C] hover:bg-[#258a18] text-white font-bold px-8 py-6 rounded-2xl"
				>
					Connect to QuickBooks
				</Button>
			</form>
		</div>
	);
}
