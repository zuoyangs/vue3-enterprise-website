// 导航菜单项类型定义
export interface NavItem {
  path: string; // 路由路径
  label: string; // 显示文本
  children?: NavItem[]; // 子菜单（可选，用于下拉菜单）
  external?: boolean; // 是否外部链接（可选）
  icon?: string; // 图标类名（可选）
}

// 移动端菜单状态类型
export interface MobileMenuState {
  isOpen: boolean;
  activeSubmenu: string | null;
}