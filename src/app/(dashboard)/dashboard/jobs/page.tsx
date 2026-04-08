import Link from 'next/link';

export default function JobsListPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-black mb-6">Active Projects</h1>
			<Link
				href="/dashboard/jobs/new"
				className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold"
			>
				+ Create New Job
			</Link>
		</div>
	);
}
