<template>
  <!-- 导航栏容器：固定顶部，适配移动端 -->
  <header class="navbar fixed top-0 left-0 w-full bg-white shadow-sm z-50">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- 1. Logo区域：点击跳转首页 -->
      <div 
        class="navbar-logo cursor-pointer flex items-center"
        @click="$router.push('/')"
      >
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">E</span>
        </div>
        <span class="ml-2 text-xl font-bold text-blue-700">企业网站</span>
      </div>

      <!-- 2. PC端导航菜单（屏幕≥768px显示） -->
      <nav class="hidden md:flex items-center space-x-8">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === item.path }"
        >
          {{ item.label }}
        </router-link>
        <!-- 咨询按钮：突出显示，跳转咨询页 -->
        <button
          class="btn btn-primary"
          @click="$router.push('/consult')"
        >
          在线咨询
        </button>
      </nav>

      <!-- 3. 移动端菜单按钮（屏幕<768px显示） -->
      <button 
        class="md:hidden text-gray-700 text-2xl p-2"
        @click="mobileMenuState.isOpen = !mobileMenuState.isOpen"
      >
        <span v-if="!mobileMenuState.isOpen">☰</span>
        <span v-else>×</span>
      </button>
    </div>

    <!-- 4. 移动端折叠菜单（默认隐藏，点击按钮展开） -->
    <div 
      class="md:hidden bg-white border-t border-gray-100 transition-all duration-300"
      :class="{ 'block': mobileMenuState.isOpen, 'hidden': !mobileMenuState.isOpen }"
    >
      <div class="container mx-auto px-4 py-2 flex flex-col space-y-3">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="py-2 text-gray-700 hover:text-blue-700 font-medium"
          :class="{ 'text-blue-700': $route.path === item.path }"
          @click="mobileMenuState.isOpen = false"
        >
          {{ item.label }}
        </router-link>
        <button
          class="btn btn-primary mt-2"
          @click="() => { $router.push('/consult'); mobileMenuState.isOpen = false }"
        >
          在线咨询
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
// import { useRoute } from 'vue-router'; // 暂时注释掉未使用的import
import type { NavItem, MobileMenuState } from '@/types/nav';

// 1. 响应式状态：控制移动端菜单展开/隐藏
const mobileMenuState = reactive<MobileMenuState>({
  isOpen: false,
  activeSubmenu: null
});

// 2. 获取当前路由信息（用于菜单高亮）
// const route = useRoute(); // 暂时注释掉未使用的变量

// 3. 导航菜单数据（符合NavItem类型，可后续从接口获取）
const navItems: NavItem[] = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我们' },
  { path: '/business', label: '核心业务' },
  { path: '/news', label: '新闻动态' },
  { path: '/contact', label: '联系我们' },
];
</script>

<style scoped>
/* 导航栏滚动效果（可选） */
.navbar-scroll {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 导航链接过渡效果 - 确保中文字体 */
.nav-link {
  position: relative;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2563eb;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  width: 100%;
}

/* 确保 Logo 和按钮也使用中文字体 */
.navbar-logo,
.btn {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
}
</style>