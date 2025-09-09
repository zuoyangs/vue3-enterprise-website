<template>
  <div class="relative w-full overflow-hidden" :style="{ height: height }">
    <!-- 轮播图容器 -->
    <div 
      class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="w-full h-full flex-shrink-0 relative"
      >
        <!-- 背景图片 -->
        <img
          :src="item.imageUrl"
          :alt="item.title"
          class="w-full h-full object-cover"
          @load="onImageLoad"
          @error="onImageError"
        />
        
        <!-- 内容覆盖层 -->
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div class="text-center text-white px-4 max-w-4xl">
            <h2 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {{ item.title }}
            </h2>
            <p 
              v-if="item.subtitle"
              class="text-xl md:text-2xl mb-6 animate-slide-up"
            >
              {{ item.subtitle }}
            </p>
            <p 
              v-if="item.description"
              class="text-lg mb-8 opacity-90 animate-slide-up"
            >
              {{ item.description }}
            </p>
            <button
              v-if="item.linkUrl && item.buttonText"
              class="btn btn-primary btn-lg animate-slide-up"
              @click="handleButtonClick(item.linkUrl)"
            >
              {{ item.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航点 -->
    <div 
      v-if="showDots && items.length > 1"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
        v-for="(item, index) in items"
        :key="`dot-${item.id}`"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          index === currentIndex 
            ? 'bg-white' 
            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
        ]"
        @click="goToSlide(index)"
        :aria-label="`跳转到第${index + 1}张轮播图`"
      />
    </div>

    <!-- 左右箭头 -->
    <div v-if="showArrows && items.length > 1" class="absolute inset-y-0 left-0 right-0">
      <!-- 左箭头 -->
      <button
        class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-300"
        @click="previousSlide"
        :disabled="!infinite && currentIndex === 0"
        aria-label="上一张"
      >
        <span class="text-xl">‹</span>
      </button>
      
      <!-- 右箭头 -->
      <button
        class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full flex items-center justify-center transition-all duration-300"
        @click="nextSlide"
        :disabled="!infinite && currentIndex === items.length - 1"
        aria-label="下一张"
      >
        <span class="text-xl">›</span>
      </button>
    </div>

    <!-- 加载状态 -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-gray-200 flex items-center justify-center"
    >
      <div class="loading-spinner w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { CarouselItem } from '@/types/common';

// Props定义
interface Props {
  items: CarouselItem[]; // 轮播图数据
  height?: string; // 高度
  autoplay?: boolean; // 是否自动播放
  interval?: number; // 自动播放间隔（毫秒）
  showDots?: boolean; // 是否显示导航点
  showArrows?: boolean; // 是否显示箭头
  infinite?: boolean; // 是否无限循环
}

const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  autoplay: true,
  interval: 5000,
  showDots: true,
  showArrows: true,
  infinite: true,
});

// Emits定义
const emit = defineEmits<{
  change: [index: number]; // 轮播图切换事件
  click: [item: CarouselItem]; // 轮播图点击事件
}>();

// 响应式状态
const currentIndex = ref(0);
const isLoading = ref(true);
const autoplayTimer = ref<number | null>(null);

// 路由实例
const router = useRouter();

// 计算属性：过滤激活的轮播图
const activeItems = computed(() => 
  props.items.filter(item => item.isActive).sort((a, b) => a.order - b.order)
);

// 跳转到指定轮播图
const goToSlide = (index: number) => {
  if (index >= 0 && index < activeItems.value.length) {
    currentIndex.value = index;
    emit('change', index);
    restartAutoplay();
  }
};

// 下一张
const nextSlide = () => {
  if (props.infinite) {
    currentIndex.value = (currentIndex.value + 1) % activeItems.value.length;
  } else {
    currentIndex.value = Math.min(currentIndex.value + 1, activeItems.value.length - 1);
  }
  emit('change', currentIndex.value);
  restartAutoplay();
};

// 上一张
const previousSlide = () => {
  if (props.infinite) {
    currentIndex.value = currentIndex.value === 0 
      ? activeItems.value.length - 1 
      : currentIndex.value - 1;
  } else {
    currentIndex.value = Math.max(currentIndex.value - 1, 0);
  }
  emit('change', currentIndex.value);
  restartAutoplay();
};

// 开始自动播放
const startAutoplay = () => {
  if (props.autoplay && activeItems.value.length > 1) {
    autoplayTimer.value = setInterval(() => {
      nextSlide();
    }, props.interval);
  }
};

// 停止自动播放
const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value);
    autoplayTimer.value = null;
  }
};

// 重启自动播放
const restartAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// 处理按钮点击
const handleButtonClick = (linkUrl: string) => {
  if (linkUrl.startsWith('http')) {
    window.open(linkUrl, '_blank');
  } else {
    router.push(linkUrl);
  }
};

// 图片加载完成
const onImageLoad = () => {
  isLoading.value = false;
};

// 图片加载错误
const onImageError = () => {
  console.error('轮播图图片加载失败');
  isLoading.value = false;
};

// 生命周期钩子
onMounted(() => {
  if (activeItems.value.length > 0) {
    isLoading.value = false;
    startAutoplay();
  }
});

onBeforeUnmount(() => {
  stopAutoplay();
});

// 暴露方法给父组件
defineExpose({
  goToSlide,
  nextSlide,
  previousSlide,
  startAutoplay,
  stopAutoplay,
});
</script>

<style scoped>
/* 轮播图动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.3s both;
}

/* 按钮样式 */
.btn-lg {
  @apply px-8 py-3 text-lg;
}

/* 加载动画 */
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .animate-fade-in {
    font-size: 2rem;
  }
  
  .animate-slide-up {
    font-size: 1rem;
  }
}
</style>