<template>
    <div class="grid-container">
        <div v-for="post in posts" :key="post.slug" class="grid-item" @click="$emit('navigate', post.slug)">
            <div class="list-card">
                <div class="post">
                    <img :src="post.image" alt="Hero" class="post-image" />
                    <div class="post-body">
                        <div class="post-content">
                            <div class="post-main">
                                <h4 class="title">{{ post.title }}</h4>
                                <p class="blog-post-description">{{ post.description }}</p>
                                <div class="line"></div>
                            </div>
                            <button class="button" @click="$emit('navigate', post.slug)">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

interface Post {
    slug: string;
    image: string;
    title: string;
    description: string;
}

export default defineComponent({
    name: 'PostGrid',
    props: {
        posts: {
            type: Array as () => Post[],
            required: true,
        },
    },
});
</script>


<style scoped>
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

.post {
    position: relative;
    height: 100%;
    display: grid;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
    overflow: hidden;
    border-radius: 12px;
    min-height: 615px;
    transition: box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1),
        transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.post:hover {
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.03);
    cursor: pointer;
}

.post-image {
    object-fit: cover;
    max-height: 200px;
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
    padding: 20px;
    flex-direction: column;
}

.post-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.post-body:hover {
    background: linear-gradient(45deg, #b3ddff 0%, #ffff 100%);
}

.title {
    color: #4FACF7;
    font: 600 25px 'Source Sans Pro', sans-serif;
}

@media screen and (min-width: 40em) {
    .title {
        font-size: 25px;
    }
}

.blog-post-description {
    font-size: 18px;
    line-height: 1.5;
    color: #6c757d;
    font-family: 'Source Sans Pro', sans-serif;
    padding: 0 10px;
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
    flex-grow: 1;
    margin-bottom: 16px;
}

.post-main:hover .line {
    width: 100%;
    right: 100%;
    left: 0;
    transition: width 1s ease-in-out, right 1.5s ease-in-out;
}

.post button {
    background-color: #1e90ff;
    color: white;
    padding: 12px 30px;
    text-decoration: none;
    border: none;
    border-radius: 30px;
    /* Rounded button */
    display: inline-block;
    margin-top: 10px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    font-weight: 500;
    cursor: pointer;
    margin: 20px;
    max-height: fit-content;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
}

.post button:hover,
.post button:focus {
    background-color: #187bcd;
    box-shadow: 0 4px 10px rgba(30, 144, 255, 0.3);
}

.post button:focus {
    outline: 2px solid #1e90ff;
    outline-offset: 2px;
}

@media screen and (max-width: 30em) {
    .post-body {
        padding-top: 35px;
        flex-direction: column;
        text-align: center;
    }

    .post-image {
        max-height: 200px;
        margin-bottom: 16px;
    }
}
</style>
