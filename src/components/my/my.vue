<template>
	<div id="my" class="my">
    <div class="my-header">
    	 <span style="text-align: center;font-size: .554rem;">我的</span>
    	 <!--<span >
    	 	    <router-link  class="iconfont"tag="a"to="/my/setEdit"style="float: right;font-size: .672rem;margin-right:.12rem;color: #FFFFFF;">&#xe644;</router-link>
    	 </span>-->
    	 <div class="my-name">
    	 	   <span class="user-contain"style="float: left;"><img :src="msg.touxiang"/></span>
    	 	   <div class="my-name-info" style="float: left;">
    	 	   	   <h3 v-text="msg.userName">Alisa</h3>
    	 	   	   <span v-text="msg.phone">136589895</span>    	 	   	   
    	 	   </div>
    	 	   <router-link class="iconfont" to="/my/list" tag="a"style="float: right;margin: .816rem .12rem 0 0;color: #FFFFFF;">&#xe602;</router-link>
    	 </div>
    </div>
		<!--<div class="btn-box">
			<ul>
				<router-link to="/hotNew" tag="li">
					<span class="iconfont btn-icon">&#xe74e;</span>
					<span class="btn-text">消息</span>
					<span class="num-msg"v-text="msg.message">3</span>
				</router-link>
				<router-link to="javascrit:void(0);" tag="li">
					<span class="iconfont btn-icon">&#xe621;</span>
					<span class="btn-text">待付款</span>
					<span class="num-msg"v-text="msg.orderSubmitCount">3</span>
				</router-link>
				<router-link to="javascrit:void(0);" tag="li">
					<span class="iconfont btn-icon">&#xe675;</span>
					<span class="btn-text">待发货</span>
					<span class="num-msg"v-text="msg.orderPayCount">3</span>
				</router-link>
			</ul>
		</div>-->
		<div class="user-info">
			  <ul>
			  	<li>
			  		<span class="iconfont iconG fl">&#xe687;</span>
			  		<span class="user-info-name">账户余额</span>
			  		<span class="price"><span v-text="msg.balance"></span>元</span>
			  	</li>
			  	<li>
			  		<router-link to="/my/setEdit/bigImage">
			  			<span class="iconfont iconG fl">&#xe636;</span>
				  		<span class="user-info-name">意向金</span>
				  		<span class="price"><span v-text="msg.intentionalGold"></span>元</span>
			  		</router-link>
			  	</li>
			  	<li>
			  		<span class="iconfont iconOO fl">&#xe604;</span>
			  		<span class="user-info-name">积分</span>
			  		<span class="price"><span v-text="msg.integral"></span>元</span>
			  	</li>
			  	<li>
			  		<span class="iconfont iconG fl">&#xe627;</span>
			  		<span class="user-info-name">收入</span>
			  		<span class="price"><span v-text="msg.income"></span>元</span>
			  	</li>
			  	<li>
			  		<span class="iconfont iconO fl">&#xe610;</span>
			  		<span class="user-info-name">优惠分</span>
			  		<span class="price"><span v-text="msg.discountCount"></span>元</span>
			  	</li>
			  	<li>
			  		<span class="iconfont iconO fl">&#xe62f;</span>
			  		<span class="user-info-name">我的消息</span>
			  		<router-link to="/my/setEdit/myMessege"class="iconfont"tag="a">
			  			<span class="iconfont btn-icon"style="float: right;font-size: .672rem;margin-right:.24rem;">&#xe74e;</span>
						<span class="num-msg"v-text="msg.message">3</span>
			  		</router-link>
			  	</li>
			  </ul>
		</div>

		<slot name="app-footer"></slot>
	</div>
