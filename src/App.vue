<template>
  <div id="app" :class="{ dark: isDarkMode }">
    <AppHeader @toggle-theme="toggleTheme" />
    <HeroSection />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppHeader from './components/layout/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<style>
/* Global styles will be moved to a separate file */
</style>


