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
					<img ref='myBox' class="img" :src="bigImageList.bigpath" alt="" v-scale/>
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
		},
		directives:{
			'scale': {
      inserted: function (el, binding, vnode) {
        // 定义剪裁的宽度和高度（单位rem）
        const WIDTH = 12
        let HEIGHT = 0
        // 头像剪裁和封面剪裁的高度不一样
        if (vnode.context.type === 'headPic') {
          HEIGHT = 14
        } else if (vnode.context.type === 'cover') {
          HEIGHT = 10
        }
        // 计算rem的基础单位（1rem = ?px）
        const BASE_SIZE = document.documentElement.clientWidth / 12
        //  页面可视区的高度
        const CLIENT_HEIGHT = document.documentElement.clientHeight
        let imgLeft // 图片的left值
        let imgTop // 图片的top值
        let imgWidth // 图片宽度
        let fileWidth // 图片原始高度
        let originalHeight // 每次移动前图片高度
        let originalWidth // 每次移动前图片宽度
        let baseScale // 宽高比
        // 剪裁框距离左边的距离
        let clipLeft = (12 - WIDTH) / 2
        // 剪裁框距离上边的距离
        let clipTop = (CLIENT_HEIGHT / BASE_SIZE - HEIGHT) / 2
        // 图片加载完成默认居中铺满剪裁区域
        el.onload = () => {
          originalHeight = el.offsetHeight
          fileWidth = originalWidth = el.offsetWidth
          baseScale = parseFloat(originalWidth / originalHeight)
          // 宽高中  较小的一方为12rem  较大的一方等比例放大（避免初始加载时图片大小小于剪裁框）
          if (baseScale > 1) {
            el.style.width = 12 * baseScale + 'rem'
            el.style.height =12 + 'rem'
          } else {
            el.style.width = 12 + 'rem'
            el.style.height = 12 / baseScale + 'rem'
          }
          // 动态计算图片的top值   使图片垂直居中
          if (CLIENT_HEIGHT > el.offsetHeight) {
            el.style.top = (CLIENT_HEIGHT - el.offsetHeight) / 2 + 'px'
          } else {
            el.style.top = 0
          }
          // 动态计算图片的left值   使图片水平居中
          if (parseInt(el.style.width) > 12) {
            el.style.left = -(parseInt(el.style.width) - 12) / 2 + 'rem'
          }
        }
        el.ontouchstart = (ev) => {
          let fingers = ev.touches.length   // 屏幕上手指数量
          // 两只手指放大/缩小
          if (fingers === 2) {
            let touch1 = ev.targetTouches[0]  // 第一根手指touch事件
            let touch2 = ev.targetTouches[1]  // 第二根手指touch事件
            // 通过勾股定理计算初始的两指间距离
            let startX = Math.sqrt(Math.pow((touch1.pageX - touch2.pageX), 2) + Math.pow((touch1.pageY - touch2.pageY), 2))
            document.ontouchmove = (ev) => {
              let touch1 = ev.targetTouches[0]  // 第一根手指touch事件
              let touch2 = ev.targetTouches[1]  // 第二根手指touch事件
              // 通过勾股定理计算移动的两指间距离
              let endX = Math.sqrt(Math.pow((touch1.pageX - touch2.pageX), 2) + Math.pow((touch1.pageY - touch2.pageY), 2))
              // 手指运动的距离
              let scale = endX - startX
              // 更新节点位置
              el.style.width = (originalWidth + scale) + 'px'
              el.style.height = (originalWidth + scale) / baseScale + 'px'
              el.style.left = imgLeft - scale / 2 + 'px'
              el.style.top = imgTop - scale / 2 + 'px'
            }
          // 一只手指拖动位置移动
          } else if (fingers === 1) {
            let touch1 = ev.targetTouches[0]
            let x1 = touch1.pageX
            let y1 = touch1.pageY
            document.ontouchmove = (ev) => {
              // 计算移动差  更新节点位置
              let touch1 = ev.targetTouches[0]
              let x2 = touch1.pageX
              let y2 = touch1.pageY
              el.style.left = imgLeft + (x2 - x1) + 'px'
              el.style.top = imgTop + (y2 - y1) + 'px'
            }
          }
          document.ontouchend = (ev) => {
            el.style.transition = '.2s'
            // 如果小于剪裁区域的尺寸图片自动放大到剪裁区域的大小
            if (baseScale > 1 && el.offsetHeight / BASE_SIZE < HEIGHT) {
              el.style.width = HEIGHT * baseScale + 'rem'
              el.style.height = HEIGHT + 'rem'
            } else if (baseScale < 1 && el.offsetWidth / BASE_SIZE < WIDTH) {
              el.style.width = WIDTH + 'rem'
              el.style.height = WIDTH / baseScale + 'rem'
            }
            // 如果偏离剪裁框,图片回到剪裁区域内
//          if (el.offsetLeft / BASE_SIZE > clipLeft) {
//            el.style.left = clipLeft + 'rem'
//          } else if (el.offsetLeft / BASE_SIZE < clipLeft + WIDTH - el.offsetWidth / BASE_SIZE) {
//            el.style.left = clipLeft + WIDTH - el.offsetWidth / BASE_SIZE + 'rem'
//          }
//          if (el.offsetTop / BASE_SIZE > clipTop) {
//            el.style.top = clipTop + 'rem'
//          } else if (el.offsetTop / BASE_SIZE < clipTop + HEIGHT - el.offsetHeight / BASE_SIZE) {
//            el.style.top = clipTop + HEIGHT - el.offsetHeight / BASE_SIZE + 'rem'
//          }
            setTimeout(() => {
              el.style.transition = ''
              // 将节点此时的宽高更新到节点每次移动之前的状态
              originalWidth = el.offsetWidth
              originalHeight = el.offsetHeight
              // 解绑事件
              document.ontouchmove = null
              document.ontouchend = null
            }, 200)
          }
        }
      
      }
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
			.swiper-zoom-container img {
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