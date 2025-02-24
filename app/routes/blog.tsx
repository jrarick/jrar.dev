import { listAllArticles } from '~/blog.server'
import type { Route } from './+types/blog'
import { Link } from 'react-router'

export async function loader({}: Route.LoaderArgs) {
  const articles = await listAllArticles()

  return {
    articles,
  }
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <h1 className="text-accent text-3xl font-bold">Blog Archive</h1>
      <div className="space-y-4 py-4">
        {loaderData.articles.map((article) => (
          <article
            key={article.slug}
            className="bg-fill relative flex flex-col space-y-1 rounded-md border border-neutral-800 p-5 transition-colors hover:bg-white/5"
          >
            <div className="bg-accent text-fill w-min rounded-md px-2.5 py-1 text-xs">
              {article.category}
            </div>
            <Link to={`/blog/${article.slug}`} className="text-xl">
              {article.title}
              <span className="absolute inset-0" />
            </Link>
            <p className="text-muted text-sm">{article.subtitle}</p>
            <time dateTime={article.datePublished} className="text-muted">
              {new Date(article.datePublished).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
    </div>
  )
}
