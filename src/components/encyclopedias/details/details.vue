<template>
	<div id="encyclopediasDetails" class="encyclopedias-details">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

		<div class="hot-details-tit">
			<p class="hot-details-name" v-text="msg.title"></p>
			<div class="hot-details-title clear">
				<p class="hot-details-time">发表于:<span v-text="msg.publishDate"></span></p>
				<p class="hot-details-browse">浏览数:<span v-text="msg.hits"></span></p>
				<div class="collect-box"><span class="iconfont">&#xe61f;</span>收藏</div>
			</div>
		</div>
		<div class="hot-details-content" v-html="msg.content"></div>
	</div>
</template>

<script>
export default {
  name: "encyclopediasDetails",
  props: ['serviceUrl'],
  data: () => ({
  	msg:{},
  }),
  mounted: function(){
  	console.log(this.$route.params.id);
    this.$http({
      url: this.serviceUrl + "applet/encycDetail.htm",
      method: "POST",
      // 请求后台发送的数据
      params: {
      	id:this.$route.params.id,
      },
      // 设置请求头
      headers: {
          "Content-Type": "x-www-from-urlencoded"
      }
    }).then(function (res) {
      // 请求成功回调
      //console.log(this.$route.params.id);
      console.log(JSON.stringify(res.data));
      this.msg = res.data;
    }, function (res) {
      // 请求失败回调
      console.log("error from 百科详情 encyclo/details");
    });
  }
}
</script>

<style lang="scss" scoped>
@import "./../../../css/unit/common";

.clear:after {
	content: "";
	display: block;
	clear: both;
}

.encyclopedias-details {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  background: #fff;
}
.hot-details-tit{
	margin: 0 0.4rem;
	padding: 0.48rem 0 0.32rem;
	border-bottom: 0.03rem solid $green;
	.hot-details-name {
		font-size: .576rem;
    line-height: 1.5em;
		text-align: center;
	}
	.hot-details-title {
		color: #999999;
		font-size: 0.428rem;
		margin-top: 0.2rem;
    line-height: 1.5em;
		.hot-details-time{
		float: left;
		margin-right: 0.5rem;
		}
		.hot-details-browse {
			float: left;
		}
		.collect-box{
			float: right;
		}
	}
}
.hot-details-content {
	padding: 0.4rem;
  font-size: .416rem;
  line-height: 1.7em;
  min-height: 15rem;
}
</style>

<!-- <template>
  <div id="encyclopediasDetails" class="encyclopedias-details">
  </div>
</template>
<script>
export default {
  name: "encyclopediasDetails",
  //props: ['propName'],
  components: {
    //componentName,
  },
  data: () => ({
  }),

  methods: {
    submit() {
      console.log(JSON.stringify(this.msg));

      //提交 msg
      //...
    },
  },
  mounted() {
    //do something after mounting vue instance

    //获取设计师的列表
    //...
  }
}
</script>
<style lang="scss" scoped>
</style>
 -->
