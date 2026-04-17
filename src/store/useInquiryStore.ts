// store/useInquiryStore.ts
import { create } from 'zustand';

interface InquiryState {
	serviceCategory: string;
	investmentLevel: string;
	contactName: string;
	contactEmail: string;
	setField: (field: keyof InquiryState, value: string) => void;
	resetForm: () => void;
}

export const useInquiryStore = create<InquiryState>(set => ({
	serviceCategory: '',
	investmentLevel: '',
	contactName: '',
	contactEmail: '',
	setField: (field, value) => set(state => ({ ...state, [field]: value })),
	resetForm: () =>
		set({
			serviceCategory: '',
			investmentLevel: '',
			contactName: '',
			contactEmail: '',
		}),
}));
