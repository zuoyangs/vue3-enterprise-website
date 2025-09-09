<template>
  <div class="news-page">
    <!-- 页面头部 -->
    <section class="bg-gradient-primary text-white py-20">
      <div class="container text-center">
        <h1 class="page-title text-white mb-4">新闻动态</h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          了解最新的行业资讯和公司动态
        </p>
      </div>
    </section>

    <!-- 筛选和搜索 -->
    <section class="py-8 bg-white sticky top-16 z-40 shadow-sm">
      <div class="container">
        <div class="flex flex-col lg:flex-row justify-between items-center gap-4">
          <!-- 分类筛选 -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-3">
            <button
              v-for="category in newsCategories"
              :key="category.key"
              class="px-4 py-2 rounded-full transition-all duration-300 text-sm"
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
              class="px-4 py-2 rounded-full transition-all duration-300 text-sm"
              :class="[
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              @click="showAllNews"
            >
              全部
            </button>
          </div>

          <!-- 搜索框 -->
          <div class="relative w-full lg:w-80">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="搜索新闻..."
              class="form-input pl-10 pr-4"
              @input="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-400">🔍</span>
            </div>
            <button
              v-if="searchKeyword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              @click="clearSearch"
            >
              ×
            </button>
          </div>
        </div>

        <!-- 搜索结果统计 -->
        <div v-if="searchKeyword || selectedCategory" class="mt-4 text-sm text-gray-600">
          找到 {{ filteredNews.length }} 条相关新闻
          <span v-if="searchKeyword">（关键词："{{ searchKeyword }}"）</span>
          <span v-if="selectedCategory">（分类：{{ getCategoryLabel(selectedCategory) }}）</span>
        </div>
      </div>
    </section>

    <!-- 推荐新闻（仅在无筛选时显示） -->
    <section v-if="!searchKeyword && !selectedCategory" class="py-12 bg-gray-50">
      <div class="container">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-semibold">推荐阅读</h2>
          <span class="text-sm text-gray-500">为您精选的热门文章</span>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 主推荐文章 -->
          <article
            v-if="featuredNews.length > 0"
            class="featured-article cursor-pointer group"
            @click="$router.push(`/news/${featuredNews[0].id}`)"
          >
            <div class="relative h-80 rounded-lg overflow-hidden">
              <img
                :src="featuredNews[0].imageUrl || getDefaultNewsImage(featuredNews[0].category)"
                :alt="featuredNews[0].title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6 text-white">
                <div class="flex items-center justify-between mb-3">
                  <span class="tag tag-primary bg-blue-600 text-white">
                    {{ getCategoryLabel(featuredNews[0].category) }}
                  </span>
                  <time class="text-sm opacity-90">{{ formatDate(featuredNews[0].publishDate) }}</time>
                </div>
                <h3 class="text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300">
                  {{ featuredNews[0].title }}
                </h3>
                <p class="text-white/90 text-sm text-ellipsis-2">{{ featuredNews[0].summary }}</p>
              </div>
            </div>
          </article>

          <!-- 次要推荐文章 -->
          <div class="space-y-6">
            <article
              v-for="article in featuredNews.slice(1, 4)"
              :key="article.id"
              class="flex gap-4 group cursor-pointer"
              @click="$router.push(`/news/${article.id}`)"
            >
              <div class="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  :src="article.imageUrl || getDefaultNewsImage(article.category)"
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <span class="tag tag-secondary text-xs">{{ getCategoryLabel(article.category) }}</span>
                  <time class="text-xs text-gray-500">{{ formatDate(article.publishDate) }}</time>
                </div>
                <h4 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-ellipsis-2 mb-1">
                  {{ article.title }}
                </h4>
                <p class="text-gray-600 text-sm text-ellipsis-2">{{ article.summary }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 新闻列表 -->
    <section class="py-12">
      <div class="container">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-semibold">
            {{ searchKeyword || selectedCategory ? '搜索结果' : '最新动态' }}
          </h2>
          <div class="flex items-center gap-4">
            <!-- 排序选择 -->
            <select
              v-model="sortBy"
              class="form-select text-sm"
              @change="handleSort"
            >
              <option value="date">按时间排序</option>
              <option value="popular">按热度排序</option>
              <option value="title">按标题排序</option>
            </select>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-12">
          <div class="loading-spinner w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-600">加载中...</p>
        </div>

        <!-- 新闻网格 -->
        <div v-else-if="paginatedNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in paginatedNews"
            :key="article.id"
            class="card hover:shadow-lg transition-all duration-300 cursor-pointer group"
            @click="$router.push(`/news/${article.id}`)"
          >
            <div class="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <img
                :src="article.imageUrl || getDefaultNewsImage(article.category)"
                :alt="article.title"
                class="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div 
                v-if="article.featured"
                class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium"
              >
                推荐
              </div>
            </div>
            
            <div class="card-body">
              <div class="flex items-center justify-between mb-3">
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
              
              <h3 class="text-lg font-semibold mb-2 text-ellipsis-2 group-hover:text-blue-600 transition-colors duration-300">
                {{ article.title }}
              </h3>
              
              <p class="text-gray-600 text-sm mb-4 text-ellipsis-3">{{ article.summary }}</p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">{{ article.author }}</span>
                </div>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    👁️ {{ article.readCount }}
                  </span>
                  <span class="text-blue-600 group-hover:text-blue-800 transition-colors duration-300">
                    阅读更多 →
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- 无结果提示 -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📰</div>
          <h3 class="text-xl font-medium text-gray-600 mb-2">暂无相关新闻</h3>
          <p class="text-gray-500">
            {{ searchKeyword ? '请尝试其他关键词' : '请尝试选择其他分类' }}
          </p>
          <button
            v-if="searchKeyword || selectedCategory"
            class="btn btn-outline mt-4"
            @click="resetFilters"
          >
            查看全部新闻
          </button>
        </div>

        <!-- 分页组件 -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <button
              :disabled="currentPage === 1"
              class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              @click="goToPage(currentPage - 1)"
            >
              上一页
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              class="w-10 h-10 rounded-lg transition-colors duration-200"
              :class="[
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : typeof page === 'number'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-transparent text-gray-400 cursor-default'
              ]"
              :disabled="typeof page !== 'number'"
              @click="typeof page === 'number' ? goToPage(page) : undefined"
            >
              {{ page }}
            </button>
            
            <button
              :disabled="currentPage === totalPages"
              class="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              @click="goToPage(currentPage + 1)"
            >
              下一页
            </button>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { NewsArticle, NewsCategory, NewsCategoryConfig } from '@/types/news';
