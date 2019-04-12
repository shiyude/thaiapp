<template>
  <div class="products">
    <div class="products_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <div class="title">
          <div class="text"> {{$t('Products')}}</div>
        </div>
        <span class="searchBtn" @click="$router.push('/searchGoods')">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <div class="product_content common_content" ref="product" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <loadMore :loadMoreData="loadMoreData" @refresh="getClassifyList(false)" :isShowNoData="false">
        <div class="classfy_div fixed_div" @click="toFirstClassify">
          <div class="title">{{$t('FURNITRUE')}}</div>
          <div class="btn">{{$t('EXPORT')}}</div>
        </div>
        <div v-for="item in loadMoreData.lists" class="classfy_div" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="toTwoClassify(item)">
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
  name: "products",
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
  created() {
    this.$removeScrollNum("product");
  },
  mounted() {
    this.$KeepScrollTop(this.$refs.product, "product");
    this.getClassifyList(true);
  },
  activated() {
    this.$SetScroll(this.$refs.product, "product");
  },
  methods: {
    getClassifyList(isLoading) {
      this.$Get(this.$api.queryGoodsSpace, { isFurniture: 0 }, isLoading)
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
    },
    toTwoClassify(item) {
      this.$router.push({
        path: "/twoClassify",
        query: {
          id: item.id,
          name: item.spaceName
        }
      });
    },
    toFirstClassify() {
      this.$router.push("/firstClassify");
    }
  }
};
</script>

<style lang="less">
.products {
  height: 100%;
  .products_header {
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
  .product_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .classfy_div {
      margin: 15px;
      background-repeat: no-repeat;
      background-size: cover;
      padding-bottom: 45%;
      border-radius: 15px;
      box-shadow: 1px 3px 10px #eee;
      position: relative;
      background-position:center;
      &.fixed_div {
        background-image: url("../../../assets/images/img/product.jpeg");
      }
      &:last-child {
        margin-bottom: 10px;
      }
      div {
        position: absolute;
        color: #fff;
        left: 4vw;
        &.title {
          font-size: 2.8vh;
          bottom: 7vh;
          font-family: GreycliffCF-Bold;
          right: 4vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.btn {
          font-size: 1.6vh;
          bottom: 2vh;
          border: 1px solid #fff;
          padding: 0.8vh 1vh;
          border-radius: 2vh;
          font-family: GreycliffCF-Medium;
        }
      }
    }
  }
}
</style>
