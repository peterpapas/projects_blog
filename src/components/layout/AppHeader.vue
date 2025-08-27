<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (name: string) => computed(() => route.name === name)
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main" role="navigation">
      <ul class="nav">
        <li><RouterLink :aria-current="isActive('home').value ? 'page' : null" :class="{ active: isActive('home').value }" to="/">Home</RouterLink></li>
        <li><RouterLink :aria-current="isActive('blog-list').value ? 'page' : null" :class="{ active: isActive('blog-list').value }" to="/blog">Blog</RouterLink></li>
        <li><RouterLink :aria-current="isActive('about').value ? 'page' : null" :class="{ active: isActive('about').value }" to="/about">About</RouterLink></li>
      </ul>

      <!-- Dark mode toggle -->
      <button class="theme-toggle" @click="document.documentElement.classList.toggle('dark'); localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')">
        <span class="sr-only">Toggle dark mode</span>🌓
      </button>
    </nav>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(8px); }
.nav { display: flex; gap: 1rem; }
.active { text-decoration: underline; }
.theme-toggle { margin-left: auto; }
</style>


