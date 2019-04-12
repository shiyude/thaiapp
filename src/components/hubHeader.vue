<template>
  <div class="hubHeader">
    <div class="HeaderContent">
      <span v-if="back" class="backBtn" @click="onClickBack">
        <i class="fas fa-arrow-left"></i>
      </span>
      <div class="HeaderContentTxt">
        <div class="textConter">{{titleText}}</div>
      </div>
      <div class="headerRight">
        <slot name="rightBtn"></slot>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'hub-header',
  props: {
    titleText: String,
    back: String
  },
  methods: {
    onClickBack() {
      this.$router ? this.$router.back() : window.history.back()
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less">
.hubHeader {
  position: relative;
  height: 60px;
  background-color: #c90465;
  .HeaderContent {
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 0;
    .HeaderContentTxt {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      height: 40px;
      line-height: 40px;
      .textConter {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
      }
    }
    .backBtn {
      position: absolute;
      left: 10px;
      height: 30px;
      width: 30px;
      top: 0px;
      line-height: 30px;
      font-size: 22px;
      color: #fff;
    }
    .headerRight {
      position: absolute;
      right: 10px;
      top: 0px;
    }
  }
}
</style>