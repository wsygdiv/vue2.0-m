<template>
	<div id="myInfo" class="myInfo">
    <div class="my-header"style="">
    	<div class=""style="display: block;overflow: hidden;margin-bottom: .16rem;">
    		<span class="iconfont"style="float: left;font-size: .672rem;margin-left:.12rem"@click="back">
    		&#xe601;
    	   </span>
    	 <span >
    	 	    <router-link  class="iconfont"tag="a"to="/my/setEdit"style="float: right;font-size: .672rem;margin-right:.12rem;color: #FFFFFF;">&#xe644;</router-link>
    	 </span>
    	</div>
    	
    	 <div class="my-name">
    	 	   <span class="user-contain"style=""><img src="../../../assets/user.png"/></span>
    	 	   <div class="my-name-info" style="">
    	 	   	   <h3>Alisa</h3>  	 	   	   
    	 	   </div>     	 
    	 </div>
    </div>
		
		<div class="user-info">
			  <ul>
			  	<li>
			  		<span class="iconfont iconG fl">&#xe6b2;</span>
			  		<span class="user-info-name">我的资料</span>
			  		<span class="edit-more"><router-link to="/my/list/details"class="iconfont"tag="a">编辑更多&#xe602;</router-link></span>
			  	</li>
			  	<li>
			  		<span class="iconfont iconG fl"></span>
			  		<span class="user-info-name"><span class="user-tit">用户名</span><span class="price">Ali</span></span>
			  		
			  	</li>
			  	<li>
			  		<span class="iconfont iconG fl"></span>
			  		<span class="user-info-name"><span class="user-tit">出生日期</span><span class="price">0.00元</span></span>
			  		
			  	</li>
			  	<li>
			  		<span class="iconfont iconG fl"></span>
			  		<span class="user-info-name"><span class="user-tit">性别 </span><span class="price">0.00元</span></span>
			  		
			  	</li>
			  	<li>
			  		<span class="iconfont iconG fl"></span>
			  		<span class="user-info-name"><span class="user-tit">兴趣爱好</span><span class="price">0.00元</span></span>
			  		
			  	</li>
			  </ul>
		</div>

	</div>
</template>
<script>
	export default {
		name: "myInfo",
		props: ['serviceUrl'],
		data: () => ({
			
		}),
		methods:{
			back() {
			      this.$router.go(-1);
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
	
	color: #FFFFFF;
	text-align:center;
	padding:.32rem;	
	background: url(../../../assets/bgImg.png) no-repeat center left;
	.my-name{
		overflow:hidden;
		text-align:center;
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
        	right: 1.1rem;
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
    		.iconG{
            color: $green; 
            margin-right: 0.5rem; 
            font-size: .8rem; 
            width: 50px; 
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
    			.user-tit{
    				width: 2.5rem;
    			    display: inline-block;
    			    color: #999999;
    			}
    		}
    	}
    }
  }
  
</style>