<template>
  <div class="blog-container">
    <h1 class="blog-title">Current Projects</h1>
    <div class="blog-posts">
      <div v-for="post in posts" :key="post.slug" class="blog-post" @click="navigateToSinglePost(post.slug)">
        <h2 class="blog-post-title">{{ post.title }}</h2>
        <div class="blog-post-image-container">
          <!-- <img :src="post.image.url" :alt="post.image.title" class="blog-post-image"> -->
        </div>
        <p class="blog-post-description">{{ post.description }}</p>
        <div v-html="post.body" class="blog-post-body"></div>
        <p class="blog-post-date">{{ formatDate(post.publishDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from 'contentful'



export default {
  name: 'Blog',
  data() {
    return {
      posts: [],
    }
  },
  async created() {
    const client = createClient({
      space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN,
    })
    const response = await client.getEntries({
      content_type: 'blogPost',
    })
    this.posts = response.items.map(item => ({
      title: item.fields.title,
      slug: item.fields.slug,
      // image: item.fields.image.fields.file,
      description: item.fields.description,
      body: item.fields.body.slice(0, 50),
      publishDate: item.fields.publishDate,
    }))
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    navigateToSinglePost(slug) {
      this.$router.push({ name: 'Singlepost', params: { slug: slug } })
    },
  },
}
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
}

.blog-title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: all 0.3s ease-in-out;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.blog-post-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #444;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post-image-container {
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
}

.blog-post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.blog-post-description {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #777;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post-body {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #333;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post-date {
  font-size: 16px;
  color: #999;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>