<template>
  <div class="main-container">
    <div class="header">
      <div class="header-content">
        <h1 class="blog-title">Welcome to Peter's Fullstack Corner</h1>
        <h2>also known as... Bliggity-blog...🔥👨‍💻</h2>
        <p class="blog-description">Discover a collection of my fullstack and other projects in one place.</p>
        <div class="rocketship-container">
          <img
            src="https://res.cloudinary.com/dxetyokin/image/upload/f_auto,q_auto/v1682572023/fullstackpeter.com/Header/headerRocketship.png"
            alt="rocketship" class="rocketship-image">
          <div class="rocketship-shadow"></div>
        </div>
      </div>
    </div>
    <PageNotFound v-if="error === '404'" />
    <div v-if="!loading" class="blog-container">
      <div class="blog-post" v-if="posts.length > 0">
        <router-link :to="`/${posts[0].slug}`" class="post-link">
          <div class="list-card">
            <div class="postFirst">
              <img :src="getHeroImage(posts[0])" alt="Hero" class="post-image-hero" />
              <div class="post-body">
                <div class="post-main">
                  <h4 class="title">{{ posts[0].title }}</h4>
                  <p class="blog-post-description" style="color: #777777">{{ posts[0].description }}</p>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="grid-container" v-if="posts.length > 1">
        <div v-for="(post) in posts.slice(1, displayedPosts)" :key="post.slug" class="grid-item"
          @click="navigateToSinglePost(post.slug)">
          <div class="list-card">
            <div class="post">
              <img :src="getHeroImage(post)" alt="Hero" class="post-image" />
              <div class="post-body">
                <div class="post-main">
                  <h4 class="title">{{ post.title }}</h4>
                  <p class="blog-post-description" style="color: #777777">{{ post.description }}</p>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-more-posts-container" v-show="noMorePosts">
        <div class="alert">
          <div class="emoji">
            <span class="red-face">😅</span>
          </div>
          <div class="message">
            <p class="no-more-posts">Oopsie daisy🌼, looks like you've reached the end of our blog posts.
              No worries, I'm always working on something. Stay tuned for updates!<span
                class="emoji-icons">🔜📝👨‍💻</span></p>
          </div>
        </div>
      </div>
      <div class="centered-container">
        <button class="button-82-pushable" @click="loadMorePosts()">
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">
            Read More
          </span>
        </button>
      </div>
    </div>
    <div v-else class="loading">
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
  </div>
</template>

<script lang="ts">
/// <reference types="vite/client" />
import { createClient } from "contentful";
import '../plugins/gtag.js';
import { RouteLocationNormalized, Router } from "vue-router";
import { useMeta } from 'vue-meta'
import PageNotFound from './PageNotFound.vue';


const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

type MyComponentInstance = {
  $router: Router;
  $route: RouteLocationNormalized;
};

interface Post {
  title: string;
  slug: string;
  image: string;
  description: string;
  publishDate: string;
  heroImage: {
    sys: {
      id: string;
    }
  };
}

export default {

  name: "Blog",
  components: {
    PageNotFound
  },
  setup() {
    useMeta({
      title: 'Home', name: 'description',
      content: "Explore Peter's Fullstack Corner, the ultimate destination for Fullstack Development enthusiasts. Discover a wide range of projects that Peter has been working on, ranging from web development to mobile apps, and keep up to date with the latest trends in Fullstack development. Join Peter on his journey as he shares his passion for coding with the world.",
    })
  },
  data() {
    return {
      error: null as string | null,
      loading: true,
      displayedPosts: 10,
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
      posts: [] as Post[],
      heroImage: null,
      noMorePosts: false,
    };
  },
  computed: {
    randomMessage(): string {
      return this.messages[Math.floor(Math.random() * this.messages.length)];
    },
  },
  async created() {
    try {
      const response = await contentfulClient.getEntries<Post>({
        content_type: "blogPost",
      });

      if (response.items.length === 0) {
        // No posts found, set error to '404'
        this.error = '404';
        this.loading = false;
        return;
      }

      this.posts = await Promise.all(response.items.map(async (item) => {
        const heroImageId = item.fields.heroImage.sys.id;
        const heroImageResponse = await contentfulClient.getAsset(heroImageId);
        const heroImageUrl = `https:${heroImageResponse.fields.file.url}`;

        return {
          title: item.fields.title,
          slug: item.fields.slug,
          image: heroImageUrl,
          description: item.fields.description,
          publishDate: item.fields.publishDate,
          heroImage: item.fields.heroImage,
        };
      }));

      this.loading = false;
    } catch (error) {
      // Error occurred during data fetch
      console.error("Error fetching posts:", error);
      this.error = '404';
      this.loading = false;
    }
  },
  methods: {
    formatDate(date: string): string {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    navigateToSinglePost(slug: string): void {
      this.$router.push({ name: "Singlepost", params: { slug } });
    },
    getHeroImage(post: Post): string {
      return post.image;
    },
    async loadMorePosts() {
      const response = await contentfulClient.getEntries<Post>({
        content_type: "blogPost",
        skip: this.displayedPosts,
        limit: 9
      });
      if (response.items.length === 0) {
        this.noMorePosts = true
        return;
      }
      const mappedPosts = response.items.map((entry) => {
        return {
          title: entry.fields.title,
          slug: entry.fields.slug,
          image: entry.fields.image,
          description: entry.fields.description,
          publishDate: entry.fields.publishDate,
          heroImage: entry.fields.heroImage
        };
      });
      this.posts.push(...mappedPosts);
      this.displayedPosts += mappedPosts.length;
    }
  },
};
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;


}

