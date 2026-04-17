import { PiczoElement } from '@/types/piczo';

export function CanvasElement({
	element,
	isSelected,
}: {
	element: PiczoElement;
	isSelected?: boolean;
}) {
	// 🧠 The Engine: Maps our state to Tailwind animation classes
	const getAnimationClass = () => {
		switch (element.animation) {
			case 'pulse':
				return 'animate-pulse';
			case 'float':
				return 'animate-bounce'; // We use bounce as a base for floating
			case 'spin':
				return 'animate-[spin_4s_linear_infinite]'; // Slowed down pro-spin
			default:
				return '';
		}
	};

	return (
		<div
			style={{
				zIndex: element.z,
				transform: `rotate(${element.rotation}deg)`,
				...(element.style || {}),
			}}
			className="relative group transition-all duration-300 ease-out"
		>
			{/* 🚀 THE ANIMATION WRAPPER */}
			<div className={`transition-all duration-300 ${getAnimationClass()}`}>
				{/* 1. WEB 3.0 TEXT */}
				{element.type === 'text' && (
					<h1
						className="font-black tracking-tighter leading-[0.9] whitespace-nowrap select-none italic uppercase pointer-events-none"
						style={{
							fontSize: element.style?.fontSize || '64px',
							background:
								'linear-gradient(to bottom right, #FFFFFF 30%, #52525b 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
						}}
					>
						{element.content}
					</h1>
				)}

				{/* 2. IMAGE/ASSETS */}
				{(element.type === 'image' || element.type === 'sticker') && (
					<div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-white/5 backdrop-blur-md pointer-events-none">
						<img
							src={element.content}
							alt=""
							className="select-none max-w-none block"
						/>
					</div>
				)}

				{/* 3. BENTO SECTION BLOCK */}
				{element.type === 'section' && element.variant === 'bento' && (
					<div className="grid grid-cols-3 grid-rows-2 gap-4 w-[800px] h-[400px] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl pointer-events-none">
						<div className="col-span-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/10 flex items-center justify-center">
							<span className="text-white/40 font-black uppercase text-[10px] tracking-widest">
								Primary Metric
							</span>
						</div>
						<div className="bg-white/5 rounded-3xl border border-white/10" />
						<div className="bg-white/5 rounded-3xl border border-white/10" />
						<div className="col-span-2 bg-white/5 rounded-3xl border border-white/10" />
					</div>
				)}
			</div>

			{/* 4. FIGMA-STYLE SELECTION UI */}
			{/* Notice how this sits OUTSIDE the animation wrapper so it stays still */}
			{isSelected && (
				<>
					<div className="absolute -inset-4 border border-blue-500/30 rounded-2xl pointer-events-none animate-pulse" />
					<div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm shadow-xl z-[100]" />
					<div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm shadow-xl z-[100]" />
					<div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm shadow-xl z-[100]" />
					<div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm shadow-xl z-[100]" />
					<div className="absolute inset-0 border-2 border-blue-500/50 pointer-events-none rounded-lg" />
				</>
			)}
		</div>
	);
}
