import { defineStore } from 'pinia';
import axios from 'axios';
// 引入表单类型定义（在src/types/consult.ts中提前定义，确保类型安全）
import type { ConsultForm } from '@/types/consult';

// 表单默认值（符合ConsultForm类型结构）
const defaultForm: ConsultForm = {
  name: '', // 用户姓名
  phone: '', // 手机号（需验证格式）
  type: 'product', // 咨询类型：product（产品）、service（服务）、other（其他）
  content: '' // 咨询内容
};

// 创建Pinia存储实例（命名为consult，全局唯一）
export const useConsultStore = defineStore('consult', {
  state: () => ({
    form: { ...defaultForm }, // 咨询表单数据（响应式）
    submitLoading: false // 提交按钮加载状态（避免重复提交）
  }),
  actions: {
    // 更新表单字段（key限定为ConsultForm的属性，确保类型正确）
    updateFormField<K extends keyof ConsultForm>(key: K, value: ConsultForm[K]) {
      this.form[key] = value;
    },
    // 重置表单（提交成功或取消时调用）
    resetForm() {
      this.form = { ...defaultForm };
    },
    // 提交表单（对接后端接口，返回提交结果）
    async submitForm() {
      this.submitLoading = true;
      try {
        // 调用后端接口（通过Vite proxy配置，自动转换为后端地址）
        await axios.post('/api/consult', this.form);
        // 提交成功：重置表单+关闭加载
        this.resetForm();
        this.submitLoading = false;
        return { success: true, message: '咨询提交成功，工作人员将尽快联系您' };
      } catch (error) {
        // 提交失败：关闭加载+返回错误信息
        this.submitLoading = false;
        return { success: false, message: '提交失败，请检查网络后重试' };
      }
    }
  }
});