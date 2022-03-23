import * as fs from 'fs'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }: any) => {
	const BASE_URL = {
		development: "https://localhost:3000",
		production: "https://nutopia.in",
		test: "https://localhost:3000"
	}[process.env.NODE_ENV]

	const staticPaths = fs.readdirSync({
		development: 'pages',
		production: './next/server/pages/',
		test: 'pages'
	}[process.env.NODE_ENV]).filter((staticPage) => {
		return ![
			"api",
			"_app.tsx",
			"_document.tsx",
			"404.tsx",
			"sitemap.xml.tsx",
		].includes(staticPage);
	}).map((staticPagePath) => {
		return `${BASE_URL}/${staticPagePath}`
	})

	const allPaths = [ ...staticPaths ]

	const sitemap =
	(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${allPaths.map((url) => { return (
			`<url>
				<loc>${url}</loc>
				<lastmod>${new Date().toISOString()}</lastmod>
				<changefreq>monthly</changefreq>
				<priority>1.0</priority>
			</url>`
		)}).join("")}
	</urlset>`)

	res.setHeader('Content-Type', 'text/xml')
	res.write(sitemap)
	res.end()

	return {
		props: {},
	}
}

export default Sitemap