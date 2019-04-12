import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: "en_US",
  messages: {
    "zh-CN": require('./lang/zh.json'),
    "en_US": require('./lang/en.json')
  }
})
let lang = navigator.language||navigator.userLanguage;//常规浏览器语言和IE浏览器
lang = lang.substr(0, 2);//截取lang前2位字符
// if(lang == 'zh'){
//   i18n.locale = 'zh-CN'
// }else{
//   i18n.locale = 'en_US'
// }
const setLang = (lang) => {
  i18n.locale = lang
}
const getLang = () => {
  return i18n.locale
}
Vue.prototype.$setLang = setLang
Vue.prototype.$getLang = getLang
export default i18n
