<template>
  <div class="profile">
    <div class="profile_header common_header" :class="$store.state.isIphoneX&&'iphoneX_common_header'">
      <div class="header_content">
        <span class="backBtn" @click="$router.back()">
          <i class="fas fa-arrow-left"></i>
        </span>
        <div class="title">
          <div class="text">{{$t('MyProfile')}}</div>
        </div>
      </div>
    </div>
    <div class="profile_content common_content" :class="$store.state.isIphoneX&&'iphoneX_common_content'">
      <div class="form">
        <mt-cell>
          <div slot="title" class="title_wrapper" @click="edit($t('FirstName'),userInfo.firstName,'firstName')">
            <span class="slot_title">{{$t('FirstName')}}</span>
            <span class="slot_text">{{userInfo.firstName}}</span>
          </div>
          <span class="edit_icon" @click="edit($t('FirstName'),userInfo.firstName,'firstName')">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell>
        <mt-cell>
          <div slot="title" class="title_wrapper" @click="edit($t('LastName'),userInfo.lastName,'lastName')">
            <span class="slot_title">{{$t('LastName')}}</span>
            <span class="slot_text">{{userInfo.lastName}}</span>
          </div>
          <span class="edit_icon" @click="edit($t('LastName'),userInfo.lastName,'lastName')">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell>
        <mt-cell>
          <div slot="title" class="title_wrapper">
            <span class="slot_title">{{$t('Email')}}</span>
            <span class="slot_text">{{userInfo.email}}</span>
          </div>
          <!-- <span class="edit_icon">
            <i class="fas fa-edit"></i>
          </span> -->
        </mt-cell>
        <mt-cell>
          <div slot="title" class="title_wrapper" @click="editBir">
            <span class="slot_title">{{$t('DOB')}}</span>
            <span class="slot_text">{{userInfo.birthday}}</span>
          </div>
          <span class="edit_icon" @click="editBir">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell>
        <!-- <mt-field label="First Name" placeholder="First Name" v-model="username"></mt-field>
        <mt-field label="Last Name" placeholder="Last Name" v-model="username"></mt-field>
        <mt-field label="Email" placeholder="Email" v-model="username"></mt-field>
        <mt-field label="D.O.B" placeholder="D.O.B" v-model="username"></mt-field>
        <div class="custom_field">
          <span class="btn">
            EDIT
          </span> 
        </div>-->
      </div>
      <div class="form">
        <mt-cell>
          <div slot="title" class="title_wrapper" @click="edit($t('Name'),userInfo.customerName,'customerName')">
            <span class="slot_title">{{$t('Name')}}</span>
            <span class="slot_text">{{userInfo.customerName}}</span>
          </div>
          <span class="edit_icon" @click="edit($t('Name'),userInfo.customerName,'customerName')">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell>
        <mt-cell>
          <div slot="title" class="title_wrapper" @click="edit($t('Address'),userInfo.address,'address')">
            <span class="slot_title">{{$t('Address')}}</span>
            <span class="slot_text">{{userInfo.address}}</span>
          </div>
          <span class="edit_icon" @click="edit($t('Address'),userInfo.address,'address')">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell>
        <!-- <mt-cell>
          <div slot="title" class="title_wrapper" @click="edit($t('Telephone'),userInfo.phone,'phone')">
            <span class="slot_title">{{$t('Telephone')}}</span>
            <span class="slot_text">{{userInfo.phone}}</span>
          </div>
          <span class="edit_icon" @click="edit($t('Telephone'),userInfo.phone,'phone')">
            <i class="fas fa-edit"></i>
          </span>
        </mt-cell> -->
        <!-- <mt-field label="Name" placeholder="Name" v-model="username"></mt-field>
        <mt-field label="Address" placeholder="Address" v-model="username"></mt-field>
        <mt-field label="Telephone" placeholder="Telephone" v-model="username"></mt-field>
        <div class="custom_field">
          <span class="btn">
            ADD NEW ADDRESS
          </span>
        </div> -->
      </div>
      <!-- <div class="form">
        <mt-field label="VISA" placeholder="VISA" v-model="username"></mt-field>
        <mt-field label="Expired" placeholder="Expired" v-model="username"></mt-field>
        <div class="custom_field">
          <span class="btn">
            ADD NEW PAYMENT METHOD
          </span>
        </div>
      </div> -->
    </div>
    <mt-datetime-picker type="date" ref="picker" v-model="pickerValue" @confirm="handleConfirm" :cancelText="$t('Cancel')" :confirmText="$t('Sure')" :startDate="new Date('1900-01-01')">
    </mt-datetime-picker>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  name: "profile",
  data() {
    return {
      pickerValue: "",
      userInfo: {}
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    editBir() {
      this.$refs.picker.open();
      this.pickerValue = this.userInfo.birthday || "";
    },
    handleConfirm(value) {
      let year = value.getFullYear(); //得到年份
      let month = value.getMonth(); //得到月份
      let date = value.getDate(); //得到日期
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      let time = "";
      time = year + "-" + month + "-" + date;
      this.$Get(this.$api.updateCustomerById, { birthday: time }).then(res => {
        if (res.code == 0) {
          this.getUserInfo();
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    },
    edit(alertName, inputsValue, dataName) {
      let self = this;
      MessageBox.prompt(" ", alertName, {
        cancelButtonText: self.$t("Cancel"),
        confirmButtonText: self.$t("Sure"),
        inputValue: inputsValue
      }).then(({ value, action }) => {
        if (value) {
          let params = {};
          params[dataName] = value;
          this.$Get(this.$api.updateCustomerById, params).then(res => {
            if (res.code == 0) {
              self.getUserInfo();
            } else {
              this.$cusToast(res.msg || "Fail");
            }
          });
        }
      });
    },
    getUserInfo() {
      this.$Get(this.$api.queryCustomer).then(res => {
        if (res.code == 0) {
          this.userInfo = res.datas;
        } else {
          this.$cusToast(res.msg || "Fail");
        }
      });
    }
  }
};
</script>
<style lang="less">
.profile {
  .profile_header {
    position: relative;
    box-sizing: border-box;
    background-color: #f7f8f8;
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
  .profile_content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: auto;
    background-color: #f7f8f8;
    .form {
      margin-bottom: 2vh;
      .title_wrapper {
        position: relative;
      }
      .slot_title {
        display: inline-block;
        width: 100px;
        font-family: GreycliffCF-Light;
      }
      .slot_text {
        position: absolute;
        left: 100px;
        right: 2vh;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-family: GreycliffCF-Light;
      }
      .edit_icon {
        color: #000;
        margin-right: 2vh;
        font-size: 20px;
      }
      // .custom_field {
      //   background-color: #fff;
      //   -webkit-box-sizing: border-box;
      //   box-sizing: border-box;
      //   min-height: 48px;
      //   display: block;
      //   background-image: -webkit-gradient(
      //     linear,
      //     left top,
      //     left bottom,
      //     from(#d9d9d9),
      //     color-stop(50%, #d9d9d9),
      //     color-stop(50%, transparent)
      //   );
      //   background-image: linear-gradient(
      //     180deg,
      //     #d9d9d9,
      //     #d9d9d9 50%,
      //     transparent 50%
      //   );
      //   background-size: 120% 1px;
      //   background-repeat: no-repeat;
      //   background-position: top left;
      //   background-origin: content-box;
      //   padding: 0 10px;
      //   line-height: 48px;
      //   border-bottom: 1px solid #d9d9d9;
      //   .btn {
      //     font-size: 12px;
      //     border-radius: 20px;
      //     background-color: #000;
      //     color: #fff;
      //     padding: 5px 20px;
      //   }
      // }
    }
  }
}
</style>


