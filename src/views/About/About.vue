<template>
  <div class="about-page">
    <!-- 页面头部 -->
    <section class="bg-gradient-primary text-white py-20">
      <div class="container text-center">
        <h1 class="page-title text-white mb-4">关于我们</h1>
        <p class="text-xl opacity-90 max-w-2xl mx-auto">
          专业的企业服务提供商，致力于为客户提供高质量的解决方案
        </p>
      </div>
    </section>

    <!-- 公司概况 -->
    <section class="py-16">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="section-title">公司概况</h2>
            <p class="text-gray-600 text-lg leading-relaxed">
              我们成立于{{ companyInfo.foundedYear }}年，是一家专注于企业数字化服务的高新技术企业。
              多年来，我们始终坚持"技术创新、客户至上"的服务理念，为数百家企业提供了专业的技术解决方案。
            </p>
            <p class="text-gray-600 leading-relaxed">
              公司拥有一支经验丰富的技术团队，涵盖软件开发、系统集成、项目管理等多个专业领域。
              我们深入理解各行业的业务特点，能够为客户量身定制最适合的解决方案。
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center p-6 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600 mb-2">{{ companyInfo.teamSize }}+</div>
                <div class="text-gray-600">团队成员</div>
              </div>
              <div class="text-center p-6 bg-green-50 rounded-lg">
                <div class="text-3xl font-bold text-green-600 mb-2">{{ companyInfo.projectCount }}+</div>
                <div class="text-gray-600">成功项目</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              :src="companyInfo.officeImage"
              alt="公司办公环境"
              class="rounded-lg shadow-lg w-full h-auto"
            />
            <div class="absolute inset-0 bg-blue-600 bg-opacity-10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 企业文化 -->
    <section class="py-16 bg-gray-50">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="section-title">企业文化</h2>
          <p class="text-gray-600 text-lg">我们的价值观与使命</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="value in companyValues"
            :key="value.id"
            class="text-center group"
          >
            <div class="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
              <span class="text-3xl">{{ value.icon }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>

        <!-- 使命愿景 -->
        <div class="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="text-center lg:text-left">
            <h3 class="text-2xl font-semibold mb-4 text-blue-600">我们的使命</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              通过技术创新和专业服务，帮助企业实现数字化转型，
              提升运营效率，创造更大的商业价值。
            </p>
          </div>
          <div class="text-center lg:text-right">
            <h3 class="text-2xl font-semibold mb-4 text-blue-600">我们的愿景</h3>
            <p class="text-gray-600 text-lg leading-relaxed">
              成为行业领先的企业服务提供商，以卓越的技术和服务，
              成为客户最信赖的合作伙伴。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Images } from '@/assets/images';

// 公司信息
const companyInfo = ref({
  foundedYear: 2014,
  teamSize: 50,
  projectCount: 500,
  officeImage: Images.about.officeEnvironment
});

// 企业价值观
const companyValues = ref([
  {
    id: '1',
    title: '客户至上',
    description: '始终以客户需求为导向，提供最优质的服务',
    icon: '🎯'
  },
  {
    id: '2',
    title: '技术创新',
    description: '持续技术创新，为客户提供前沿的解决方案',
    icon: '💡'
  },
  {
    id: '3',
    title: '团队协作',
    description: '相互信任，协同合作，共同创造价值',
    icon: '🤝'
  },
  {
    id: '4',
    title: '追求卓越',
    description: '不断追求卓越，在每个细节上精益求精',
    icon: '⭐'
  }
]);
</script>

<style scoped>
/* 响应式适配 */
@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>