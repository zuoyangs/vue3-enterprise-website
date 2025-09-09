<template>
  <div class="news-detail">
    <h1>新闻详情</h1>
    <p>新闻ID: {{ $route.params.id }}</p>
    <p>这里是新闻详情页面的内容。</p>
  </div>
</template>

<script setup lang="ts">
// 新闻详情页面组件
// 使用 $route.params.id 直接获取路由参数，无需defineProps
</script>

<style scoped>
.news-detail {
  padding: 20px;
}

.news-detail h1 {
  color: #333;
  margin-bottom: 20px;
}
</style>