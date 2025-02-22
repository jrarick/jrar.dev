export type Frontmatter = {
  title: string
  subtitle: string
  category: string
  datePublished: string
}

export type Article = Frontmatter & {
  slug: string
}
