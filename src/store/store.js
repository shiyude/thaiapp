import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let isIphoneX = localStorage.getItem('isIphoneX')||false
export default new Vuex.Store({
  state:{
    isIphoneX:isIphoneX
  },
  mutations:{
    changeIsIphoneX(state,bool){
      state.isIphoneX = bool;
      localStorage.setItem('isIphoneX',bool)
    }
  }
})