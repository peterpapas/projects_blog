<!-- TODO ADD PAGE LOADER WHEN DATA IS NOT FETCHED  -->



<template>
  <div class="main-container">
    <!-- <div class="header">
                                                                                                                                                                                                                                <h1 class="blog-title" style="color: #333333">👇⬇️ ✨Current
                                                                                                                                                                                                                                  Projects✨ ⬇️👇</h1>
                                                                                                                                                                                                                              </div> -->
    <div class="header">
      <div class="header-content">
        <h1 class="blog-title">Welcome to Peter's Fullstack Corner</h1>
        <h2>also known as... Bliggity-blog...🔥👨‍💻</h2>
        <p class="blog-description">Discover a collection of my fullstack and other projects in one place.</p>
        <div class="rocketship-container">
          <img src="../assets/rocketship.png" alt="rocketship image" class="rocketship-image">
          <div class="rocketship-shadow"></div>
        </div>
      </div>
    </div>
    <div v-if="!loading" class="blog-container">
      <div class="blog-post" v-if="posts.length > 0">
        <router-link :to="`/${posts[0].slug}`" class="post-link">
          <div class="list-card">
            <div class="postFirst">
              <img :src="getHeroImage(posts[0])" alt="Hero Image" class="post-image-hero" />
              <div class="post-body">
                <div class="post-main">
                  <h4 class="title">{{ posts[0].title }}</h4>
                  <p class="blog-post-description" style="color: #777777">{{ posts[0].description }}</p>
                  <!-- <div class="line"></div> -->
                </div>
                <!-- <div class="post-meta">
                  <div class="post-info">
                    <div class="post-info-text">
                                                              <p class="post-date">{{ formatDate(posts[0].publishDate) }}</p>
                                                            </div>
                                                          </div>
                                                        </div> -->
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="grid-container" v-if="posts.length > 1">
        <div v-for="(post) in posts.slice(1, 10)" :key="post.slug" class="grid-item"
          @click="navigateToSinglePost(post.slug)">
          <div class="list-card">
            <div class="post">
              <img :src="getHeroImage(post)" alt="Hero Image" class="post-image" />
              <div class="post-body">
                <div class="post-main">
                  <h4 class="title">{{ post.title }}</h4>
                  <p class="blog-post-description" style="color: #777777">{{ post.description }}</p>
                  <div class="line"></div>
                </div>
                <!-- <div class="post-meta">
                  <div class="post-info">
                    <div class="post-info-text">
                                                                <p class="post-date">{{ formatDate(post.publishDate) }}</p>
                                                              </div>
                                                            </div>
                                                          </div> -->
              </div>
            </div>
          </div>
        </div>
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

<script>
import { createClient } from "contentful";
import '../plugins/gtag.js';

export default {
  name: "Blog",
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
      posts: [],
      heroImage: null,
    };
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
    });
    const response = await client.getEntries({
      content_type: "blogPost",
    });

    this.posts = response.items.map(async (item) => {
      const heroImageId = item.fields.heroImage.sys.id;
      const heroImageResponse = await client.getAsset(heroImageId);
      const heroImageUrl = `https:${heroImageResponse.fields.file.url}`;
      return {
        title: item.fields.title,
        slug: item.fields.slug,
        image: heroImageUrl,
        description: item.fields.description,
        // body: item.fields.body.slice(0, 50),
        publishDate: item.fields.publishDate,
      };
    });

    this.posts = await Promise.all(this.posts);

    if (this.posts.length > 0) {
      this.loading = false;
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    navigateToSinglePost(slug) {
      this.$router.push({ name: "Singlepost", params: { slug: slug } });
    },
    getHeroImage(post) {
      return post.image;
    },
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
</style>




