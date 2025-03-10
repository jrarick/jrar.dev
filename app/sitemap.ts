import { default as routeConfig } from './routes'
import { getAllArticlesSlug } from './lib/blog.server'
import { getAllProjectsSlug } from './lib/project.server'

export const loader = async () => {
  const baseUrl = 'https://www.jrar.dev'
  const blogSlugs = getAllArticlesSlug()
  const projectSlugs = getAllProjectsSlug()
  
  // Define a type for our route objects
  type RouteInfo = { path: string };
  
  const mainRoutes: RouteInfo[] = routeConfig
    .flatMap(route => {
      // Handle the index route (home)
      if ('index' in route && typeof route.path === 'undefined') {
        return { path: '' };
      }
      
      // Handle regular routes (like about)
      if ('path' in route && typeof route.path === 'string') {
        // Exclude the sitemap.xml route
        if (['blog/:slug', 'work/:slug', 'sitemap.xml'].includes(route.path)) {
          return null;
        }
        return { path: route.path };
      }
      
      return null;
    })
    .filter((route): route is RouteInfo => route !== null); // Type-safe filter
  
  const content = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Main routes -->
      ${mainRoutes.map(route => `
      <url>
        <loc>${baseUrl}/${route.path}</loc>
        <changefreq>${route.path === '' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${route.path === '' ? '1.0' : '0.8'}</priority>
      </url>`).join('')}
      
      <!-- Blog posts -->
      ${blogSlugs.map(slug => `
      <url>
        <loc>${baseUrl}/blog/${slug}</loc>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
      </url>`).join('')}
      
      <!-- Projects -->
      ${projectSlugs.map(slug => `
      <url>
        <loc>${baseUrl}/work/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>`).join('')}
    </urlset>`
  
  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(content)),
    },
    status: 200,
  })
}