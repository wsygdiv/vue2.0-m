<template>
	<div id="fitment" class="fitment">
		<!--公用头部-->
		<slot name="app-header"></slot>
		<!--按钮列表-->
		<div class="tab-fitment">
			<ul class="clearfix">
					<li class="" @click="fitTab(0)" :class="0 === fitFlag ? 'active' : ''">
						套餐装修
					</li>
					<li class="" @click="fitTab(1)" :class="1  === fitFlag ? 'active' : ''">
						定制装修
					</li>
					<li class="" @click="fitTab(2)" :class="2 === fitFlag ? 'active' : ''">
						整栋装修
					</li>
			</ul>
		</div>
		<div class="app-content">			
			<swiper :options="onTabSwiper" ref="onTabSwiper">
				<!--套餐装修-->
				<swiper-slide>

				</swiper-slide>
				<!--平台列表定制装修-->
				<swiper-slide>
					<div v-for="(msgList,index) in msg"v-if="index ==1">
						<div class="customization-box" >
							<div class="enterprise-designer clearfix">
								<h2>大牌设计师在线</h2>
								<swiper :options="fitSwiper" class="enterprise-count">
									<swiper-slide v-for="bannerAut in msg[0].list" :key="bannerAut.key" class="banner-aut">
										<div class="">
											<div class="pic" :style="{backgroundImage: 'url(' + bannerAut.designerPic + ')'}"></div>
											<div class="fitment-design-aut" v-text="bannerAut.name">严海明</div>
										</div>
									</swiper-slide>
								</swiper>
							</div>
							<ul class="info-box clearfix">
								<li v-for="infoBox in msg[1].list" :key="infoBox.key">
									<div class="order-img fl">
										<div class="pic" :style="{backgroundImage: 'url(' + infoBox.designerPic + ')'}"></div><br/>
									</div>
									<div class="order-info fl">
										<div class="info-tit" v-text="infoBox.name"></div>
										<p><span class="info-header">所在城市：</span><span>广东深圳</span></p>
										<p><span class="info-header">擅长空间：</span><span>家居住宅,别墅豪宅，办公室，电视</span></p>
										<p><span class="info-header">作品：</span><span class="info-num">32套</span><span class="info-header">预约数</span><span>333</span></p>
									</div>
									<span class="btn-dec">装修预约</span>

								</li>
								<!-- Main List 为空的时候 -->
								<li class="cue-box" v-if="msg[1].list.length == 0">
									<div class="cue">暂无数据...</div>
								</li>
								<!-- Main List 加载更多 -->
								<infinite-loading @infinite="infiniteHandler($event,1)" spinner="circles" v-if="msg[1].list.length != 0">
									<!-- 加载更多却没有数据的时候 -->
									<div class="no-more" slot="no-more">
										该分类下没有更多了...
									</div>
									<div class="no-more" slot="no-results">
										该分类下没有更多了...
									</div>
								</infinite-loading>
							</ul>

						</div>

					</div>
				</swiper-slide>
				<!--平台列表整栋装修-->
				<swiper-slide>
					<div v-for="(msgList,index) in msg" v-if="index ==2">
						<div class="combo-box">
							<ul>
								<li class="clearfix" v-for="fittab in msgList.list">
									<div class="enterprise-img fl">
										<div class="pic" ><img :src="fittab.logo"/></div>
										<span>
     	   		  	  	 已有<span class="numConsult">0</span>人咨询
										</span>
									</div>
									<div class="company fl">
										<h3 v-text="fittab.companyName">公司名称</h3>
										<div class="">
											<span class="approve" :class="{'approveY':fittab.license}">营</span>
											<span class="approve" :class="{'approveR':fittab.accessory}">认</span>
											<span class="approve" :class="{'approveH':fittab.discountContent}">惠</span>
											<span class="approve" :class="{'approveJ':fittab.bond}">金</span>
											<span>5000元</span>
											<span class="approve" :class="{'approveS':fittab.applyDesignCount}">设</span>
											<span>50套</span>
										</div>
									</div>

									<span class="enterprise-btn fl">
						                                                                 装修预约
					                </span>
								</li>
								<!-- Main List 为空的时候 -->
								<li class="cue-box" v-if="msg[1].list.length == 0">
									<div class="cue">暂无数据...</div>
								</li>
								<!-- Main List 加载更多 -->
								<infinite-loading @infinite="infiniteHandler($event,2)" spinner="circles" v-if="msg[2].list.length != 0">
									<!-- 加载更多却没有数据的时候 -->
									<div class="no-more" slot="no-more">
										该分类下没有更多了...
									</div>
									<div class="no-more" slot="no-results">
										该分类下没有更多了...
									</div>
								</infinite-loading>

							</ul>
						</div>

					</div>
				</swiper-slide>

			</swiper>

		</div>

	</div>
