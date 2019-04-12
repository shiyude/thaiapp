import Vue from 'vue'
import {
  Toast
} from 'mint-ui';
import md5 from 'js-md5'
const cusToast = (data) => {
  return Toast({
    message: data,
    duration: 1000,
  })
}
const cusMd5 = (data) => {
  return md5(data)
}
const dateFormat = (date) => {

  if (!date) return ''
  let date_format = new Date(date)
  let year = date_format.getFullYear()
  let month = date_format.getMonth() + 1
  if (month < 10) month = '0' + month
  let mydate = date_format.getDate()
  if (mydate < 10) mydate = '0' + mydate
  let hours = date_format.getHours()
  if (hours < 10) hours = '0' + hours
  let minutes = date_format.getMinutes()
  if (minutes < 10) minutes = '0' + minutes
  let seconds = date_format.getSeconds()
  if (seconds < 10) seconds = '0' + seconds
  let time = `${year}-${month}-${mydate} ${hours}:${minutes}:${seconds}`
  return time
}
Vue.prototype.$cusToast = Vue.$cusToast = cusToast
Vue.prototype.$cusMd5 = Vue.$cusMd5 = cusMd5
Vue.prototype.$dateFormat = Vue.$dateFormat = dateFormat
