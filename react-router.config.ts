import type { Config } from '@react-router/dev/config'
import { getAllArticlesSlug } from './app/blog.server'

export default {
  ssr: true,
  async prerender({ getStaticPaths }) {
    const paths = getAllArticlesSlug().map((slug) => `/${slug}`)
    return [...getStaticPaths(), ...paths]
  },
} satisfies Config
