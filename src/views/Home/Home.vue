<template>
  <div class="home-page">
    <!-- 轮播图区域 -->
    <section class="hero-section">
      <Swiper
        :items="carouselItems"
        height="600px"
        :autoplay="true"
        :interval="5000"
        @change="onCarouselChange"
      />
    </section>

    <!-- 公司简介区域 -->
    <section class="py-16 bg-gray-50">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="section-title">关于我们</h2>
            <p class="text-gray-600 text-lg leading-relaxed">
              我们是一家专业的企业服务提供商，致力于为客户提供高质量的数字化解决方案。
              拥有多年行业经验，服务过数百家企业客户，帮助他们实现数字化转型升级。
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ stats.experience }}+</div>
                <div class="text-gray-600 mt-1">年经验</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ stats.projects }}+</div>
                <div class="text-gray-600 mt-1">项目案例</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ stats.clients }}+</div>
                <div class="text-gray-600 mt-1">合作客户</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ stats.satisfaction }}%</div>
                <div class="text-gray-600 mt-1">客户满意度</div>
              </div>
            </div>
            <div class="pt-4">
              <router-link to="/about" class="btn btn-primary">
                了解更多
              </router-link>
            </div>
          </div>
          <div class="relative">
            <img
              :src="Images.about.officeEnvironment"
              alt="公司办公环境"
              class="rounded-lg shadow-lg w-full h-auto"
            />
            <div class="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心业务区域 -->
    <section class="py-16">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="section-title">核心业务</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto">
            提供全方位的企业服务解决方案，助力企业数字化转型
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="card hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            @click="$router.push('/business')"
          >
            <div class="card-body text-center p-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <span class="text-2xl">{{ service.icon }}</span>
              </div>
              <h3 class="text-xl font-semibold mb-3">{{ service.title }}</h3>
              <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/business" class="btn btn-outline">
            查看全部业务
          </router-link>
        </div>
      </div>
    </section>

    <!-- 新闻动态区域 -->
    <section class="py-16 bg-gray-50">
      <div class="container">
        <div class="flex items-center justify-between mb-12">
          <div>
            <h2 class="section-title">新闻动态</h2>
            <p class="text-gray-600">了解最新的行业资讯和公司动态</p>
          </div>
          <router-link to="/news" class="btn btn-outline">
            查看更多
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in featuredNews"
            :key="article.id"
            class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="$router.push(`/news/${article.id}`)"
          >
            <div class="aspect-w-16 aspect-h-9">
              <img
                :src="article.imageUrl || Images.news.awardNews"
                :alt="article.title"
                class="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div class="card-body">
              <div class="flex items-center justify-between mb-2">
                <span class="tag tag-primary">{{ getCategoryLabel(article.category) }}</span>
                <time class="text-sm text-gray-500">{{ formatDate(article.publishDate) }}</time>
              </div>
              <h3 class="text-lg font-semibold mb-2 text-ellipsis-2">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm text-ellipsis-3">{{ article.summary }}</p>
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span class="text-sm text-gray-500">{{ article.author }}</span>
                <span class="text-sm text-gray-500">{{ article.readCount }} 阅读</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="py-16 bg-gradient-primary text-white">
      <div class="container text-center">
        <h2 class="text-3xl font-bold mb-4">准备开始您的项目了吗？</h2>
        <p class="text-xl mb-8 opacity-90">
          我们的专业团队随时为您提供咨询服务
        </p>
        <div class="space-x-4">
          <router-link to="/consult" class="btn bg-white text-blue-600 hover:bg-gray-100">
            免费咨询
          </router-link>
          <router-link to="/contact" class="btn bg-white text-blue-600 hover:bg-gray-100">
            联系我们
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Swiper from '@/components/Swiper.vue';
import type { CarouselItem } from '@/types/common';
import type { NewsArticle, NewsCategory } from '@/types/news';
import type { BusinessService } from '@/types/business';
import { formatDate } from '@/utils/formatDate';
import { Images } from '@/assets/images';

