'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
					/>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
						>
							✕
						</button>
						<iframe
							className="w-full h-full"
							src="https://www.youtube.com/embed/nYavNHBX2mw?si=O__M2ddFxrtwVwEk"
							title="BuildRail Demo"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
