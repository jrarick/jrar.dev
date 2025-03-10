import {
  type RouteConfig,
  index,
  route,
  prefix,
} from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  ...prefix('blog', [
    index('routes/blog.tsx'),
    route(':slug', 'routes/blog-post.tsx'),
  ]),
  ...prefix('work', [
    index('routes/work.tsx'),
    route(':slug', 'routes/project.tsx'),
  ]),
  route('about', 'routes/about.tsx'),
  route('sitemap.xml', 'sitemap.ts')
] satisfies RouteConfig
