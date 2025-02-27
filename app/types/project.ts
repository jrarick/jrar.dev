export type Frontmatter = {
  title: string
  description: string
}

export type Project = Frontmatter & {
  slug: string
}
