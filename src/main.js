import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Blog from "./components/Blog.vue";
import Singlepost from "./components/Singlepost.vue";
import dotenv from "dotenv";
dotenv.config();
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Blog },
    { path: "/:slug", component: Singlepost, name: "Singlepost" },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
