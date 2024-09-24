import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Blog from "./components/Blog.vue";
import Singlepost from "./components/Singlepost.vue";
import PageNotFound from "./components/PageNotFound.vue";
import { createMetaManager } from "vue-meta";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Blog },
    { path: "/:slug", component: Singlepost, name: "Singlepost" },
    { path: "/:pathMatch(.*)*", name: "PageNotFound", component: PageNotFound },
  ],
});

const app = createApp(App);

app.use(router);
app.use(createMetaManager());
app.mount("#app");
