<template>
    <div class="no-more-posts-container">
        <div class="alert">
            <div class="emoji">
                <span class="red-face">😅</span>
            </div>
            <div class="message">
                <p class="no-more-posts">
                    Oopsie daisy🌼, looks like you've reached the end of our blog posts.
                    No worries, I'm always working on something. Stay tuned for updates!
                    <span class="emoji-icons">🔜📝👨‍💻</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'NoMorePosts',
};
</script>

<style scoped>
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
</style>
