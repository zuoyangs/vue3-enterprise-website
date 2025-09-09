<template>
  <footer class="bg-gray-900 text-white">
    <!-- 主要内容区域 -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 公司信息 -->
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">E</span>
            </div>
            <span class="ml-2 text-lg font-bold">企业网站</span>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            专业的企业服务提供商，致力于为客户提供高质量的解决方案，助力企业数字化转型升级。
          </p>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              :title="social.label"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="text-xl">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">快速链接</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <router-link 
                :to="link.path"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 服务项目 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">服务项目</h3>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service">
              <span class="text-gray-300 text-sm">{{ service }}</span>
            </li>
          </ul>
        </div>

        <!-- 联系信息 -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">联系我们</h3>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <span class="text-blue-400 mt-1">📍</span>
              <div>
                <p class="text-gray-300 text-sm">{{ contactInfo.address }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-blue-400">📞</span>
              <a 
                :href="`tel:${contactInfo.phone}`"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {{ contactInfo.phone }}
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-blue-400">📧</span>
              <a 
                :href="`mailto:${contactInfo.email}`"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {{ contactInfo.email }}
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-blue-400">⏰</span>
              <span class="text-gray-300 text-sm">{{ contactInfo.workingHours }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-gray-400 text-sm">
            <p>&copy; {{ currentYear }} 企业网站. 保留所有权利.</p>
          </div>
          <div class="flex items-center space-x-6 text-sm">
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              隐私政策
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              服务条款
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
              网站地图
            </a>
            <span class="text-gray-400">
              ICP备案号：京ICP备2023000000号
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { NavItem } from '@/types/nav';
import type { ContactInfo, SocialMediaLink } from '@/types/contact';

// 当前年份
const currentYear = computed(() => new Date().getFullYear());

// 快速链接数据
const quickLinks: NavItem[] = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我们' },
  { path: '/business', label: '核心业务' },
  { path: '/news', label: '新闻动态' },
  { path: '/contact', label: '联系我们' },
  { path: '/consult', label: '在线咨询' },
];

// 服务项目
const services: string[] = [
  '企业官网建设',
  '电商平台开发',
  '移动应用开发',
  '系统集成服务',
  '技术咨询服务',
  '运维支持服务',
];

// 社交媒体链接
const socialLinks: SocialMediaLink[] = [
  {
    platform: 'wechat',
    url: '#',
    icon: '💬',
    label: '微信'
  },
  {
    platform: 'weibo',
    url: '#',
    icon: '🐦',
    label: '微博'
  },
  {
    platform: 'linkedin',
    url: '#',
    icon: '💼',
    label: 'LinkedIn'
  },
  {
    platform: 'github',
    url: '#',
    icon: '🐙',
    label: 'GitHub'
  },
];

// 联系信息
const contactInfo: ContactInfo = {
  address: '北京市朝阳区建国门外大街1号',
  phone: '400-123-4567',
  email: 'info@company.com',
  workingHours: '周一至周五 9:00-18:00',
  website: 'https://www.company.com',
  socialMedia: socialLinks
};
</script>

<style scoped>
/* 页脚链接悬停效果 */
footer a {
  position: relative;
}

footer a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

footer a:hover::after {
  width: 100%;
}
</style>