<template>
  <div class="firstClassify">
    <div class="firstClassify_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('FURNITRUE')}}</div>
        </div>
        <span class="searchBtn" @click="$router.push('/searchGoods')">
          <i class="fas fa-search"></i>
        </span>
      </div>

    </div>
    <div class="firstClassify_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <loadMore :loadMoreData="loadMoreData" @refresh="getClassifyList(false)">
        <div v-for="item in loadMoreData.lists" class="classfy_div" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="toGoodList(item)">
          <div class="title">{{item.spaceName}}</div>
          <div class="btn">{{$t('EXPORT')}}</div>
        </div>
      </loadMore>
    </div>

  </div>
</template>
<script>
import loadMore from "@/components/loadMore";
export default {
  name: "firstClassify",
  data() {
    return {
      loadMoreData: {
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
  mounted() {
    this.getClassifyList(true);
  },
  methods: {
    toGoodList(item) {
      this.$router.push({
        path: "/twoClassify",
        query: {
          id: item.id,
          name: item.spaceName
        }
      });
    },
    getClassifyList(isLoading) {
      this.$Get(this.$api.queryGoodsSpace, { isFurniture: 1 }, isLoading)
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
.firstClassify {
  .firstClassify_header {
    position: relative;
    background-color: #fff;
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
  .firstClassify_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .classfy_div {
      float: left;
      width: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #fff;
      padding-bottom: 50%;
      &:nth-child(odd) {
        border-right: 1px solid #fff;
      }
      div {
        position: absolute;
        left: 4vw;
        &.title {
          font-size: 2.8vh;
          color: #000;
          top: 3vh;
          font-family: GreycliffCF-Bold;
          right: 4vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.btn {
          font-size: 1.6vh;
          bottom: 2vh;
          border-radius: 2vh;
          background-color: #000;
          color: #fff;
          padding: 0.5vh 1vh;
          font-family: GreycliffCF-Medium;
        }
      }
    }
  }
}
</style>
