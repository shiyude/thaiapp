<template>
  <div class="inspirations">
    <div class="inspirations_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="title">
        {{$t('Inspirations')}}
      </div>
    </div>
    <div class="inspirations_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <mt-navbar v-model="tabActive" v-if="isShowTab">
        <mt-tab-item id="1">{{$t('Album')}}</mt-tab-item>
        <mt-tab-item id="2">{{$t('designer')}}</mt-tab-item>
      </mt-navbar>
      <div class="details" :class="{'find_content_absolute':isShowTab}">
        <!-- 专辑汇 -->
        <div class="nav_content" v-show="tabActive==1" ref="inspirations1">
          <loadMore :loadMoreData="nav1Data" @refresh="nav1Refresh">
            <div class="find_card" v-for="(item,key) in nav1Data.lists" @click="toDetail(item)">
              <div class="find_img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
              <div class="title_time">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="time">{{item.createTime}}</div>
                <div class="collect" :class="{'active':item.isfavorite>0}" @click.stop="addCollect(item)"></div>
              </div>
              <!-- <div class="praise_view">
                <div class="praise">
                  <span><i class="fas fa-thumbs-up"></i></span>
                  <span>2222222222</span>
                </div>
                <div class="view">
                  <span><i class="fas fa-eye"></i></span>
                  <span>2222222222222</span>
                </div>
              </div> -->
            </div>
          </loadMore>
        </div>
        <!-- 设计师 -->
        <div class="nav_content" v-show="tabActive==2" ref="inspirations2">
          <loadMore :loadMoreData="nav2Data" @refresh="nav2Refresh">
            <div class="find_card" v-for="(item,key) in nav2Data.lists" @click="toDetail(item)">
              <div class="find_img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
              <div class="title_time">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="time">{{item.createTime}}</div>
                <div class="collect" :class="{'active':item.isfavorite>0}" @click.stop="addCollect(item)"></div>
              </div>

            </div>
          </loadMore>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadMore from "@/components/loadMore";
