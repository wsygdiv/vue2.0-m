<template>
	<div id="editInfo" class="editInfo">
		<div class="my-header">
			<span class="iconfont" style="position:absolute;font-size: .672rem;left: .32rem;" @click="back">
    	 	    &#xe601;
    	 </span>
			<span style="text-align: center;font-size: .554rem;color: #333333;">新消息通知</span>

		</div>

		<div class="user-info user-main">
			<ul>
				<li>
					<span class="user-info-name">接收私信</span>
					<span class="edit-more"><mt-switch class="mtS"@change="handleChange1"v-model="value1"></mt-switch></span>
				</li>
				<li>
					<span class="user-info-name">系统通知</span>
					<span class="edit-more"><mt-switch class="mtS"@change="handleChange2"v-model="value2"></mt-switch></span>
				</li>
				<li>
					<span class="user-info-name">社区消息</span>
					<span class="edit-more"><mt-switch class="mtS"@change="handleChange3"v-model="value3"></mt-switch></span>
				</li>
				<li>
					<span class="user-info-name">系统公告</span>
					<span class="edit-more"><mt-switch class="mtS"@change="handleChange4"v-model="value4"></mt-switch></span>
				</li>
			</ul>
		</div>

	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default {
		name: "editInfo",
		props: ['serviceUrl'],
		data: () => ({
              value1: "",
		      value2: "",
		      value3: "",
		      value4: ""
		}),
		methods: {
			back() {
				this.$router.go(-1);
			},
			handleChange1(event){
				console.log(event);
				console.log(this.value1)
				Toast('设置成功');
				this.axios({
					url: this.serviceUrl + "app/message_set.htm",
//					url:"http://192.168.8.183:8088/app/message_set.htm",
				method: "POST",
				data: this.$qs.stringify({
					//传value值给后台
					token:this.token,
					userId:this.userId,
					accept_sec_message:this.value1,
					accept_sys_message:this.value2,
					accept_sys_doc:this.value4,
				}),
			}).then((res) => {
				//更新数据
				console.log(res.data)
			}, (err) => {
				// 请求失败回调
				console.log("请求错误");
			});
			},
			handleChange2(event){
				console.log(event);
				console.log(this.value2)
				Toast('设置成功');
				this.axios({
					url: this.serviceUrl + "app/message_set.htm",
//					url:"http://192.168.8.183:8088/app/message_set.htm",
				method: "POST",
				data: this.$qs.stringify({
					//传value值给后台
					token:this.token,
					userId:this.userId,
					accept_sec_message:this.value1,
					accept_sys_message:this.value2,
					accept_sys_doc:this.value4,
				}),
			}).then((res) => {
				//更新数据
				console.log(res.data)
			}, (err) => {
				// 请求失败回调
				console.log("请求错误");
			});
			},
			handleChange3(event){
				console.log(event);
				console.log(this.value3)
				Toast('设置成功');
			},
			handleChange4(event){
				console.log(event);
				console.log(this.value4)
				Toast('设置成功');
				this.axios({
					url: this.serviceUrl + "app/message_set.htm",
//					url:"http://192.168.8.183:8088/app/message_set.htm",
				method: "POST",
				data: this.$qs.stringify({
					//传value值给后台
					token:this.token,
					userId:this.userId,
					accept_sec_message:this.value1,
					accept_sys_message:this.value2,
					accept_sys_doc:this.value4,
				}),
			}).then((res) => {
				//更新数据
				console.log(res.data)
			}, (err) => {
				// 请求失败回调
				console.log("请求错误");
			});
			},
		},
		mounted: function() {
			if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
			    this.axios({
					url: this.serviceUrl + "app/message_set_detail.htm",
//					url:"http://192.168.8.183:8088/app/message_set_detail.htm",
				method: "POST",
				data: this.$qs.stringify({
					//传value值给后台
					token:this.token,
					userId:this.userId,
				}),
			}).then((res) => {
				console.log(res.data);
				this.value1 = res.data.accept_sec_message;
			   this.value2 = res.data.accept_sys_message;
				this.value4 = res.data.accept_sys_doc;
				//更新数据
				
			}, (err) => {
				// 请求失败回调
				console.log("请求错误");
			});
			}
		}
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
	
	.user-info {
		$padding: .32rem 0 0 .32rem;
		width: 100%;
		/*padding: $padding;*/
		margin: .24rem 0 .24rem 0;
		ul {
			background-color: #FFFFFF;
			padding: .01rem .32rem;
			overflow: hidden;
			li {
				border-bottom: 1px solid #cccccc;
				overflow: hidden;
				height: 1.376rem;
				padding: .24rem 0 .24rem 0;
				font-size: .512rem;
				background-color: #FFFFFF;
				.edit-more {
					float: right;
					a {
						color: #999999;
					}
					.mtS /deep/.mint-switch-core {
						width: 1.664rem;
						height: 1rem;
						border-radius: .448rem;
					}
					.mtS /deep/ .mint-switch-input:checked+.mint-switch-core {
						border-color: $green;
						background-color: $green;
					}
					.mtS /deep/ .mint-switch-input:checked+.mint-switch-core::after {
						-webkit-transform: translateX(42px);
						transform: translateX(42px);
					}
					.mtS /deep/ .mint-switch-core::after {
						width: .96rem;
						height: .96rem;
						background-color: #fff;
						-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
						box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
					}
					.mtS /deep/ .mint-switch-core::after,
					.mint-switch-core::before {
						border-radius: 28px;
					}
				}
				span {
					display: inline-block;
					height: .88rem;
					line-height: .88rem;
				}
				.user-info-name {
					vertical-align: top;
				}
			}
		}
	}
</style>
<style type="text/css">
	.mint-toast-text{
		font-size: .484rem;
	}
</style>