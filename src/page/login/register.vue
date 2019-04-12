<template>
  <div class="sign_up_in">
    <div class="sign_up_in_content">
      <div class="sign_up_in_top">
        <p class="sign_up_in_page_title">{{$t('signup')}}</p>
        <div class="sign_up_in_logo"> <img src="../../assets/images/img/logo.png" alt=""></div>
        <h2 class="sign_up_in_app_name">{{$t('designHub')}}</h2>
      </div>
      <div class="form_div">
        <mt-field :placeholder="$t('USERNAME')" v-model.trim="userInfo.userName"></mt-field>
        <mt-field :placeholder="$t('EMAIL')" v-model.trim="userInfo.email"></mt-field>
        <mt-field v-model.trim="userInfo.code" :placeholder="$t('CODE')">
          <span class="code_btn" @click="getCode" v-if="!isTime">{{$t('code')}}</span>
          <span class="s_text" v-else>{{time}}s</span>
        </mt-field>
        <mt-field :placeholder="$t('PASSWORD')" type="password" v-model.trim="userInfo.password"></mt-field>
        <mt-field placeholder="CONFIRM PASSWORD" type="password" v-model.trim="userInfo.password1"></mt-field>
        <div class="sign_up_in_btn" @click="verification">{{$t('signup')}}</div>
        <div class="sign_up_in_command">
          {{$t('Alreadyhaveanaccount')}}
          <span @click="$router.back()">{{$t('signin')}}</span> {{$t('here')}}
        </div>
      </div>
      <div class="copyright_text">{{$t('Copyright')}}</div>
    </div>

  </div>
</template>
<script>
import { companyConfig } from "../../config/company.config";
export default {
  name: "register",
  data() {
    return {
      userInfo: {
        userName: "",
        email: "",
        code: "",
        password: "",
        password1: ""
      },
      isTime: false,
      time: 300
    };
  },
  methods: {
    timeReduce() {
      let self = this;
      this.isTime = true;
      this.timer = setInterval(() => {
        if (self.time == 0) {
          self.isTime = false;
          self.time = 300;
          clearInterval(self.timer);
        } else {
          self.time--;
        }
      }, 1000);
    },
    getCode() {
      let self = this;
      if (!this.userInfo.email) {
        this.$cusToast(self.$t("verEmail"));
        return;
      }
      this.$Get(this.$api.sendCode, {
        phone: this.userInfo.email,
        sendType: "email_reg",
        smsSign: this.$cusMd5(
          self.userInfo.email + "email_reg" + companyConfig.token
        )
      }).then(res => {
        if (res) {
          if (res.code == 0) {
            this.$cusToast(self.$t("Sendsuccessfully"));
            self.timeReduce();
          } else {
            this.$cusToast(res.msg || "Fail");
          }
        }
      });
    },
    verification() {
      if (!this.userInfo.userName) {
        this.$cusToast(this.$t("verUserName"));
      } else if (!this.userInfo.email) {
        this.$cusToast(this.$t("verEmail"));
      } else if (this.userInfo.password.length < 6) {
        this.$cusToast(this.$t("passwordLength"));
      } else if (this.userInfo.password !== this.userInfo.password1) {
        this.$cusToast(this.$t("passwordNoSame"));
      } else {
        if (!this.userInfo.code) {
          this.$cusToast(this.$t("verCode"));
        } else {
          this.register(this.userInfo.code);
        }
      }
    },
    //注册
    register(code) {
      let password = this.$cusMd5(this.userInfo.password1);
      this.$Post(this.$api.register, {
        userName: this.userInfo.userName,
        phone: this.userInfo.email,
        password: password,
        validateCode: this.userInfo.code,
        source: "app"
      }).then(res => {
        if (res) {
          if (res.code == 0) {
            this.$router.back();
          } else {
            this.$cusToast(res.msg || "Fail");
          }
        }
      });
    }
  }
};
</script>
<style lang="less">
@import url("../../style/login");
</style>


