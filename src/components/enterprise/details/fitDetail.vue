<template>
	<!--智能家居详情页-->
	<div id="fitDetail" class="fitDetail">
		<!--公用头部-->
		<slot name="app-header"></slot>
		<div class="app-content">
			<!--大图banner Start-->
			<div class="banner-box">
				<div class="banner cont">
					<swiper class="banner-banner" :options="headerBanner">
						<swiper-slide class="banner-list" v-for="bannerUrl in msg.images" :key="bannerUrl.key" :style="{backgroundImage: 'url(' + bannerUrl.image + ')'}">
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</div>
			</div>
			<!-- banner End -->
			<div class="fitDetail-box">
				<ul>
					<li class="clearfix">
						<div class="enterprise-img fl">
							<img :src="msg.logo" class="pic"/><br/>
						</div>
						<div class="company fl">
							<h3>{{msg.name}}</h3>
							<div class="">
								<span class="approve" :class="{'approveY':msg.license}">营</span>
								<span class="approve" :class="{'approveR':msg.accessory}">认</span>
								<span class="approve" :class="{'approveH':msg.discountContent}">惠</span>
								<span class="approve" :class="{'approveJ':msg.bond}">金</span>
								<span>5000元</span>
								<span class="approve" :class="{'approveS':msg.applyDesignCount}">设</span>
								<span>50套</span>
							</div>
						</div>
					</li>
				</ul>
				<p><span class="iconfont">&#xe645;</span>北京市海淀区永泰西里7号楼1单元</p>
			</div>
			<!--公司简介-->
			<div class="company-info">
				<div class="header-info">公司简介</div>
				<div v-html="msg.briefIntro" style="text-indent: 2em;">北京佳时特装饰工程有限公司是一家集家居设计、公装设计、绿化园艺设计与施工， 并包含配套主材产品销售于一体的大型装饰企
					<!--<router-link class="iconfont" to="/enterprise/details" tag="a">更多&#xe608;</router-link>-->
					
				</div>
				<a href="javascript:;"class="iconfont">更多&#xe608;</a>
			</div>
			<div class="design-idea">
				<div class="tit">
					<span>设计方案</span>
					<!--<router-link class="iconfont" to="/enterprise/details" tag="a">更多&#xe602;</router-link>-->
					<a href="#"class="iconfont" >更多&#xe602;</a>
				</div>
				<!-- 设计方案banner Start -->
				<div class="fitDetail-design">
					<swiper class="enterprise-count" :options="designBanner">
						<swiper-slide v-for="designUrl in msg.workSet" :key="designUrl.key" class="enterprise-list">
							<div class="pic" :style="{width:'100%'}">
								<img :src="designUrl.picUrl" />
								<p class="tit" v-text="designUrl.address">房屋地址</p>
								<div>
									<span>户型&nbsp;&nbsp;|</span><span v-text="designUrl.siteClass">现代</span>
									<span>|&nbsp;&nbsp;面积&nbsp;&nbsp;|</span><span v-text="designUrl.size">200万</span>
								</div>

							</div>
						</swiper-slide>
					</swiper>
				</div>
				<!-- banner End -->

			</div>
			<div class="design-team">
				<div class="tit">
					<span>设计团队</span>
					<!--<router-link class="iconfont" to="/enterprise" tag="a">更多&#xe602;</router-link>-->
					<a href="javascript:;"class="iconfont">更多&#xe602;</a>
				</div>
				<!-- 设计团队banner Start -->
				<div class="fitDetail-team">
					<swiper class="enterprise-count" :options="teamBanner">
						<swiper-slide v-for="teamUrl in msg.designerList" :key="teamUrl.key" class="enterprise-list">
							<div class="pic" :style="{width:'100%'}">
								<div class="pic" :style="{backgroundImage: 'url(' + teamUrl.designerPic + ')'}"></div>
								<div v-text="teamUrl.name">
									现代
								</div>

							</div>
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
		name: "fitDetail",
		props: ['serviceUrl'],
		data: () => ({
			msg: {},
			designBanner: {
				slidesPerView: "auto",
				spaceBetween: 25,
			},
			teamBanner: {
				slidesPerView: "auto",
				spaceBetween: 25,
			},
			headerBanner: {
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
		mounted: function() {
			beforeCreate: {
				this.$http({
					url: this.serviceUrl +"app/decorateDetail.htm",
					method: "POST",
					// 请求后台发送的数据
					params: {
						id: this.$route.params.id,
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
					console.log("error from fitDetail");
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
	
	//本页面通用tit Start
	.tit {
		$height: 1.408rem;
		width: 100%;
		height: $height;
		line-height: $height;
		&>span {
			color: #333333;
			font-size: .608rem;
		}
		&>a.iconfont {
			float: right;
			color: #999999;
			font-size: .384rem;
		}
	}
	
	//本页面通用tit End
	.fitDetail {
		background-color: #eeeeee;
		.app-content {
			position: fixed;
			top: 1.408rem;
			bottom: 0;
			left: 0;
			width: 100%;
			overflow-y: auto;
		}
		.banner-box {
			$height: 6.81rem;
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
		.fitDetail-box {
			position: relative;
			background-color: #f8f8f8;
			margin-bottom: .32rem;
			padding: 0 .32rem .5rem .32rem;
			p {
				position: relative;
				font-size: .384rem;
				span {
					margin-right: .16rem;
				}
			}
			ul {
				margin-bottom: .8rem;
				li {
					.enterprise-img {
						color: #666666;
						position: absolute;
						font-size: .364rem;
						top: -0.64rem;
						z-index: 99;
						.pic {
							margin-top: .32rem;
							@include pic-bg(2.08rem, 2.08rem);
						}
					}
					.company {
						padding: .16rem .32rem;
						margin-left: 2.4rem;
						h3 {
							margin-bottom: .233rem;
							max-width: 6.4rem;
							@include text-overflow;
						}
						.approve {
							color: #FFFFFF;
							width: .5rem;
							height: .5rem;
							text-align: center;
							line-height: .5rem;
							margin-right: .08rem;
							padding: .08rem;
							background-color: #bebebe;
						}
						.approveY {
							background-color: #76ccd3;
						}
						.approveR {
							background-color: #fca667;
						}
						.approveH {
							background-color: #bebebe;
						}
						.approveJ {
							background-color: #e4bc76;
							margin-right: 0;
						}
						.approveS {
							background-color: $green;
						}
					}
				}
			}
		}
		.company-info {
			padding: .32rem;
			margin-bottom: .32rem;
			background-color: #f8f8f8;
			position: relative;
			.header-info {
				color: #000;
				font-size: .608rem;
				height: .72rem;
				line-height: .72rem;
			}
			a {
				position: absolute;
				bottom: 0.32rem;
				right: 0.32rem;
				color: #999;
				font-size: .384rem;
			}
		}
		.design-idea {
			padding: .32rem;
			margin-bottom: .32rem;
			background-color: #f8f8f8;
			li {
				width: 4.8rem;
				height: 5.12rem;
				background-color: #FFFFFF;
			}
		}
		.design-team {
			padding: .32rem;
			margin-bottom: .32rem;
			background-color: #f8f8f8;
			li {
				background-color: #FFFFFF;
			}
		}
		.fitDetail-design {
			overflow: hidden;
			position: relative;
			background: #fff;
			padding: .32rem;
			$width: 4.96rem;
			border-bottom: 1px solid #CCCCCC;
			.enterprise-count {
				.enterprise-list {
					width: $width;
					.pic {
						width: $width;
						box-sizing: border-box;
						font-size: .38rem;
						img {
							width: $width;
							height: 3.55rem;
						}
						div {
							color: #666666;
							span {
								margin-right: .16rem;
							}
						}
					}
				}
			}
		}
		.fitDetail-team {
			overflow: hidden;
			position: relative;
			background: #fff;
			padding: .32rem;
			$width: 4.96rem;
			border-bottom: 1px solid #CCCCCC;
			.enterprise-count {
				.enterprise-list {
					width: $width;
					.pic {
						width: $width;
						box-sizing: border-box;
						font-size: .484rem;
						img {
							width: $width;
							height: 3.55rem;
						}
						div {
							color: #666666;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>