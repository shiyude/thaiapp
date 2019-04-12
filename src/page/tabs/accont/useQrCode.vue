<template>
  <div class="useQr">
    <div class="useQr_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('UseQRcode')}}</div>
        </div>
      </div>
    </div>
    <div class="useQr_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="useQr_card">
        <div>
          <p>1、{{$t('help_1')}}</p>
          <p>{{$t('help_1_1')}}</p>
        </div>
        <img src="../../../assets/images/img/ar_match.png" alt="">
      </div>
      <div class="useQr_card">
        <div>
          <p>2、{{$t('help_2')}}</p>
          <p>{{$t('help_2_1')}}</p>
        </div>
        <img src="../../../assets/images/img/ar.jpg" alt="">
      </div>
      <div class="useQr_card">
        <div>
          <p>3、{{$t('help_3')}}</p>
          <p>{{$t('help_3_1')}}</p>
        </div>
        <img src="../../../assets/images/img/diy.jpg" alt="">
      </div>
      <div class="useQr_card">
        <div>
          <p>4、{{$t('help_4')}}</p>
          <p>{{$t('help_4_1')}}</p>
        </div>
        <img src="../../../assets/images/img/ar_scan.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "useQr"
};
</script>
<style lang="less">
.useQr {
  .useQr_header {
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
  .useQr_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    background-color: #f0f0f0;
    .useQr_card {
      border-radius: 2vh;
      margin: 12px;
      width: calc(100% - 24px);
      background: #fff;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      div {
        padding: 13px 16px 14px;
        p {
          margin: 0 0 2px;
          &:first-child {
            padding: 8px 0;
            color: #216a71;
            font-size: 2.2vh;
            font-family: GreycliffCF-Medium;
          }
          &:last-child {
            color: #666;
            font-size: 1.8vh;
            font-family: GreycliffCF-Light;
          }
        }
      }

      img {
        display: block;
        width: 100%;
        border-bottom-left-radius: 2vh;
        border-bottom-right-radius: 2vh;
      }
    }
  }
}
</style>


