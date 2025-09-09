// 业务服务类型定义
export interface BusinessService {
  id: string; // 业务ID
  title: string; // 标题
  description: string; // 简介
  detailContent: string; // 详细内容
  features: string[]; // 特色功能列表
  advantages: string[]; // 优势列表
  imageUrl: string; // 业务图片
  iconUrl?: string; // 图标URL（可选）
  icon?: string; // 图标emoji（可选）
  category: BusinessCategory; // 业务分类
  order: number; // 排序权重
  isActive: boolean; // 是否启用
}

// 业务分类类型
export type BusinessCategory = 'consulting' | 'development' | 'maintenance' | 'training';

// 业务分类配置
export interface BusinessCategoryConfig {
  key: BusinessCategory;
  label: string;
  description: string;
  color: string; // 主题色
}

// 客户案例类型
export interface BusinessCase {
  id: string;
  title: string;
  client: string; // 客户名称
  description: string;
  serviceType: BusinessCategory;
  imageUrl: string;
  projectDuration: string; // 项目周期
  result: string; // 项目成果
  technologies: string[]; // 使用技术
}