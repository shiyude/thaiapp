import axios from 'axios'
import baseUrl from './env'
import Vue from 'vue'
import {
  companyConfig
} from './company.config'
import qs from 'qs'
import {
  Indicator,
} from 'mint-ui'
axios.defaults.baseURL = baseUrl
// 校验是否有html标签
function hasHTML(data) {
  data = JSON.stringify(data)
  let reg1 = /<\/?[^>]*>/g
  let reg2 = /&nbsp;/ig
  if (reg1.test(data) || reg2.test(data)) {
    return true
  } else {
    return false
  }
}
const XHR = (isLoading = true) => {
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const user = {
    sign: Vue.$cusMd5(companyConfig.idToken),
    companyId: companyConfig.id,
    lang: localStorage.getItem('lang') || "en_US",
    country: "1",
    customerId: userInfo.id || "",
    token: userInfo.token || ""
  }
  const sucFun = (res) => {
    if (isLoading) {
      Indicator.close();
    }
    return Promise.resolve(res.data)
  }
  const errFun = (err) => {
    if (isLoading) {
      Indicator.close();
    }
    Vue.$cusToast(err||'Fail')
    return Promise.reject(err)
  }
  return {
    user,
    sucFun,
    errFun
  }
}
const Get = (url = "", data = {}, isLoading = true, allowHtml = false) => {
  let {
    user,
    sucFun,
    errFun
  } = XHR(isLoading);
  let params = {
    params: {
      ...user,
      ...data
    }
  }
  if (!allowHtml && hasHTML(data)) {
    return Promise.reject('数据包含非法字符')
  }
  if (isLoading) {
    Indicator.open();
  }
  return axios.get(url, params).then(sucFun).catch(errFun)

}
const Post = (url = "", data = {}, isLoading = true, allowHtml = false) => {
  let {
    user,
    sucFun,
    errFun
  } = XHR(isLoading);
  let params = qs.stringify({
    ...user,
    ...data
  })
  if (!allowHtml && hasHTML(data)) {
    return Promise.reject('数据包含非法字符')
  }
  if (isLoading) {
    Indicator.open();
  }

  return axios.post(url, params).then(sucFun).catch(errFun)
}
Vue.Get = Vue.prototype.$Get = Get
Vue.Post = Vue.prototype.$Post = Post
