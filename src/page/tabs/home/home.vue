<template>
  <div class="home">
    <div class="home_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <div class="title">
          <div class="text">{{$t('designHub')}}</div>
        </div>
        <span class="searchBtn" @click="$router.push('/searchGoods')">
          <i class="fas fa-search"></i>
        </span>
      </div>

    </div>
    <div class="swipe_div" v-if="bannerList.length!==0">
      <mt-swipe>
        <mt-swipe-item v-for="(item,k) in bannerList" :key="k">
          <div class="img" :style="{'background-image':'url('+hostUrl+item.logo+')'}">
            <!-- <div class="title">
              <p>{{item.title}}</p>
              <div>{{$t('EXPORT')}}</div>
            </div> -->
          </div>
        </mt-swipe-item>

      </mt-swipe>
      <!-- <div class="statement">insert header statement here</div>
      <div class="descript">insert the description here</div> -->
    </div>
    <div class="no_data" v-else>
      <img src="../../../assets/images/img/nodata.png" alt="">
      <p>{{$t('noData')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 800,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      bannerList: [],
      hostUrl: ""
    };
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    toDetail(item) {
      if (item.discoveryType == 1) {
      } else {
        this.$router.push({
          path: "/inspirationsDetails",
          query: {
            id: item.id,
            title: item.title
          }
        });
      }
    },
    getBanner() {
      this.$Get(this.$api.querySysConfig, {}, false).then(res => {
        if (res.code == 0) {
          let url = res.datas[0].value || "";
          url && localStorage.setItem("img_url", url);
          this.hostUrl = url;
          this.$Get(this.$api.queryHomeLogo).then(res => {
            if (res.code == 0) {
              this.bannerList = res.datas;
            } else {
              this.$cusToast(res.msg || "Fail");
            }
          });
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    }
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  .no_data {
    height: 100%;
    position: relative;
    text-align: center;
    box-sizing: border-box;
    padding: 100px;
    background: #eee;
    img {
      width: 100px;
    }
    p {
      font-size: 2vh;
      margin: 20px;
    }
  }
  .home_header {
    position: absolute;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #aeaeae;
    z-index: 2;
    .header_content {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 0;
      .searchBtn {
        position: absolute;
        right: 10px;
        height: 30px;
        width: 30px;
        top: 5px;
        line-height: 30px;
        font-size: 20px;
        color: #fff;
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
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }
  .swipe_div {
    height: 100%;
    position: relative;
    .img {
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      position: relative;
      .title {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;
        p {
          font-size: 3vh;
          color: #fff;
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        div {
          font-size: 1.8vh;
          bottom: 2vh;
          border: 1px solid #fff;
          padding: 0.8vh 1vh;
          border-radius: 2vh;
          width: 20%;
          margin: 2vh auto;
          color: #fff;
        }
      }
    }
    .statement,
    .descript {
      position: absolute;
      left: 20px;
      right: 20px;
      color: #fff;
      &.statement {
        font-size: 3vh;
        bottom: 15vh;
      }
      &.descript {
        font-size: 2.4vh;
        bottom: 10vh;
      }
    }
  }
}
</style>