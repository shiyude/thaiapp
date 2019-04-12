// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import Navigation from 'vue-navigation'
import router from './router'
import i18n from '@/assets/i18n/index'
import hubHeader from "@/components/hubHeader.vue";
import VConsole from 'vconsole'
import '@/config/api'
import '@/config/axios'
import '@/util/commFn'
import '@/util/scroll'
import store from './store/store'
Vue.component('hub-header', hubHeader)



// library.add(faSpinner, faAlignLeft)


import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
// let vConsole = new VConsole()
const Base64 = require('js-base64').Base64;

Vue.use(MintUI)
Vue.use(Navigation, { router})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