import { formatDate } from '@/utils/formatDate';
import { getDefaultNewsImage, Images } from '@/assets/images';

// 响应式数据
const loading = ref(false);
const searchKeyword = ref('');
const selectedCategory = ref<NewsCategory | null>(null);
const sortBy = ref<'date' | 'popular' | 'title'>('date');
const currentPage = ref(1);
const pageSize = 9; // 每页显示的新闻数量

// 新闻分类配置
const newsCategories: NewsCategoryConfig[] = [
  { key: 'company', label: '公司动态', description: '公司最新动态和发展资讯' },
  { key: 'industry', label: '行业资讯', description: '行业发展趋势和技术动态' },
  { key: 'product', label: '产品更新', description: '产品功能更新和新品发布' },
  { key: 'event', label: '活动公告', description: '公司活动和行业会议信息' }
];

// 新闻数据
const allNews = ref<NewsArticle[]>([
  {
    id: '1',
    title: '公司荣获"2024年度最佳企业服务奖"',
    summary: '在激烈的行业竞争中，我们凭借卓越的服务质量和客户满意度获得了这一殊荣。该奖项是对我们团队多年来努力的认可，也是我们继续前进的动力。',
    content: '详细内容...',
    author: '张三',
    publishDate: '2024-03-15T10:00:00Z',
    category: 'company',
    tags: ['奖项', '企业荣誉', '客户满意度'],
    imageUrl: Images.news.awardNews,
    readCount: 1250,
    featured: true
  },
  {
    id: '2',
    title: '新一代企业数字化转型解决方案发布',
    summary: '基于最新技术栈打造的企业数字化转型解决方案正式发布，将帮助更多企业快速实现数字化升级，提升运营效率和竞争力。',
    content: '详细内容...',
    author: '李四',
    publishDate: '2024-03-10T14:30:00Z',
    category: 'product',
    tags: ['产品发布', '数字化转型', '技术创新'],
    imageUrl: Images.news.productNews,
    readCount: 980,
    featured: true
  },
  {
    id: '3',
    title: '2024年行业技术发展趋势分析报告',
    summary: '深度分析当前技术发展趋势，包括人工智能、云计算、大数据等领域的最新进展，为企业技术决策提供专业参考。',
    content: '详细内容...',
    author: '王五',
    publishDate: '2024-03-05T09:15:00Z',
    category: 'industry',
    tags: ['行业分析', '技术趋势', '研究报告'],
    imageUrl: Images.news.industryNews,
    readCount: 756,
    featured: true
  },
  {
    id: '4',
    title: '参加"2024数字化创新大会"圆满结束',
    summary: '公司代表团参加了为期三天的数字化创新大会，与行业专家深入交流，分享了我们在企业服务领域的创新实践。',
    content: '详细内容...',
    author: '赵六',
    publishDate: '2024-02-28T16:45:00Z',
    category: 'event',
    tags: ['会议', '行业交流', '创新分享'],
    imageUrl: Images.news.eventNews,
    readCount: 623,
    featured: false
  },
  {
    id: '5',
    title: '客户成功案例：某金融机构数字化转型项目',
    summary: '分享我们为某大型金融机构提供数字化转型服务的成功案例，项目显著提升了客户的运营效率和服务质量。',
    content: '详细内容...',
    author: '孙七',
    publishDate: '2024-02-20T11:20:00Z',
    category: 'company',
    tags: ['客户案例', '金融行业', '数字化转型'],
    imageUrl: Images.news.awardNews,
    readCount: 892,
    featured: false
  },
  {
    id: '6',
    title: '云原生技术在企业应用中的实践',
    summary: '详细介绍云原生技术在企业级应用中的实际应用案例，包括容器化、微服务架构、DevOps等关键技术的应用经验。',
    content: '详细内容...',
    author: '周八',
    publishDate: '2024-02-15T13:10:00Z',
    category: 'industry',
    tags: ['云原生', '微服务', '技术实践'],
    imageUrl: Images.hero.carousel1,
    readCount: 567,
    featured: false
  }
]);

