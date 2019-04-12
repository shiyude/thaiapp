import Vue from 'vue';
Vue.prototype.$api = Vue.api = {
  login: "mixgo-customer-api/customer/login", //登录
  register: "mixgo-customer-api/customer/register", //注册
  sendCode: "mixgo-customer-api/customer/sendCode", //发送验证码
  querySysConfig:"/mixgo-goods-api/config/querySysConfig",//系统配置
  queryGoodsSpace:"/mixgo-goods-api/goodsCategory/queryGoodsSpace",//查询一级分类列表
  queryGoodsCategory:"/mixgo-goods-api/goodsCategory/queryGoodsCategory",////查询二级分类列表
  queryGoodsList:"/mixgo-goods-api/goods/queryGoodsList",//查询商品列表
  queryGoodsById:"/mixgo-goods-api/goods/queryGoodsById",//查询商品详情
  queryGoodsMaterail:"/mixgo-goods-api/goods/queryGoodsMaterail",//查询商品材质
  queryCompany:"/mixgo-goods-api/config/queryCompany",//关于我们
  queryDiscoveryList:"/mixgo-goods-api/discovery/queryDiscoveryList",//查询发现列表
  queryDiscoveryById:"/mixgo-goods-api/discovery/queryDiscoveryById",//查询发现详情
  queryGoodsByDiscoveryId:"/mixgo-goods-api/discovery/queryGoodsByDiscoveryId",//查询发现关联商品列表
  isFavoriteGoods:"/mixgo-customer-api/favorite/isFavoriteGoods",//是否收藏商品
  deleteGoodsFavorite:"/mixgo-customer-api/favorite/deleteGoodsFavorite",//取消收藏商品
  addGoodsFavorite:"/mixgo-customer-api/favorite/addGoodsFavorite",//商品收藏
  queryHomeDiscovery:"/mixgo-goods-api/discovery/queryHomeDiscovery",//查询首页轮播
  queryCustomer:"/mixgo-customer-api/customer/queryCustomer",//查询用户信息
  updateCustomerById:"/mixgo-customer-api/customer/updateCustomerById",//更新个人信息
  queryFavoriteGoods:"/mixgo-customer-api/favorite/queryFavoriteGoods",//查询收藏商品列表
  queryHomeLogo:"/mixgo-goods-api/start/queryHomeLogo",//泰国--首页图片
  queryExchange:"/mixgo-goods-api/start/queryExchange",//查询汇率
  addDiscoveryFavorite:"/mixgo-goods-api/discovery/addDiscoveryFavorite",//收藏
  deleteDiscoveryFavorite:"/mixgo-goods-api/discovery/deleteDiscoveryFavorite",//取消收藏
  queryExtend:"/mixgo-goods-api/extend/queryExtend",//查询企业扩展信息
}
