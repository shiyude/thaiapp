<template>
  <div class="goodsList">
    <div class="goodsList_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
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
    <div class="goodsList_content common_content" ref="goodsList" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <loadMore :loadMoreData="loadMoreData" @refresh="refresh" @loadMore="loadMore">
        <div v-for="item in loadMoreData.lists" class="classfy_div" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="toDetail(item)">

        </div>
      </loadMore>
    </div>

  </div>
</template>
<script>
import loadMore from "@/components/loadMore";
export default {
  name: "goodsList",
  data() {
    return {
      loadMoreData: {
        allLoaded: true, //是否不允许上拉加载
        lists: [],
        isRefresh: false, //是否刷新完成
        isLoadMore: false //是否加载完成
      },
      id: "",
      name: "",
      pageSize: 10,
      page: 1,
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  components: {
    loadMore
  },
  created() {
    this.$removeScrollNum("goodsList");
  },
  mounted() {
    this.$KeepScrollTop(this.$refs.goodsList, "goodsList");
    this.id = this.$route.query.id || "";
    this.name = this.$route.query.name || "";
    this.getGoodList(true, "", 1);
  },
  activated() {
    this.$SetScroll(this.$refs.goodsList, "goodsList");
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
    getGoodList(isLoading, type, page) {
      this.$Get(
        this.$api.queryGoodsList,
        {
          pageNo: page,
          pageSize: this.pageSize,
          categoryId: this.id
        },
        isLoading
      )
        .then(res => {
          if (type == 1) {
            this.loadMoreData.isRefresh = true;
          } else if (type == 2) {
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
          if (type == 1) {
            this.loadMoreData.isRefresh = true;
          } else if (type == 2) {
            this.loadMoreData.isLoadMore = true;
            this.page--;
          }
        });
    },
    refresh() {
      this.getGoodList(false, 1, 1);
    },
    loadMore() {
      this.page++;
      this.getGoodList(false, 2, this.page);
    }
  }
};
</script>

<style lang="less">
.goodsList {
  .goodsList_header {
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
  .goodsList_content {
    position: absolute;
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
</style>
