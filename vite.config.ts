import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 启用Vue插件，支持单文件组件解析
  // 路径别名：@指向src目录，简化文件引入（如@/components/Navbar.vue）
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 开发服务器配置：解决跨域、自定义端口
  server: {
    port: 8080, // 自定义端口（避免与其他项目冲突，默认5173）
    open: true, // 启动服务后自动打开浏览器
    proxy: {
      // 配置代理：解决企业网站对接后端接口的跨域问题
      '/api': {
        target: 'http://localhost:3000', // 后端接口地址（需替换为实际项目地址）
        changeOrigin: true, // 模拟浏览器同源请求，避免跨域拦截
        rewrite: (path) => path.replace(/^\/api/, '') // 移除请求路径中的/api前缀
      }
    }
  },
  // 生产构建配置：优化包体积，提升线上加载速度
  build: {
    outDir: 'dist', // 构建输出目录（默认dist，可自定义）
    assetsDir: 'static', // 静态资源（css、js、图片）存放目录
    sourcemap: false, // 生产环境不生成sourcemap（减少包体积，保护源码）
    rollupOptions: {
      // 代码分割：将第三方依赖（如vue、vue-router）单独打包，实现缓存复用
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js', // 分包文件命名
        entryFileNames: 'static/js/[name]-[hash].js', // 入口文件命名
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]' // 静态资源命名
      }
    }
  }
});