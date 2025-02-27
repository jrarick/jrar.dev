import { listAllProjects } from '~/lib/project.server'
import type { Route } from './+types/work'
import { Link } from 'react-router'

export async function loader({}: Route.LoaderArgs) {
  const projects = await listAllProjects()

  return { projects }
}

export const meta: Route.MetaFunction = () => [
  { title: 'Projects' },
  { name: 'description', content: `Stuff I've worked on` },
]

export default function Work({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <h1 className="text-accent text-3xl font-bold">Stuff I've worked on</h1>
      <div className="space-y-4 py-4">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="bg-fill hover:border-accent/50 hover:shadow-accent/20 relative flex flex-col space-y-2 rounded-md border border-neutral-800 to-80% p-5 shadow-md shadow-transparent transition-colors hover:bg-gradient-to-r hover:from-white/5"
          >
            <Link
              to={`/work/${project.slug}`}
              className="text-xl"
              prefetch="viewport"
            >
              {project.title}
              <span className="absolute inset-0" />
            </Link>
            <p className="text-muted text-sm">{project.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
