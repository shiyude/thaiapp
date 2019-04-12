<template>
  <div class="search_good">
    <div class="search_good_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('Search')}}</div>
        </div>
      </div>
    </div>
    <div class="search_good_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="search">
        <span class="input_span">
          <i class="fas fa-search icon"></i>
          <input type="text" :placeholder="$t('pleaseenterkeyword')" v-model.trim="searchKey">
        </span>
        <span class="btn" @click="searchFun">{{$t('Search')}}</span>
      </div>
      <div class="search_result" ref="searchList">
        <loadMore :loadMoreData="loadMoreData" @loadMore="loadMore" :isTopPull="false">
          <div v-for="item in loadMoreData.lists" class="classfy_div" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="toDetail(item)">

          </div>
        </loadMore>
      </div>
    </div>
  </div>
</template>
<script>
import loadMore from "@/components/loadMore";
export default {
  name: "searchGoods",
  data() {
    return {
      searchKey: "",
      loadMoreData: {
        allLoaded: true, //是否不允许上拉加载
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      pageSize: 10,
      page: 1,
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  components: {
    loadMore
  },
  created() {
    this.$removeScrollNum("searchList");
  },
  mounted() {
    this.$KeepScrollTop(this.$refs.searchList, "searchList");
  },
  activated() {
    this.$SetScroll(this.$refs.searchList, "searchList");
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: "goodDetail",
        query: {
          id: item.id,
          name: item.goodsName
        }
      });
    },
    searchFun() {
      // if (!this.searchKey) {
      //   return;
      // }
      this.page = 1;
      this.getGoodList(true, "");
    },
    getGoodList(isLoading, type) {
      this.$Get(
        this.$api.queryGoodsList,
        {
          pageNo: this.page,
          pageSize: this.pageSize,
          searchKey: this.searchKey
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
              this.loadMoreData.lists = res.datas.lists;
            }

            let totalPage = Math.ceil(res.datas.count / this.pageSize); //总页数
            if (this.page < totalPage) {
              this.loadMoreData.allLoaded = false;
            } else if (this.page == totalPage) {
              this.loadMoreData.allLoaded = true;
            }
          } else {
            this.page--;
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
      this.getGoodList(false, 2);
    }
  }
};
</script>
<style lang="less">
.search_good {
  .search_good_header {
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
  .search_good_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    .search {
      padding: 15px;
      border-bottom: 1px solid #e1dddc;
      span {
        display: inline-block;
      }
      .input_span {
        width: 70%;
        position: relative;
        .icon {
          position: absolute;
          left: 10px;
          top: 9.5px;
          color: #e1dddc;
        }
        input {
          width: 100%;
          height: 35px;
          border: 1px solid #e1dddc;
          outline: none;
          box-sizing: border-box;
          padding: 5px 10px 5px 30px;
          font-size: 16px;
          border-radius: 4px;
          font-family: GreycliffCF-Light;
        }
      }
      .btn {
        width: 20%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin-left: 5%;
        font-size: 16px;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
        font-family: GreycliffCF-Medium;
      }
    }
    .search_result {
      position: absolute;
      top: 66px;
      bottom: 0;
      width: 100%;
      overflow-y: auto;
      .classfy_div {
        float: left;
        width: calc(50% - 22.5px);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-bottom: 50%;
        position: relative;
        border-radius: 15px;
        -webkit-box-shadow: 1px 3px 10px #eee;
        box-shadow: 1px 3px 10px #eee;
        &:nth-child(odd) {
          margin: 15px 7.5px 15px 15px;
        }
        &:nth-child(even) {
          margin: 15px 15px 15px 7.5px;
        }
      }
    }
  }
}
</style>

