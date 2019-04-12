<template>
  <div class="HubIndex " :class="$store.state.isIphoneX&&'iphoneX'">
    <!-- <hub-header :titleText="$t('designHub')"></hub-header> -->
    <div class="IndexContenr">
      <keep-alive>
        <component ref="componentDom" :is="view"></component>
      </keep-alive>
    </div>
    <div class="IndexTabbar">
      <mt-tabbar v-model="selected">
        <!-- <mt-tab-item id="aboutUs">
          <i class="fas fa-file-invoice tabbarIcon" slot="icon"></i>
          {{$t('aboutUs')}}
        </mt-tab-item> -->
        <mt-tab-item id="home">
          <!-- <img slot="icon" v-if="view == 'home'" src="../../assets/images/icon/homeActive.png">
          <img slot="icon" v-else src="../../assets/images/icon/home.png">  -->
          <i class="fas fa-home tabbarIcon" slot="icon"></i>
          {{$t('home')}}
        </mt-tab-item>
        <mt-tab-item id="products">
          <!-- <img slot="icon" v-if="view == 'products'" src="../../assets/images/icon/productActive.png">
          <img slot="icon" v-else src="../../assets/images/icon/product.png">  -->
          <i class="fas fa-box-open tabbarIcon" slot="icon"></i>
          {{$t('Products')}}
        </mt-tab-item>
        <mt-tab-item id="ar">
          <!-- <img slot="icon" v-if="view == 'products'" src="../../assets/images/icon/productActive.png">
          <img slot="icon" v-else src="../../assets/images/icon/product.png">  -->
          <img src="../../assets/images/icon/AR.png" slot="icon">
          <span style="color:#000"> {{$t('AR')}}</span>
        </mt-tab-item>
        <mt-tab-item id="inspirations">
          <!-- <img slot="icon" v-if="view == 'inspirations'" src="../../assets/images/icon/insActive.png">
          <img slot="icon" v-else src="../../assets/images/icon/ins.png">  -->
          <i class="fas fa-sun tabbarIcon" slot="icon"></i>
          {{$t('Inspirations')}}
        </mt-tab-item>
        <mt-tab-item id="accont">
          <!-- <img slot="icon" v-if="view == 'accont'" src="../../assets/images/icon/accountActive.png">
          <img slot="icon" v-else src="../../assets/images/icon/account.png">  -->
          <i class="fas fa-user tabbarIcon" slot="icon"></i>
          {{$t('MyAccount')}}
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import { companyConfig } from "../../config/company.config";
export default {
  name: "HubIndex",
  components: {
    products: () => import("@/page/tabs/products/products"),
    inspirations: () => import("@/page/tabs/inspirations/inspirations"),
    accont: () => import("@/page/tabs/accont/accont"),
    aboutUs: () => import("@/page/tabs/aboutUs/aboutUs"),
    home: () => import("@/page/tabs/home/home")
  },
  data() {
    return {
      view: "home",
      selected: "home"
    };
  },
  created() {
    if (sessionStorage.getItem("tab")) {
      this.selected = sessionStorage.getItem("tab");
    }
  },
  watch: {
    selected(val, old) {
      if (val == "ar") {
        this.selected = old;
        let toUnitObj = {
          lang: "en_US",
          country: "1",
          sign: this.$cusMd5(companyConfig.idToken),
          companyId: companyConfig.id
        };
        let account = JSON.stringify(toUnitObj);
        let str = Base64.encode(account).toString("base64");
        str = str.replace(/\+/g, "%2B");
        str = str.replace(/\=/g, "%3D");
        str = "uniwebview://match?json=" + str;
        window.location.href = str;
        return;
      }
      this.view = val;
      sessionStorage.setItem("tab", val);
    }
  },
  methods: {}
};
</script>

<style lang="less">
.HubIndex {
  &.iphoneX {
    height: calc(100% - 32px);
    &::after {
      position: absolute;
      content: "";
      display: block;
      bottom: -32px;
      height: 32px;
      width: 100%;
      background-color: #fafafa;
    }
  }
  .IndexContenr {
    position: absolute;
    top: 0;
    bottom: 55px;
    left: 0;
    right: 0;
  }
  .IndexTabbar {
    .mint-tab-item-label{
         font-family: GreycliffCF-Regular;
    }
    .mint-tabbar {
      .mint-tab-item {
        &.is-selected {
          color: #216a71;
          background-color: transparent;
        }
      }
    }
    .mint-tab-item-icon {
      .tabbarIcon {
        font-size: 24px;
      }
    }
  }
}
</style>
