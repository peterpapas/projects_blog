<template>
  <div class="back-button-container">
    <router-link to="/" class="back-button">Back</router-link>
  </div>
  <div v-if="error !== '404'" class="dark-mode-buton-container">
    <div class="back-button" @click="toggleDarkMode">
      <span v-if="!isDarkMode">☀️ Light</span>
      <span v-else>🌙 Dark</span>
    </div>
  </div>

  <div v-if="isloading" class="loading">
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
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f7c600" transform="rotate(90 50 50)"></path>
        <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#f7c600">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
            values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
        </path>
        <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#f7c600">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
            values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
        </path>
      </g>
    </svg>
    <p class="loading-message">{{ randomMessage }}</p>
  </div>

  <div v-else-if="!isloading && error !== '404'" class="blog-post" :class="{ 'dark-mode': isDarkMode }"
    :style="{ backgroundColor: isDarkMode ? '#1e1e1e' : '#fff', color: isDarkMode ? '#fff' : '#000' }">
    <h1 class="blog-post-title" :class="{ 'dark-mode': isDarkMode }">{{ post.title }}</h1>
    <div class="blog-post-container" :class="{ 'dark-mode': isDarkMode }">
      <div class="blog-post-image-container">
        <!-- <img :src="post.image.link" :alt="post.image.title" class="blog-post-image"> -->
        <img :src="post.heroImageUrl" alt="Hero Image" class="blog-post-image">
      </div>
      <p class="blog-post-description" :class="{ 'dark-mode': isDarkMode }">{{ post.description }}</p>
      <div v-html="renderedBody" class="blog-post-body" :class="{ 'dark-mode': isDarkMode }">
      </div>
      <p class="blog-post-date" :class="{ 'dark-mode': isDarkMode }">{{ formatDate(post.publishDate) }}</p>
    </div>
  </div>
 
  <PageNotFound v-if="error === '404'" />

  
  
</template>

<script>
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import '../plugins/gtag.js';
import { useMeta } from 'vue-meta'
import PageNotFound from './PageNotFound.vue'



export default {
  name: 'Singlepost',
  components: {
    // Registering child components
    PageNotFound 
  },
  setup() {
    useMeta({
      title: 'BlogPost', name: 'description',
      content: "Check out the latest post on Peter's Full Stack Corner, where you can explore the world of full-stack development. Discover the latest trends, frameworks, and tools used by developers to build web applications from scratch. Our comprehensive guide covers everything from front-end design to back-end coding, with step-by-step tutorials, case studies, and expert insights. Follow our tips, tricks, and best practices to improve your coding skills and take your projects to the next level. Join our community and start your journey towards becoming a full-stack pro today!",
    })
  },
  data() {
    return {
      error: null,
      isloading: true,
      handleHeroImageError: false,
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
      cache: {},
      renderedBody: null,
      heroImageUrl: null,
      isDarkMode: false,
      renderNode: {

        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.description}"  />`
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const { contentType } = node.data.target.sys;
          if (contentType.sys.id === 'embeddedImage') {
            const imageUrl = node.data.target.fields.image.fields.file?.url;
            const alt = node.data.target.fields.image.fields.title;
            return imageUrl ? `<img src="https:${imageUrl}" alt="${alt}" />` : '';
          }
          return '';
        },
        [INLINES.EMBEDDED_ASSET]: (node) => {
          return `<img src="${node.data.target.fields.file.url}" alt="${node.data.target.fields.description}"  />`
        },
        [INLINES.HYPERLINK]: (node) => {
          return `<a href="${node.data.uri}" target="_blank">${node.content[0].value}</a>`
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const { contentType } = node.data.target.sys;
          if (contentType.sys.id === 'embeddedImage') {
            const imageUrl = node.data.target.fields.image.fields.file?.url;
            const alt = node.data.target.fields.image.fields.title;
            return imageUrl ? `<img src="${imageUrl}" alt="${alt}" />` : '';
          }
          return '';
        },
      }
    }
  },
  computed: {
    randomMessage() {
      return this.messages[Math.floor(Math.random() * this.messages.length)];
    },

  },

  async created() {
    this.client = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    try {
      await this.fetchPost();
    } catch (error) {
      console.error("Error fetching post:", error);
      this.error = 'Error';
    } finally {
      this.isloading = false;
    }
  },

  methods: {
    async fetchPost() {
      const slug = this.$route.params.slug;

      // Check cache first
      if (this.cache[slug]) {
        this.post = this.cache[slug];
        return;
      }

      // Fetch new post data
      const response = await this.fetchBlogPost(slug);
      if (!response || response.items.length === 0) {
        this.error = '404';
        return;
      }

      const item = response.items[0];
      this.post = await this.constructPostObject(item);
      this.cache[slug] = this.post; // Cache the response
    },

    async fetchBlogPost(slug) {
      return this.client.getEntries({
        content_type: 'blogPost',
        'fields.slug': slug,
        include: 1,
      });
    },

    async constructPostObject(item) {
      const heroImageResponse = await this.client.getAsset(item.fields.heroImage.sys.id);
      const heroImageUrl = `https:${heroImageResponse.fields.file.url}`;

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        description: item.fields.description,
        publishDate: item.fields.publishDate,
        richText: item.fields.richText,
        heroImageUrl,
      };
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
  watch: {
    'post.richText'(richText) {
      this.renderedBody = documentToHtmlString(richText, {
        renderNode: this.renderNode,
      });
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
  padding-top: 56px;
}

.blog-post-title {
  display: flex;
  justify-content: center;
  color: #444;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-size: 48px;
  font-weight: 600;

}

.blog-post-image-container {
  /* height: 300px; */
  max-width: 800px;
  -o-object-fit: cover;
  object-fit: cover;
  min-height: 150px;
  overflow: hidden;
  margin-bottom: 20px;
  justify-content: center !important;
  display: flex;
}

.blog-post-image {
  max-width: 90%;
  border-radius: 8px;

}

.blog-post-description {
  /* font-size: 18px; */
  line-height: 1.5;
  margin-bottom: 20px;
  color: #777;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  justify-content: center;
}

.blog-post-body-container {

  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 1rem;
  padding-left: 1rem; */
}

.blog-post-body {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
  max-width: 800px;
  font-family: 'Open Sans', sans-serif;
  /* padding: 0px 24px; */
  word-break: break-word;
}



.blog-post-date {
  font-size: 16px;
  color: #999;
  font-family: 'Open Sans', sans-serif;
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
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
}

::v-deep .blog-post-body img {
  display: block;
  max-width: 100%;
  margin: 15px auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 600px;
}
</style>