import fs from 'node:fs'
import { bundleMDX } from 'mdx-bundler'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Article, Frontmatter } from '../types/article'

export async function bundlePost(slug: string) {
  const path = `${process.cwd()}/app/blog/${slug}`
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

export function getAllArticlesSlug() {
  return fs.readdirSync(`${process.cwd()}/app/blog`)
}

export async function listAllArticles() {
  const dirs = getAllArticlesSlug()
  const articles: Article[] = await Promise.all(
    dirs.map(async (slug) => {
      const { frontmatter } = await bundlePost(slug)
      return { slug, ...frontmatter } as Article
    })
  )
  articles.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
  return articles
}
