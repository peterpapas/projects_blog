<template>
  <div class="main-container">
    <HeaderSection />
    <PageNotFound v-if="error === '404'" />
    <div v-else class="blog-container">
      <FeaturedPost :post="posts[0]" v-if="posts.length > 0" />
      <PostGrid :posts="posts.slice(1, displayedPosts)" @navigate="navigateToSinglePost" />
      <NoMorePosts v-if="noMorePosts" />
      <div class="centered-container" v-if="!noMorePosts">
        <LoadMoreButton @click="loadMorePosts" />
      </div>
    </div>
    <LoadingSpinner v-if="loading" :message="randomMessage" />
  </div>
</template>



<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMeta } from 'vue-meta';
import { createClient } from 'contentful';
import HeaderSection from './HeaderSection.vue';
import PageNotFound from './PageNotFound.vue';
import FeaturedPost from './FeaturedPost.vue';
import PostGrid from './PostGrid.vue';
import NoMorePosts from './NoMorePosts.vue';
import LoadMoreButton from './LoadMoreButton.vue';
import LoadingSpinner from './LoadingSpinner.vue';

interface Post {
  title: string;
  slug: string;
  image: string;
  description: string;
  publishDate: string;
  heroImage: {
    sys: {
      id: string;
    };
  };
}

export default defineComponent({
  name: 'Blog',
  components: {
    HeaderSection,
    PageNotFound,
    FeaturedPost,
    PostGrid,
    NoMorePosts,
    LoadMoreButton,
    LoadingSpinner,
  },
  setup() {
    const router = useRouter();
    const error = ref<string | null>(null);
    const loading = ref(true);
    const displayedPosts = ref(10);
    const noMorePosts = ref(false);
    const posts = ref<Post[]>([]);
    const messages = [
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
    ];

    const randomMessage = computed(() => {
      return messages[Math.floor(Math.random() * messages.length)];
    });

    useMeta({
      title: 'Home',
      meta: [
        {
          name: 'description',
          content:
            "Explore Peter's Fullstack Corner, the ultimate destination for Fullstack Development enthusiasts. Discover a wide range of projects that Peter has been working on, ranging from web development to mobile apps, and keep up to date with the latest trends in Fullstack development. Join Peter on his journey as he shares his passion for coding with the world.",
        },
      ],
    });

    const contentfulClient = createClient({
      space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    });

    const fetchPosts = async () => {
      try {
        const response = await contentfulClient.getEntries<Post>({
          content_type: 'blogPost',
        });

        if (response.items.length === 0) {
          error.value = '404';
          loading.value = false;
          return;
        }

        posts.value = await Promise.all(
          response.items.map(async (item) => {
            const heroImageId = item.fields.heroImage.sys.id;
            console.log("🚀 ~ file: Blog.vue:106 ~ response.items.map ~ heroImageId:", heroImageId)
            const heroImageResponse = await contentfulClient.getAsset(heroImageId);
            console.log("🚀 ~ file: Blog.vue:108 ~ response.items.map ~ heroImageResponse:", heroImageResponse)
            const heroImageUrl = `https:${heroImageResponse.fields.file.url}`;

            console.log("🚀 ~ file: Blog.vue:111 ~ response.items.map ~ heroImageUrl:", heroImageUrl)
            return {
              title: item.fields.title,
              slug: item.fields.slug,
              image: heroImageUrl,
              description: item.fields.description,
              publishDate: item.fields.publishDate,
            };
          })
        );

        loading.value = false;
      } catch (err) {
        console.error('Error fetching posts:', err);
        error.value = '404';
        loading.value = false;
      }
    };
    console.log("🚀 ~ file: Blog.vue:127 ~ fetchPosts ~ fetchPosts:", fetchPosts)

    const loadMorePosts = async () => {
      try {
        const response = await contentfulClient.getEntries<Post>({
          content_type: 'blogPost',
          skip: displayedPosts.value,
          limit: 9,
        });

        if (response.items.length === 0) {
          noMorePosts.value = true;
          return;
        }

        const newPosts = await Promise.all(
          response.items.map(async (item) => {
            const heroImageId = item.fields.heroImage.sys.id;
            const heroImageResponse = await contentfulClient.getAsset(heroImageId);
            const heroImageUrl = `https:${heroImageResponse.fields.file.url}`;

            return {
              title: item.fields.title,
              slug: item.fields.slug,
              image: heroImageUrl,
              description: item.fields.description,
              publishDate: item.fields.publishDate,
            };
          })
        );

        posts.value.push(...newPosts);
        displayedPosts.value += newPosts.length;
      } catch (err) {
        console.error('Error loading more posts:', err);
      }
    };

    const navigateToSinglePost = (slug: string) => {
      router.push({ name: 'Singlepost', params: { slug } });
    };

    onMounted(fetchPosts);

    return {
      error,
      loading,
      posts,
      displayedPosts,
      noMorePosts,
      randomMessage,
      loadMorePosts,
      navigateToSinglePost,
    };
  },
});
</script>



<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;

}
</style>
