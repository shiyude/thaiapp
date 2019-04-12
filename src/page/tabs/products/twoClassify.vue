<template>
  <div class="twoClassify">
    <div class="twoClassify_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{name}}</div>
        </div>
        <span class="searchBtn" @click="$router.push('/searchGoods')">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <div class="twoClassify_content common_content" ref="twoClassify" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <loadMore :loadMoreData="loadMoreData" @refresh="getClassifyList(false)">
        <div v-for="(item,k) in loadMoreData.lists" class="classfy_div" @click="toGoodList(item)">
          <template v-if="k==0">
            <p class="top_img" :style="{'background-image':'url('+hostUrl+item.logo+')'}">
              <span class="title">{{item.categoryName}}</span>
              <span class="text">{{item.description}}</span>
            </p>
          </template>
          <template v-else-if="k%2==1">
            <div class="img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
            <div class="desc">
              <div class="title">{{item.categoryName}}</div>
              <div class="text">{{item.description}}</div>
              <div class="btn">{{$t('SeeAll')}}</div>
            </div>
          </template>
          <template v-else>
            <div class="desc">
              <div class="title">{{item.categoryName}}</div>
              <div class="text">{{item.description}}</div>
              <div class="btn">{{$t('SeeAll')}}</div>
            </div>
            <div class="img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
          </template>
        </div>
      </loadMore>
    </div>

  </div>
</template>
<script>
import loadMore from "@/components/loadMore";
export default {
  name: "twoClassify",
  data() {
    return {
      loadMoreData: {
        allLoaded: true,
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      hostUrl: localStorage.getItem("img_url") || "",
      id: "",
      name: ""
    };
  },
  components: {
    loadMore
  },
  created() {
    this.$removeScrollNum("twoClassify");
  },
  mounted() {
    this.$KeepScrollTop(this.$refs.twoClassify, "twoClassify");
    this.id = this.$route.query.id || "";
    this.name = this.$route.query.name || "";
    this.getClassifyList(true);
  },
  activated() {
    this.$SetScroll(this.$refs.twoClassify, "twoClassify");
  },
  methods: {
    toGoodList(item) {
      this.$router.push({
        path: "/goodsList",
        query: {
          id: item.id,
          name: item.categoryName
        }
      });
    },
    getClassifyList(isLoading) {
      this.$Get(this.$api.queryGoodsCategory, { spaceId: this.id }, isLoading)
        .then(res => {
          this.loadMoreData.isRefresh = true;
          if (res.code == 0) {
            this.loadMoreData.lists = res.datas;
          } else {
            this.$cusToast(res.msg || "Fail");
          }
        })
        .catch(err => {
          this.loadMoreData.isRefresh = true;
        });
    }
  }
};
</script>

<style lang="less">
.twoClassify {
  .twoClassify_header {
    position: relative;
    background-color: #e9e9ed;
    box-sizing: border-box;
    border-bottom: 1px solid #e1dddc;
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
        color: #000;
      }
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
  .twoClassify_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .classfy_div {
      &::after {
        display: table;
        content: "";
        clear: both;
      }
      .top_img {
        background-size: cover;
        padding-bottom: 60%;
        position: relative;
        background-repeat: no-repeat;
        span {
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 1vh;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &.title {
            bottom: 35%;
            font-size: 2.6vh;
            font-family: GreycliffCF-Regular;
          }
          &.text {
            font-size: 2.2vh;
            bottom: 20%;
            font-family: GreycliffCF-Regular;
          }
        }
      }
      & > div {
        float: left;
        width: 50%;
        padding-bottom: 50%;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        &:nth-child(odd) {
          border-right: 1px solid #fff;
        }
        &.img {
          background-size: cover;
          background-repeat: no-repeat;
        }
        &.desc {
          background-color: #dddedf;
          div {
            position: absolute;
            left: 6%;
          }
          .title {
            font-size: 2.2vh;
            color: #000;
            top: 15%;
            right: 2vh;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: GreycliffCF-Bold;
          }
          .text {
            font-size: 1.8vh;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            top: 30%;
            right: 2vh;
            font-family: GreycliffCF-Regular;
          }
          .btn {
            font-size: 12px;
            border-radius: 2vh;
            background-color: #000;
            color: #fff;
            bottom: 10%;
            width: 80px;
            padding: 4px 0;
            text-align: center;
            font-family: GreycliffCF-Medium;
          }
        }
      }
    }
  }
}
</style>
