<template>
  <div class="accont">
    <div class="accont_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="title">
        {{$t('MyAccount')}}
      </div>
    </div>
    <div class="accont_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="section">
        <mt-cell :title="$t('MyProfile')" is-link to="/profile">
          <img slot="icon" src="../../../assets/images/icon/user.png">
        </mt-cell>
        <!-- <mt-cell :title="$t('ShoppingCart')" is-link>
          <img slot="icon" src="../../../assets/images/icon/cart.png">
        </mt-cell> -->
        <mt-cell :title="$t('Wishlist')" is-link to="/wishes">
          <img slot="icon" src="../../../assets/images/icon/wish.png">
        </mt-cell>
        <!-- <mt-cell :title="$t('Orders')" is-link>
          <img slot="icon" src="../../../assets/images/icon/order.png">
        </mt-cell> -->
        <div @click="logout">
          <mt-cell :title="$t('LogOut')" is-link>
            <img slot="icon" src="../../../assets/images/icon/logout.png">
          </mt-cell>
        </div>

      </div>
      <div class="section">
        <mt-cell is-link to="/faq">
          <div slot="title">
            <span class="img_span"></span>{{$t('FAQ')}}</div>
        </mt-cell>
        <mt-cell is-link to="/PrivacyPolicy">
          <div slot="title">
            <span class="img_span"></span>{{$t('PrivacyPolicy')}}</div>
        </mt-cell>
        <mt-cell is-link to="/about">
          <div slot="title">
            <span class="img_span"></span>{{$t('About')}}</div>
        </mt-cell>
      </div>
      <div class="section">
        <mt-cell :title="$t('UseQRcode')" is-link to="/useQr">
          <img slot="icon" src="../../../assets/images/icon/qr.png">
        </mt-cell>
        <!-- <mt-cell :title="$t('Changeloaction')" is-link>
          <img slot="icon" src="../../../assets/images/icon/location.png">
        </mt-cell>-->
        <mt-cell :title="$t('Needhelp')"  is-link to="/needHelp">
          <img slot="icon" src="../../../assets/images/icon/help.png">
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "accont",
  data() {
    return {};
  },
  methods: {
    logout() {
      MessageBox.confirm(this.$t("surelogout"), {
        confirmButtonText: this.$t("Sure"),
        cancelButtonText: this.$t("Cancel")
      }).then(action => {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.replace("/");
        window.location.href = "uniwebview://logout";
      });
    }
  }
};
</script>

<style lang="less">
.accont {
  height: 100%;
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(top, #115c81, #3babb6);
  /* Safari 4-5, Chrome 1-9 */
  background: -webkit-gradient(linear, top, from(#115c81), to(#3babb6));
  /* Safari 5.1+, Chrome 10+ */
  background: -webkit-linear-gradient(top, #115c81, #3babb6);
  /* Opera 11.10+ */
  background: -o-linear-gradient(top, #115c81, #3babb6);
  /* default */
  background: linear-gradient(top, #115c81, #3babb6);
  background-color: #115c81;
  .accont_header {
    position: relative;
    box-sizing: border-box;
    .title {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 0;
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 24px;
     
    }
  }
  .accont_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .section {
      margin-bottom: 2vh;
      .mint-cell-wrapper {
        border-bottom: 1px solid #dbdad9;
        .mint-cell-title {
          font-family: GreycliffCF-Light;
          .img_span {
            display: inline-block;
          }
          img,
          .img_span {
            margin-right: 2vh;
            height: 20px;
            width: 20px;
          }
        }
      }
    }
  }
}
</style>