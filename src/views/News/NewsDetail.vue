<template>
  <div class="news-detail-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="container py-20 text-center">
        <div class="loading-spinner w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-600">加载中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-container">
      <div class="container py-20 text-center">
        <div class="text-red-500 text-6xl mb-4">❌</div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">加载失败</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <div class="space-x-4">
          <button class="btn btn-primary" @click="loadArticle">重试</button>
          <router-link to="/news" class="btn btn-outline">返回新闻列表</router-link>
        </div>
      </div>
    </div>

    <!-- 文章内容 -->
    <div v-else-if="article" class="article-content">
      <!-- 面包屑导航 -->
      <nav class="py-4 border-b border-gray-200">
        <div class="container">
          <div class="flex items-center text-sm text-gray-600">
            <router-link to="/" class="hover:text-blue-600 transition-colors">首页</router-link>
            <span class="mx-2">›</span>
            <router-link to="/news" class="hover:text-blue-600 transition-colors">新闻动态</router-link>
            <span class="mx-2">›</span>
            <span class="text-gray-800">{{ getCategoryLabel(article.category) }}</span>
          </div>
        </div>
      </nav>

      <!-- 文章头部 -->
      <header class="py-8 bg-gray-50">
        <div class="container">
          <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center gap-4 mb-4">
              <span 
                class="tag tag-primary"
                :style="{ 
                  backgroundColor: getCategoryColor(article.category) + '20',
                  color: getCategoryColor(article.category)
                }"
              >
                {{ getCategoryLabel(article.category) }}
              </span>
              <time class="text-sm text-gray-500">{{ formatDate(article.publishDate) }}</time>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
            <p class="text-lg text-gray-600 leading-relaxed">{{ article.summary }}</p>
            <div class="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <span class="flex items-center gap-1">
                <span>👤</span> {{ article.author }}
              </span>
              <span class="flex items-center gap-1">
                <span>👁️</span> {{ article.readCount }} 阅读
              </span>
              <span class="flex items-center gap-1">
                <span>🏷️</span> {{ article.tags.join('、') }}
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- 文章主体 -->
      <main class="py-12">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <!-- 文章图片 -->
            <div v-if="article.imageUrl" class="mb-8">
              <img
                :src="article.imageUrl"
                :alt="article.title"
                class="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <!-- 文章内容 -->
            <div class="prose prose-lg max-w-none">
              <div v-html="formatContent(article.content)"></div>
            </div>

            <!-- 标签 -->
            <div v-if="article.tags.length > 0" class="mt-8 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold mb-4">相关标签</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="tag tag-secondary"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 分享功能 -->
            <div class="mt-8 pt-8 border-t border-gray-200">
              <h3 class="text-lg font-semibold mb-4">分享文章</h3>
              <div class="flex items-center gap-4">
                <button
                  v-for="platform in shareOptions"
                  :key="platform.name"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                  :style="{ backgroundColor: platform.color + '20', color: platform.color }"
                  @click="shareArticle(platform.name)"
                >
                  <span>{{ platform.icon }}</span>
                  <span>{{ platform.label }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 相关文章推荐 -->
      <section v-if="relatedArticles.length > 0" class="py-12 bg-gray-50">
        <div class="container">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-semibold mb-8 text-center">相关文章</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                @click="router.push(`/news/${relatedArticle.id}`)"
              >
                <div class="aspect-w-16 aspect-h-9">
                  <img
                    :src="relatedArticle.imageUrl || getDefaultNewsImage(relatedArticle.category)"
                    :alt="relatedArticle.title"
                    class="w-full h-32 object-cover rounded-t-lg"
                  />
                </div>
                <div class="card-body">
                  <h3 class="font-semibold mb-2 text-ellipsis-2">{{ relatedArticle.title }}</h3>
                  <p class="text-gray-600 text-sm text-ellipsis-2">{{ relatedArticle.summary }}</p>
                  <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <span>{{ formatDate(relatedArticle.publishDate) }}</span>
                    <span>{{ relatedArticle.readCount }} 阅读</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- 返回顶部按钮 -->
      <button
        v-show="showBackToTop"
        class="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
        @click="scrollToTop"
      >
        ↑
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { NewsArticle, NewsCategory } from '@/types/news';
import { formatDate } from '@/utils/formatDate';
import { getDefaultNewsImage, Images } from '@/assets/images';

const route = useRoute();
const router = useRouter();

// 响应式数据
const loading = ref(true);
const error = ref<string | null>(null);
const article = ref<NewsArticle | null>(null);
const relatedArticles = ref<NewsArticle[]>([]);
const showBackToTop = ref(false);

// 分享选项
const shareOptions = ref([
  {
    name: 'wechat',
    label: '微信',
    icon: '💬',
    color: '#07c160'
  },
  {
    name: 'weibo',
    label: '微博',
    icon: '🐦',
    color: '#e6162d'
  },
  {
    name: 'copy',
    label: '复制链接',
    icon: '🔗',
    color: '#6b7280'
  }
]);

// 计算属性
const articleId = computed(() => route.params.id as string);

// 方法
const loadArticle = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 模拟数据
    article.value = {
      id: articleId.value,
      title: '公司荣获"2024年度最佳企业服务奖"',
      summary: '在激烈的行业竞争中，我们凭借卓越的服务质量和客户满意度获得了这一殊荣。该奖项是对我们团队多年来努力的认可，也是我们继续前进的动力。',
      content: `
        <p>2024年3月15日，在由中国企业服务协会主办的年度评选活动中，我们公司荣获了"2024年度最佳企业服务奖"这一重要荣誉。这个奖项的获得，标志着我们在企业服务领域的专业能力和服务质量得到了行业的广泛认可。</p>
        
        <h2>获奖背景</h2>
        <p>此次评选活动共有来自全国各地的500多家企业服务公司参与，经过专家评审和客户投票两个阶段，最终只有20家公司获得了这一殊荣。评选标准主要包括：</p>
        <ul>
          <li>服务质量和客户满意度</li>
          <li>技术创新能力</li>
          <li>市场影响力</li>
          <li>社会责任履行情况</li>
        </ul>
        
        <h2>我们的优势</h2>
        <p>能够在众多竞争者中脱颖而出，主要得益于我们在以下几个方面的突出表现：</p>
        <ol>
          <li><strong>专业的技术团队</strong>：我们拥有一支经验丰富、技术精湛的专业团队</li>
          <li><strong>完善的服务体系</strong>：建立了从售前咨询到售后服务的完整服务链条</li>
          <li><strong>持续的创新投入</strong>：每年将营收的15%投入到技术研发和创新中</li>
          <li><strong>优质的客户服务</strong>：客户满意度始终保持在95%以上</li>
        </ol>
        
        <h2>未来展望</h2>
        <p>获得这个奖项对我们来说既是荣誉，也是责任。我们将继续秉承"客户至上、技术创新"的理念，不断提升服务质量，为更多企业提供优质的数字化转型服务。</p>
        
        <p>同时，我们也将加大对新技术的研发投入，特别是在人工智能、云计算、大数据等前沿技术领域，努力为客户提供更加智能化、自动化的企业服务解决方案。</p>
      `,
      author: '左扬1',
      publishDate: '2024-03-15T10:00:00Z',
      category: 'company',
      tags: ['奖项', '企业荣誉', '客户满意度', '技术创新'],
      imageUrl: Images.news.awardNews,
      readCount: 1250,
      featured: true
    };
    
    // 加载相关文章
    loadRelatedArticles();
    
    // 更新阅读次数
    updateReadCount();
    
  } catch (err) {
    error.value = '文章加载失败，请稍后重试';
  } finally {
    loading.value = false;
  }
};

