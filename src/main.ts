import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'

import './assets/main.css' // Assuming you have a global CSS file here

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)

router.afterEach((to) => {
  const title = (to.meta?.title as string) ?? 'Blog'
  document.title = `Fullstack Peter – ${title}`
})

app.mount('#app')

// Add dark mode class to body for global styling
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}


