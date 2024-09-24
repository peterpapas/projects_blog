<template>
    <header class="header">
        <div class="header-content">
            <h1 class="blog-title">Welcome to Peter's Fullstack Corner</h1>
            <h2>also known as... Bliggity-blog...🔥👨‍💻</h2>
            <p class="blog-description">
                Discover a collection of my fullstack and other projects in one place.
            </p>
            <div class="rocketship-container">
                <img src="https://res.cloudinary.com/dxetyokin/image/upload/f_auto,q_auto/v1682572023/fullstackpeter.com/Header/headerRocketship.png"
                    alt="rocketship image" class="rocketship-image" />
                <div class="rocketship-shadow"></div>
            </div>
        </div>
    </header>
</template>


<script lang="ts">
export default {
    name: 'HeaderSection',
};
</script>


<style scoped>
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
</style>
