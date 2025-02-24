import React from 'react'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { bundlePost } from '~/blog.server'
import type { Route } from './+types/blog-post'

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
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <div className="prose dark:prose-invert prose-neutral mx-auto py-12">
      <h1>{frontmatter.title}</h1>
      <p className="text-base font-semibold text-stone-50">
        {frontmatter.subtitle}
      </p>
      <time dateTime={datePublished} className="text-lg">
        {new Date(datePublished).toLocaleDateString()}
      </time>
      <hr />
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
    </div>
  )
}
