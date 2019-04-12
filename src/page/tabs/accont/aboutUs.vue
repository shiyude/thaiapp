<template>
  <div class="about_us">
    <div class="about_us_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('about')}}</div>
        </div>
      </div>
    </div>
    <div class="about_us_content common_content" v-if="JSON.stringify(companyData)!=='{}'" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="about_card">
        <div class="logo">
          <div class="company_logo" :style="{'background-image':'url('+hostUrl+companyData.imgs+')'}"></div>
        </div>
        <div class="company_text">
          {{companyData.description}}
        </div>
        <div class="company_desc">
          <mt-cell :title="companyData.contactName">
            <span slot="icon" class="icon_span">
              <i class="fas fa-user"></i>
            </span>
          </mt-cell>
          <mt-cell :title="companyData.contactPhone">
            <span slot="icon" class="icon_span">
              <i class="fas fa-mobile-alt"></i>
            </span>
          </mt-cell>
          <mt-cell :title="companyData.contactEmail">
            <span slot="icon" class="icon_span">
              <i class="fas fa-envelope"></i>
            </span>
          </mt-cell>
          <mt-cell :title="companyData.contactAddr">
            <span slot="icon" class="icon_span">
              <i class="fas fa-map-marker"></i>
            </span>
          </mt-cell>
        </div>
        <div class="btn_div">
          <div class="btn" @click="goContactUs">{{$t('concatUs')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      companyData: {},
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  mounted() {
    this.getCompanyData();
  },
  methods: {
    goContactUs() {
      window.location.href =
        "uniwebview://contact?phone=" + this.companyData.contactPhone;
    },
    getCompanyData() {
      this.$Get(this.$api.queryCompany, {}).then(res => {
        if (res.code == 0) {
          this.companyData = res.datas;
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    }
  }
};
</script>
<style lang="less">
.about_us {
  .about_us_header {
    position: relative;
    background-color: #e9e9ed;
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
  .about_us_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    background-color: #f0f0f0;
    .about_card {
      border-radius: 2px;
      margin: 12px;
      background: #fff;
      box-sizing: border-box;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      .logo {
        padding: 1.5vh 1.5vh 0 1.5vh;
        .company_logo {
          width: 100%;
          padding-bottom: 50%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-radius: 2vh;
        }
      }
      .company_text {
        padding: 13px 16px 14px;
        font-size: 2vh;
        line-height: 3vh;
        font-family: GreycliffCF-Regular;
      }
      .company_desc {
        .mint-cell-wrapper {
          .mint-cell-title {
            position: relative;
            .icon_span {
              font-size: 20px;
              display: inline-block;
              width: 40px;
              vertical-align: middle;
              text-align: center;
            }
          }
          .mint-cell-text {
            width: calc(100% - 50px);
            display: inline-block;
            word-break: break-all;
            line-height: 3vh;
            font-family: GreycliffCF-Regular;
          }
        }
      }
      .btn_div {
        padding: 16px;
        .btn {
          color: #fff;
          background-color: #000;
          border-radius: 4px;
          text-align: center;
          padding: 1.5vh;
          font-family: GreycliffCF-Medium;
        }
      }
    }
  }
}
</style>


