import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
// import "./style/tailwind.css";
import "animate.css";
import { initStore } from "./store";
import router from "@/router";

const app = createApp(App);

initStore(app);
app.use(router);
app.mount("#app");
