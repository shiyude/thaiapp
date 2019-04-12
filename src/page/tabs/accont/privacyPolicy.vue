<template>
  <div class="PrivacyPolicy">
    <div class="PrivacyPolicy_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('PrivacyPolicy')}}</div>
        </div>
      </div>
    </div>
    <div class="PrivacyPolicy_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {
      content: "",
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  mounted() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      this.$Get(this.$api.queryExtend, { type: 3 }).then(res => {
        if (res.code == 0) {
          this.content = Base64.decode(res.datas.content);
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    }
  }
};
</script>
<style lang="less">
.PrivacyPolicy {
  .PrivacyPolicy_header {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #e1dddc;
    .header_content {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 0;
      .backBtn {
        position: absolute;
        left: 10px;
        height: 30px;
        width: 30px;
        top: 5px;
        line-height: 30px;
        font-size: 22px;
        color: #000;
      }
      .title {
        width: 60%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        margin: 0 auto;
        .text {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000;
          font-size: 24px;
        }
      }
    }
  }
  .PrivacyPolicy_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    // padding: 20px;
    // box-sizing: border-box;
    font-size: 2.2vh;
    .content {
      padding: 2vh;
      color: #666;
      background-color: #fff;
      font-family: GreycliffCF-Regular;
      * {
        overflow: hidden !important;
        white-space: normal !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        text-indent: 0 !important;
        word-wrap: break-word !important;
      }
      img {
        height: auto !important;
      }
    }
  }
}
</style>


