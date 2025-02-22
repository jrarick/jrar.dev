import { listAllArticles } from '~/blog.server'
import type { Route } from './+types/blog'

export async function loader({}: Route.LoaderArgs) {
  const articles = await listAllArticles()

  return {
    articles,
  }
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      {loaderData.articles.map((article) => (
        <li key={article.slug}>
          <a href={`/blog/${article.slug}`}>{article.title}</a>
        </li>
      ))}
    </ul>
  )
}
