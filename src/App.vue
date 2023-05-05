<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | Peter's Full Stack Corner` : `Peter's Full Stack
      Corner`
    }}</template>
  </metainfo>
  <router-view />
</template>

<script>
import './plugins/gtag';
import { useMeta } from 'vue-meta'

export default {
  name: 'App',
  setup() {
    useMeta({
      title: '',
      htmlAttrs: { lang: 'en', amp: true }
    })
  }
};
</script>

<style scoped>
/* Your scoped styles here */
</style>