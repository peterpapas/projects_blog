<template>
  <div class="main-container">
    <div class="header">
      <h1 class="blog-title" style="color: #333333">👇⬇️ ✨Current
        Projects✨ ⬇️👇</h1>
    </div>
    <div class="blog-container">

      <div v-for="post in posts" :key="post.slug" class="blog-post" @click="navigateToSinglePost(post.slug)">
        <div class="list-card">
          <div class="post">
            <img :src="getHeroImage(post)" alt="Hero Image" class="post-image" />
            <div class="post-body">
              <div class="post-main">
                <h4 class="title">{{ post.title }}</h4>
                <!-- <p class="blog-post-description" style="color: #777777">
                  {{ post.description }}
                </p> -->

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
</template>

<script>
import { createClient } from "contentful";

export default {
  name: "Blog",
  data() {
    return {
      posts: [],
      heroImage: null,
    };
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
        body: item.fields.body.slice(0, 50),
        publishDate: item.fields.publishDate,
      };
    });

    this.posts = await Promise.all(this.posts);
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
.main-container {

  background-color: #8EC5FC;
  background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);

}

.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;


}

.header {
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
}

.blog-title {
  text-align: center;
  font: bold 36px/1 "Source Sans Pro", sans-serif;
  margin-bottom: 50px;
  color: #212529;
  font-weight: bold;
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
  color: #39b982;
  font: 600 24px "Source Sans Pro", sans-serif;
}


@media screen and (min-width: 40em) {
  .title {
    font-size: 40.5px;
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




.line {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 8px;
  width: 0%;
  background-color: rgba(255, 132, 0, 0.817);
  transition: width 0.5s ease-in-out;
  border-radius: 0px 50px 50px 0px;
}

.post-main:hover .line {
  width: 100%;
  right: 100%;
  left: 0;
  transition: width 1s ease-in-out, right 1.5s ease-in-out;
}

.post-image {
  object-fit: cover;
  max-height: 500px;
  width: 100%;
  height: 100%;
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
  padding: 20px;
  background: #fff;
  z-index: 2;
  transition: background cubic-bezier(0.445, 0.05, 0.55, 0.95) 250ms;
}

.post-body:hover {
  background: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
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
    max-height: 150px;
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
</style>


/* .learn-more {
  position: relative;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #333;
  color: #333;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
}

.learn-more:hover {
  background-color: #333;
  color: #fff;
  background-size: 200% auto;
  background-image: linear-gradient(to left, #333, #666);
  transition: all 0.3s ease-in-out;
}

.learn-more::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #f00;
  transition: width 0.3s ease-in-out;
}

.learn-more:hover::before {
  width: 100%;
} */

/*  */
