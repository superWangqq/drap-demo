// src/main.js 或 src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router"; // 导入路由配置文件
import pinia from "./store";
import { register } from "./custom-component";

const app = createApp(App);
register(app);
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router); // 使用路由
app.use(pinia); // 使用路由
app.use(ElementPlus);
app.mount("#app");
