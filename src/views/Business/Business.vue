<template>
  <div class="business-page">
    <!-- 页面头部 -->
    <section class="bg-gradient-primary text-white py-20">
      <div class="container text-center">
        <h1 class="page-title text-white mb-4">核心业务</h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          提供全方位的企业服务解决方案，助力企业数字化转型升级
        </p>
      </div>
    </section>

    <!-- 业务分类筛选 -->
    <section class="py-8 bg-white sticky top-16 z-40 shadow-sm">
      <div class="container">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in businessCategories"
            :key="category.key"
            class="px-6 py-2 rounded-full transition-all duration-300"
            :class="[
              selectedCategory === category.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="filterByCategory(category.key)"
          >
            {{ category.label }}
          </button>
          <button
            class="px-6 py-2 rounded-full transition-all duration-300"
            :class="[
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="showAllServices"
          >
            全部服务
          </button>
        </div>
      </div>
    </section>

    <!-- 业务服务列表 -->
    <section class="py-16">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="service-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div class="relative h-64">
              <img
                :src="service.imageUrl || getDefaultServiceImage(service.category)"
                :alt="service.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium text-white"
                  :style="{ backgroundColor: getCategoryColor(service.category) }"
                >
                  {{ getCategoryLabel(service.category) }}
                </span>
              </div>
            </div>
            
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center">
                  <div 
                    class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4"
                    :style="{ backgroundColor: getCategoryColor(service.category) }"
                  >
                    {{ service.iconUrl || getDefaultIcon(service.category) }}
                  </div>
                  <h3 class="text-2xl font-semibold text-gray-900">{{ service.title }}</h3>
                </div>
              </div>
              
              <p class="text-gray-600 mb-6 leading-relaxed">{{ service.description }}</p>
              
              <!-- 特色功能 -->
              <div v-if="service.features.length > 0" class="mb-6">
                <h4 class="font-semibold text-gray-900 mb-3">特色功能</h4>
                <ul class="space-y-2">
                  <li 
                    v-for="feature in service.features.slice(0, 3)"
                    :key="feature"
                    class="flex items-center text-sm text-gray-600"
                  >
                    <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                    {{ feature }}
                  </li>
                </ul>
                <button
                  v-if="service.features.length > 3"
                  class="text-blue-600 text-sm hover:text-blue-800 transition-colors duration-200 mt-2"
                  @click="toggleServiceDetails(service.id)"
                >
                  {{ expandedServices.includes(service.id) ? '收起' : `查看全部 ${service.features.length} 项功能` }}
                </button>
              </div>
              
              <!-- 展开的详细功能 -->
              <div 
                v-if="expandedServices.includes(service.id) && service.features.length > 3"
                class="mb-6 animate-fade-in"
              >
                <ul class="space-y-2">
                  <li 
                    v-for="feature in service.features.slice(3)"
                    :key="feature"
                    class="flex items-center text-sm text-gray-600"
                  >
                    <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              
              <!-- 核心优势 -->
              <div v-if="service.advantages.length > 0" class="mb-6">
                <h4 class="font-semibold text-gray-900 mb-3">核心优势</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div
                    v-for="advantage in service.advantages.slice(0, 4)"
                    :key="advantage"
                    class="bg-gray-50 rounded-lg p-3 text-center"
                  >
                    <span class="text-sm font-medium text-gray-700">{{ advantage }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex space-x-4 pt-4 border-t border-gray-100">
                <button 
                  class="btn btn-primary flex-1"
                  @click="contactForService(service)"
                >
                  立即咨询
                </button>
                <button 
                  class="btn btn-outline flex-1"
                  @click="learnMore(service)"
                >
                  了解详情
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果提示 -->
        <div v-if="filteredServices.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-medium text-gray-600 mb-2">暂无相关服务</h3>
          <p class="text-gray-500">请尝试选择其他分类或查看全部服务</p>
        </div>
      </div>
    </section>

    <!-- 客户案例 -->
    <section class="py-16 bg-gray-50">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="section-title">成功案例</h2>
          <p class="text-gray-600 text-lg">看看我们为客户创造的价值</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="case_item in businessCases"
            :key="case_item.id"
            class="card hover:shadow-lg transition-shadow duration-300"
          >
            <div class="aspect-w-16 aspect-h-9">
              <img
                :src="case_item.imageUrl"
                :alt="case_item.title"
                class="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <div class="card-body">
              <div class="flex items-center justify-between mb-3">
                <span 
                  class="tag"
                  :style="{ 
                    backgroundColor: getCategoryColor(case_item.serviceType) + '20',
                    color: getCategoryColor(case_item.serviceType)
                  }"
                >
                  {{ getCategoryLabel(case_item.serviceType) }}
                </span>
                <span class="text-sm text-gray-500">{{ case_item.projectDuration }}</span>
              </div>
              <h3 class="text-lg font-semibold mb-2">{{ case_item.title }}</h3>
              <p class="text-gray-600 text-sm mb-3">客户：{{ case_item.client }}</p>
              <p class="text-gray-600 text-sm mb-4 text-ellipsis-2">{{ case_item.description }}</p>
              <div class="space-y-2">
                <div class="text-sm">
                  <span class="font-medium text-gray-700">项目成果：</span>
                  <span class="text-gray-600">{{ case_item.result }}</span>
                </div>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tech in case_item.technologies.slice(0, 3)"
                    :key="tech"
                    class="tag tag-secondary text-xs"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="case_item.technologies.length > 3"
                    class="text-xs text-gray-500"
                  >
                    +{{ case_item.technologies.length - 3 }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA区域 -->
    <section class="py-16 bg-gradient-primary text-white">
      <div class="container text-center">
        <h2 class="text-3xl font-bold mb-4">准备开始您的项目了吗？</h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          我们的专业团队将为您提供量身定制的解决方案，助力您的业务发展
        </p>
        <div class="space-x-4">
          <router-link 
            to="/consult" 
            class="btn bg-white text-blue-600 hover:bg-gray-100"
          >
            免费咨询
          </router-link>
          <router-link 
            to="/contact" 
            class="btn bg-white text-blue-600 hover:bg-gray-100"
          >
            联系我们
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { BusinessService, BusinessCategory, BusinessCategoryConfig, BusinessCase } from '@/types/business';
import { getDefaultServiceImage, Images } from '@/assets/images';

const router = useRouter();

// 响应式数据
const selectedCategory = ref<BusinessCategory | null>(null);
const expandedServices = ref<string[]>([]);

// 业务分类配置
const businessCategories: BusinessCategoryConfig[] = [
  { key: 'consulting', label: '技术咨询', description: '专业的技术咨询服务', color: '#3b82f6' },
  { key: 'development', label: '软件开发', description: '定制化软件开发服务', color: '#10b981' },
  { key: 'maintenance', label: '运维支持', description: '系统运维和技术支持', color: '#f59e0b' },
  { key: 'training', label: '培训服务', description: '专业技术培训服务', color: '#8b5cf6' }
];

// 业务服务数据
const businessServices = ref<BusinessService[]>([
  {
    id: '1',
    title: '企业官网建设',
    description: '专业的企业官网设计与开发，提升企业形象和品牌价值。采用最新的前端技术，确保网站的性能和用户体验。',
    detailContent: '详细的企业官网建设服务介绍...',
    features: [
      '响应式设计，适配各种设备',
      'SEO优化，提升搜索排名',
      '内容管理系统，方便维护',
      '多语言支持',
      '高性能优化',
      '安全防护机制'
    ],
    advantages: [
      '专业设计团队',
      '技术领先',
      '服务完善',
      '性价比高'
    ],
    imageUrl: Images.business.websiteDevelopment,
    category: 'development',
    order: 1,
    isActive: true
  },
  {
    id: '2',
    title: '系统集成服务',
    description: '为企业提供完整的系统集成解决方案，优化业务流程，提升运营效率。整合各种业务系统，实现数据互通。',
    detailContent: '详细的系统集成服务介绍...',
    features: [
      '多系统整合',
      '数据同步',
      '流程优化',
      '接口开发',
      '性能监控',
      '故障诊断'
    ],
    advantages: [
      '经验丰富',
      '技术全面',
      '响应及时',
      '质量保证'
    ],
    imageUrl: Images.business.systemIntegration,
    category: 'consulting',
    order: 2,
    isActive: true
  },
  {
    id: '3',
    title: '移动应用开发',
    description: '专业的移动应用开发团队，打造优质的移动端体验。支持iOS和Android双平台，提供原生和混合开发方案。',
    detailContent: '详细的移动应用开发服务介绍...',
    features: [
      'iOS/Android双平台',
      '原生应用开发',
      '混合应用开发',
      'UI/UX设计',
      '性能优化',
      '应用商店上架'
    ],
    advantages: [
      '技术专业',
      '设计精美',
      '性能优异',
      '用户体验佳'
    ],
    imageUrl: Images.business.mobileDevelopment,
    category: 'development',
    order: 3,
    isActive: true
  },
  {
    id: '4',
    title: '云平台服务',
    description: '基于云计算的企业服务平台，提供弹性、可扩展的云解决方案。支持公有云、私有云和混合云部署。',
    detailContent: '详细的云平台服务介绍...',
    features: [
      '多云支持',
      '弹性扩容',
      '数据备份',
      '监控告警',
      '自动运维',
      '安全防护'
    ],
    advantages: [
      '成本降低',
      '高可用性',
      '快速部署',
      '专业运维'
    ],
    imageUrl: Images.hero.carousel1,
    category: 'maintenance',
    order: 4,
    isActive: true
  },
  {
    id: '5',
    title: '技术培训服务',
    description: '提供专业的技术培训服务，提升团队技术能力。涵盖前端、后端、DevOps等多个技术领域。',
    detailContent: '详细的技术培训服务介绍...',
    features: [
      '定制化课程',
      '实战项目',
      '专家授课',
      '在线学习',
      '考核认证',
      '后续支持'
    ],
    advantages: [
      '课程丰富',
      '师资优秀',
      '实用性强',
      '效果显著'
    ],
    imageUrl: Images.business.trainingService,
    category: 'training',
    order: 5,
    isActive: true
  },
  {
    id: '6',
    title: '数据分析服务',
    description: '专业的数据分析和商业智能服务，帮助企业从数据中发现商业价值，做出更明智的决策。',
    detailContent: '详细的数据分析服务介绍...',
    features: [
      '数据采集',
      '数据清洗',
      '分析建模',
      '可视化展示',
      '报表生成',
      '决策支持'
    ],
    advantages: [
      '专业团队',
      '先进工具',
      '深度洞察',
      '决策支持'
    ],
    imageUrl: Images.news.industryNews,
    category: 'consulting',
    order: 6,
    isActive: true
  }
]);

// 客户案例数据
const businessCases = ref<BusinessCase[]>([
  {
    id: '1',
    title: '某大型制造企业ERP系统',
    client: '某制造集团',
    description: '为大型制造企业定制开发ERP系统，整合生产、销售、财务等各个业务模块',
    serviceType: 'development',
    imageUrl: Images.business.caseManufacturing,
    projectDuration: '8个月',
    result: '提升运营效率35%，降低成本20%',
    technologies: ['Vue.js', 'Spring Boot', 'MySQL', 'Redis', 'Docker']
  },
  {
    id: '2',
    title: '金融机构数字化转型',
    client: '某城市银行',
    description: '协助金融机构进行数字化转型，升级核心业务系统，提升客户服务质量',
    serviceType: 'consulting',
    imageUrl: Images.news.awardNews,
    projectDuration: '12个月',
    result: '客户满意度提升40%，处理效率提升50%',
    technologies: ['微服务架构', '区块链', '大数据', 'AI算法']
  },
  {
    id: '3',
    title: '电商平台运维服务',
    client: '某电商公司',
    description: '为电商平台提供7x24小时运维服务，确保系统稳定运行',
    serviceType: 'maintenance',
    imageUrl: Images.news.eventNews,
    projectDuration: '持续服务',
    result: '系统可用性达到99.9%，故障响应时间缩短70%',
    technologies: ['Kubernetes', 'Prometheus', 'ELK Stack', 'Jenkins']
  }
]);

// 计算属性
const filteredServices = computed(() => {
  if (selectedCategory.value === null) {
    return businessServices.value.filter(service => service.isActive);
  }
  return businessServices.value.filter(
    service => service.isActive && service.category === selectedCategory.value
  );
});

// 方法
const filterByCategory = (category: BusinessCategory) => {
  selectedCategory.value = category;
};

const showAllServices = () => {
  selectedCategory.value = null;
};

const toggleServiceDetails = (serviceId: string) => {
  const index = expandedServices.value.indexOf(serviceId);
  if (index > -1) {
    expandedServices.value.splice(index, 1);
  } else {
    expandedServices.value.push(serviceId);
  }
};

const getCategoryLabel = (category: BusinessCategory): string => {
  const config = businessCategories.find(c => c.key === category);
  return config?.label || '其他';
};

const getCategoryColor = (category: BusinessCategory): string => {
  const config = businessCategories.find(c => c.key === category);
  return config?.color || '#6b7280';
};

const getDefaultIcon = (category: BusinessCategory): string => {
  const icons = {
    consulting: '💡',
    development: '💻',
    maintenance: '🛠️',
    training: '📚'
  };
  return icons[category] || '⚙️';
};

const contactForService = (service: BusinessService) => {
  router.push({
    path: '/consult',
    query: {
      service: service.id,
      type: 'service'
    }
  });
};

const learnMore = (service: BusinessService) => {
  // 这里可以导航到服务详情页，或者显示详情模态框
  console.log('了解更多:', service.title);
};
</script>

<style scoped>
/* 特别针对 Business 页面的字体设置 - 解决 CTA 区域字体问题 */
.business-page router-link,
.business-page a[href],
.business-page .btn,
.business-page .btn-outline,
.business-page .border-white,
.business-page .text-white {
  font-family: 'Microsoft YaHei' !important;
  font-display: block !important;
}

/* 最高优先级：针对多层 class 组合选择器 */
.btn-outline.border-white.text-white,
.btn.btn-outline.border-white.text-white,
a.btn.btn-outline.border-white.text-white,
router-link.btn.btn-outline.border-white.text-white {
  font-family: 'Microsoft YaHei' !important;
  font-display: block !important;
}

/* Vue 组件数据属性选择器 */
[data-v-e345e995].btn,
[data-v-e345e995].btn-outline,
[data-v-e345e995] .btn,
[data-v-e345e995] .btn-outline {
  font-family: 'Microsoft YaHei' !important;
  font-display: block !important;
}

/* 强制中文字体设置 - 确保所有元素都显示中文字体 */
.business-page,
.business-page *,
.business-page h1,
.business-page h2,
.business-page h3,
.business-page h4,
.business-page h5,
.business-page h6,
.business-page p,
.business-page span,
.business-page a,
.business-page button,
.business-page .btn {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Helvetica Neue', Arial, sans-serif !important;
  font-display: swap !important;
}

/* 服务卡片样式 */
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

/* 动画效果 */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* 粘性导航样式 */
.sticky {
  backdrop-filter: blur(10px);
}

/* 分类按钮样式 */
.category-btn {
  transition: all 0.3s ease;
}

.category-btn:hover {
  transform: translateY(-1px);
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .business-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .service-card {
    margin-bottom: 1.5rem;
  }
  
  .category-filters {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .category-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>