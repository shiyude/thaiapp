<template>
  <div class="wishes">
    <div class="wishes_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('WishList')}}</div>
        </div>
      </div>
    </div>
    <div class="wishes_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <mt-navbar v-model="tabActive">
        <mt-tab-item id="1">{{$t('Products')}}</mt-tab-item>
        <mt-tab-item id="2">{{$t('Inspirations')}}</mt-tab-item>
      </mt-navbar>
      <div class="nav_content" v-show="tabActive==1">
        <loadMore :loadMoreData="loadMoreData" @loadMore="loadMore" :isTopPull="false">
          <div v-for="(item,k) in loadMoreData.lists" class="wishes_div" @click="toDetail(item)">
            <div class="wishes_img">
              <div :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
            </div>
            <div class="wishes_desc">
              <div class="delete" @click.stop="cancelCollect(item,k)"></div>
              <div class="price">{{$t('THB')}} {{item.price}}</div>
              <div class="name">{{item.goodsName}}</div>
              <!-- <div class="material">insert material here</div> -->
              <div class="color" v-if="item.colors&&item.colors.length">
                <div class="text">{{$t('COLOR')}}</div>
                <div class="color_list">
                  <div v-for="(val,key) in item.colors" :style="{'background-image':'url('+hostUrl+val.logo+')'}" class="active"></div>
                </div>
              </div>
              <!-- <div class="btn_div">
              <span class="btn">ADD TO CART</span>
            </div> -->
            </div>
          </div>
        </loadMore>
      </div>
      <div class="nav_content" v-show="tabActive==2">
        <loadMore :loadMoreData="findLoadMoreData" :isTopPull="false">
          <div class="find_card" v-for="(item,key) in findLoadMoreData.lists" @click="toFindDetail(item)">
            <div class="find_img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
            <div class="title_time">
              <div class="title">
                {{item.title}}
              </div>
              <div class="time">{{item.createTime}}</div>
              <div class="collect" @click.stop="cancelCollect1(item,key)"></div>
            </div>
          </div>
        </loadMore>
      </div>
    </div>
  </div>
