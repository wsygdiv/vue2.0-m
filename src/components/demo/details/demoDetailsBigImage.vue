<template>
	<div id="demoDetailsBigImage" class="demo-details-big-image">
		<!-- Header Start -->
		<slot name="app-header"></slot>
		<!--<img src="../../../../../../../Tencent Files/842200016/FileRecv/deco-m2/src/assets/gwc-img.png"ref='myBox' class="img"v-finger:tap="tap" v-finger:multipoint-start="multipointStart" v-finger:swipe="swipe" v-finger:pinch="pinch" v-finger:rotate="rotate" v-finger:multipoint-end="multipointEnd"v-finger:double-tap="doubleTap"/>-->
		<!-- Header End -->
		<swiper :options="bigImage" class="bigImage" res="bigImage">
			<swiper-slide v-for="(bigImageList,index) in msg.photos" :key="bigImageList.key" >
		<!--:style="{width:bigImageList.param.magnifier.width + 'px',height:bigImageList.param.magnifier.height + 'px'}"-->
		<div class="swiper-zoom" >

			<img ref='myBox' class="img" :src="bigImageList.bigpath" alt="" v-finger:tap="tap.bind(this, index)" v-finger:multipoint-start="multipointStart"v-finger:press-move="pressMove.bind(this, index)" v-finger:swipe="swipe.bind(this, index)" v-finger:pinch="pinch.bind(this, index)" v-finger:rotate="rotate.bind(this, index)" v-finger:multipoint-end="multipointEnd" v-finger:double-tap="doubleTap.bind(this, index)" v-finger:single-tap="singleTap.bind(this, index)" v-finger:touch-start="touchStart" v-finger:touch-move="touchMove" v-finger:touch-end="touchEnd.bind(this, index)" v-finger:touch-cancel="touchCancel.bind(this, index)">

		</div>
		</swiper-slide>
		</swiper>
	</div>
</template>
<script>
	export default {
		name: "demoDetailsBigImage",
		props: ['serviceUrl'],
		data: () => ({
			msg: [],
			initScale: 1,
			flag: 0,
			bigImage: {
				notNextTick: true,

				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: false, //修改swiper的父元素时，自动初始化swiper
				onSlideChangeEnd: function(swiper) {
					swiper.update();
				},

				 zoom : true,
				 zoomMax: 2,

				// direction: 'vertical',
				// autoHeight: true,
				// slidesPerView: 'auto',
			},
		}),
		computed: {
			demoDetailsFn() {
				return this.$refs.bigImage.swiper
			},
		},
		methods: {

			tap: function(evt,index) {
				console.log(index.path[0]);
				let that = this;
	
				console.log('onTap');

			},
			multipointStart: function() {
				initScale = index.path[0].zoom;
				console.log('onMultipointStart');
			},
//			longTap: function() {
//				console.log('onLongTap');
//			},
			swipe: function(evt) {
				console.log("swipe" + evt.direction);
				console.log('onSwipe');
			},
			pinch: function(evt) {
				index.path[0].zoom = initScale * evt.zoom;
				console.log('onPinch');
			},
//			rotate: function(evt) {
//				console.log(evt.angle);
//				console.log('onRotate');
//			},
			pressMove: function(evt,num) {
				console.log(evt.deltaY);
				console.log(evt.deltaX);
				console.log('onPressMove with params:' + evt.deltaY);
			},
			multipointEnd: function() {
				var that = index.path[0];
				if(that.zoom < 1) {
					new To(that, "zoom", 1, 500, ease);
				}
				if(that.zoom > 2) {
					new To(that, "zoom", 2, 500, ease);
				}
				console.log('onMultipointEnd');
			},
			doubleTap: function(evt,index) {
//				index.path[0].style.position="absolute";
//				index.path[0].style.top = 0;
//				index.path[0].style.left = 0;
				index.path[0].height = index.path[0].height * 1.5;
				index.path[0].width = index.path[0].width * 1.5;
				console.log('onDoubleTap');
			},
//			singleTap: function() {
				//				console.log('onSingleTap');
//			},

//			touchStart: function() {
				//				console.log('onTouchStart');
//			},
//			touchMove: function() {
				//				console.log('onTouchMove');
//			},
//			touchEnd: function() {
				//				console.log('onTouchEnd');
//			},
//			touchCancel: function() {
				//				console.log('onTouchCancel');
//			}
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
			/* overflow-x: scroll;
    overflow-y: scroll; */
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.swiper-zoom {
				width: auto;
				overflow-x: auto;
				overflow-y: auto;
				position: absolute;
				top: 0;
				left: 0;
				max-width: auto;
			}
			.swiper-zoom>img {
				width: 100%;
				max-width: auto;
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