import type { RequestHandler } from './$types';

const BASE_URL = 'https://knightversegroup.com';

// Static pages
const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/products', priority: '0.8', changefreq: 'weekly' },
	{ path: '/solutions', priority: '0.8', changefreq: 'weekly' },
	{ path: '/careers', priority: '0.8', changefreq: 'daily' },
	{ path: '/about', priority: '0.6', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.6', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

// Dynamic job pages - in production, this would come from a database/API
const jobs = [
	{ id: 2903, lastmod: '2025-11-03' }
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const staticUrls = staticPages
		.map(
			(page) => `
	<url>
		<loc>${BASE_URL}${page.path}</loc>
		<lastmod>${today}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`
		)
		.join('');

	const jobUrls = jobs
		.map(
			(job) => `
	<url>
		<loc>${BASE_URL}/careers/${job.id}</loc>
		<lastmod>${job.lastmod}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
	</url>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${staticUrls}${jobUrls}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
