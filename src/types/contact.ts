// 联系信息类型定义
export interface ContactInfo {
  address: string; // 公司地址
  phone: string; // 联系电话
  email: string; // 邮箱
  workingHours: string; // 工作时间
  website: string; // 官网地址
  socialMedia: SocialMediaLink[]; // 社交媒体链接
}

// 社交媒体链接类型
export interface SocialMediaLink {
  platform: string; // 平台名称 (wechat, weibo, linkedin等)
  url: string; // 链接地址
  icon: string; // 图标类名
  label: string; // 显示标签
}

// 留言表单类型
export interface ContactForm {
  name: string; // 姓名
  email: string; // 邮箱
  phone: string; // 电话
  company?: string; // 公司名称（可选）
  subject: string; // 主题
  message: string; // 留言内容
}

// 地图配置类型
export interface MapConfig {
  latitude: number; // 纬度
  longitude: number; // 经度
  zoom: number; // 缩放级别
  markerTitle: string; // 标记点标题
  mapType: 'baidu' | 'amap' | 'google'; // 地图类型
}