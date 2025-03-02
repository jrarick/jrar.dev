import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { bundlePost } from '~/lib/blog.server'
import type { Route } from './+types/blog-post'
import { useMemo } from 'react'

export async function loader({ params }: Route.LoaderArgs) {
  return await bundlePost(params.slug)
}

export const meta: Route.MetaFunction = ({ data }) => {
  const { title, subtitle } = data.frontmatter

  return [
    { title },
    {
      name: 'description',
      content: subtitle,
    },
  ]
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const {
    code,
    frontmatter: { title, subtitle, datePublished },
  } = loaderData

  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="overflow-auto px-4 py-12">
      <article className="prose prose-sm sm:prose-base prose-invert mx-auto">
        <h1>{title}</h1>
        <p className="text-muted text-base font-semibold">{subtitle}</p>
        <time dateTime={datePublished} className="text-muted text-lg">
          {new Date(datePublished + ' CST').toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <hr className="border-accent/50" />
        <Component
          components={{
            // you shoud define style or className after passing props to avoid being overwritten by children's style
            pre: (props) => (
              <pre
                className="not-prose border-accent/50 overflow-auto rounded-md border bg-white/5 p-4"
                {...props}
              />
            ),
          }}
        />
      </article>
    </div>
  )
}
