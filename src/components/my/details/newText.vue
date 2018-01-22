<template>
	<div id="editInfo" class="editInfo">
    <div class="my-header">
    	<span class="iconfont"style="position:absolute;font-size: .672rem;left: .32rem;"@click="back">
    	 	    &#xe601;
    	 </span>
    	 <span style="text-align: center;font-size: .554rem;color: #333333;">新消息通知</span>
    	 
    </div>
		
		<div class="user-info user-main">
			  <ul>
			  	<li>			  		
			  		<span class="user-info-name">接收私信</span>
			  		<span class="edit-more"><mt-switch class="mtS"></mt-switch></span>
			  		
			  	</li>
			  	<li>			
			  		<span class="user-info-name">系统通知</span>
			  		<span class="edit-more"><mt-switch class="mtS"></mt-switch></span>		  		
			  	</li>
			    <li>			  		
			  		<span class="user-info-name">社区消息</span>
			  		<span class="edit-more"><mt-switch class="mtS"></mt-switch></span>
			  	</li>
			  	<li>			  		
			  		<span class="user-info-name">系统公告</span>
			  		<span class="edit-more"><mt-switch class="mtS"></mt-switch></span>
			  	</li>
			  </ul>
		</div>

	</div>
</template>
<script>
	export default {
		name: "editInfo",
		props: ['serviceUrl'],
		data: () => ({
			
		}),
		methods:{
			back() {
		      this.$router.go(-1);
		   },
		},
		mounted: function() {

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
  .user-info{ 	
    $padding: .32rem 0 0 .32rem;
    width: 100%;
    /*padding: $padding;*/
    margin: .24rem 0 .24rem 0;
    ul{
    	background-color: #FFFFFF;
    	padding: 0 .32rem;
    	overflow: hidden;
    	li{
    		border-bottom: 1px solid #cccccc;
    		overflow: hidden;
    		height: 1.376rem;
    		padding:.24rem 0 .24rem 0;
    		font-size: .512rem;
    		background-color: #FFFFFF;
    		
    		.edit-more{
    			 float: right;
    			 a{
    			 	color: #999999;
    			 }
    			.mtS /deep/.mint-switch-core{
    			 	width: 1.664rem;
    			 	height: 1rem;
    			 	border-radius: .448rem;
    			 }
    			.mtS /deep/ .mint-switch-input:checked + .mint-switch-core{
    			      border-color: $green;
                      background-color: $green;
    			 }
    			.mtS /deep/ .mint-switch-input:checked + .mint-switch-core::after{
    				-webkit-transform: translateX(20px);
                    transform: translateX(42px);
    			}
			   .mtS /deep/ .mint-switch-core::after {
					    width: .96rem;
					    height: .96rem;
					    background-color: #fff;
					    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
					    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
			    }
			  .mtS /deep/  .mint-switch-core::after, .mint-switch-core::before{
			    	    border-radius: 28px;
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