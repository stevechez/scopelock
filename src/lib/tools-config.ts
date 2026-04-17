export const TOOL_CONFIG = {
	'bad-news': {
		title: 'The Bad News Buffer',
		badge: 'Conflict Resolution',
		theme: 'rose',
		fields: [
			{
				id: 'clientName',
				label: 'Client Name',
				type: 'text',
				placeholder: 'e.g., The Smiths',
			},
			{
				id: 'theBadNews',
				label: 'What is the Bad News?',
				type: 'text',
				placeholder: 'e.g., The cabinets are delayed.',
			},
			{
				id: 'theReason',
				label: 'What is the Reason?',
				type: 'text',
				placeholder: 'e.g., Machinery breakdown.',
			},
			{
				id: 'theSolution',
				label: 'What is Your Solution?',
				type: 'textarea',
				placeholder: 'e.g., We will shift focus...',
			},
		],
	},
	'tire-kicker': {
		title: 'Tire Kicker Filter',
		badge: 'Sales Strategy',
		theme: 'amber',
		fields: [
			{
				id: 'prospectName',
				label: 'Prospect Name',
				type: 'text',
				placeholder: 'e.g., John Doe',
			},
			{
				id: 'projectType',
				label: 'Project Type',
				type: 'text',
				placeholder: 'e.g., Kitchen Remodel',
			},
		],
	},
	// Add the rest of your 7 tools here...
};
