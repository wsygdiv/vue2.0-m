<template>
	<div id="enterprise" class="enterprise">
		<!--公用头部-->
	    <slot name="app-header"></slot>
	    <div class="app-content">
	    	<div class="enterprise-box">
			<ul>
				<li class="clearfix"v-for="enterprise in msg.decorate" :key="enterprise.key">
					<div class="enterprise-img fl">
						 <div class="pic" ><img :src="enterprise.logo"/></div>
						<span>
     	   		  	  	 已有<span class="numConsult">0</span>人咨询
						</span>
					</div>
					<div class="company fl">
						<h3>{{enterprise.companyName}}</h3>
						<div class="">
							<span class="approve":class="{'approveY':enterprise.license}">营</span>
							<span class="approve":class="{'approveR':enterprise.accessory}">认</span>
							<span class="approve":class="{'approveH':enterprise.discountContent}">惠</span>
							<span class="approve":class="{'approveJ':enterprise.bond}">金</span>
							<span>5000元</span>
							<span class="approve":class="{'approveS':enterprise.applyDesignCount}">设</span>
							<span>50套</span>
						</div>
					</div>
				
					<span class="enterprise-btn fl">
						   <router-link  :to="'/enterprise/details/'+enterprise.id" tag="a">装修预约</router-link>
					</span>
				</li>
				
			</ul>
		</div>
	
	    </div>
		</div>
</template>
<script>
	export default {
		name: "enterprise",
		props: ['serviceUrl'],
		data: () => ({
           msg:{},
		}),
		mounted: function() {
			beforeCreate: {
				this.$http({
					url: this.serviceUrl +"app/decorate.htm",
					method: "POST",

					// 请求后台发送的数据
					params: {
						type:3,
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
					console.log("error from enterprise");
				});
			}
		}
		
	}
</script>
<style lang="scss" scoped>
	@import "./../../css/unit/common";
	.clearfix:after {
		content: "";
		display: block;
		visibility: hidden;
		height: 0;
		clear: both;
	}
	
	.clearfix {
		zoom: 1;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	.enterprise{
		background-color: #FFFFFF;
	}
    .app-content{
    	background-color: #FFFFFF;
		position: fixed;
		top: 1.408rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: auto;
    }
	.enterprise-header {
		text-align: center;
		border-bottom: 2px solid #cccccc;
		padding: .333rem 0;
		
		.header-text {
			text-align: center;
			width: 80%;
		}
		span{
			color: $green;
			width:10%;
			font-size: 0.896rem;
		}
	}
	
	.enterprise-box {
		ul { 
			padding: 0 0 .333rem .333rem; 
		    li:last-child{
		    	border: none;
		    }
			li {
				height: 3.44rem;
				border-bottom: 1px solid #cccccc;
				.enterprise-img{
					 color: #666666;
					 font-size: .364rem;
					 .numConsult {
			        color: $orange;
		             }
		             .pic{
		             	margin-top: .32rem;
		             	@include pic(1.80rem, 1.80rem);
		             }
				}
				.enterprise-btn{
					background-color: $orange;
					padding: .133rem;					
					margin-top: 1rem;
					border-radius: .119rem;
					a{
						color: #FFFFFF;
					}
				}
				.company{
					padding: .333rem;
					margin-top: .233rem;
					h3{
						  margin-bottom: .233rem;
						  font-size: .484rem;
						  max-width: 6.4rem;
						  @include text-overflow;
					}
					 .approve{
					 	  color: #FFFFFF;
					 	  width: .5rem;
					 	  height: .5rem;
					 	  text-align: center;
					 	  line-height: .5rem;
					 	  margin-right: .08rem;
					 	  padding: .08rem;
					 	  background-color:#bebebe;
					 	  font-size: .356rem;
					 }
					 .approveY{
					 	  background-color:#76ccd3 ;
					 }
					 .approveR{
					 	  background-color:#fca667 ;
					 }
					 .approveH{
					 	  background-color:#bebebe ;
					 }
					 .approveJ{
					 	  background-color:#e4bc76 ;
					 	  margin-right: 0;
					 }
					 .approveS{
					 	  background-color:$green ;
					 }
				}
			}
		}
		
	}
</style>