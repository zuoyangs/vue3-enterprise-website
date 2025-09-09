import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
// 引入页面组件（使用懒加载，优化首屏加载速度）
const Home = () => import('@/views/Home/Home.vue');
const About = () => import('@/views/About/About.vue');
const Business = () => import('@/views/Business/Business.vue');
const News = () => import('@/views/News/News.vue');
const NewsDetail = () => import('@/views/News/NewsDetail.vue');
const Contact = () => import('@/views/Contact/Contact.vue');
const Consult = () => import('@/views/Consult/Consult.vue');

// 路由规则数组（TypeScript类型：RouteRecordRaw，确保配置规范）
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home }, // 首页
  { path: '/about', name: 'About', component: About }, // 关于我们
  { path: '/business', name: 'Business', component: Business }, // 核心业务
  { path: '/news', name: 'News', component: News }, // 新闻列表
  { 
    path: '/news/:id', // 新闻详情页：动态路由（通过id获取单条新闻数据）
    name: 'NewsDetail', 
    component: NewsDetail,
    props: true // 允许路由参数（如id）作为props传入组件，简化数据获取
  },
  { path: '/contact', name: 'Contact', component: Contact }, // 联系我们
  { path: '/consult', name: 'Consult', component: Consult }, // 在线咨询
  { path: '/:pathMatch(.*)*', redirect: '/' } // 404页面：重定向到首页
];

// 创建路由实例（HTML5历史模式，URL无#号，符合企业网站URL规范）
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为：跳转页面时自动回到顶部，提升用户体验
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;