<template>
  <div class="loadMore_wrapper" ref="loadMoreWrapper">
    <mt-loadmore :topDistance="50" :bottomDistance="50" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="loadMoreData.allLoaded" ref="loadmore" :auto-fill="false" style="min-height:100%" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
      <div class="lodamore_div" v-if="loadMoreData.lists.length || !isShowNoData">
        <slot></slot>
      </div>
      <div class="no_data" v-if="!loadMoreData.lists.length&&isShowNoData" :style="{'height':noDataHeight+'px'}">
        <img src="../assets/images/img/nodata.png" alt="">
        <p>No Data</p>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <mt-spinner v-show="topStatus == 'loading'&&isTopPull" color="#000" type="fading-circle"></mt-spinner>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <mt-spinner v-show="bottomStatus == 'loading'" type="fading-circle" color="#000"></mt-spinner>
      </div>
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  name: "loadMore",
  props: {
    loadMoreData: {
      type: Object
    },
    isShowNoData: {
      //没有数据时是否显示no data
      type: Boolean,
      default: true
    },
    isTopPull: {
      //是否允许下拉刷新
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      topStatus: "",
      bottomStatus: "",
      noDataHeight: 0
    };
  },
  mounted() {
      this.noDataHeight = this.$refs["loadMoreWrapper"].clientHeight;

  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      if (!this.isTopPull) {
        this.$refs.loadmore.onTopLoaded();
        return;
      }
      this.handleTopChange("loading");
      this.loadMoreData.isRefresh = false;
      this.$emit("refresh");
    },
    loadBottom() {
      this.handleBottomChange("loading");
      this.loadMoreData.isLoadMore = false;
      this.$emit("loadMore");
    }
  },
  watch: {
    "loadMoreData.isRefresh"(now) {
      if (now) {
        this.handleTopChange("loadingEnd");
        this.$refs.loadmore.onTopLoaded();
      }
    },
    "loadMoreData.isLoadMore"(now) {
      if (now) {
        this.handleBottomChange("loadingEnd");
        this.$refs.loadmore.onBottomLoaded();
      }
    }
  }
};
</script>
<style lang="less">
.loadMore_wrapper {
  height: 100%;
  .lodamore_div {
    &::after {
      display: table;
      content: "";
      clear: both;
    }
  }
  .mint-loadmore-top,
  .mint-loadmore-bottom {
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .no_data {
    text-align: center;
    box-sizing: border-box;
    padding: 100px;
    background: #eee;
    font-family: GreycliffCF-Medium;
    img {
      width: 100px;
    }
    p {
      font-size: 2vh;
      margin: 20px;
    }
  }
}
</style>


