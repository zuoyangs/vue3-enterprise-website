// 咨询表单类型定义
export interface ConsultForm {
  name: string; // 用户姓名
  phone: string; // 手机号（需验证格式）
  type: 'product' | 'service' | 'other'; // 咨询类型：product（产品）、service（服务）、other（其他）
  content: string; // 咨询内容
}

// 咨询类型选项
export type ConsultType = ConsultForm['type'];

// 表单提交结果类型
export interface ConsultSubmitResult {
  success: boolean;
  message: string;
}