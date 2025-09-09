// 图片资源统一导入和导出

// 轮播图图片
import carouselImage1 from './hero/carousel-1.jpg'
import carouselImage2 from './hero/carousel-2.jpg'
import carouselImage3 from './hero/carousel-3.jpg'

// 关于我们图片
import officeEnvironment from './about/office-environment.jpg'

// 业务服务图片
import websiteDevelopment from './business/website-development.jpg'
import systemIntegration from './business/system-integration.jpg'
import mobileDevelopment from './business/mobile-development.jpg'
import trainingService from './business/training-service.jpg'
import consultingDefault from './business/consulting-default.jpg'
import developmentDefault from './business/development-default.jpg'
import caseManufacturing from './business/case-manufacturing.jpg'

// 新闻图片
import awardNews from './news/award-news.jpg'
import productNews from './news/product-news.jpg'
import industryNews from './news/industry-news.jpg'
import eventNews from './news/event-news.jpg'

// 导出所有图片
export const Images = {
  // 轮播图
  hero: {
    carousel1: carouselImage1,
    carousel2: carouselImage2,
    carousel3: carouselImage3,
  },
  
  // 关于我们
  about: {
    officeEnvironment,
  },
  
  // 业务服务
  business: {
    websiteDevelopment,
    systemIntegration,
    mobileDevelopment,
    trainingService,
    consultingDefault,
    developmentDefault,
    caseManufacturing,
  },
  
  // 新闻
  news: {
    awardNews,
    productNews,
    industryNews,
    eventNews,
  },
}

// 按类别获取默认图片
export const getDefaultServiceImage = (category: string): string => {
  const images: Record<string, string> = {
    consulting: consultingDefault,
    development: developmentDefault,
    maintenance: systemIntegration,
    training: trainingService,
  }
  return images[category] || developmentDefault
}

// 按类别获取新闻默认图片
export const getDefaultNewsImage = (category: string): string => {
  const images: Record<string, string> = {
    company: awardNews,
    industry: industryNews,
    product: productNews,
    event: eventNews,
  }
  return images[category] || industryNews
}

export default Images