import fs from 'node:fs'
import { bundleMDX } from 'mdx-bundler'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Frontmatter, Project } from '../types/project'

export async function bundleProject(slug: string) {
  const path = `${process.cwd()}/app/projects/${slug}`
  return await bundleMDX<Frontmatter>({
    file: `${path}/page.mdx`,
    cwd: path,

    esbuildOptions: (options) => {
      // Configuration to allow image loading
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.svg': 'dataurl',
        '.gif': 'dataurl',
      }
      return options
    },
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // 👇 you can set your own theme from vscode themes
        [rehypePrettyCode, { theme: 'nord' }],
      ]
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      return options
    },
  })
}

export function getAllProjectsSlug() {
  return fs.readdirSync(`${process.cwd()}/app/projects`)
}

export async function listAllProjects() {
  const dirs = getAllProjectsSlug()
  const articles: Project[] = await Promise.all(
    dirs.map(async (slug) => {
      const { frontmatter } = await bundleProject(slug)
      return { slug, ...frontmatter } as Project
    })
  )
  return articles
}