const loadRelatedArticles = async () => {
  // 模拟加载相关文章
  relatedArticles.value = [
    {
      id: '2',
      title: '新一代企业数字化转型解决方案发布',
      summary: '基于最新技术栈打造的企业数字化转型解决方案正式发布',
      content: '',
      author: '左扬2',
      publishDate: '2024-03-10T14:30:00Z',
      category: 'product',
      tags: ['产品发布', '数字化转型'],
      imageUrl: Images.news.productNews,
      readCount: 980,
      featured: true
    },
    {
      id: '3',
      title: '2024年行业技术发展趋势分析报告',
      summary: '深度分析当前技术发展趋势，为企业技术决策提供专业参考',
      content: '',
      author: '左扬3',
      publishDate: '2024-03-05T09:15:00Z',
      category: 'industry',
      tags: ['行业分析', '技术趋势'],
      imageUrl: Images.news.industryNews,
      readCount: 756,
      featured: true
    }
  ];
};

const updateReadCount = async () => {
  // 模拟更新阅读次数
  if (article.value) {
    article.value.readCount += 1;
  }
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

const getCategoryColor = (category: NewsCategory): string => {
  const colors = {
    company: '#3b82f6',
    industry: '#10b981',
    product: '#f59e0b',
    event: '#8b5cf6'
  };
  return colors[category] || '#6b7280';
};

const formatContent = (content: string): string => {
  // 简单的内容格式化
  return content.replace(/\n/g, '<br>');
};

const shareArticle = (platform: string) => {
  const url = window.location.href;
  const title = article.value?.title || '';
  
  switch (platform) {
    case 'wechat':
      // 微信分享（实际项目中需要微信JS-SDK）
      alert('微信分享功能需要在微信环境中使用');
      break;
    case 'weibo':
      window.open(`https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
      break;
    case 'copy':
      navigator.clipboard.writeText(url).then(() => {
        alert('链接已复制到剪贴板');
      }).catch(() => {
        alert('复制失败，请手动复制链接');
      });
      break;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// 生命周期
onMounted(() => {
  loadArticle();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 加载动画 */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 文章内容样式 */
.prose {
  color: #374151;
  line-height: 1.75;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.prose p {
  margin-bottom: 1.25rem;
}

.prose ul,
.prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  font-weight: 600;
  color: #1f2937;
}

/* 返回顶部按钮动画 */
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .prose {
    font-size: 0.875rem;
  }
  
  .prose h2 {
    font-size: 1.25rem;
  }
  
  .prose h3 {
    font-size: 1.125rem;
  }
}
</style>