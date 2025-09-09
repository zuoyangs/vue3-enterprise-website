<template>
  <div class="consult-page">
    <!-- 页面头部 -->
    <section class="bg-gradient-primary text-white py-20">
      <div class="container text-center">
        <h1 class="page-title text-white mb-4">在线咨询</h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          专业的技术团队为您提供免费咨询服务
        </p>
      </div>
    </section>

    <!-- 咨询表单 -->
    <section class="py-16">
      <div class="container">
        <div class="max-w-2xl mx-auto">
          <div class="card">
            <div class="card-header">
              <h2 class="text-2xl font-semibold">免费咨询</h2>
              <p class="text-gray-600 mt-2">请填写您的咨询需求，我们会在24小时内回复</p>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitConsult" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">姓名 *</label>
                    <input
                      v-model="consultStore.form.name"
                      type="text"
                      required
                      class="form-input"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">手机号 *</label>
                    <input
                      v-model="consultStore.form.phone"
                      type="tel"
                      required
                      class="form-input"
                      placeholder="请输入您的手机号"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">咨询类型 *</label>
                  <select
                    v-model="consultStore.form.type"
                    required
                    class="form-select"
                  >
                    <option value="product">产品咨询</option>
                    <option value="service">服务咨询</option>
                    <option value="other">其他咨询</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">咨询内容 *</label>
                  <textarea
                    v-model="consultStore.form.content"
                    required
                    rows="6"
                    class="form-textarea"
                    placeholder="请详细描述您的需求或问题"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="consultStore.submitLoading"
                  class="btn btn-primary w-full"
                >
                  {{ consultStore.submitLoading ? '提交中...' : '提交咨询' }}
                </button>
              </form>
            </div>
          </div>

          <!-- 联系方式 -->
          <div class="mt-8 card bg-blue-50 border-blue-200">
            <div class="card-body">
              <h3 class="text-lg font-semibold mb-4">其他联系方式</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-blue-600 text-xl">📞</span>
                  <div>
                    <span class="font-medium">客服热线：</span>
                    <a href="tel:400-123-4567" class="text-blue-600 hover:text-blue-800">400-123-4567</a>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-blue-600 text-xl">📧</span>
                  <div>
                    <span class="font-medium">邮箱咨询：</span>
                    <a href="mailto:support@zuoyangs.com" class="text-blue-600 hover:text-blue-800">support@zuoyangs.com</a>
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
import { useConsultStore } from '@/stores/consultStore';

const consultStore = useConsultStore();

// 提交咨询表单
const submitConsult = async () => {
  const result = await consultStore.submitForm();
  
  if (result.success) {
    alert(result.message);
  } else {
    alert(result.message);
  }
};
</script>

<style scoped>
.form-input:focus,
.form-textarea:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}
</style>