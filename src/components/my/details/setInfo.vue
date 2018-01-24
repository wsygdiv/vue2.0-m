<template>
	<div id="editInfo" class="editInfo">
    <div class="my-header">
    	<span class="iconfont"style="position:absolute;font-size: .672rem;left: .32rem;"@click="back">
    	 	    &#xe601;
    	 </span>
    	 <span style="text-align: center;font-size: .554rem;color: #333333;">设置</span>    	 
    </div>		
		<div class="user-info user-main">
			  <ul>
			  	<li>			  		
			  		<span class="user-info-name">账号安全</span>
			  		<span class="edit-more"><router-link to="/my/setEdit/setPwd"class="iconfont"tag="a">&#xe602;</router-link></span>
			  	</li>
			  	<li>			
			  		<span class="user-info-name">新消息通知</span>
			  		<span class="edit-more"><router-link to="/my/setEdit/newText"class="iconfont"tag="a">&#xe602;</router-link></span>		  		
			  	</li>
			    <!--<li>
			  		
			  		<span class="user-info-name">重置登录密码</span>
			  		<span class="edit-more"><router-link to="my/my"class="iconfont"tag="a">&#xe602;</router-link></span>
			  	</li>-->
			  	<li style="text-align: center;"class="backLogin">			
			  		<mt-button @click.native="openConfirm" size="large"><span class="user-info-name">退出登录</span></mt-button>
			  	</li>
			  </ul>
		</div>

	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: "editInfo",
		props: ['serviceUrl'],
		data: () => ({
			confirmState: false,
		}),
		methods:{
			 back() {
			      this.$router.go(-1);
			   },
			   openConfirm() {
			   	   this.userId = window.sessionStorage.getItem("userId");
			   	   console.log(this.userId)
			   	   MessageBox.confirm('确定执行此操作?').then(action => {
                      window.sessionStorage.removeItem("userId");
                      this.$router.go(-1);
			       });
			   },
			   
		},
		mounted: function() {
            if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
			beforeCreate: {
				this.$http({
//					url: this.serviceUrl + "app/goods.htm",
					method: "POST",
					// 请求后台发送的数据
					params: {
						id: this.$route.params.goodsId,
						data: {

						}
					},
					// 设置请求头
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
					// 请求成功回调
					console.log(JSON.stringify(res.data));
					this.msg = res.data;
					//console.log(this.msg.companyArray)
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
			}
			}
		}
	}
</script>
<style lang="scss" scoped>
@import "./../../../css/unit/common";
.my-header{
    color: $green;
	text-align:center;
	padding:.32rem;	
	border-bottom:1px solid #333333;
	box-shadow:0 0.08rem 0.16rem #cccccc;
}

  .user-main li{
  	margin-bottom: .64rem;
  }
  .user-info{ 	
    $padding: .32rem 0 0 .32rem;
    width: 100%;
    /*padding: $padding;*/
    margin: .24rem 0 .24rem 0;
    ul{
    	overflow: hidden;
    	.backLogin{
    			
    			.mint-button--large{
    				background-color: #4aab2d;
    				color: #FFFFFF;
    			}
			}
    	li{
    		border-bottom: 1px solid #cccccc;
    		overflow: hidden;
    		height: 1.376rem;
    		padding:.24rem .32rem .24rem .24rem;
    		font-size: .512rem;
    		background-color: #FFFFFF;
    		
    		.edit-more{
    			 float: right;
    			 a{
    			 	color: #999999;
    			 }
    			 
    		}
    		span{
    			display: inline-block;
    			height: .88rem;
    			line-height: .88rem;
    		}
    		.user-info-name{
    			vertical-align: top;
    			
    		}
    	}
    }
  }
  
</style>
<style>
	.user-info-name{
    			vertical-align: top;
    			
    		}
    .mint-button--large {
    display: block;
    width: 100%;
    background: #ffffff;
    height: 100%;
    /* border: none; */
    font-size: .576rem;}
    .mint-button--default {
    -webkit-box-shadow: 0 0 1px #ffffff;
}
.mint-msgbox{
	font-size: .448rem;
}
.mint-msgbox-title{
	font-size: .448rem;
}
.mint-msgbox-btn{
    font-size: .448rem;	
}
</style>