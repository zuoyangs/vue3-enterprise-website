// 新闻文章类型定义
export interface NewsArticle {
  id: string; // 新闻ID
  title: string; // 标题
  summary: string; // 摘要
  content: string; // 内容
  author: string; // 作者
  publishDate: string; // 发布日期 (ISO字符串)
  category: NewsCategory; // 分类
  tags: string[]; // 标签
  imageUrl?: string; // 封面图片URL（可选）
  readCount: number; // 阅读次数
  featured: boolean; // 是否为推荐文章
}

// 新闻分类类型
export type NewsCategory = 'company' | 'industry' | 'product' | 'event';

// 新闻分类配置
export interface NewsCategoryConfig {
  key: NewsCategory;
  label: string;
  description: string;
}

// 新闻列表查询参数
export interface NewsQuery {
  page: number;
  pageSize: number;
  category?: NewsCategory;
  keyword?: string;
  featured?: boolean;
}

// 新闻列表响应数据
export interface NewsResponse {
  articles: NewsArticle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}