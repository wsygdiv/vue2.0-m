<template>
	<div id="matDetail" class="matDetail">
		<slot name="app-header"></slot>
		<div class="app-content" :class="false == matFlag ? 'autoH' : 'fixH'">
			<!--大图banner Start-->
			<div class="banner-box">
				<div class="banner cont">
					<swiper class="banner-banner" :options="matBanner">
						<swiper-slide class="banner-list" v-for="(bannerUrl,index) in msg.goods_photos" :key="bannerUrl.key" :style="{backgroundImage: 'url(' + bannerUrl + ')'}">
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
			</div>
			<!-- banner End 
		<!--商品详情-->
			<div class="pro-green">
				<h2 v-text="msg.goods_name">虹吸式抽水坐便器马桶</h2>
				<span class="pro-devo" v-text="msg.inventory_type">MP-1008</span>
				<p class="clearfix">
					<span class="new-price" v-text="msg.goods_current_price">￥899</span>
					<span class="num-green">
					库存<span class="storage-num"v-text="msg.goods_inventory">99</span>
					</span>
				</p>
				<p class="old-price" v-text="msg.goods_price">￥1799</p>
			</div>
			<!--规格-->
			<div class="pro-rule">
				<h2>规格参数</h2>
				<!--v-for="specList in msg.spec_list" :key="specList.key"-->
				<div :class="{'autoH1':layout=='iconhide'}"class="specList">
					<div class=""v-for="(specList,index) in msg.spec_list" :key="specList.key" >
						<p class="clearfix">
						   <span class="tit" v-text="specList.specname">品牌</span>
						   <span v-for="(specKind,index) in specList.specvalues":key="specKind.key">
						   	   <span class="tit-content" v-text="specKind">品牌</span>
						   </span>		
					    </p>
					</div>
										
				</div>
				<p class="show-text"style="text-align: center;font-size: .484rem;">
						<span class="show-more iconfont" @click="layout='iconhide'" v-if="layout=='iconmore'">查看更多&#xe61b;</span>
						<span class="show-hide iconfont" @click="layout='iconmore'" v-if="layout=='iconhide'">收回更多&#xe64a;</span>
				</p>
			</div>
			<!--商品详情-->
			<div class="pro-detail">
				<h2>商品详情</h2>
				<div class="pro-content">

				</div>
			</div>
			<!--相关推荐-->
			<div class="pro-commond">
				<h2>相关推荐</h2>
				<ul class="clearfix">
					<li v-for="proDetail in msg.recommend_list" :key="proDetail.key">
						<router-link :to="'/materials/details/'+proDetail.goodId" tag="a">
							<div class="pic" :style="{backgroundImage: 'url(' + proDetail.picUrl + ')'}"></div>
							<p v-text="proDetail.goodName" class="good-name">德国手工水槽单槽</p>
							<p class="good-price">￥<span v-text="proDetail.price"></span></p>
						</router-link>

					</li>

				</ul>
			</div>

		</div>
		<!--购物车-->
		<div class="send-cart" v-if="matFlag">

			<div class="cart-content">
				<span class="close" @click="matFlag = false">X</span>
				<div class="cart-info">
					<div class="pic" :style="{backgroundImage: 'url(' + msg.goods_photos + ')'}"></div>
					<div class="cart-price">
						<p>
							<span class='price-num' v-text="msg.goods_current_price">￥798</span><br/>
						</p>

						<span class="rule-text">请选择规格</span>
					</div>
				</div>
				<div class="specification1"v-for="(specList,index) in msg.spec_list" :key="specList.key" >
						<div class="clearfix" >
						   <span class="tit" v-text="specList.specname">品牌</span>
						   <p v-for="(specKind,index) in specList.specvalues":key="specKind.key">
						   	   <span class="tit-content" v-text="specKind":ref="index === tabFlag ? 'active' : ''"   :class="index === tabFlag ? 'active' : ''" @click="tab(index)">品牌</span>
						   </p>						   
					    </div>
				</div>
				
				<div class="buy-num">
					<span class="num-text">购买数量</span>
					<div class="btn-num">
						<span v-on:click="numChange(-1)">-</span>
						<input type="number" class="num" value="num" v-model="num"/>
						<span v-on:click="numChange(1)">+</span>
					</div>
				</div>
				<div class="btn-sure" @click="btnSure()">
					确定
				</div>
			</div>

		</div>
		<div class="cover" v-show="matFlag">

		</div>
		<div class="btn-buy" v-show="matFlag==false">
			<span class="btn-cart" @click="buy()">加入购物车</span>
			<span class="btn-buy">立即购买</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: "matDetail",
		props: ['serviceUrl'],
		data: () => ({
			gsp:"",
			matFlag: false,
			tabFlag: 0,
			userId: "",
			token: '',
			msg: {},
			num:1,
			layout: 'iconmore',
			matBanner: {
				notNextTick: true,
				autoplay: 4000,
				direction: 'horizontal',
				grabCursor: true,
				setWrapperSize: true,
				autoHeight: true,
				loop: true,
				pagination: '.banner .swiper-pagination',
				observeParents: true,
			},
			
		}),
		methods: {
			buy() {
				this.matFlag = true;
			},
			tab(num) {
				this.tabFlag = num;
			},
			numChange: function(numChange) {
				console.log(this.num);
				if(numChange == 1) {
					this.num++;
				} else if(numChange == -1) {
					this.num--;
				}
				if(this.num <= 1) {
					this.num = 1;
				}
				
			},			
			btnSure() {
				if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
//                  this.gsp.push(this.$refs.active);
                    
                    for (var i = 0;i < this.$refs.active.length;i++) {
                    	var obj=this.msg.spec_list[i].specIds[0];
                    	this.gsp+=obj+",";
                    }
//                   this.gsp=this.gsp.substr()(0,this.gsp.Length-1);
//                  this.gsp=this.gsp.ToString().RTrim(',');
//                  console.log(this.$refs.index[0].innerText);
                    console.log(JSON.stringify(this.gsp));                 
					this.$http({
						url: this.serviceUrl + "app/addCart.htm",
						method: "POST",
						params: {
							token: this.token,
							userId: this.userId,
							price: this.msg.goods_current_price,
							id: this.msg.id,
							count:this.num,
					        gsp:this.gsp,
						},
						headers: {
							"Content-Type": "x-www-from-urlencoded"
						}
					}).then(function(res) {
						console.log(this.userId)
						console.log(this.msg.id)
						console.log(this.token)
						// 请求成功回调
						console.log(JSON.stringify(res.data));
						this.msg = res.data;
						//console.log(this.msg.companyArray)
					}, function(res) {
						// 请求失败回调
						console.log("error from matDetail");
					});
				}
			},
		},
		mounted: function() {

			beforeCreate: {
				this.$http({
//					url: this.serviceUrl + "app/goods.htm",
					url: 'http://192.168.8.183:8088/app/goods.htm',
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
	
	h2 {
		height: 1.2rem;
		line-height: 1.2rem;
		color: #333333;
		font-size: .608rem;
		margin-bottom: .16rem;
	}
	
	.autoH {
		height: auto;
	}
	
	.matDetail {
		background-color: #EEEEEE;
		.app-content {
			position: fixed;
			top: 1.408rem;
			bottom: 1.6rem;
			left: 0;
			width: 100%;
			overflow-y: auto;
		}
		.fixH {
			overflow-y: visible;
		}
		.banner-box {
			$height: 12rem;
			width: 12rem;
			height: $height;
			.banner {
				top: 0;
				left: 0;
				width: 12rem;
				height: $height;
				//position: fixed;
				font-size: .576rem;
				&:after {
					content: "";
					width: 12rem;
					display: block;
					height: $height;
				}
				.banner-banner {
					width: 100%;
					height: $height;
					background: #fff;
					overflow: hidden;
					position: absolute;
					font-size: 0;
					.banner-list {
						@include pic-bg(100%, $height);
					}
				}
			}
		}
		.cover {
			background-color: #CCCCCC;
			width: 100%;
			height: 3rem;
			opacity: .8;
			position: absolute;
			top: 1.408rem;
			z-index: 2;
		}
		.pro-green {
			background-color: #FFFFFF;
			margin-bottom: .32rem;
			padding: .32rem;
			color: #666666;
			h2 {
				@include text-overflow;
			}
			.pro-devo {
				font-size: .5rem;
				margin-bottom: .896rem;
			}
			.old-price {
				text-decoration: line-through;
			}
			p {
				.new-price {
					color: #d4282d;
					font-size: .518rem;
					float: left;
					margin: .32rem .32rem .24rem 0;
				}
				.num-green {
					float: right;
					font-size: .384rem;
					margin: .32rem .32rem .24rem 0;
					color: #666666;
					.storage-num {
						margin: 0 .32rem 0 .16rem;
					}
				}
			}
		}
		.pro-rule {
			background-color: #FFFFFF;
			margin-bottom: .32rem;
			padding: .32rem;
			
			.specList{
				height: 4rem;
				overflow: hidden;
				font-size: .484rem;
			}
			span {
				display: inline-block;
				margin-bottom: .32rem;
			}
			.tit {
				width: 2.88rem;
				float: left;
				color: #666666;
			}
			.tit-content {
				float: left;
			}
			.see-more {
				color: #999999;
				text-align: center;
			}
			.autoH1{
				height:auto;
			}
		}
		.pro-detail {
			background-color: #FFFFFF;
			margin-bottom: .32rem;
			padding: .32rem;
			.pro-content {
				height: 5.44rem;
				background-color: #CCCCCC;
			}
		}
		.pro-commond {
			background-color: #FFFFFF;
			padding: .48rem;
			color: #666666;
			ul {
				background-color: #f5f5f5;
				li:nth-child(2n) {
					margin-right: 0;
				}
				li {
					float: left;
					margin-right: .128rem;
					margin-bottom: .16rem;
					width: 5.44rem;
					background-color: #FFFFFF;
					.pic {
						margin-bottom: .16rem;
						box-sizing: border-box;
						@include pic-bg(5.44rem, 5.44rem);
					}
					p {
						@include text-overflow;
					}
					.good-name {
						font-size: .416rem;
					}
					.good-price {
						font-size: .512rem;
					}
				}
			}
		}
		.btn-buy {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #FFFFFF;
			span {
				display: inline-block;
				height: 1.6rem;
				width: 50%;
				color: #FFFFFF;
				text-align: center;
				line-height: 1.6rem;
				border-top: 1px solid #333333;
				float: left;
			}
			.btn-cart {
				background-color: $orange;
			}
			.btn-buy {
				background-color: $green;
			}
		}
		.send-cart {
			width: 100%;
			overflow: auto;
			background-color: #FFFFFF;
			position: absolute;
			bottom: 0rem;
			font-size: .5rem;
			top: 2.16rem;
			z-index: 90;
			.cart-content {
				overflow: hidden;
				.close {
					position: absolute;
					top: 0;
					right: .16rem;
				}
				.cart-info {
					padding: 1rem 0 0 .32rem;
					overflow: hidden;
					img {
						border: 1px solid #CCCCCC;
					}
					.cart-price {
						margin-top: 1.6rem;
						float: left;
						margin-left: .72rem;
						p {
							margin-bottom: .32rem;
						}
						.price-num {
							font-size: .544rem;
							color: $orange;
						}
						.rule-text {
							font-size: .484rem;
						}
					}
					.pic {
						float: left;
						@include pic-bg(3.55rem, 3.55rem);
					}
				}
				.specification1 {
					padding: 0 0 0 .32rem;
					margin-top: 1rem;
					p {
						margin-bottom: .32rem;
						width:auto;						
					}
					span {
						display: inline-block;
						padding: 0 .24rem;
						height: .8rem;
						text-align: center;
						line-height: .8rem;	
						border-radius: .6rem;
					}
					.active{
						background-color: $orange;
						color: #FFFFFF;
					}
				}
				
				.buy-num {
					overflow: hidden;
					margin: .64rem 0 0 .32rem;
					padding: .64rem 0;
					border-top: 1px solid #CCCCCC;
					.num-text {
						float: left;
						height: 1rem;
						line-height: 1rem;
					}
					.btn-num {
						float: right;
						margin-bottom: 1.68rem;
						margin-right: .608rem;
						.num{
						      width: 1.4rem;
						    font-size: 0.48rem;
						    text-align: center
						}
						span {
							background-color: #CCCCCC;
							color: #000000;
							width: 1rem;
							height: 1rem;
							text-align: center;
							line-height: 1rem;
							display: inline-block;
						}
					}
				}
				.btn-sure {
					text-align: center;
					height: 1.6rem;
					line-height: 1.6rem;
					color: #FFFFFF;
					background-color: $orange;
					position: fixed;
					width: 100%;
					bottom: 0;
				}
			}
		}
	}
</style>