// 通用API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  code?: number;
}

// 分页参数类型
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 分页响应数据类型
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 表单验证规则类型
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message: string;
}

// 表单字段验证结果
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// 加载状态类型
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// 轮播图配置类型
export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  order: number;
  isActive: boolean;
}