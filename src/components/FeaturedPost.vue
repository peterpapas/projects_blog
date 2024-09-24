<template>
    <div class="featured-post">
        <router-link :to="`/${post.slug}`" class="post-link">
            <div class="list-card">
                <div class="postFirst">
                    <img :src="post.image" alt="Hero" class="post-image-hero" />
                    <div class="post-body">
                        <div class="post-main">
                            <h4 class="title">{{ post.title }}</h4>
                            <p class="blog-post-description">{{ post.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FeaturedPost',
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
});
</script>


<style scoped>
.featured-post {
    margin-bottom: 40px;
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

.post-image-hero {
    object-fit: cover;
    max-height: 500px;
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

.post-body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    transition: background 250ms;
}

.post-body:hover {
    background: linear-gradient(45deg, #b3ddff 0%, #ffff 100%);
}

.title {
    color: #4FACF7;
    font: 600 24px 'Source Sans Pro', sans-serif;
}

@media screen and (min-width: 40em) {
    .title {
        font-size: 30.5px;
    }
}

.blog-post-description {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 20px;
    color: #6c757d;
    font-family: 'Source Sans Pro', sans-serif;
}

@media screen and (max-width: 30em) {
    .post-body {
        padding-top: 35px;
        flex-direction: column;
        text-align: center;
    }

    .post-image-hero {
        max-height: 200px;
    }
}
</style>
