<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="child-view"></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: ""
    };
  },
  mounted() {
    window["App"] = this;
  },
  created() {
    this.$navigation.on("forward", (to, from) => {
      this.transitionName = "slide-left";
    });
    this.$navigation.on("back", (to, from) => {
      this.transitionName = "slide-right";
    });
    this.$navigation.on("replace", (to, from) => {
      this.transitionName = "slide-right";
    });
  },
  methods: {
    isIPhoneX(bool) {
      //给unity调用
      if (bool == undefined || bool.toLowerCase() == "false") {
        this.$store.commit("changeIsIphoneX", false);
      } else {
        this.$store.commit("changeIsIphoneX", true);
      }
    }
  }
};
</script>

<style lang="less">
@import "style/common.less";
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  padding: 0;
  margin: 0;
}
html,
body {
  overflow: hidden;
}

#app {
  position: relative;
}
::-webkit-scrollbar {
  background-color: transparent;
  display: none !important;
}

.child-view {
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to {
  transform: translate3d(-80%, 0, 0);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease;
}
.slide-left-enter-active {
  background: #fff;
  z-index: 10000;
}

.slide-right-enter {
  transform: translate3d(-80%, 0, 0);
}
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-leave-active {
  z-index: 10000;
  background: #fff;
}
</style>

