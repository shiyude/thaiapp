<template>
  <div class="goodDetail">
    <div class="goodDetail_header common_header" :style="{'background':isWhite?'#fff':'transparent'}" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{name}}</div>
        </div>
      </div>
    </div>
    <div class="goodDetail_wrapper" ref="goodWrapper">
      <div class="goodDetail_banner" v-if="color.length">
        <mt-swipe>
          <mt-swipe-item v-for="(item,key) in bannerList" :key="item">
            <div class="img" :style="{'background-image':'url('+hostUrl+item+')'}"></div>
          </mt-swipe-item>
        </mt-swipe>
        <div class="collect" :class="{'active':isCollected}" @click="addCollect"></div>
        <div class="is3d" @click="goUnity" v-if="is3d"></div>
      </div>
      <div class="goodDetail_content" :style="{'padding-top':!color.length?'70px':'10px'}">
        <div class="material">
          <div class="title">{{$t('MATERIAL')}}</div>
          <div class="material_ul" v-if="materialData.length">
            <div class="material_li" v-for="(item,k) in materialData" :class="{'active':initMaterial==k}" @click="changeMaterial(k)">
              <div class="material_img" :style="{'background-image':'url('+hostUrl+item.logo+')'}"></div>
              <div class="material_desc">{{item.title}}</div>
            </div>
          </div>
        </div>
        <div class="color" v-if="color.length">
          <div class="title">{{$t('COLOR')}}</div>
          <div class="color_select">
            <div v-for="(item,key) in color" :style="{'background-image':'url('+hostUrl+item.logo+')'}" @click="changeColor(key)" :class="{'active':initColor==key}">
              <div class="active_div"></div>
            </div>
          </div>
        </div>
        <div class="price">
          <div class="title">{{$t('PRICE')}}</div>
          <div class="text">{{$t('THB')}} {{details.price}}</div>
          <div class="text" v-if="details.price!=undefined">{{$t('USD')}} {{usd}}</div>
        </div>
        <div class="attr" v-if="properties.length">
          <div class="title">{{$t('attribute')}}</div>
          <div class="lists">
            <div class="item" v-for="(item,k) in properties">
              <div class="name">{{item.propertyName}}</div>
              <div class="value">{{item.propertyValue}}</div>
            </div>
          </div>
        </div>
        <div class="goods_desc" v-if="details.detail&&details.detail.length">
          <div class="title" style="padding: 0 20px">{{$t('PRODUCTDETAIL')}}</div>
          <div class="desc_text">
            <img v-for="(item,k) in details.detail" :src="hostUrl+item">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { companyConfig } from "../../config/company.config";
