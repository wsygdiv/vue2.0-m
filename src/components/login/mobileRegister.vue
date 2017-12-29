<template>
  <div id="regidter" class="register">
  	<slot name="app-header"></slot>
  	<div class="register-con">
	  	<!-- 组件:用于显示提示信息 -->
	    <!--<Toast :toastshow.sync="toastshow" :toasttext="toasttext"></Toast>-->
	    <ul class="register-box">
	    	<li class="register-list"><input type="text" placeholder="请输入您的手机号" v-model="account"/></li>
	    	<li class="register-list clear">
	    		<input class="verify-text" type="text" placeholder="短信验证" v-model="verify"/>
	    		<input :class="'verify-btn fr ' + (this.wait == 60 ? '' : 'no')" type="button" :value="value" @click="sendSmsCode()"/>
	    		<!--<mt-button class='verify-btn fr' @click.native="handleClick" v-text="value" disabled type="primary"></mt-button>-->
	    	</li>
	    	<li class="register-list"><input type="text" placeholder="设置登录密码" v-model="password"/></li>
	    	<li class="register-list"><a class="submit" :class="{'act':account && password && verify}" @click="register()">注册</a></li>
	    </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  props: ['serviceUrl'],
  data: () => ({
  	account: '',
    password: '',
    verify: '',
  	wait: 60,
		sendMsgDisabled: false,
		value:"获取验证码",
		stop : false,   //默认是停止的，但界面加载之后会变成false
    Interval:null  //setInterval的对象
  }),
  computed: {
    height: function () {
      return document.documentElement.clientHeight + 'px'
    },
    openId: function () {
      return localStorage.getItem('openId')
    },
    state: function () {
      return localStorage.getItem('state')
    }
  },
  methods: {
  	// 验证手机获取验证码
   sendSmsCode:function(){
    var reg=11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
    var account = this.account;
    if(!account){//未输入手机号
     alert("请输入手机号码");
     return;
    }
    if(!reg.test(account)){//手机号不合法
     alert("您输入的手机号码不合法，请重新输入");
     return;
    }
    this.wait = 60;
    this.startTimer();
   },
  	send:function() {  
		if(this.wait == 1) {
			this.wait = 60;
			this.value="重新发送";
			clearInterval(this.Interval);
			return;
		} else {
			this.wait--;
			this.value="重新发送(" + this.wait + "s)";
		}
  	},
  	startTimer:function(){
  		alert("暂未开通短信验证码!!!");
//				this.stop = false;
//      //如果是false就开始倒计时，如果是true就停止倒计时
//      if(this.stop == false && this.wait==60) 
//      {
//          this.Interval = setInterval(this.send,1000); 
////          alert(this.account)
//          this.$http({
////		        url: "http://192.168.8.183:8088/register/sendCode.htm",
//		        url: this.serviceUrl + "register/sendCode.htm",
//		        method: "POST",
//		        // 请求后台发送的数据
//		        params: {
//		        	emailMark:"emailCode",
//		        	mark:"verifyCode",
//		        	EmailOrMobile:this.account
//		        },
//		        // 设置请求头
//		        headers: {
//		            "Content-Type": "x-www-from-urlencoded"
//		        }
//		      }).then(function (res) {
//		        // 请求成功回调
//		      console.log(JSON.stringify(res.data));
//		        this.msg = res.data;
//		      }, function (res) {
//		        // 请求失败回调
//		        console.log("error from 注册页面");
//		      });
//      }else{
//			return;
//      }
    },
    //注册
    register:function(){
//  	alert(this.verify)
    	if((this.verify)!=""&&(this.account)!=""&&(this.password)!=""){
    		var patrn=/^([a-zA-Z0-9]|[._]){6,20}$/;
    		if(!patrn.test(this.password)){//手机号不合法
		    	alert('请设置6~20位的数字、字母、下划线"_"或"."组成的密码');
		    	return;
		    }
    		alert("暂未开通短信验证码!!!");
	    	this.$http({
//		        url: "http://192.168.8.183:8088/register_lv_ajax.htm",
		        url: this.serviceUrl + "register_lv_ajax.htm",
		        method: "POST",
		        // 请求后台发送的数据
		        params: {
		        	EmailOrMobile:this.account,
		        	code:this.verify,
		        	password:this.password
		        },
		        // 设置请求头
		        headers: {
		            "Content-Type": "x-www-from-urlencoded"
		        }
		    }).then(function (res) {
		        // 请求成功回调
//		      console.log(JSON.stringify(res.data));
//		        this.msg = res.data;
		        this.login = true
          		this.$router.push('/')
		    }, function (res) {
		        // 请求失败回调
		        console.log("error from register.vue");
		    });
    	}
    }
  }
}
</script>
<style lang="scss" scoped>
/*body {
	background-color: #fff;
}*/
.register-con {
	position: fixed;
	top: 1.408rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
	background-color: #fff;
}
.clear {
	&:after {
		content: "";
		display: block;
		clear: both;
	}
}
.register-list {
	margin-top: 0.704rem;
	padding: 0 0.75rem;
	$height: 1.32rem;
	input[type="text"] {
		box-sizing: border-box;
		width: 100%;
		height: $height;
		line-height: $height;
		font-size: 0.512rem;
		background-color: #F2F2F2;
		border-radius: 0.128rem;
		padding: 0 0.16rem;
	}
	input.verify-text {
		width: 7rem;
		float: left;
		border-radius: 0.128rem 0 0 0.128rem;
	}
	.verify-btn {
		width: 3.44rem;
		height: $height;
		line-height: $height;
		float: right;
		text-align: center;
		border-radius: 0 0.128rem 0.128rem 0;
		font-size: 0.512rem;
		background-color: #4AAB2D;
		color: #fff;
		&.no {
			background: #ccc;
		}
	}
}
.submit{
  display: block;
  width: 11.1rem;
  margin: 0.8rem auto 0.6rem;
  font-size: 0.64rem;
  line-height: 1.5rem;
  text-align: center;
  background: #A3DFA3;
  color: #fff;
  border-radius: 0.1rem;
}
.submit.act {
	background: #4AAB2D;
}
</style>
