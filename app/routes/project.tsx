import { getMDXComponent } from 'mdx-bundler/client/index.js'
import { bundleProject } from '~/lib/project.server'
import type { Route } from './+types/project'
import { useMemo } from 'react'
import { Link } from 'react-router'

export async function loader({ params }: Route.LoaderArgs) {
  return await bundleProject(params.slug)
}

export const meta: Route.MetaFunction = ({ data }) => {
  const { title, description } = data.frontmatter

  return [
    { title },
    {
      name: 'description',
      content: description,
    },
  ]
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const { code } = loaderData

  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="overflow-auto px-4 py-12">
      <article className="prose prose-sm sm:prose-base dark:prose-invert prose-neutral mx-auto">
        <Link
          to="/work"
          className="not-prose text-accent mb-8 flex items-center space-x-2"
        >
          <svg
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>All Projects</span>
        </Link>
        <Component />
      </article>
    </div>
  )
}
