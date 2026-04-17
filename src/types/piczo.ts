export type PiczoElementType = 'text' | 'image' | 'sticker' | 'section';

export interface PiczoElement {
	id: string;
	type: PiczoElementType;
	x: number;
	y: number;
	z: number;
	rotation: number;
	content: string;
	variant?: 'bento' | 'hero' | 'features';
	style?: React.CSSProperties;
	// 👇 Add this line
	animation?: 'none' | 'pulse' | 'float' | 'spin';
}
