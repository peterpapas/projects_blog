<template>
  <header class="site-header">
    <nav aria-label="Main" role="navigation">
      <a href="/" class="logo">
        Peter's Fullstack Corner
      </a>
      <ul class="nav">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/blog">Blog</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
      <button class="theme-toggle" @click="$emit(\"toggle-theme\")">
        <span class="sr-only">Toggle dark mode</span>
        <span v-if="isDarkMode">&#9728;</span>
        <span v-else>&#127769;</span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { defineEmits } from 'vue';

defineEmits([\'toggle-theme\']);

const props = defineProps({
  isDarkMode: Boolean,
});
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.dark .site-header {
  background-color: rgba(17, 24, 39, 0.8);
  border-bottom-color: #374151;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: #111827;
}

.dark .logo {
  color: #f3f4f6;
}

.nav {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav a {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.dark .nav a {
  color: #d1d5db;
}

.nav a:hover {
  color: #111827;
}

.dark .nav a:hover {
  color: #f3f4f6;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
}
</style>


