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
] satisfies RouteConfig
