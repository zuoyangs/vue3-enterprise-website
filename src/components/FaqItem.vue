<template>
  <div class="faq-item border border-gray-200 rounded-lg mb-4 overflow-hidden">
    <button
      class="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      @click="toggle"
      :aria-expanded="isOpen"
      :aria-controls="`faq-content-${id}`"
    >
      <!-- 问题标题 -->
      <h3 class="text-lg font-medium text-gray-900 pr-4">
        {{ question }}
      </h3>
      
      <!-- 展开/收起图标 -->
      <div 
        class="flex-shrink-0 w-6 h-6 text-gray-500 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
      >
        <svg 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>

    <!-- 答案内容 -->
    <div
      :id="`faq-content-${id}`"
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :class="[
        isOpen ? 'max-h-96' : 'max-h-0',
        isOpen ? 'border-t border-gray-200' : ''
      ]"
    >
      <div class="px-6 py-4 bg-gray-50">
        <div 
          class="text-gray-700 leading-relaxed prose max-w-none"
          :class="{ 'animate-fade-in': isOpen }"
          v-html="formattedAnswer"
        />
        
        <!-- 相关链接 -->
        <div v-if="relatedLinks && relatedLinks.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <p class="text-sm font-medium text-gray-600 mb-2">相关链接：</p>
          <div class="space-y-1">
            <a
              v-for="link in relatedLinks"
              :key="link.url"
              :href="link.url"
              :target="link.external ? '_blank' : '_self'"
              :rel="link.external ? 'noopener noreferrer' : ''"
              class="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline mr-4"
            >
              {{ link.title }}
              <span v-if="link.external" class="ml-1">↗</span>
            </a>
          </div>
        </div>

        <!-- 标签 -->
        <div v-if="tags && tags.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="tag tag-secondary"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props定义
interface FaqLink {
  title: string;
  url: string;
  external?: boolean;
}

interface Props {
  id: string; // 唯一标识符
  question: string; // 问题
  answer: string; // 答案
  defaultOpen?: boolean; // 默认是否展开
  tags?: string[]; // 标签
  relatedLinks?: FaqLink[]; // 相关链接
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  tags: () => [],
  relatedLinks: () => [],
});

// Emits定义
const emit = defineEmits<{
  toggle: [isOpen: boolean]; // 展开/收起事件
  open: []; // 展开事件
  close: []; // 收起事件
}>();

// 响应式状态
const isOpen = ref(props.defaultOpen);

// 计算属性：格式化答案（支持简单的HTML）
const formattedAnswer = computed(() => {
  return props.answer
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
});

// 切换展开/收起状态
const toggle = () => {
  isOpen.value = !isOpen.value;
  emit('toggle', isOpen.value);
  
  if (isOpen.value) {
    emit('open');
  } else {
    emit('close');
  }
};

// 展开
const open = () => {
  if (!isOpen.value) {
    toggle();
  }
};

// 收起
const close = () => {
  if (isOpen.value) {
    toggle();
  }
};

// 暴露方法给父组件
defineExpose({
  toggle,
  open,
  close,
  isOpen,
});
</script>

<style scoped>
/* 动画效果 */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(-10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* 按钮聚焦状态 */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 滚动条样式（如果内容过长） */
.overflow-hidden::-webkit-scrollbar {
  width: 4px;
}

.overflow-hidden::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-hidden::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-hidden::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 响应式适配 */
@media (max-width: 640px) {
  .faq-item button {
    padding: 1rem;
  }
  
  .faq-item h3 {
    font-size: 1rem;
  }
  
  .faq-item .prose {
    font-size: 0.875rem;
  }
}
</style>