// 计算属性
const featuredNews = computed(() => 
  allNews.value.filter(article => article.featured).slice(0, 4)
);

const filteredNews = computed(() => {
  let filtered = allNews.value.filter(article => {
    // 分类筛选
    if (selectedCategory.value && article.category !== selectedCategory.value) {
      return false;
    }
    
    // 关键词搜索
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase();
      return (
        article.title.toLowerCase().includes(keyword) ||
        article.summary.toLowerCase().includes(keyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }
    
    return true;
  });

  // 排序
  switch (sortBy.value) {
    case 'date':
      filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      break;
    case 'popular':
      filtered.sort((a, b) => b.readCount - a.readCount);
      break;
    case 'title':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredNews.value.length / pageSize));

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredNews.value.slice(start, end);
});

const visiblePages = computed((): (number | string)[] => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, '...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...', total);
    }
  }
  
  return pages;
});

// 方法
const filterByCategory = (category: NewsCategory) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};

const showAllNews = () => {
  selectedCategory.value = null;
  currentPage.value = 1;
};

const handleSearch = () => {
  currentPage.value = 1;
};

const clearSearch = () => {
  searchKeyword.value = '';
  currentPage.value = 1;
};

const handleSort = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchKeyword.value = '';
  selectedCategory.value = null;
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const getCategoryLabel = (category: NewsCategory): string => {
  const config = newsCategories.find(c => c.key === category);
  return config?.label || '其他';
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

// 监听筛选条件变化，重置分页
watch([selectedCategory, searchKeyword], () => {
  currentPage.value = 1;
});

// 生命周期
onMounted(() => {
  // 可以在这里加载新闻数据
  console.log('新闻页面加载完成');
});
</script>

<style scoped>
/* 推荐文章样式 */
.featured-article {
  transition: all 0.3s ease;
}

.featured-article:hover {
  transform: translateY(-2px);
}

/* 加载动画 */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 搜索框样式 */
.search-input {
  transition: all 0.3s ease;
}

.search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 新闻卡片悬停效果 */
.news-card {
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

/* 分页按钮样式 */
.pagination-btn {
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .featured-section {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .category-filters {
    justify-content: center;
  }
}
</style>