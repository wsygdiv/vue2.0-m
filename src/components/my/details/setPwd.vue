<template>
	<div id="setPwd" class="setPwd">
		<div class="my-header">
			<span class="iconfont" style="position:absolute;font-size: .672rem;left: .32rem;" @click="back">
	    	 	    &#xe601;
	    	 </span>
			<span style="text-align: center;font-size: .554rem;color: #333333;">重置登录密码</span>
		</div>
		<div class="pwd-container">
			<div class="setCounter">
				<div class="">
					请为您的账号
				</div>
				<div class="user-counter">
					111112333
				</div>
				<div class="setCounter">
					设置一个新密码
				</div>
			</div>
		</div>
		<div class="set-num">
			<div class="input-wrapper"><input type="password" v-model="password" placeholder="请输入新密码"></div>
			<div class="input-wrapper"><input type="password" v-model="confirmPassword" placeholder="请确认新密码"></div>
			<a class="submit" :class="{'act':password && password === confirmPassword}" @click="setPassword">保存密码</a>
		</div>		
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "setPwd",
		props: ['serviceUrl'],
		data: () => ({
			password: '', // 密码
			confirmPassword: '', // 确认密码
		}),
		methods: {
			back() {
				this.$router.go(-1);
			},
			setPassword: function() {
				if(!this.password || !this.confirmPassword) {
					 Toast({
				          message: '密码不能为空',
				          position: 'middle',
				          className:"tip",
				        });
				} else if(this.password !== this.confirmPassword) {
					
					Toast({
				          message: '两次密码输入不一致',
				          position: 'middle',
				          className:"tip",
				        });
				} else {
					alert("两次密码输入成功")
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
				   this.axios({
						url: this.serviceUrl + "app/updatePassword.htm",
//						url:"http://192.168.8.214:8443/app/updatePassword.htm",
						method: "POST",
						// 请求后台发送的数据
						data: this.$qs.stringify({
//								userId: this.id,
//								password: this.password
								userId: 32769,//测试用
								password: this.confirmPassword
						}),
					}).then((res) => {
						// 请求成功回调
						console.log(JSON.stringify(res.data));
						this.msg = res.data;
						this.$router.go(-1);
						//console.log(this.msg.companyArray)
					}, function(res) {
						// 请求失败回调
						console.log("error from matDetail");
					});
				}
			}

		},
	}
</script>
<style lang="scss" scoped>
	@import "./../../../css/unit/common";
	.my-header {
		color: $green;
		text-align: center;
		padding: .32rem;
		border-bottom: 1px solid #333333;
		box-shadow: 0 0.08rem 0.16rem #cccccc;
	}
	
	.pwd-container {
		background-color: #FFFFFF;
		padding: .24rem 0;
		margin: .24rem 0 .24rem 0;
		border-bottom: 1px solid #CCCCCC;
		border-top: 1px solid #CCCCCC;
		.setCounter {
			color: #999999;
			text-align: center;
			font-size: .448rem;
			padding: .08rem 0;
		}
		.user-counter {
			text-align: center;
			color: #000000;
			padding: .08rem;
			font-size: .64rem;
		}
	}
	
	.set-num {
		input {
			width: 100%;
			height: 1.44rem;
			line-height: 1.44rem;
			padding: .08rem .16rem;
			font-size: .448rem;
			color: #999999;
		}
		.submit {
			display: block;
			margin: 1rem auto 1rem;
			font-size: 0.484rem;
			line-height: 1rem;
			text-align: center;
			background: #ccc;
			color: #fff;
			border-radius: 0.1rem;
			&.act {
				background: #cc0000;
			}
		}
		.input-wrapper{
		    margin-top:0.8rem;
		    margin-left:auto;
		    margin-right:auto;
		    border-radius:0.2rem;
		    overflow:hidden;
		    background:#fff;
		  }
	}
	
</style>
<style type="text/css">
	.tip .mint-toast-text{
		font-size: .448rem !important;
	}
</style>