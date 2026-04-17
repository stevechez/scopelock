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
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
					/>

					{/* Modal Content */}
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						className="relative w-full max-w-5xl aspect-video"
					>
						{/* The Close Button - Positioned outside the video frame for better UX */}
						<button
							onClick={onClose}
							className="absolute -top-12 right-0 text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
						>
							<span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
								Close Esc
							</span>
							<div className="w-8 h-8 border border-slate-800 rounded-full flex items-center justify-center text-sm">
								✕
							</div>
						</button>

						{/* The "Glow" effect hugging the video */}
						<div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-yellow-600/30 rounded-2xl blur-xl" />

						{/* Video Container */}
						<div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
							<iframe
								className="w-full h-full"
								src="https://www.youtube.com/embed/nYavNHBX2mw?autoplay=1&mute=0&controls=1&modestbranding=1"
								title="Blueprint OS Demo"
								allow="autoplay; encrypted-media"
								allowFullScreen
							/>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
