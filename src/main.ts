import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)

router.afterEach((to) => {
  const title = (to.meta?.title as string) ?? 'Blog'
  document.title = `Fullstack Peter – ${title}`
})

app.mount('#app')