// 页面数据
const carouselItems = ref<CarouselItem[]>([
  {
    id: '1',
    title: '专业企业服务解决方案',
    subtitle: '助力企业数字化转型升级',
    description: '提供全方位的技术服务，让您的业务更加高效',
    imageUrl: Images.hero.carousel1,
    linkUrl: '/business',
    buttonText: '了解服务',
    order: 1,
    isActive: true
  },
  {
    id: '2',
    title: '创新技术引领未来',
    subtitle: '用技术创造价值',
    description: '前沿技术与实用解决方案的完美结合',
    imageUrl: Images.hero.carousel2,
    linkUrl: '/about',
    buttonText: '关于我们',
    order: 2,
    isActive: true
  },
  {
    id: '3',
    title: '客户成功是我们的使命',
    subtitle: '专业团队，贴心服务',
    description: '7x24小时技术支持，确保您的业务稳定运行',
    imageUrl: Images.hero.carousel3,
    linkUrl: '/contact',
    buttonText: '联系我们',
    order: 3,
    isActive: true
  }
]);

const stats = ref({
  experience: 10,
  projects: 500,
  clients: 200,
  satisfaction: 99
});

const services = ref<BusinessService[]>([
  {
    id: '1',
    title: '企业官网建设',
    description: '专业的企业官网设计与开发，提升企业形象和品牌价值',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'development',
    order: 1,
    isActive: true,
    icon: '🌐'
  },
  {
    id: '2',
    title: '系统集成服务',
    description: '为企业提供完整的系统集成解决方案，优化业务流程',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'consulting',
    order: 2,
    isActive: true,
    icon: '⚙️'
  },
  {
    id: '3',
    title: '技术咨询服务',
    description: '专业的技术咨询团队，为您的技术决策提供专业建议',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'consulting',
    order: 3,
    isActive: true,
    icon: '💡'
  },
  {
    id: '4',
    title: '运维支持服务',
    description: '7x24小时运维监控，确保您的系统稳定高效运行',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'maintenance',
    order: 4,
    isActive: true,
    icon: '🛠️'
  },
  {
    id: '5',
    title: '移动应用开发',
    description: '专业的移动应用开发团队，打造优质的移动端体验',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'development',
    order: 5,
    isActive: true,
    icon: '📱'
  },
  {
    id: '6',
    title: '培训服务',
    description: '提供专业的技术培训服务，提升团队技术能力',
    detailContent: '',
    features: [],
    advantages: [],
    imageUrl: '',
    category: 'training',
    order: 6,
    isActive: true,
    icon: '📚'
  }
]);

const featuredNews = ref<NewsArticle[]>([
  {
    id: '1',
    title: '公司荣获"2024年度最佳企业服务奖"',
    summary: '在激烈的行业竞争中，我们凭借卓越的服务质量和客户满意度获得了这一殊荣',
    content: '',
    author: '张三',
    publishDate: '2024-03-15T10:00:00Z',
    category: 'company',
    tags: ['奖项', '企业荣誉'],
    imageUrl: Images.news.awardNews,
    readCount: 1250,
    featured: true
  },
  {
    id: '2',
    title: '新一代企业数字化转型解决方案发布',
    summary: '基于最新技术栈打造的企业数字化转型解决方案，助力企业快速实现数字化升级',
    content: '',
    author: '李四',
    publishDate: '2024-03-10T14:30:00Z',
    category: 'product',
    tags: ['产品发布', '数字化转型'],
    imageUrl: Images.news.productNews,
    readCount: 980,
    featured: true
  },
  {
    id: '3',
    title: '行业技术发展趋势分析报告',
    summary: '深度分析当前技术发展趋势，为企业技术决策提供专业参考',
    content: '',
    author: '王五',
    publishDate: '2024-03-05T09:15:00Z',
    category: 'industry',
    tags: ['行业分析', '技术趋势'],
    imageUrl: Images.news.industryNews,
    readCount: 756,
    featured: true
  }
]);

// 方法
const onCarouselChange = (index: number) => {
  console.log('轮播图切换到第', index + 1, '张');
};

const getCategoryLabel = (category: NewsCategory): string => {
  const labels = {
    company: '公司动态',
    industry: '行业资讯',
    product: '产品更新',
    event: '活动公告'
  };
  return labels[category] || '其他';
};

// 生命周期
onMounted(() => {
  // 这里可以添加页面加载时的数据获取逻辑
  console.log('首页加载完成');
});
</script>

<style scoped>
/* 英雄区域样式 */
.hero-section {
  position: relative;
  overflow: hidden;
}

/* 统计数字动画 */
.stats-number {
  animation: countUp 2s ease-out;
}

@keyframes countUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 服务卡片悬停效果 */
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

/* 新闻卡片样式 */
.news-card {
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-2px);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>