</template>
<script>	
	export default {
		name: "my",
		props: ['serviceUrl'],
		data: () => ({
			msg:"",
		}),
		mounted: function() {
			if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
			
				this.axios({
					url: this.serviceUrl + "app/personMessage.htm",
//					url:"http://124.204.40.11:8088/app/personMessage.htm",
					method: "POST",
					// 请求后台发送的数据
					data:  this.$qs.stringify({
						userId:this.userId,//测试用的id
					}),					
				}).then((res) =>{
					// 请求成功回调
//					console.log(JSON.stringify(res.data));
					this.msg = res.data;
					if(this.msg.message>=99){
						this.msg.message = 99;
					}
					//console.log(this.msg.companyArray)
				}, (err)=> {
					// 请求失败回调
					console.log("error from matDetail");
				});
				}
		}
	}
</script>
<style lang="scss" scoped>
@import "./../../css/unit/common";
.my-header{
	color: #FFFFFF;
	background-color:$green;
	text-align:center;
	padding:.32rem;	
	.my-name{
		overflow:hidden;
		text-align:left;
		.user-contain{
			width: 2.43rem;
			height: 2.43rem;
			text-align: center;
			padding: .06rem;
			border-radius: 50%;
			background-color: #FFFFFF;
			img{
				width: 2.3rem;
			height: 2.3rem;			
			vertical-align: middle;			
			border-radius: 50%;
			}
		}
		.my-name-info{
			margin: 0 0 0 .32rem;
			h3{
				font-size: .67rem;
				height: 1.4rem;
				line-height: 1.4rem;
			}
			span{
				font-size: .448rem;
			}
		}
	}
}
.btn-box {
    $height: 2.82rem;
    $padding: .32rem;
    width: 100%;
    height: $height;
    padding: $padding;
    margin: $padding 0 $padding*2;
    background: #fff;
    ul {
      overflow: hidden;
      height: $height - 2 * $padding;
      li {
        width: 33%;
        text-align: center;
        padding: $padding/2 0 0 0;
        height: $height / 2 - $padding;
        position:relative;
        float: left;
        & > .btn-icon{
          height: 1.12rem;
          font-size: .8rem;
          color: $green;
          line-height: 1.12rem;
          display: block;
        }
        & > .btn-text{
          height: .8rem;
          line-height: .8rem;
          font-size: .384rem;
          color: $green;
          display: block;
        }
        & >.num-msg{
        	position: absolute;
        	top: 0.1rem;
        	right: .25rem;
        	width: 0.6rem;
        	height: 0.6rem;
        	font-size: 0.5rem;
        	border-radius: 50%;
        	color: #FFFFFF;
        	text-align: center;
        	line-height:0.6rem ;
        	background-color: #e11112;
        }
       
      }
    }
  }
  .user-info{ 	
    $padding: .32rem 0 0 .32rem;
    width: 100%;
    padding: $padding;
    margin: 0 0 $padding;
    background: #fff;
    ul{
    	overflow: hidden;
    	li{
    		border-bottom: 1px solid #cccccc;
    		overflow: hidden;
    		height: 1.376rem;
    		padding:.24rem .32rem .24rem 0;
    		font-size: .512rem;
    		position: relative;
    	.btn-icon{
          height: 1.12rem;
          font-size: .8rem;
          color: $green;
          line-height: 1.12rem;
          display: inline-block;
        }
        .btn-text{
          height: .8rem;
          line-height: .8rem;
          font-size: .384rem;
          color: $green;
          display: inline-block;
        }
       .num-msg{
        	position: absolute;
        	top: 0.1rem;
        	right: .2rem;
        	width: 0.6rem;
        	height: 0.6rem;
        	font-size: 0.5rem;
        	border-radius: 50%;
        	color: #FFFFFF;
        	text-align: center;
        	line-height:0.6rem ;
        	background-color: #e11112;
        }
    		.iconG{
            color: $green; 
            margin-right: 0.5rem; 
            font-size: .8rem;  
    		}
    		.iconOO{
    			color: #f15323;
    			 margin-right: 0.5rem; 
            font-size: .8rem;
    		}
    		.iconO{
            margin-right: 0.5rem; 
            font-size: .8rem;
            color: $orange;
    		}
    		.price{
    			 float: right;
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