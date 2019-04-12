<template>
  <div class="sign_up_in">
    <div class="sign_up_in_content">
      <div class="sign_up_in_top">
        <p class="sign_up_in_page_title">{{$t('signIn')}}</p>
        <div class="sign_up_in_logo">
          <img src="../../assets/images/img/logo.png" alt="">
        </div>
        <h2 class="sign_up_in_app_name">{{$t('designHub')}}</h2>
      </div>
      <div class="form_div">
        <mt-field :placeholder="$t('EMAIL')" type="email" v-model.trim="userInfo.email"></mt-field>
        <mt-field :placeholder="$t('PASSWORD')" type="password" v-model.trim="userInfo.password"></mt-field>
        <div class="sign_up_in_btn" @click="signIn">{{$t('signIn')}}</div>
        <div class="sign_up_in_command">
          {{$t('ForgetPassword')}}<br/> {{$t('haveanaccount')}}
          <span @click="toRegister">{{$t('Signup')}}</span> {{$t('here')}}
        </div>
      </div>
      <div class="copyright_text">{{$t('Copyright')}}</div>
    </div>

  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    signIn() {
      if (!this.userInfo.email || !this.userInfo.password) {
        MessageBox({
          title: this.$t("Tips"),
          message: this.$t("userOrPassword"),
          confirmButtonText: this.$t("Sure"),
          cancelButtonText: this.$t("Cancel")
        });
      } else {
        this.$Post(this.$api.login, {
          phone: this.userInfo.email,
          password: this.$cusMd5(this.userInfo.password)
        }).then(res => {
          if (res.code == 0) {
            this.$navigation.cleanRoutes();
            localStorage.setItem("userInfo", JSON.stringify(res.datas));
            this.$router.push("/home");
            let account = JSON.stringify(res.datas);
            let str = Base64.encode(account).toString("base64");
            str = str.replace(/\+/g, "%2B");
            str = str.replace(/\=/g, "%3D");
            window.location.href = "uniwebview://login?data=" + str;
          } else {
            this.$cusToast(res.msg || "Fail");
          }
        });
      }
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="less">
@import url("../../style/login");
</style>