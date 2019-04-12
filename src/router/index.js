import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  routes: [{
      name: 'login',
      path: '/',
      component: () => import('@/page/login/login'), // 登录
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/page/login/register'), // 注册
    },
    {
      name: 'index',
      path: '/home',
      component: () => import('@/page/tabs/index'), // 主页
    },
    {
      name: 'firstClassify',
      path: '/firstClassify',
      component: () => import('@/page/tabs/products/firstClassify'), // 二级分类
    },
    {
      name: 'twoClassify',
      path: '/twoClassify',
      component: () => import('@/page/tabs/products/twoClassify'), // 三级分类
    },
    {
      name: 'goodsList',
      path: '/goodsList',
      component: () => import('@/page/goods/goodsList'), // 商品列表
    },
    {
      name: 'goodDetail',
      path: '/goodDetail',
      component: () => import('@/page/goods/goodDetail'), // 商品详情
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('@/page/tabs/accont/profile'), // my profile
    },
    {
      name: 'wishes',
      path: '/wishes',
      component: () => import('@/page/tabs/accont/wishes'), // wishes
    },
    {
      name: 'useQr',
      path: '/useQr',
      component: () => import('@/page/tabs/accont/useQrCode'), // useQr
    },
    {
      name: 'inspirationsDetails',
      path: '/inspirationsDetails',
      component: () => import('@/page/tabs/inspirations/inspirationsDetails'), // inspirationsDetails
    },
    {
      name: 'iframePage',
      path: '/iframePage',
      component: () => import('@/page/tabs/inspirations/iframePage'), // iframePage
    },
    {
      name: 'PrivacyPolicy',
      path: '/PrivacyPolicy',
      component: () => import('@/page/tabs/accont/PrivacyPolicy'), // PrivacyPolicy
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('@/page/tabs/accont/aboutUs'), // aboutUs
    },
    {
      name: 'faq',
      path: '/faq',
      component: () => import('@/page/tabs/accont/faq'), // faq
    },
    {
      name: 'needHelp',
      path: '/needHelp',
      component: () => import('@/page/tabs/accont/needHelp'), // needHelp
    },
    {
      name: 'searchGoods',
      path: '/searchGoods',
      component: () => import('@/page/goods/searchGoods'), // searchGoods
    },
    {
      path: '*',
      component: () => import('@/page/tabs/index')
    } //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
  ]
})

export default router

router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo')
  userInfo = userInfo ? JSON.parse(userInfo) : {}
  if ((to.path !== '/' && to.path !== "/register") && (userInfo.email === '' || userInfo.email === undefined)) {
    next('/')
  } else if ((to.path === '/' ||to.path === '/register')&& userInfo.email) {
    next('/home')
  } else {
    next()
  }
  next()
})
