<template>
	<div id="bigImage" class="demo-details-big-image">
		<!-- Header Start -->
		<slot name="app-header"></slot>
		<!--<img src="../../../../../../../Tencent Files/842200016/FileRecv/deco-m2/src/assets/gwc-img.png"ref='myBox' class="img"v-finger:tap="tap" v-finger:multipoint-start="multipointStart" v-finger:swipe="swipe" v-finger:pinch="pinch" v-finger:rotate="rotate" v-finger:multipoint-end="multipointEnd"v-finger:double-tap="doubleTap"/>-->
		<!-- Header End -->
		<div class="capacity-header">
			<div class="enterprise-count"v-finger:pinch="pinch"v-finger:tap="tap" v-finger:multipoint-start="multipointStart" v-finger:swipe="swipe" v-finger:press-move="pressMove" v-finger:multipoint-end="multipointEnd" v-finger:double-tap="doubleTap" v-finger:touch-start="touchStart" v-finger:touch-move="touchMove" v-finger:touch-end="touchEnd" v-finger:touch-cancel="touchCancel">
				<img  ref="myBox" src="../../../../../../../Tencent Files/842200016/FileRecv/deco-m2/src/assets/vr-img.png"  />
			
			</div>
		</div>
	</div>
</template>
<script>
//	import Transform from 'alloyfinger/transformjs/transform'
	export default {
		name: "bigImage",
		props: ['serviceUrl'],
		data: () => ({
			msg: [],
			initScale: 1,
			flag: 0,
			currentIndex: 0,
		}),
		computed: {
			demoDetailsFn() {
				return this.$refs.bigImage.swiper
			},
		},
		methods: {
			multipointStart: function(evt) {
				console.log('onMultipointStart');
			},
			swipe: function(evt) {},
			tap: function() {
				console.log('onTap');
			},
			longTap: function() {
				console.log('onLongTap');
			},
			singleTap: function() {
				console.log('onSingleTap');
			},
			pinch: function(evt, index) {
//								alert(evt.zoom)  
				//				alert(this.$refs.myBox.offsetWidth)
				this.$refs.myBox.offsetWidth = this.$refs.myBox.offsetWidth * evt.zoom;
				//				console.log('onPinch');
			},

			pressMove: function(evt, index) {
				console.log(this.$refs.myBox.translationX);
//				this.$refs.myBox.translationX += evt.deltaX;
				//								this.$refs.myBox[index].style.left += evt.deltaX;
//				this.$refs.myBox.translationY += evt.deltaY;
//				console.log(this.$refs.myBox.translationX + "left1")

			},
			multipointEnd: function(evt, index) {

				console.log('onMultipointEnd');
			},
			doubleTap: function(evt, index) {
				console.log(this.$refs.myBox.width);
				//				this.$refs.myBox[index].style.position = "absolute";
				//				if(this.$refs.myBox.width <= 750) {
				//					this.$refs.myBox.width = this.$refs.myBox.width * 2;
				//				} else if(this.$refs.myBox.width > 750) {
				//					this.$refs.myBox.width = 750;
				//				}
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
			//			console.log(this.$route.params.demoId);

			//加载默认数据 Start
			//			this.$http({
			//				url:this.serviceUrl + "applet/smartHomeList.htm",
			//				// url: "http://192.168.8.53/app/works_message.htm",
			//				method: "POST",
			//				params: {
			////					worksId: this.$route.params.demoId,
			//					 worksId: 85,
			//				},
			//				headers: {
			//					"Content-Type": "x-www-from-urlencoded"
			//				}
			//			}).then((res) => {
			//				this.msg = res.data;
			//				// console.log(JSON.stringify(res.data));
			//			}, (res) => {
			//				console.log("error from 案例详情demoDetails.vue");
			//			});
			//加载默认数据 Start
		}
	}
</script>

<style lang="scss" scoped>
</style>