.blog-post-description {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #6c757d;
  font-family: 'Source Sans Pro', sans-serif;
}

.blog-post {
  margin-bottom: 40px;
}

.title {
  /* color: #39b982; */
  color: #4FACF7;
  font: 600 24px "Source Sans Pro", sans-serif;
}


@media screen and (min-width: 40em) {
  .title {
    font-size: 30.5px;
  }
}

.post {
  position: relative;
  height: 100%;
  display: grid;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 12px;
  min-height: 450px;
  transition: box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.post:hover {
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
  cursor: pointer;
}

.postFirst {
  position: relative;
  height: 100%;
  display: grid;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border-radius: 12px;
  transition: box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.postFirst:hover {
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
  transform: scale(1.03);
  cursor: pointer;
}




.line {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 8px;
  width: 0%;
  background-color: rgba(218, 247, 255, 0.594);
  transition: width 0.5s ease-in-out;
  border-radius: 0px 50px 50px 0px;
}

.post-main {
  text-align: center;
}

.post-main:hover .line {
  width: 100%;
  right: 100%;
  left: 0;
  transition: width 1s ease-in-out, right 1.5s ease-in-out;
}

.post-image {
  object-fit: cover;
  max-height: 200px;
  width: 100%;
  height: 100%;
  border-radius: 12px
}

.post-image-hero {
  object-fit: cover;
  max-height: 500px;
  width: 100%;
  height: 100%;
  border-radius: 12px
}

@media screen and (min-width: 40em) {
  .post-image {
    height: 100%;
  }
}

.post-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #fff;
  z-index: 2;
  transition: background cubic-bezier(0.445, 0.05, 0.55, 0.95) 250ms;

}

.post-body:hover {
  background: linear-gradient(45deg, #b3ddff 0%, #ffff 100%);
}


@media screen and (max-width: 30em) {
  .post-body {
    padding-top: 35px;
    flex-flow: column;
    text-align: center;
    padding: 0;
  }

  .post-body .post-meta {
    margin-left: 0;
  }

  .post-image {
    max-height: 200px;
  }

  .post-image-hero {
    max-height: 200px;
  }

  .post-info {
    border-radius: 12px 12px 12px 12px;
    margin-bottom: 10px;
    background: rgba(0, 255, 255, 0.797)
  }
}

.post-meta {
  font-size: 16px;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
}

.post-info,
.post-meta {
  display: flex;
  margin-top: 10px;
}



.post-info {
  align-items: center;
  position: relative;
  padding: 10px 10px 10px 20px;
  z-index: 1;
  right: 0;
  background: rgba(0, 255, 255, 0.776);
  text-align: left;
  border-radius: 12px 0px 0px 12px;
}

@media screen and (min-width: 40em) {
  .post-info {
    position: absolute;

    margin-top: -75px;
    text-align: center;
  }

}

.post-date {
  margin: 0;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  color: #6c757d;
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

@media screen and (max-width: 650px) {
  .blog-title {
    font: 677 17px/1 Source Sans Pro, sans-serif;
    margin: 0;
    font-weight: 700;
  }

  .header {
    padding: 10px;
  }
}

/* GRID START */

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.grid-item {
  grid-column-end: span 1;
  grid-row-end: span 1;
}

@media (max-width: 767px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

/* GRID END */


/* FIRST POST START */

@media only screen and (min-width: 1024px) {
  .postFirst {
    display: flex;
  }
}

/* FIRST POST END */

/* HEADER START */



.header {
  background-image: url('../assets/headerBackground.svg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-title {
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4F4F4F;
  background-image: linear-gradient(to right, #ff8a00, #e52e71, #6610f2, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #007bff;
  text-transform: uppercase;
  letter-spacing: 5px;
}

.blog-description {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 50px;
  color: #6c757d;
}

.rocketship-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.rocketship-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 2px #333);
  animation: rocketship 2s ease-in-out infinite;
}

.rocketship-shadow {
  position: absolute;
  bottom: -10px;
  left: 10px;
  width: 180px;
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  filter: blur(4px);
}

@keyframes rocketship {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

/* HEADER END */


/* .post-link {
  text-decoration: none;
} */

.post-link {
  text-decoration: none;
}

.post-link h4.title {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding-bottom: 5px;
}

.post-link h4.title::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease-in-out;
}

.post-link h4.title:hover::before,
.post-link h4.title:focus::before {
  transform: scaleX(1);
}


/* Read more button START */

.button-82-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-82-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
    transform 600ms cubic-bezier(.3, .7, .4, 1);
}

.button-82-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%);
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition:
    transform 600ms cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-82-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.button-82-pushable:hover .button-82-front {
  transform: translateY(-6px);
  transition:
    transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-82-pushable:hover .button-82-shadow {
  transform: translateY(4px);
  transition:
    transform 250ms cubic-bezier(.3, .7, .4, 1.5);
}

.button-82-pushable:active .button-82-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-82-pushable:focus:not(:focus-visible) {
  outline: none;
}

.centered-container {
  width: 50%;
  margin: 1rem auto;
  text-align: center;
}

/* Read More button END */

/* Alert Start */
.no-more-posts-container {
  margin-top: 1rem;
}

.alert {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 0.25rem;
}

.emoji {
  font-size: 2rem;
  margin-right: 1rem;
}

.red-face {
  color: #dc3545;
}

.message {
  flex: 1;
}

.no-more-posts {
  font-size: 1.1rem;
  margin: 0;
}

.emoji-icons {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

/* Alert End */
</style>