</template>
<script>
	import InfiniteLoading from 'vue-infinite-loading';
	export default {
		name: "fitment",
		props: ['serviceUrl'],
		components: {
			InfiniteLoading,
		},
		data: () => ({
			msg: {},
			pageSize: 5, //每页 数据个数
			fitFlag: 0, //切换swiper 的index  同时也是请求的第几个（类别）数据
			fitSwiper: {
				slidesPerView: "auto",
				spaceBetween: 25,
				freeMode: true,
			},
			onTabSwiper: {
				notNextTick: true,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: false, //修改swiper的父元素时，自动初始化swiper
				onSlideChangeEnd: function(swiper) {
					swiper.update();
				},
			},
		}),
		computed: {
			onTabSwiperFn() {
				return this.$refs.onTabSwiper.swiper;
			},

		},
		methods: {
			fitTab(num) {
				this.onTabSwiperFn.slideTo(num, 300, false);
				this.fitFlag = num;
			},
			infiniteHandler($state, num) {
//				 console.log(this.tabFlag);
				 console.log(num);
				if(this.msg[num].currentPage >= this.msg[num].totalPage) {
					$state.complete();
				} else {
					this.$http({
						url: this.serviceUrl + "app/decoratePageList.htm",
						method: "POST",
						params: {
							type: 1, //请求那个分类下的数据
							currentPage: parseInt(this.msg[num].currentPage) + 1, //请求第几页的数据
							pageSize: this.pageSize
						},
						headers: {
							"Content-Type": "x-www-from-urlencoded"
						}
					}).then((res) => {
						console.log(JSON.stringify(res.data));
						//更新数据
						this.msg[num].currentPage = res.data.currentPage;
						this.msg[num].totalPage = res.data.totalPage;
						for(let i = 0, max = res.data.list.length; i < max; i++) {
							this.msg[num].list.push(res.data.list[i]);
						}
						$state.loaded();
						console.log(JSON.stringify(this.msg));
					}, (res) => {
						console.log("error from fitment");
					});
				}
			},
		},
		mounted() {
			//do something after mounting vue instancev  ----------↓----------↓----------
			var that = this;
			//加载默认数据
			this.$http({
				url: this.serviceUrl +"app/platform.htm",
				method: "POST",
				params: {
					pageSize: this.pageSize
				},
				headers: {
					"Content-Type": "x-www-from-urlencoded"
				}
			}).then((res) => {
				console.log(JSON.stringify(res.data));
				this.msg = res.data;
			}, (res) => {
				console.log("error from fitment");
			});
			//切换Swiper的时候 改变Tab状态
			this.onTabSwiperFn.params.onSlideChangeEnd = function(swiper) {
				that.fitFlag = swiper.activeIndex;
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
	.no-more {
				font-size: .4rem;
			}
	.fitment {
		background-color: #FFFFFF;		
	}
	
	.app-content {
		position: fixed;
		top: 3.1rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: auto;
		background-color: #FFFFFF;
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
	/*按钮列表*/
	
	.tab-fitment {
		width: 100%;
		position: fixed;
		top: 1.408rem;
		border-bottom: 1px solid #CCCCCC;
		background-color: #FFFFFF;
		li {
			height: 1.7rem;
			line-height: 1.7rem;
			float: left;
			margin-left: 14%;
			color: #999999;
			font-size: .484rem;
		}
		.active {
			border-bottom: 2px solid $green;
			color: #333333;
		}
	}
	/*套餐*/
	
	.combo-box {
		ul {
			padding: 0 0 .333rem .333rem;
			li {
				position: relative;
				height: 3.44rem;
				border-bottom: 1px solid #cccccc;
				font-size: .484rem;
				.enterprise-img {
					color: #666666;
					font-size: .364rem;
					.numConsult {
						color: $orange;
					}
					.pic {
						margin-top: .32rem;
						border: 1px solid #ccc;
						@include pic(1.79rem,1.79rem);
					}
				}
				.enterprise-btn {
					background-color: $orange;
					padding: .133rem;
					color: #FFFFFF;
					top: 1rem;
					border-radius: .119rem;
					position: absolute;
					right: .48rem;
				}
				.company {
					padding: .333rem;
					margin-top: .233rem;
					h3 {
						width: 6.56rem;
						margin-bottom: .233rem;
						height: .672rem;
						font-size:.484rem;
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
						font-size: .356rem;
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
	/*定制装修*/
	
	.customization-box {
		background-color: #CCCCCC;
		.enterprise-designer {
			padding: 0 0 .333rem .333rem;
			background-color: #FFFFFF;
			margin-bottom: .32rem;
			h2 {
				height: 1.36rem;
				line-height: 1.36rem;
			}
			.banner-aut {
				float: left;
				width: 3rem;
				.fitment-design-aut {
					text-align: center;
				}
				.pic {
					@include pic-bg(3rem,3.84rem);
				}
			}
		}
		.info-box {
			padding: 0 0 .333rem .333rem;
			background-color: #FFFFFF;
			.cue-box {
				font-size: .448rem;
			}
			
			li {
				position: relative;
				overflow: hidden;
				margin-bottom: .32rem;
				padding: .32rem 0;
				.btn-dec {
					position: absolute;
					right: .48rem;
					top: 0.32rem;
					display: inline-block;
					background-color: $green;
					color: #FFFFFF;
					padding: .16rem;
				}
				.order-img {
					.pic {					
					@include pic-bg(3.04rem,3.04rem);
					}
				}
				.order-info {
					width: 7.86rem;
					font-size: .416rem;
					margin-left: .32rem;
					.info-tit {
						font-size: .512rem;
						font-weight: bold;
						margin-bottom: .24rem;
					}
					.info-header {
						color: #999999;
						margin-right: .16rem;
					}
					p {
						@include text-overflow;
						margin-bottom: .08rem;
					}
					.info-num {
						margin-right: 1.2rem;
					}
				}
			}
		}
	}
</style>