export default {
  name: "goodDetail",
  data() {
    return {
      color: [],
      bannerList: [],
      hostUrl: localStorage.getItem("img_url") || "",
      initColor: 0,
      isWhite: true,
      id: "",
      name: "",
      isCollected: false,
      details: {},
      properties: [],
      is3d: false,
      exchange: 0,
      usd: 0,
      materialData: [],
      initMaterial: 0
    };
  },
  mounted() {
    this.id = this.$route.query.id || "";
    this.name = this.$route.query.name || "";
    let self = this;
    this.getDetails();
    this.queryGoodsMaterail();
    this.getIsCollect();
    let goodWrapper = this.$refs.goodWrapper;

    goodWrapper.addEventListener("scroll", function() {
      let scroll = goodWrapper.scrollTop;
      if (scroll > 350) {
        self.isWhite = true;
      } else {
        if (self.color.length) {
          self.isWhite = false;
        }
      }
    });
  },
  methods: {
    changeMaterial(k) {
      this.initMaterial = k;
      this.color = this.materialData[k].material;
      this.changeColor(0);
    },
    goUnity() {
      // 去3D
      let self = this;
      let toUnitObj = {
        lang: "en_US",
        country: "1",
        sign: self.$cusMd5(companyConfig.idToken),
        companyId: companyConfig.id,
        ...self.details,
        isEnshrine:
          self.isCollected == undefined ? "false" : self.isCollected.toString()
      };
      let account = JSON.stringify(toUnitObj);
      let str = Base64.encode(account).toString("base64");
      str = str.replace(/\+/g, "%2B");
      str = str.replace(/\=/g, "%3D");
      str = "uniwebview://model?json=" + str;
      window.location.href = str;
    },
    getIsCollect() {
      // 获取是否收藏
      if (localStorage.getItem("userInfo")) {
        this.$Get(this.$api.isFavoriteGoods, { goodsId: this.id }, false).then(
          res => {
            if (res.code == 0) {
              if (res.datas.num < 1) {
                this.isCollected = false;
              } else {
                this.isCollected = true;
              }
            }
          }
        );
      }
    },
    addCollect() {
      //添加和取消收藏
      if (localStorage.getItem("userInfo")) {
        if (this.isCollected) {
          //取消收藏
          this.$Get(
            this.$api.deleteGoodsFavorite,
            { goodsId: this.id },
            false
          ).then(res => {
            if (res.code == 0) {
              this.isCollected = false;
              this.$cusToast(this.$t("Removecollection"));
            } else {
              this.$cusToast(this.$t("Removefailed"));
            }
          });
        } else {
          this.$Get(
            this.$api.addGoodsFavorite,
            { goodsId: this.id },
            false
          ).then(res => {
            if (res.code == 0) {
              this.isCollected = true;
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
    changeColor(key) {
      this.initColor = key;
      if (this.color.length) {
        this.bannerList = this.color[key].imgs;
      }
    },
    getDetails() {
      this.$Get(this.$api.queryExchange).then(res => {
        if (res.code == 0) {
          this.exchange = res.datas.exchange || 0;
          this.$Get(
            this.$api.queryGoodsById,
            {
              goodsId: this.id
            },
            false
          ).then(res => {
            if (res.code == 0) {
              let propertiesArr = [];
              let detailImg = res.datas.goodsmap.detail;
              this.details = res.datas.goodsmap;
              this.details.detail = detailImg ? detailImg.split(",") : [];
              if (this.details.goodsSize) {
                propertiesArr.push({
                  propertyName: "Size",
                  propertyValue: this.details.goodsSize
                });
              }
              this.properties = propertiesArr.concat(res.datas.properties);
              if (this.details.price == "") {
                this.details.price = 0;
              }
              this.usd = Math.ceil(this.details.price * this.exchange);

              if (this.details.is3d == 0) {
                this.is3d = true;
              }
            } else {
              this.$cusToast(res.msg || "Fail");
            }
          });
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    },
    queryGoodsMaterail() {
      this.$Get(
        this.$api.queryGoodsMaterail,
        {
          goodsId: this.id
        },
        true
      ).then(res => {
        if (res.code == 0) {
          this.materialData = res.datas;
          if (this.materialData.length) {
            this.isWhite = false;
            this.changeMaterial(0);
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
.goodDetail {
  .goodDetail_header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
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
  .goodDetail_wrapper {
    height: 100%;
    overflow: auto;
    background-color: #eff0f1;
    .goodDetail_banner {
      height: 350px;
      position: relative;
      .mint-swipe-indicator {
        border-radius: 0;
        width: 20px;
        height: 4px;
        background-color: #888887;
        opacity: 0.6;
        &.is-active {
          background-color: #000;
        }
      }

      .img {
        height: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
      .collect,
      .is3d {
        position: absolute;
        width: 32px;
        height: 32px;
        right: 20px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.collect {
          bottom: 30px;
          background-image: url("../../assets/images/icon/collect.png");
          &.active {
            background-image: url("../../assets/images/icon/collectActive.png");
          }
        }
        &.is3d {
          bottom: 70px;
          background-image: url("../../assets/images/icon/3d.png");
        }
      }
    }
    .goodDetail_content {
      padding: 10px 0;
      box-sizing: border-box;
      .material {
        padding: 0 20px;
        .title {
          color: #175869;
          font-size: 1.8vh;
          margin-bottom: 2vh;
          font-family: GreycliffCF-Heavy;
        }
        .material_ul {
          margin-bottom: 10px;
          &::after {
            display: table;
            content: "";
            clear: both;
          }
          .material_li {
            float: left;
            width: calc(50% - 10px);
            border: 1px solid #e1dddc;
            box-sizing: border-box;
            margin-bottom: 10px;
            &.active {
              border: 1px solid #175869;
            }
            &::after {
              display: table;
              content: "";
              clear: both;
            }
            &:nth-child(odd) {
              margin-right: 10px;
            }
            &:nth-child(even) {
              margin-left: 10px;
            }
            & > div {
              float: left;
              &.material_img {
                width: 4vh;
                height: 4vh;
              }
              &.material_desc {
                width: calc(96% - 4vh);
                height: 4vh;
                line-height: 4vh;
                text-align: center;
                padding: 0 2%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                font-family: GreycliffCF-Regular;
                font-size: 1.8vh;
              }
            }
          }
        }
      }
      .color {
        padding: 0 20px;
        .title {
          color: #175869;
          font-size: 1.8vh;
          font-family: GreycliffCF-Heavy;
          margin-bottom: 1vh;
        }
        .color_select {
          &::after {
            display: table;
            content: "";
            clear: both;
          }
          & > div {
            width: 3.2vh;
            float: left;
            margin: 0 10px 2vh 10px;
            height: 3.2vh;
            border-radius: 50% 50%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
            &.active {
              .active_div {
                position: absolute;
                width: 1vh;
                height: 1vh;
                bottom: -1.3vh;
                background-color: #175869;
                border-radius: 50% 50%;
                left: 50%;
                margin-left: -0.5vh;
              }
            }
          }
        }
      }
      .price {
        padding: 2vh 20px;
        .title {
          color: #175869;
          font-size: 1.8vh;
          font-family: GreycliffCF-Heavy;
        }
        .text {
          margin-top: 1vh;
          font-size: 1.8vh;
          word-break: break-all;
          font-family: GreycliffCF-Heavy;
        }
      }
      .attr {
        margin-bottom: 4vh;
        padding: 0 20px;
        .title {
          color: #175869;
          font-size: 1.8vh;
          margin-bottom: 2vh;
          font-family: GreycliffCF-Heavy;
        }
        .lists {
          .item {
            &::after {
              content: "";
              display: table;
              clear: both;
            }
            &:first-child {
              border-top: 1px solid #e1dddc;
            }
            border-bottom: 1px solid #e1dddc;
            div {
              float: left;
              width: 50%;
              padding: 2vh 0;
              font-size: 2.2vh;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              padding: 2vh 1vh;
              box-sizing: border-box;
              font-family: GreycliffCF-Medium;
            }
          }
        }
      }
      .goods_desc {
        .title {
          color: #175869;
          font-size: 1.8vh;
          font-family: GreycliffCF-Heavy;
        }
        .desc_title {
          font-size: 2.2vh;
        }
        .desc_text {
          padding: 2vh 0;
          img {
            width: 100%;
            &:last-child {
              margin-bottom: 2vh;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>


