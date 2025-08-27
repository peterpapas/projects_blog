<template>
  <div id="app">
    <AppHeader />
    <HeroSection />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
</script>

<style>
/* Global styles will be moved to a separate file */
</style>


