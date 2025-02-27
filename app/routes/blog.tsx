import { listAllArticles } from '~/lib/blog.server'
import type { Route } from './+types/blog'
import { Link } from 'react-router'

export async function loader({}: Route.LoaderArgs) {
  const articles = await listAllArticles()

  return { articles }
}

export const meta: Route.MetaFunction = () => [
  { title: 'Blog Archive' },
  { name: 'description', content: 'Check out recent blog posts' },
]

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <h1 className="text-accent text-3xl font-bold">Blog Archive</h1>
      <div className="space-y-4 py-4">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="bg-fill hover:border-accent/50 relative flex flex-col space-y-2 rounded-md border border-neutral-800 to-80% p-5 transition-colors hover:bg-gradient-to-r hover:from-white/5"
          >
            <div className="bg-accent text-fill w-min rounded-md px-2.5 py-1 text-xs">
              {article.category}
            </div>
            <Link
              to={`/blog/${article.slug}`}
              className="text-xl"
              prefetch="viewport"
            >
              {article.title}
              <span className="absolute inset-0" />
            </Link>
            <p className="text-muted text-sm">{article.subtitle}</p>
            <time dateTime={article.datePublished} className="text-muted">
              {new Date(article.datePublished + ' CST').toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}
