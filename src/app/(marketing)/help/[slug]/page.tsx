import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';

// 1. Tell Next.js where to find the articles
const CONTENT_DIR = path.join(process.cwd(), 'src/content/help');

// 2. Fetch the specific article based on the URL
async function getArticle(slug: string) {
	try {
		const filePath = path.join(CONTENT_DIR, `${slug}.md`);
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(fileContent);
		return { frontmatter: data, content };
	} catch (error) {
		console.error('🚨 Could not find article:', error);
		return null;
	}
}

// 3. The Page UI (Updated for Next.js 15+)
export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>; // Type it as a Promise
}) {
	// Await the params to unwrap them
	const { slug } = await params;

	const article = await getArticle(slug);

	if (!article) {
		notFound();
	}

	const { frontmatter, content } = article;

	return (
		<article className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 px-6 pb-24">
			<div className="max-w-3xl mx-auto">
				{/* Back Button */}
				<Link
					href="/help"
					className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-amber-500 mb-12 transition-colors"
				>
					<ArrowLeft className="w-4 h-4" /> Back to Help Center
				</Link>

				{/* Article Header */}
				<header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-12">
					<div className="flex items-center gap-2 text-amber-500 font-bold text-sm mb-6">
						<Clock className="w-4 h-4" /> {frontmatter.readTime || '5 min read'}
					</div>
					<h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
						{frontmatter.title}
					</h1>
					<p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
						{frontmatter.description}
					</p>
				</header>

				{/* Article Content */}
				<div className="prose prose-slate dark:prose-invert prose-lg prose-headings:font-black prose-a:text-amber-500 hover:prose-a:text-amber-600 prose-img:rounded-2xl max-w-none">
					<ReactMarkdown>{content}</ReactMarkdown>
				</div>
			</div>
		</article>
	);
}
