<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <Navbar />
    
    <!-- 主要内容区域 -->
    <main class="flex-1 pt-16">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<style>
/* 全局样式 - 确保中文字体优先级 */
* {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

#app {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 确保所有文本元素都使用中文字体 */
body, html, 
h1, h2, h3, h4, h5, h6,
p, span, a, button, input, textarea, select,
.nav-link, .btn {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

/* 确保页面滚动时导航栏保持固定 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

/* 链接样式 */
a {
  color: inherit;
  text-decoration: none;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

a:hover {
  color: #3b82f6;
}
</style>
