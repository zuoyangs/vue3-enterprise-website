<template>
  <div class="contact-page">
    <!-- 页面头部 -->
    <section class="bg-gradient-primary text-white py-20">
      <div class="container text-center">
        <h1 class="page-title text-white mb-4">联系我们</h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          随时为您提供专业的服务和支持
        </p>
      </div>
    </section>

    <!-- 联系信息和表单 -->
    <section class="py-16">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- 联系表单 -->
          <div class="card">
            <div class="card-header">
              <h2 class="text-2xl font-semibold">发送消息</h2>
              <p class="text-gray-600 mt-2">请填写以下信息，我们会尽快回复您</p>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="form-input"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">邮箱 *</label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="form-input"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">电话</label>
                    <input
                      v-model="form.phone"
                      type="tel"
                      class="form-input"
                      placeholder="请输入您的电话"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">公司</label>
                    <input
                      v-model="form.company"
                      type="text"
                      class="form-input"
                      placeholder="请输入您的公司名称"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">主题 *</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    required
                    class="form-input"
                    placeholder="请输入消息主题"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">消息内容 *</label>
                  <textarea
                    v-model="form.message"
                    required
                    rows="6"
                    class="form-textarea"
                    placeholder="请详细描述您的需求或问题"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn btn-primary w-full"
                >
                  {{ submitting ? '发送中...' : '发送消息' }}
                </button>
              </form>
            </div>
          </div>

          <!-- 联系信息 -->
          <div class="space-y-6">
            <div
              v-for="info in contactMethods"
              :key="info.type"
              class="card hover:shadow-lg transition-shadow duration-300"
            >
              <div class="card-body flex items-start gap-4">
                <div 
                  class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                  :style="{ backgroundColor: info.color }"
                >
                  {{ info.icon }}
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold mb-2">{{ info.title }}</h3>
                  <div class="space-y-1">
                    <p v-for="item in info.items" :key="item" class="text-gray-600">
                      {{ item }}
                    </p>
                  </div>
                  <button 
                    v-if="info.action"
                    class="mt-3 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    @click="handleAction(info.type, info.actionData)"
                  >
                    {{ info.action }}
                  </button>
                </div>
              </div>
            </div>

            <!-- 地图区域 -->
            <div class="card">
              <div class="card-body">
                <h3 class="text-lg font-semibold mb-4">公司位置</h3>
                <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div class="text-center text-gray-500">
                    <div class="text-4xl mb-2">🗺️</div>
                    <p>地图功能</p>
                    <p class="text-sm">北京市朝阳区建国门外大街1号</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ContactForm } from '@/types/contact';

// 表单数据
const form = ref<ContactForm>({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: ''
});

const submitting = ref(false);

// 联系方式
const contactMethods = ref([
  {
    type: 'phone',
    title: '电话咨询',
    icon: '📞',
    color: '#3b82f6',
    items: ['400-123-4567', '010-12345678'],
    action: '立即拨打',
    actionData: '400-123-4567'
  },
  {
    type: 'email',
    title: '邮箱联系',
    icon: '📧',
    color: '#10b981',
    items: ['support@zuoyangs.com'],
    action: '发送邮件',
    actionData: 'support@zuoyangs.com'
  },
  {
    type: 'address',
    title: '公司地址',
    icon: '📍',
    color: '#f59e0b',
    items: ['北京市朝阳区建国门外大街1号', '邮编：100000'],
    action: '查看地图',
    actionData: null
  },
  {
    type: 'time',
    title: '工作时间',
    icon: '⏰',
    color: '#8b5cf6',
    items: ['周一至周五: 9:00-18:00', '周六: 9:00-12:00', '周日: 休息'],
    action: null,
    actionData: null
  }
]);

// 提交表单
const submitForm = async () => {
  submitting.value = true;
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('消息发送成功！我们会尽快回复您。');
    
    // 重置表单
    form.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    };
  } catch (error) {
    alert('发送失败，请稍后重试。');
  } finally {
    submitting.value = false;
  }
};

// 处理操作
const handleAction = (type: string, data: any) => {
  switch (type) {
    case 'phone':
      window.open(`tel:${data}`);
      break;
    case 'email':
      window.open(`mailto:${data}`);
      break;
    case 'address':
      alert('地图功能待完善');
      break;
  }
};
</script>

<style scoped>
/* 表单样式增强 */
.form-input:focus,
.form-textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* 联系卡片悬停效果 */
.contact-card {
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-2px);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>