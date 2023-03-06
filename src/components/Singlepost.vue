<!-- TODO STYLE THIS COMPONENT  -->

<template>
  <div class="back-button-container">
    <router-link to="/" class="back-button">Back</router-link>
  </div>
  <div class="dark-mode-buton-container">
    <div class="back-button" @click="toggleDarkMode">
      <span v-if="!isDarkMode">☀️ Light</span>
      <span v-else>🌙 Dark</span>
    </div>
  </div>
  <div v-if="!loading" class="blog-post" :class="{ 'dark-mode': isDarkMode }"
    :style="{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', color: isDarkMode ? '#fff' : '#000' }">
    <div class="blog-post-container" :class="{ 'dark-mode': isDarkMode }">

      <h1 class="blog-post-title" :class="{ 'dark-mode': isDarkMode }">{{ post.title }}</h1>
      <div class="blog-post-image-container">
        <!-- <img :src="post.image.link" :alt="post.image.title" class="blog-post-image"> -->
        <img :src="heroImage" alt="Hero Image" class="blog-post-image">
      </div>
      <p class="blog-post-description" :class="{ 'dark-mode': isDarkMode }">{{ post.description }}</p>
      <div v-html="renderedBody" class="blog-post-body" :class="{ 'dark-mode': isDarkMode }">
      </div>
      <p class="blog-post-date" :class="{ 'dark-mode': isDarkMode }">{{ formatDate(post.publishDate) }}</p>
    </div>
  </div>

  <div v-else class="loading">
    <!-- <div class="loader"></div> -->
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="  display: block;"
      width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g>
        <circle cx="60" cy="50" r="4" fill="#1e4eac">
          <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.67s">
          </animate>
          <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
            begin="-0.67s"></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#1e4eac">
          <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="-0.33s">
          </animate>
          <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
            begin="-0.33s"></animate>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#1e4eac">
          <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1" begin="0s">
          </animate>
          <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1" keyTimes="0;0.2;1"
            begin="0s"></animate>
        </circle>
      </g>
      <g transform="translate(-15 0)">
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#61f711" transform="rotate(90 50 50)"></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#61f711">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
            values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#61f711">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
            values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
        </path>
      </g>
    </svg>
    <p class="loading-message">{{ randomMessage }}</p>
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
      messages: [
        "It's not a bug it's a feature! 🐛💡🐞",
        "Give me a second to think... 🤔⏰",
        "I'm fetching the data... 🚚💻",
        "Holding on tight, almost there... 🤞🏼🔜",
        "Do you like this loading message? 💬🤔",
        "The data is on its way... 📶👀",
        "Let's wait and see... ⏳👀",
        "Working on it... 👨‍💻🔨",
        "Is it done yet? 🤔❓",
        "Patience is a virtue... 😌🙏",
      ],
      post: {},
      renderedBody: '',
      heroImage: null,
      isDarkMode: false
    }
  },
  computed: {
    randomMessage() {
      return this.messages[Math.floor(Math.random() * this.messages.length)];
    },
  },
  created() {
    // Simulate a delay before the data is loaded
    setTimeout(() => {
      this.loading = false;
    }, 3000);
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
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
}
</script>
<style scoped>
/* Back Button START*/
.back-button-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button {
  /* display: inline-block; */
  background-color: #fff;
  color: #444;
  border: 1px solid #444;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.back-button:hover {
  background-color: #444;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Back Button END*/

/* Dark Button START */

.dark-mode {
  background-color: #1E1E1E;
  color: white !important;
}


.dark-mode-buton-container {
  position: absolute;
  top: 10px;
  right: 10px;
}

::v-deep .dark-mode .blog-post-body a {
  color: #FFFF00 !important;
}

/* Dark Button END */

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
  /* font-size: 24px; */
  margin-bottom: 20px;
  color: #444;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 0px 12px;
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

.blog-post-image {
  max-width: 100vw;
}

.blog-post-description {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #777;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 0px 12px;
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
  padding: 0px 24px;

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
  background-color: #f2f2f2;
}



.loading-message {
  font-size: 1.5rem;
  margin-top: 1rem;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 20px;
  font-weight: 400;
}
</style>