<template>
  <div class="inspirations_details">
    <div class="inspirations_details_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{title}}</div>
        </div>
      </div>
    </div>
    <div class="inspirations_details_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="content" v-html="content"></div>
      <div class="goods_list" v-if="goodList.length">
        <div class="goods_item" v-for="item in goodList" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="toDetail(item)"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inspirationsDetails",
  data() {
    return {
      title: "",
      id: "",
      content: "",
      goodList: [],
      hostUrl: localStorage.getItem("img_url") || ""
    };
  },
  mounted() {
    this.id = this.$route.query.id || "";
    this.title = this.$route.query.title || "";
    this.getDetails();
    this.getGoodList();
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
    getDetails() {
      this.$Get(this.$api.queryDiscoveryById, { discoveryId: this.id }).then(
        res => {
          if (res.code == 0) {
            this.content = Base64.decode(res.datas.content);
          } else {
            this.$cusToast(res.msg || "Fail");
          }
        }
      );
    },
    getGoodList() {
      this.$Get(
        this.$api.queryGoodsByDiscoveryId,
        {
          discoveryId: this.id,
          pageNo: 1,
          pageSize: 10000
        },
        false
      ).then(res => {
        if (res.code == 0) {
          this.goodList = res.datas.lists;
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    }
  }
};
</script>
<style lang="less">
.inspirations_details {
  .inspirations_details_header {
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
  .inspirations_details_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    .content {
      padding: 1rem;
      color: #666;
      background-color: #fff;
      font-family: GreycliffCF-Regular;

      * {
        overflow: hidden !important;
        white-space: normal !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        text-indent: 0 !important;
        word-wrap: break-word !important;
      }
      img {
        height: auto !important;
      }
    }
    .goods_list {
      &::after {
        display: table;
        content: "";
        clear: both;
      }
      border-top: 1px solid #eee;
      padding: 10px 0;
      .goods_item {
        float: left;
        width: 50%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding-bottom: 50%;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        &:nth-child(odd) {
          border-right: 1px solid #fff;
        }
      }
    }
  }
}
</style>


