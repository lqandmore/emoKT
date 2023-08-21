import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// // 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
// import "./style/tailwind.css";
import router from './router'
import { initStore } from "./store";
// import {
//   IconifyIconOffline,
//   IconifyIconOnline,
//   FontIcon,
// } from "./components/ReIcon";

const app = createApp(App);
// app.component("IconifyIconOffline", IconifyIconOffline);
// app.component("IconifyIconOnline", IconifyIconOnline);
// app.component("FontIcon", FontIcon);
initStore(app);


app.use(router);
app.mount('#app')
