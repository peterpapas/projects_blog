import { createClient } from 'contentful'

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE,
  accessToken: import.meta.env.VITE_CONTENTFUL_TOKEN,
})

export async function getPosts() {
  const res = await client.getEntries({ content_type: 'post', order: '-fields.publishDate' })
  return res.items
}

export async function getPostBySlug(slug: string) {
  const res = await client.getEntries({ content_type: 'post', 'fields.slug': slug, limit: 1 })
  return res.items[0] ?? null
}


