<template>
  <div class="blog-post">
    <h2 class="blog-post-title">{{ post.title }}</h2>
    <div class="blog-post-image-container">
      <!-- <img :src="post.image.link" :alt="post.image.title" class="blog-post-image"> -->
      <img :src="heroImage" alt="Hero Image" class="blog-post-image">
    </div>
    <p class="blog-post-description">{{ post.description }}</p>
    <div v-html="renderedBody" class="blog-post-body"></div>
    <p class="blog-post-date">{{ formatDate(post.publishDate) }}</p>
  </div>
</template>

<script>
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'



export default {
  name: 'Singlepost',
  data() {
    return {
      post: {},
      renderedBody: '',
      heroImage: null
    }
  },
  async created() {
    const client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    })

    try {
      const response = await client.getEntries({
        content_type: 'blogPost',
        'fields.slug': this.$route.params.slug,
        include: 1,
      })

      if (response.items.length > 0) {
        const item = response.items[0]
        const heroImageId = item.fields.heroImage.sys.id
        const heroImageResponse = await client.getAsset(heroImageId)
        this.heroImage = `https:${heroImageResponse.fields.file.url}`

        this.post = {
          title: item.fields.title,
          slug: item.fields.slug,
          description: item.fields.description,
          publishDate: item.fields.publishDate,
          richText: item.fields.richText,
        }
        this.renderedBody = documentToHtmlString(item.fields.richText)
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
  },
}
</script>
<style scoped>
.blog-post {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
}

.blog-post-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #444;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post-image-container {
  /* height: 300px; */
  -o-object-fit: cover;
  object-fit: cover;
  min-height: 150px;
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
}

.blog-post-description {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #777;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post-body-container {

  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
}

.blog-post-body {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #333;
  text-align: justify;
  max-width: 800px;
  font-family: 'Source Sans Pro', sans-serif;

}

.blog-post-date {
  font-size: 16px;
  color: #999;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>