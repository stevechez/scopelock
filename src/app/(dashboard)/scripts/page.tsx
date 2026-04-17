import PromptLibrary from '@/components/prompts/PromptLibrary';

export default function ScriptsPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-black text-white mb-8">AI Script Library</h1>
			<PromptLibrary />
		</div>
	);
}