</template>
<script>
import loadMore from "@/components/loadMore";
export default {
  name: "profile",
  data() {
    return {
      loadMoreData: {
        allLoaded: true, //是否不允许上拉加载
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      findLoadMoreData: {
        allLoaded: true, //是否不允许上拉加载
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      pageSize: 10,
      page: 1,
      hostUrl: localStorage.getItem("img_url") || "",
      tabActive: "1"
    };
  },
  components: {
    loadMore
  },
  async activated() {
    this.getGoodList(false, "", 1);
    await this.getFindLists();
    await this.getFindLists1();
  },
  methods: {
    changeDate(arr) {
      if (!arr.length) {
        return;
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].createTime = this.$dateFormat(arr[i].createTime);
        }
      }
    },
    toFindDetail(item) {
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
    cancelCollect(item, k) {//取消商品收藏
      this.$Get(
        this.$api.deleteGoodsFavorite,
        { goodsId: item.id },
        false
      ).then(res => {
        if (res.code == 0) {
          this.loadMoreData.lists.splice(k, 1);
          this.$cusToast(this.$t("Removecollection"));
        } else {
          this.$cusToast(this.$t("Removefailed"));
        }
      });
    },
    cancelCollect1(item, k) {//取消发现收藏
      this.$Get(
        this.$api.deleteDiscoveryFavorite,
        { discoveryId: item.id },
        false
      ).then(res => {
        if (res.code == 0) {
          this.findLoadMoreData.lists.splice(k, 1);
          this.$cusToast(this.$t("Removecollection"));
          let sessionIsFindCancel = sessionStorage.getItem('findCancel')||false;
          if(!sessionIsFindCancel){
            sessionStorage.setItem('findCancel',true)
          }
        } else {
          this.$cusToast(this.$t("Removefailed"));
        }
      });
    },
    toDetail(item) {
      this.$router.push({
        path: "goodDetail",
        query: {
          id: item.id,
          name: item.goodsName
        }
      });
    },
    getGoodList(isLoading, type, page) {
      this.$Get(
        this.$api.queryFavoriteGoods,
        {
          pageNo: page,
          pageSize: this.pageSize
        },
        isLoading
      )
        .then(res => {
          if (type == 2) {
            this.loadMoreData.isLoadMore = true;
          }
          if (res.code == 0) {
            if (type == 2) {
              this.loadMoreData.lists = this.loadMoreData.lists.concat(
                res.datas.lists
              );
            } else {
              this.page = 1;
              this.loadMoreData.lists = res.datas.lists;
            }

            let totalPage = Math.ceil(res.datas.count / this.pageSize); //总页数
            if (this.page < totalPage) {
              this.loadMoreData.allLoaded = false;
            } else if (this.page == totalPage) {
              this.loadMoreData.allLoaded = true;
            }
          } else {
            if (type == 2) {
              this.page--;
            }
            this.$cusToast(res.msg || "Fail");
          }
        })
        .catch(err => {
          if (type == 2) {
            this.loadMoreData.isLoadMore = true;
            this.page--;
          }
        });
    },
    loadMore() {
      this.page++;
      this.getGoodList(false, 2, this.page);
    },
    async getFindLists() {
      let res = await this.$Get(
        this.$api.queryDiscoveryList,
        {
          pageNo: 1,
          pageSize: 10000,
          type: 0,
          isfavorite: "yes"
        },
        true
      );
      if (res.code == 0) {
        this.changeDate(res.datas.lists);
        this.findLoadMoreData.lists = res.datas.lists;
        return Promise.resolve("success");
      } else {
        this.$cusToast(res.msg || "Fail");
        return Promise.reject("Fail");
      }
    },
    async getFindLists1() {
      let res = await this.$Get(
        this.$api.queryDiscoveryList,
        {
          pageNo: 1,
          pageSize: 10000,
          type: 1,
          isfavorite: "yes"
        },
        false
      );
      if (res.code == 0) {
        this.changeDate(res.datas.lists);
        this.findLoadMoreData.lists = this.findLoadMoreData.lists.concat(
          res.datas.lists
        );

        return Promise.resolve("success");
      } else {
        this.$cusToast(res.msg || "Fail");
        return Promise.reject("Fail");
      }
    }
  }
};
</script>
<style lang="less">
.wishes {
  .wishes_header {
    position: relative;
    box-sizing: border-box;
    background-color: #f7f8f8;
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
  .wishes_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .mint-navbar {
      border-bottom: 1px solid #dbdad9;
    }
    .mint-tab-item {
      font-family: GreycliffCF-Medium;
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 2px solid #216a71;
      color: #216a71;
      margin-bottom: -2px;
    }
    .nav_content {
      position: absolute;
      top: 49px;
      bottom: 0;
      width: 100%;
      overflow-y: auto;
      &:last-child{
        background: #eee;
      }
      // background-color: #f0f0f0;
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
          padding: 13px 40px 14px 16px;
          position: relative;
          .collect {
            position: absolute;
            width: 24px;
            height: 24px;
            right: 16px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            top: 50%;
            margin-top: -12px;
            background-image: url("../../../assets/images/icon/delete.png");
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
    .wishes_div {
      border-top: 1px solid #dbdad9;
      box-sizing: border-box;
      padding: 15px 20px;
      &:first-child {
        border: none;
      }
      &:last-child {
        border-bottom: 1px solid #dbdad9;
      }
      &::after {
        display: table;
        content: "";
        clear: both;
      }
      & > div {
        float: left;
      }
      .wishes_img {
        width: 45%;
        margin-right: 5%;
        div {
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          padding-bottom: 100%;
        }
      }
      .wishes_desc {
        width: 50%;
        position: relative;
        padding-right: 24px;
        box-sizing: border-box;
        .delete {
          position: absolute;
          width: 24px;
          height: 24px;
          right: 0;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url("../../../assets/images/icon/delete.png");
        }
        .price,
        .name,
        .material {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          font-size: 2vh;
          margin-top: 1%;
          font-family: GreycliffCF-Heavy;
        }
        .material {
          font-size: 2.2vh;
          margin-top: 1%;
        }
        .name {
          font-size: 2vh;
          color: #175869;
          margin-top: 4%;
          font-family: GreycliffCF-Heavy;
        }
        .color {
          margin-top: 4%;
          .text {
            font-size: 2vh;
            color: #175869;
            font-family: GreycliffCF-Heavy;
          }
          .color_list {
            &::after {
              display: table;
              content: "";
              clear: both;
            }
            div {
              float: left;
              width: 12%;
              padding-bottom: 12%;
              border-radius: 50% 50%;
              margin: 3% 5% 0 0;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              @media only screen and (min-device-width: 768px) {
                & {
                  width: 30px;
                  height: 30px;
                  padding-bottom: 0;
                }
              }
            }
          }
        }
        // .color {
        //   margin-top: 4%;
        //   display: box;
        //   display: -webkit-box;
        //   display: -webkit-flex;
        //   display: -moz-box;
        //   display: -ms-flexbox;
        //   display: flex;
        //   -webkit-box-align: center;
        //   -webkit-align-items: center;
        //   -ms-flex-align: center;
        //   align-items: center;
        //   div {
        //     &.text {
        //       float: left;
        //       font-weight: 600;
        //       font-size: 2vh;
        //       color: #175869;
        //       flex: 0 0 15vw;
        //     }
        //     &.color_list {
        //       -prefix-box-flex: 1;
        //       -webkit-box-flex: 1;
        //       -webkit-flex: 1;
        //       -moz-box-flex: 1;
        //       -ms-flex: 1;
        //       flex: 1;
        //       &::after {
        //         display: table;
        //         content: "";
        //         clear: both;
        //       }
        //       div {
        //         float: left;
        //         width: 15%;
        //         padding-bottom: 15%;
        //         border-radius: 50% 50%;
        //         margin: 3% 0 3% 3%;
        //         background-repeat: no-repeat;
        //         background-size: 100% 100%;
        //         @media only screen and (min-device-width: 768px) {
        //           & {
        //             width: 30px;
        //             height: 30px;
        //             padding-bottom: 0;
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        .btn_div {
          margin-top: 4%;
          .btn {
            font-size: 1.6vh;
            border-radius: 2vh;
            background-color: #000;
            color: #fff;
            padding: 0.6vh 2vh;
          }
        }
      }
    }
  }
}
</style>



