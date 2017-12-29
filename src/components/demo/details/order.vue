<template>
  <!-- 预约页面 -->
  <div id="order" class="order">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <div class="order-box">
      <div class="text"><input type="text" v-model="msg.linkmanName" placeholder="请输入您的称呼"></div>
      <div class="text"><input type="text" v-model="msg.telPhone" placeholder="请输入手机号码"></div>
      <div class="text bar">
        <input type="text" v-model="msg.codeNumber" placeholder="短信验证码">
        <span @click="getCodeNumber" v-text="codeNumber"></span>
      </div>
      <div class="text"><input type="text" v-model="msg.buildingName" placeholder="您的楼盘地址"></div>
      <div class="text">
        <select class="sele-option" v-model="msg.styleId">
          <option v-for="(styleList,index) in styleOptions" :key="index" :value="styleList.id" v-text="styleList.styleName"></option>
        </select>
      </div>
      <div class="text"><input type="text" v-model="msg.houseType" placeholder="请输入您的房屋户型"></div>
      <div class="text bar"><input type="text" v-model="msg.floorSpace" placeholder="请输入您的房屋面积"><span>M<sup>2</sup></span></div>
      <div class="sele">
        <div class="sele-text">设计师：</div>
        <select class="sele-option" v-model="msg.designerId">
          <option v-for="(designerNameList,index) in designerOptions" :key="index" :value="designerNameList.id" v-text="designerNameList.designerName"></option>
        </select>
      </div>
      <div class="btn-box">
        <div class="btn" @click="submit">立即预约</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "order",
  props: ['serviceUrl'],
  components: {
    //componentName,
  },
  data: () => ({
    msg:{
      userId:"32769",//用户id
      linkmanName:"",
      telPhone:"",
      codeNumber:"",
      buildingName:"",
      houseType:"",//户型
      floorSpace:"",//面积
      designerId:"",//设计师id
      styleId:""
    },
    codeNumber:"获取验证码",//验证码
    styleOptions: [],
    designerOptions: []
  }),

  methods: {
    submit() {
      //提交 msg Start
      this.$http({
        // url: this.serviceUrl + "app/applyDesign.htm",
        url: "http://192.168.8.214:8443/app/applyDesignSave.htm",
        method:"POST",
        params: {
          "userId": this.msg.userId,
          "linkmanName": this.msg.linkmanName,
          "telPhone": this.msg.telPhone,
          //"codeNumber": this.msg.codeNumber,
          "buildingName": this.msg.buildingName,
          "houseType": this.msg.houseType,
          "floorSpace": this.msg.floorSpace,
          "designerId": this.msg.designerId,
          "styleId": this.msg.styleId,
        },
        headers: {
          "Content-Type": "x-www-from-urlencoded"
        }
      }).then((res) => {
        console.log("发送成功");
        if(res.data.code == 1){
          console.log("提交成功");
        } else {
          console.log("提交失败");
        }
      },(res) => {
        console.log("error from 设计师预约页面demo/order.vue");
      });
      //提交 msg End
    },
    getCodeNumber() {
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (myreg.test(this.msg.telPhone)) {
        //获取验证码 Start
        this.$http({
          // url: this.serviceUrl + "app/applyDesign.htm",
          url: "http://192.168.8.214:8443/app/applyDesignSendCode.htm",
          method:"POST",
          params: {
            "mark": "verifyCode",//(短信类型)
            "mobile": this.msg.telPhone//（手机号）
          },
          headers: {
            "Content-Type": "x-www-from-urlencoded"
          }
        }).then((res) => {
          console.log("发送成功");
          if(res.data.code == 1){
            console.log("提交成功");

          } else {
            console.log("提交失败");
          }
        },(res) => {
          console.log("error from 设计师预约页面demo/order.vue");
        });
        //获取验证码 End
      } else {
        alert("手机号格式不正确");
      }

    },
  },
  mounted() {
    //do something after mounting vue instance
    console.log(this.$route.params.id);
    //获取默认数据 Start
    this.$http({
      url: this.serviceUrl + "app/applyDesign.htm",
      //url: "http://192.168.8.214:8443/app/applyDesign.htm",
      method:"POST",
      params: {
        // pageSize: this.pageSize,
      },
      headers: {
        "Content-Type": "x-www-from-urlencoded"
      }
    }).then((res) => {
      this.designerOptions = res.data.designerArray;//设计师列表
      this.styleOptions = res.data.styleArray;//装修风格列表
      this.msg.styleId = res.data.styleArray[0].id;//默认风格id
      this.msg.designerId = res.data.designerArray[0].id;//默认设计师id
      // console.log(JSON.stringify(this.styleOptions));
    },(res) => {
      console.log("error from 设计师预约页面demo/order.vue");
    });
    //获取默认数据 End
  }
}
</script>
<style lang="scss" scoped>
@import "./../../../css/unit/common";
$padding: .32rem;
.order {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
}

.order-box {
  .text {
    width: 100%;
    overflow: hidden;
    text-align: center;
    padding: $padding $padding * 2 0;
    input,.sele-option {
      float: left;
      width: 12rem - ($padding * 4);
      height: 1.44rem;
      font-size: .448rem;
      padding: 0 $padding;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: .096rem;
    }
    &.bar {
      input {
        width: 12rem - ($padding * 5) - 3rem;
        margin: 0 $padding 0 0;
      }
      & > span {
        float: left;
        width: 3rem;
        height: 1.44rem;
        font-size: .48rem;
        background: #f9f9f9;
        line-height: 1.44rem;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: .096rem;
      }
    }
  }
  .sele {
    padding: $padding $padding * 2 0;
    overflow: hidden;
    .sele-text {
      float: left;
      width: 2rem;
      font-size: .48rem;
      color: #666;
      height: 1.44rem;
      text-align: justify;
      line-height: 1.44rem;
    }
    .sele-option {
      float: left;
      width: 12rem - ($padding * 5) - 2rem;
      margin: 0 0 0 $padding;
      height: 1.44rem;
      background: #fff;
      font-size: .448rem;
      padding: 0 $padding;
      border: 1px solid #ccc;
      border-radius: .096rem;
    }
  }
  .btn-box {
    padding: $padding * 2;
    .btn {
      color: #fff;
      width: 100%;
      //height: 1.568rem;
      height: 1.44rem;
      text-align: center;
      font-size: .576rem;
      background: #ff9b54;
      //line-height: 1.568rem;
      line-height: 1.44rem;
      border-radius: .096rem;
      border: 1px solid rgba(0,0,0,.15);
    }
  }
}

</style>
