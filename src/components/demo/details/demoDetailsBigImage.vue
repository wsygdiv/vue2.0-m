<template>
	<div id="demoDetailsBigImage" class="demo-details-big-image">
		<!-- Header Start -->
		<slot name="app-header"></slot>
		<!--<img src="../../../../../../../Tencent Files/842200016/FileRecv/deco-m2/src/assets/gwc-img.png"ref='myBox' class="img"v-finger:tap="tap" v-finger:multipoint-start="multipointStart" v-finger:swipe="swipe" v-finger:pinch="pinch" v-finger:rotate="rotate" v-finger:multipoint-end="multipointEnd"v-finger:double-tap="doubleTap"/>-->
		<!-- Header End -->
		<swiper :options="bigImage" class="bigImage" res="bigImage">
			<swiper-slide v-for="(bigImageList,index) in msg.photos" :key="bigImageList.key">
				<!--:style="{width:bigImageList.param.magnifier.width + 'px',height:bigImageList.param.magnifier.height + 'px'}"-->
				<div class="swiper-zoom-container">
					<img ref='myBox' class="img" :src="bigImageList.bigpath" alt="" v-finger:multipoint-start="evt => multipointStart(evt, index)" v-finger:press-move="evt => pressMove(evt, index)" v-finger:swipe="evt => swipe(evt, index)" v-finger:pinch="evt => pinch(evt, index)" v-finger:multipoint-end="evt => multipointEnd(evt, index)" v-finger:double-tap="evt => doubleTap(evt, index)" />
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>
<script>
	import Transform from 'alloyfinger/transformjs/transform'
	export default {
		name: "demoDetailsBigImage",
		props: ['serviceUrl'],
		data: () => ({
			msg: [],
			initScale: 1,
			flag: 0,
			currentIndex: 0,
			bigImage: {
				slidesPerView : 'auto',
				centeredSlides : true,
				watchSlidesProgress: true,
				notNextTick: true,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: false, //修改swiper的父元素时，自动初始化swiper
				onSlideChangeEnd: function(swiper) {
					swiper.update();
				},
				zoom: true,
				zoomMax: 2,
				//							 direction: 'vertical',
				//							 autoHeight: true,
				//							 slidesPerView: 'auto',
			},
		}),
		computed: {
			demoDetailsFn() {
				return this.$refs.bigImage.swiper
			},
		},
		methods: {
			onProgress: function(swiper) {
				for(var i = 0; i < swiper.slides.length; i++) {
					var slide = swiper.slides[i];
					var progress = slide.progress;
					scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
					es = slide.style;
					es.opacity = 1 - Math.min(Math.abs(progress / 2), 1);
					es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0px,0,' + (-Math.abs(progress * 150)) + 'px)';

				}
			},

			onSetTransition: function(swiper, speed) {
				for(var i = 0; i < swiper.slides.length; i++) {
					es = swiper.slides[i].style;
					es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
				}

			},
			multipointStart: function(evt, index) {
				console.log('onMultipointStart');
			},
			swipe: function(evt, index) {
				//				if(evt.direction === "Left") {
				//					if(this.currentIndex < 2) {
				//						this.currentIndex++;
				//						new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function() {
				//							activeNav(currentIndex);
				//						});
				//					}
				//				} else if(evt.direction === "Right") {
				//					if(this.currentIndex > 0) {
				//						this.currentIndex--;
				//						new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function() {
				//							activeNav(currentIndex);
				//						});
				//					}
				//				}
			},
			pinch: function(evt, index) {
				alert(evt.zoom)
				alert(this.$refs.myBox[index].offsetWidth)
				this.$refs.myBox[index].offsetWidth = this.$refs.myBox[index].offsetWidth * evt.zoom;
				//				console.log('onPinch');
			},

			pressMove: function(evt, index) {
								console.log(this.$refs.myBox[index].translationX);					
								this.$refs.myBox[index].translationX +=evt.deltaX;
//								this.$refs.myBox[index].style.left += evt.deltaX;
								this.$refs.myBox[index].translationY += evt.deltaY;
								console.log(this.$refs.myBox[index].translationX+"left1")
		
			},
			multipointEnd: function(evt, index) {

				console.log('onMultipointEnd');
			},
			doubleTap: function(evt, index) {
				console.log(this.$refs.myBox[index].width);
				//				this.$refs.myBox[index].style.position = "absolute";
				if(this.$refs.myBox[index].width <= 750) {
					this.$refs.myBox[index].width = this.$refs.myBox[index].width * 2;
				} else if(this.$refs.myBox[index].width > 750) {
					this.$refs.myBox[index].width = 750;
				}

			},
			touchStart: function() {
				//				console.log('onTouchStart');
			},
			touchMove: function(evt, index) {

			},
			touchEnd: function() {
				//				console.log('onTouchEnd');
			},
			touchCancel: function() {
				//				console.log('onTouchCancel');
			}
		},
		mounted() {
			//do something after mounting vue instance
			console.log(this.$route.params.demoId);

			//加载默认数据 Start
			this.$http({
				url: this.serviceUrl + "app/works_message.htm",
				// url: "http://192.168.8.53/app/works_message.htm",
				method: "POST",
				params: {
					worksId: this.$route.params.demoId,
					// worksId: 85,
				},
				headers: {
					"Content-Type": "x-www-from-urlencoded"
				}
			}).then((res) => {
				this.msg = res.data;
				// console.log(JSON.stringify(res.data));
			}, (res) => {
				console.log("error from 案例详情demoDetails.vue");
			});
			//加载默认数据 Start
		}
	}
</script>

<style lang="scss" scoped>
	.bigImage {
		top: 1.408rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		.swiper-slide {
			color: #fff;
			background: #000;
			overflow-x: scroll;
			overflow-y: scroll;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.swiper-zoom-container {
				width: auto;
				top: 0;
				left: 0;
				max-width: auto;
				height: 100%;
			}
			.swiper-zoom img {
				width: 100%;
				max-width: auto;
				position: absolute;
			}
			/*.img { 
		transform: scale(1);
		transition: all 1s ease; 
		-moz-transition: all 1s ease-in;
		-webkit-transition: all 1s ease-in;
		-o-transition: all 1s ease-in;
	}*/
		}
	}
</style>