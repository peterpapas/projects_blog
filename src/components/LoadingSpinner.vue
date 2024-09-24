<template>
    <div class="loading">
        <!-- Loading SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" style="display: block;" width="200px" height="200px"
            viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <!-- SVG content here -->
        </svg>
        <p class="loading-message">{{ message }}</p>
    </div>
</template>


<script lang="ts">
export default {
    name: 'LoadingSpinner',
    props: {
        message: {
            type: String,
            required: true,
        },
    },
};
</script>


<style scoped>
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
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 400;
}
</style>
