<template>
	<div id="capacity" class="capacity">
		<!--公用头部-->
		<slot name="app-header"></slot>
		<!-- 顶部轮播图 Start -->
		<div class="capacity-header">
			<swiper class="enterprise-count" :options="bannerSwiper1">
				<swiper-slide v-for="(enterpriseList,index) in msg.companyArray" :key="enterpriseList.key" class="enterprise-list">
					<div class="pic1" @click="tab(index)">
						<img :src="enterpriseList.logo" alt="" :style="{height: '1.224rem',width:'100%'}">
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<div class="app-content">
			<div v-for="(content,index) in msg.companyArray" :key="content.key" class="numCapacity" v-if="active==index">
				<!--大图banner Start-->
				<div class="banner-box">
					<div class="banner cont">
						<swiper class="banner-banner" :options="bannerSwiper2">
							<swiper-slide class="banner-list" v-for="bannerList in content.lunbo" :key="bannerList.key" :style="{backgroundImage: 'url(' + bannerList + ')'}">
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
					</div>
				</div>
				<!-- banner End 
		<!--企业简介-->
				<div class="company-info">
					<div class="company-text" :class="{'autoH':layout=='iconhide'}" v-html="content.introduce">

					</div>
					<p class="show-text">
						<span class="show-more iconfont" @click="layout='iconhide'" v-if="layout=='iconmore'">&#xe632;</span>
						<span class="show-hide iconfont" @click="layout='iconmore'" v-if="layout=='iconhide'">&#xe603;</span>
					</p>
				</div>
				<!-- 底部banner Start -->
				<div class="capacity-footer">
					<swiper class="enterprise-count" :options="bannerSwiper3">
						<swiper-slide v-for="enterpriseUrl in content.serviceGoods" :key="enterpriseUrl.key" class="enterprise-list">
							<div class="pic" :style="{backgroundImage: 'url(' + enterpriseUrl + ')'}"></div>
						</swiper-slide>
					</swiper>
				</div>
				<!-- banner End -->
			</div>

		</div>

	</div>
</template>
<script>
	export default {
		name: "capacity",
		props: ['serviceUrl'],
		data: () => ({
			layout: 'iconmore', //初始化显示的样式
			active: "0",
			flag: 0,
			msg: {},
			bannerSwiper1: {
				slidesPerView: "auto",
				spaceBetween: 25,
			},
			bannerSwiper2: {
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
			bannerSwiper3: {
				slidesPerView: "auto",
				spaceBetween: 25,
			}
		}),
		methods: {
			tab(index) {
				this.active = index;
			},
		},
		mounted: function() {
			beforeCreate: {
				this.$http({
					url: this.serviceUrl + "applet/smartHomeList.htm",
					method: "POST",
					// 请求后台发送的数据
					params: {
						type: 3,
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
					console.log("error from capacity");
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "./../../css/unit/common";
	.swiper-container {
		overflow: initial;
	}
	
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
	
	.capacity {
		background-color: #FFFFFF;
	}
	
	.app-content {
		position: fixed;
		top: 3.76rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: auto;
		background-color: #FFFFFF;
	}
	.numCapacity{
		padding: .64rem 0;
	}
	.enterprise-header {
		text-align: center;
		border-bottom: 2px solid #cccccc;
		padding: .333rem 0;
		.header-text {
			text-align: center;
			width: 80%;
		}
		span {
			color: $green;
			width: 10%;
			font-size: 0.896rem;
		}
	}
	/*按钮切换*/
	
	.capacity-header {
		position: fixed;
		width: 100%;
		top: 1.408rem;
		background: #fff;
		z-index: 9;
		padding: .32rem;
		$width: 3.36rem;
		border-bottom: 2px solid #CCCCCC;
		.enterprise-count {
			$enterpriseHeight: 1.728rem;
			height: $enterpriseHeight;
			.enterprise-list {
				width: $width;
				height: $enterpriseHeight;
				padding: 0.256rem 0;
				border: 1px solid #CCCCCC;
				border-radius: 0.08rem;
				box-sizing: border-box;
				.pic {
					width: $width;
					box-sizing: border-box;
					@include pic($width, ($enterpriseHeight - 1.504rem));
				}
			}
		}
	}
	
	.tab-capacity {
		border-bottom: 1px solid #CCCCCC;
	}
	
	.company-info {
		padding: .64rem;
		.company-text {
			height: 2.6rem;
			overflow: hidden;
			font-size: .484rem;
			h2 {
				margin-bottom: .32rem;
				height: 1rem;
				overflow: hidden;
				line-height: 1rem;
			}
		}
		.autoH {
			height: auto;
			font-size: .484rem;
		}
		.show-text {
			text-align: center;
		}
		.show-more {
			color: $green;
		}
		.show-hide {
			color: $green;
		}
	}
	
	.count {
		position: fixed;
		top: 0;
		width: 100%;
		bottom: 1.6rem;
		overflow-y: auto;
		//banner Start
		.banner-box {
			$height: 5.44rem;
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
		//banner End
		//banner下按钮小集合 Start
		.btn-box {
			$height: 5.12rem;
			$padding: .32rem;
			width: 100%;
			height: $height;
			padding: $padding;
			margin: 0 0 $padding;
			background: #fff;
			ul {
				overflow: hidden;
				height: $height - 2 * $padding;
				li {
					width: 20%;
					text-align: center;
					padding: $padding/2 0 0 0;
					height: $height / 2 - $padding;
					float: left;
					&>.btn-icon {
						height: 1.12rem;
						font-size: .8rem;
						color: $green;
						line-height: 1.12rem;
						display: block;
					}
					&>.btn-text {
						height: .8rem;
						line-height: .8rem;
						font-size: .384rem;
						color: #222;
						display: block;
					}
					&:nth-child(1),
					&:nth-child(8) {
						&>.btn-icon {
							font-size: .96rem;
						}
					}
				}
			}
		}
		//banner下按钮小集合 End
		//本页面通用tit Start
		.tit {
			$height: 1.408rem;
			width: 100%;
			height: $height;
			line-height: $height;
			&>span {
				color: #333;
				font-size: .608rem;
			}
			&>a.iconfont {
				float: right;
				color: #999;
				font-size: .384rem;
			}
		}
		//本页面通用tit End
		.capacity-footer {
			overflow: hidden;
			position: relative;
			background: #fff;
			padding: .32rem .32rem .64rem .32rem;
			$width: 3.2rem;
			border-bottom: 1px solid #CCCCCC;
			.enterprise-count {
				$enterpriseHeight: 3.2rem;
				height: $enterpriseHeight;
				.enterprise-list {
					width: $width;
					height: $enterpriseHeight;
					.pic {
						width: $width;
						box-sizing: border-box;
						@include pic-bg($width, 3.2rem);
					}
				}
			}
		}
	}
</style>