<template>
  <div class="iframePage">
    <div class="iframePage_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.replace('/home')">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{title}}</div>
        </div>
      </div>
    </div>
    <div class="iframePage_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
        <iframe :src="url" frameborder="0" class="iframePage_iframe"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: "iframePage",
  data() {
    return {
      title: "",
      url: ""
    };
  },
  mounted() {
    this.url = this.$route.query.url || "";
    this.title = this.$route.query.title || "";
  }
};
</script>
<style lang="less">
.iframePage {
  .iframePage_header {
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
  .iframePage_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    // overflow-y: auto;
    .iframePage_iframe{
      height:100%;
      width:100%;
    }
  }
}
</style>


