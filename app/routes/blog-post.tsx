import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { bundlePost } from '~/blog.server'
import type { Route } from './+types/blog-post'
import { useMemo } from 'react'

export async function loader({ request, params }: Route.LoaderArgs) {
  return await bundlePost(params.slug)
}

export const meta: Route.MetaFunction = ({ data }) => {
  const { title, subtitle, datePublished, category } = data.frontmatter

  return [
    {
      title,
      subtitle,
      datePublished,
      category,
    },
  ]
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { code, frontmatter } = loaderData
  const { datePublished } = frontmatter

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <div className="overflow-auto px-4 py-12">
      <article className="prose prose-sm sm:prose-base dark:prose-invert prose-neutral mx-auto">
        <h1>{frontmatter.title}</h1>
        <p className="text-muted text-base font-semibold">
          {frontmatter.subtitle}
        </p>
        <time dateTime={datePublished} className="text-muted text-lg">
          {new Date(datePublished).toLocaleDateString()}
        </time>
        <hr className="border-accent/50" />
        <Component
          components={{
            // you shoud define style or className after passing props to avoid being overwritten by children's style
            pre: (props) => (
              <pre
                {...props}
                style={{
                  borderRadius: '8px',
                  margin: '8px',
                  padding: '8px',
                  overflow: 'auto',
                  backgroundColor: 'gray',
                }}
              />
            ),
          }}
        />
        <hr className="border-accent/50" />
      </article>
    </div>
  )
}
