<!-- TODO STYLE THIS COMPONENT  -->

<template>
  <div v-if="!loading" class="blog-post">
    <h2 class="blog-post-title">{{ post.title }}</h2>
    <div class="blog-post-image-container">
      <!-- <img :src="post.image.link" :alt="post.image.title" class="blog-post-image"> -->
      <img :src="heroImage" alt="Hero Image" class="blog-post-image">
    </div>
    <p class="blog-post-description">{{ post.description }}</p>
    <div v-html="renderedBody" class="blog-post-body"></div>
    <p class="blog-post-date">{{ formatDate(post.publishDate) }}</p>
  </div>
  <div v-else class="loading">
    <div class="loader"></div>
    <p class="loading-message">🐞 It's not a bug it's a feature! 🐞</p>
  </div>
</template>

<script>
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'



export default {
  name: 'Singlepost',
  data() {
    return {
      loading: true,
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
    } finally {
      this.loading = false;
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


/* Loading */

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top: 8px solid #8ac6d1;
  background-image: linear-gradient(to bottom right, #8ac6d1, #eef2f3);
  animation: spin 0.8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
}

.loading-message {
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  font-weight: 400;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg) scale(0.8);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>