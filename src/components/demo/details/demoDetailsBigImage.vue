<template>
	<div id="demoDetailsBigImage" class="demo-details-big-image">
		<!-- Header Start -->
		<slot name="app-header"></slot>
		<!--<img src="../../../../../../../Tencent Files/842200016/FileRecv/deco-m2/src/assets/gwc-img.png"ref='myBox' class="img"v-finger:tap="tap" v-finger:multipoint-start="multipointStart" v-finger:swipe="swipe" v-finger:pinch="pinch" v-finger:rotate="rotate" v-finger:multipoint-end="multipointEnd"v-finger:double-tap="doubleTap"/>-->
		<!-- Header End -->
		<!--<swiper :options="bigImage" class="bigImage" res="bigImage">
			<swiper-slide v-for="(bigImageList,index) in msg.photos" :key="bigImageList.key" >-->
		<!--:style="{width:bigImageList.param.magnifier.width + 'px',height:bigImageList.param.magnifier.height + 'px'}"-->
		<!--<div class="swiper-zoom-container" >
					<img  ref='myBox' class="img" :src="bigImageList.bigpath" alt="" v-finger:multipoint-start="evt => multipointStart(evt, index)"v-finger:press-move="evt => pressMove(evt, index)" v-finger:swipe="evt => swipe(evt, index)" v-finger:pinch="evt => pinch(evt, index)" v-finger:multipoint-end="evt => multipointEnd(evt, index)" v-finger:double-tap="evt => doubleTap(evt, index)"/>
				</div>
		</swiper-slide>
		</swiper>-->
		<div class="swipeBox" res="bigImage">
			<div class="scroll" id="swipeScroll" v-for="(bigImageList,index) in msg.photos" :key="bigImageList.key">
				<img ref='myBox' class="img" :src="bigImageList.bigpath" alt="" v-finger:multipoint-start="evt => multipointStart(evt, index)" v-finger:press-move="evt => pressMove(evt, index)" v-finger:swipe="evt => swipe(evt, index)" v-finger:pinch="evt => pinch(evt, index)" v-finger:multipoint-end="evt => multipointEnd(evt, index)" v-finger:double-tap="evt => doubleTap(evt, index)" />
			</div>

		</div>
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
			currentIndex: 0,
			//			bigImage: {
			//				notNextTick: true,
			//				observer: true, //修改swiper自己或子元素时，自动初始化swiper
			//				observeParents: false, //修改swiper的父元素时，自动初始化swiper
			//				onSlideChangeEnd: function(swiper) {
			//					swiper.update();
			//				},             
			//				 zoom : true,
			//				 zoomMax: 2,
			//				 direction: 'vertical',
			//				 autoHeight: true,
			//				 slidesPerView: 'auto',
			//			},
		}),
		computed: {
			demoDetailsFn() {
				return this.$refs.bigImage.swiper
			},
		},
		methods: {

			multipointStart: function(evt, index) {

				console.log('onMultipointStart');
			},
			//			longTap: function() {
			//				console.log('onLongTap');
			//			},
			swipe: function(evt, index) {
				if(evt.direction === "Left") {
					if(currentIndex < 2) {
						currentIndex++;
						new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function() {
							activeNav(currentIndex);
						});
					}
				} else if(evt.direction === "Right") {
					if(currentIndex > 0) {
						currentIndex--;
						new To(swipeScroll, "translateX", -160 * currentIndex, 500, ease, function() {
							activeNav(currentIndex);
						});
					}
				}
			},
			pinch: function(evt, index) {
				alert(evt.zoom)
				alert(this.$refs.myBox[index].offsetWidth)
				this.$refs.myBox[index].offsetWidth = this.$refs.myBox[index].offsetWidth * evt.zoom;
				//				alert(index.path[0].width)
				//				console.log('onPinch');
			},

			pressMove: function(evt, index) {
				console.log(evt.deltaX);
				console.log(evt.deltaX)
				this.$refs.myBox[index].translateX += evt.deltaX;
				this.$refs.myBox[index].translateY += evt.deltaY;
				evt.preventDefault();
			},
			multipointEnd: function(evt, index) {
				if(evt.zoom < 1) {
					new To(evt, "zoom", 1, 500, ease);
				}
				if(evt.zoom > 2) {
					new To(evt, "zoom", 2, 500, ease);
				}
				console.log('onMultipointEnd');
			},
			doubleTap: function(evt, index) {
				 if(this.$refs.myBox[index].scaleX===1){
                    new To(this.$refs.myBox[index], "scaleX", 2, 500, ease);
                    new To(this.$refs.myBox[index], "scaleY", 2, 500, ease);
                }else if(this.$refs.myBox[index].scaleX===2){
                    new To(this.$refs.myBox[index], "scaleX", 1, 500, ease);
                    new To(this.$refs.myBox[index], "scaleY", 1, 500, ease);
                }
                console.log("double")

			},
			//			singleTap: function() {
			//				console.log('onSingleTap');
			//			},

			touchStart: function() {
				//				console.log('onTouchStart');
			},
			touchMove: function(evt, index) {
				//				let ox = event.currentTarget.offsetWidth;
				//				let oy = event.currentTarget.offsetHeight;
				//				let	dx = event.currentTarget.offsetLeft - ox;
				//				let dy =event.currentTarget.offsetTop - oy;
				//					event.currentTarget.offset({
				//						top: event.currentTarget.pageY - dy,
				//						left: event.currentTarget.pageX - dx
				//					});
				//					
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
	.swipeBox {
		top: 1.408rem;		
		width: 100%;
		margin: 0 auto;
		overflow: hidden;
		font-size: 0;
		border: 2px solid #ccc;
		box-sizing: border-box;
		 margin: 0 auto;
        position: relative;

	}
	
	.scroll {
		 width: 100%;
         height: 100%;
         white-space: nowrap;
	}
	.scroll img{
		width: 100%;
		max-width: auto;
	}
	/*.bigImage {
		top: 1.408rem;
		position: fixed;
		bottom: 0;
		width: 100%;
		.swiper-slide {
			position: relative;
			color: #fff;
			background: #000;
			 overflow-x: scroll;
             overflow-y: scroll; 
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			.swiper-zoom-container {
				width: auto;				
				max-width: auto;
				height: 100%;
				vertical-align: middle;
			}
			.swiper-zoom-container>img {
				width: 100%;
				max-width: auto;
				/*height: 100%;*/
	/*position: absolute;

			}*/
	/*.img { 
		transform: scale(1);
		transition: all 1s ease; 
		-moz-transition: all 1s ease-in;
		-webkit-transition: all 1s ease-in;
		-o-transition: all 1s ease-in;
	}*/
	/*}
	}*/
</style>