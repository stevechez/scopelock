'use client';

import { useState } from 'react';
import { PiczoElement } from '@/types/piczo';
import { CanvasElement } from '@/components/piczo/CanvasElement';
import {
	Save,
	Type,
	Image as ImageIcon,
	X,
	Sparkles,
	Layout,
} from 'lucide-react';

// Put this near the top of your file, under your imports
type BlockTemplate = Omit<PiczoElement, 'id' | 'x' | 'y' | 'z' | 'rotation'> & {
	name: string;
};

const BLOCK_LIBRARY: BlockTemplate[] = [
	{
		name: 'Hero Alpha',
		type: 'text',
		content: 'REVOLUTIONIZING THE ARSENAL',
		style: { fontSize: '120px', fontWeight: '900' },
	},
	{
		name: 'Data Bento',
		type: 'section',
		variant: 'bento',
		content: '',
	},
	{
		name: 'Feature Card',
		type: 'image',
		content:
			'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop',
	},
];

export default function PiczoStudioPage() {
	const [elements, setElements] = useState<PiczoElement[]>([
		{
			id: '1',
			type: 'text',
			x: 200,
			y: 160,
			z: 1,
			rotation: 0,
			content: 'BUILD THE FUTURE ⚡️',
			style: { fontSize: '72px', fontWeight: '900' },
		},
	]);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	// ✅ STATE FOR SIDEBAR TABS
	const [activeTab, setActiveTab] = useState<'edit' | 'library'>('library');

	const selectedElement = elements.find(el => el.id === selectedId);

	// 🏗️ STATE UPDATER
	const updateElement = (id: string, updates: Partial<PiczoElement>) => {
		setElements(prev =>
			prev.map(el => (el.id === id ? { ...el, ...updates } : el)),
		);
	};

	// 🏗️ PROFESSIONAL SNAP-TO-GRID LOGIC
	const handleDragEnd = (e: React.DragEvent, id: string) => {
		const canvas = e.currentTarget.parentElement?.getBoundingClientRect();
		if (canvas) {
			const SNAP = 20; // Locks to the 20px grid
			const rawX = e.clientX - canvas.left;
			const rawY = e.clientY - canvas.top;

			updateElement(id, {
				x: Math.round(rawX / SNAP) * SNAP,
				y: Math.round(rawY / SNAP) * SNAP,
			});
		}
	};

	// 1. Fix the Bento function
	const addBento = () => {
		const newId = crypto.randomUUID(); // 👈 The modern, React-approved way
		setElements([
			...elements,
			{
				id: newId,
				type: 'section',
				variant: 'bento',
				x: 400,
				y: 400,
				z: elements.length + 1,
				rotation: 0,
				content: '',
			},
		]);
		setSelectedId(newId);
		setActiveTab('edit');
	};

	// 2. Fix the Block Library function
	const addBlockToCanvas = (block: Partial<PiczoElement>) => {
		const newId = crypto.randomUUID(); // 👈 Update here too

		const newElement = {
			...block,
			id: newId,
			x: 100,
			y: 100,
			z: elements.length + 1,
			rotation: 0,
		} as PiczoElement;

		setElements([...elements, newElement]);
		setSelectedId(newId);
		setActiveTab('edit');
	};

	return (
		<div className="fixed inset-0 bg-[#050505] text-white z-[99999] flex flex-col font-sans overflow-hidden select-none">
			{/* TOOLBAR */}
			<header className="h-16 border-b border-white/10 flex justify-between items-center px-6 bg-[#0a0a0a]/80 backdrop-blur-md z-[100] shrink-0">
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2">
						<Sparkles className="text-blue-500" size={20} />
						<span className="font-black tracking-tighter text-xl uppercase italic">
							Studio v3
						</span>
					</div>
					<nav className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
						<button
							onClick={() => {}}
							className="p-2 hover:bg-white/10 rounded-lg text-blue-500"
						>
							<Type size={18} />
						</button>
						<button
							onClick={addBento}
							className="p-2 hover:bg-white/10 rounded-lg text-muted"
						>
							<Layout size={18} />
						</button>
					</nav>
				</div>
				<button className="bg-white text-black font-black px-6 py-2 rounded-full text-sm hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
					Publish Site
				</button>
			</header>

			{/* FIXED LAYOUT: Main Canvas & Unified Sidebar share this flex container */}
			<div className="flex-1 flex overflow-hidden">
				{/* CANVAS WORKSPACE */}
				<main
					className="flex-1 relative overflow-auto cursor-crosshair scrollbar-hide bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px]"
					onDragOver={e => e.preventDefault()}
					onClick={() => setSelectedId(null)}
				>
					<div className="min-w-[4000px] min-h-[4000px] relative">
						{elements.map(el => (
							<div
								key={el.id}
								draggable
								className="absolute transition-shadow active:scale-[0.98] cursor-grab active:cursor-grabbing"
								style={{ left: `${el.x}px`, top: `${el.y}px`, zIndex: el.z }}
								onClick={e => {
									e.stopPropagation();
									setSelectedId(el.id);
									setActiveTab('edit'); // Switch to edit tab when clicking an element
								}}
								onDragEnd={e => handleDragEnd(e, el.id)}
							>
								<CanvasElement element={el} isSelected={selectedId === el.id} />
							</div>
						))}
					</div>
				</main>

				{/* UNIFIED RIGHT SIDEBAR */}
				<aside className="w-80 border-l border-white/10 bg-[#0a0a0a] flex flex-col z-[50] shadow-2xl shrink-0">
					{/* TABS */}
					<div className="flex border-b border-white/10 shrink-0">
						<button
							onClick={() => setActiveTab('library')}
							className={`flex-1 p-4 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'library' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
						>
							Library
						</button>
						<button
							onClick={() => setActiveTab('edit')}
							className={`flex-1 p-4 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'edit' ? 'text-blue-500 border-b-2 border-blue-500 bg-white/5' : 'text-zinc-500 hover:text-zinc-300'}`}
						>
							Properties
						</button>
					</div>

					{/* LIBRARY TAB CONTENT */}
					{activeTab === 'library' && (
						<div className="flex-1 overflow-y-auto p-4 space-y-4 animate-in fade-in duration-200">
							{BLOCK_LIBRARY.map(block => (
								<div
									key={block.name}
									onClick={() => addBlockToCanvas(block)}
									className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 cursor-pointer group transition-all hover:bg-white/10"
								>
									<p className="text-[10px] font-black text-zinc-400 group-hover:text-blue-400 uppercase tracking-widest mb-2">
										{block.name}
									</p>
									<div className="h-24 bg-black/40 rounded-xl flex items-center justify-center border border-white/5 overflow-hidden">
										{block.type === 'image' ? (
											<img
												src={block.content}
												alt={block.name}
												className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
											/>
										) : (
											<span className="italic text-[9px] text-zinc-600 uppercase tracking-widest">
												Spawn Component
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					)}

					{/* EDIT TAB CONTENT */}
					{activeTab === 'edit' && (
						<div className="flex-1 overflow-y-auto animate-in fade-in duration-200">
							{selectedElement ? (
								<div className="p-6 space-y-8">
									<div className="space-y-6">
										<div>
											<label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">
												Content
											</label>
											<textarea
												className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all min-h-[120px] resize-none"
												value={selectedElement.content}
												onChange={e =>
													updateElement(selectedElement.id, {
														content: e.target.value,
													})
												}
											/>
										</div>
									</div>
									<button
										onClick={() => {
											setElements(elements.filter(el => el.id !== selectedId));
											setSelectedId(null);
											setActiveTab('library');
										}}
										className="w-full py-4 rounded-2xl border border-red-500/20 text-red-500/70 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all"
									>
										Remove Block
									</button>
								</div>
							) : (
								<div className="h-full flex items-center justify-center p-6 text-center">
									<p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
										Select a block to edit properties
									</p>
								</div>
							)}
						</div>
					)}
				</aside>
			</div>
		</div>
	);
}