export default {
  name: "inspirations",
  data() {
    return {
      tabActive: "1",
      isShowTab: false,
      nav1Data: {
        allLoaded: true,
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      nav2Data: {
        allLoaded: true,
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  components: {
    loadMore
  },
  created() {
    sessionStorage.removeItem("findCancel");
    this.$removeScrollNum("inspirations1");
    this.$removeScrollNum("inspirations2");
  },
  mounted() {
    this.$KeepScrollTop(this.$refs.inspirations1, "inspirations1");
    this.$KeepScrollTop(this.$refs.inspirations2, "inspirations2");
    this.getNav1Content(true, 1);
  },
  activated() {
    let sessionIsFindCancel = sessionStorage.getItem("findCancel") || false;
    if (sessionIsFindCancel) {
      this.$removeScrollNum("inspirations1");
      this.$removeScrollNum("inspirations2");
      sessionStorage.removeItem("findCancel");
      this.getNav1Content(true, 1);
    }
    this.$SetScroll(this.$refs.inspirations1, "inspirations1");
    this.$SetScroll(this.$refs.inspirations2, "inspirations2");
  },
  methods: {
    addCollect(item) {
      //添加和取消收藏
      if (localStorage.getItem("userInfo")) {
        if (item.isfavorite > 0) {
          //取消收藏
          this.$Get(
            this.$api.deleteDiscoveryFavorite,
            { discoveryId: item.id },
            false
          ).then(res => {
            if (res.code == 0) {
              item.isfavorite = 0;
              this.$cusToast(this.$t("Removecollection"));
            } else {
              this.$cusToast(this.$t("Removefailed"));
            }
          });
        } else {
          this.$Get(
            this.$api.addDiscoveryFavorite,
            { discoveryId: item.id },
            false
          ).then(res => {
            if (res.code == 0) {
              item.isfavorite = 1;
              this.$cusToast(this.$t("Collectionsuccess"));
            } else {
              this.$cusToast(this.$t("Collectionfailure"));
            }
          });
          //收藏
        }
      } else {
        this.$cusToast(this.$t("Please_login_first"));
        //未登入
      }
    },
    toDetail(item) {
      if (item.discoveryType == 1) {
        this.$router.push({
          path: "/iframePage",
          query: {
            url: item.url,
            title: item.title
          }
        });
        //跳转到外链
        // if (item.url) {
        //   let toUnitObj = {
        //     url: item.url
        //   };
        //   let account = JSON.stringify(toUnitObj);
        //   let str = Base64.encode(account).toString("base64");
        //   str = str.replace(/\+/g, "%2B");
        //   str = str.replace(/\=/g, "%3D");
        //   str = "uniwebview://OpenExternalLink?json=" + str;
        //   window.location.href = str;
        // }
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
    changeDate(arr) {
      if (!arr.length) {
        return;
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].createTime = this.$dateFormat(arr[i].createTime);
        }
      }
    },
    nav1Refresh() {
      if (this.isShowTab) {
        //有tab不加载第二个接口
        this.getNav1Content(false, 2);
      } else {
        //没有tab加载第二个接口
        this.getNav1Content(false, 1);
      }
    },
    nav2Refresh() {
      if (this.isShowTab) {
        //有tab不加载第一个接口
        this.getNav2Content(false, 1);
      } else {
        ////没有tab加载第一个接口
        this.getNav1Content(false, 1);
      }
    },
    getNav1Content(loading, type) {
      this.$Get(
        this.$api.queryDiscoveryList,
        {
          pageNo: 1,
          pageSize: 10000,
          type: 0
        },
        loading
      )
        .then(res => {
          this.nav1Data.isRefresh = true;
          if (res.code == 0) {
            this.nav1Data.lists = res.datas.lists;
            this.changeDate(this.nav1Data.lists);
            if (type == 1) {
              this.getNav2Content(false, 2);
            }
          }
        })
        .catch(err => {
          this.nav1Data.isRefresh = true;
        });
    },
    getNav2Content(loading, type) {
      this.$Get(
        this.$api.queryDiscoveryList,
        {
          pageNo: 1,
          pageSize: 10000,
          type: 1
        },
        loading
      )
        .then(res => {
          this.nav2Data.isRefresh = true;
          if (res.code == 0) {
            this.nav2Data.lists = res.datas.lists;
            this.changeDate(this.nav2Data.lists);
            if (type == 2) {
              if (!this.nav1Data.lists.length && !this.nav2Data.lists.length) {
                this.tabActive = "1";
              } else if (
                !this.nav1Data.lists.length &&
                this.nav2Data.lists.length
              ) {
                this.tabActive = "2";
              } else if (
                this.nav1Data.lists.length &&
                !this.nav2Data.lists.length
              ) {
                this.tabActive = "1";
              } else {
                this.tabActive = "1";
                this.isShowTab = true;
              }
            }
          }
        })
        .catch(err => {
          this.nav2Data.isRefresh = true;
        });
    }
  }
};
</script>

<style lang="less">
.inspirations {
  height: 100%;
  .inspirations_header {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #e1dddc;
    .title {
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 0;
      text-align: center;
      line-height: 40px;
      color: #000;
      font-size: 24px;
    }
  }
  .inspirations_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    .mint-tab-item {
      font-family: GreycliffCF-Medium;
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 2px solid #216a71;
      color: #216a71;
      margin-bottom: -2px;
    }
    .details {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      &.find_content_absolute {
        top: 49px;
      }
      .nav_content {
        height: 100%;
        background-color: #f0f0f0;
        overflow-y: auto;
        .find_card {
          margin: 12px;
          // border-radius: 10px;
          width: calc(100% - 24px);
          background: #fff;
          -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          .find_img {
            padding-bottom: 60%;
            width: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .title_time {
            padding: 13px 44px 14px 16px;
            position: relative;
            .collect {
              position: absolute;
              width: 28px;
              height: 28px;
              right: 16px;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              top: 50%;
              margin-top: -14px;
              background-image: url("../../../assets/images/icon/collect.png");
              &.active {
                background-image: url("../../../assets/images/icon/collectActive.png");
              }
            }
            .title {
              font-size: 2vh;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin: 2px 0;
              font-family: GreycliffCF-Regular;
            }
            .time {
              margin: 0 0 2px;
              font-size: 1.8vh;
              color: #999;
              font-family: GreycliffCF-Regular;
            }
          }
          // .praise_view{
          //     padding: 0 16px 14px 16px;
          //   &::after{
          //     content: "";
          //     display: table;
          //     clear: both
          //   }
          //   div{
          //     float: left;
          //     width:50%;
          //     overflow: hidden;
          //     text-overflow: ellipsis;
          //     white-space: nowrap
          //   }
          // }
        }
      }
    }
  }
}
</style>