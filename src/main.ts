import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import { createPinia } from 'pinia'; // 引入Pinia
import './assets/styles/fonts.css'; // 首先引入字体样式
import './assets/styles/reset.css'; // 引入全局重置样式
// 若使用Tailwind，需引入Tailwind样式文件（在src/assets/styles下创建）
import './assets/styles/tailwind.css';

const app = createApp(App);
// 挂载路由与Pinia
app.use(router);
app.use(createPinia());
// 挂载Vue实例到页面#app节点
app.mount('#app');