<template>
	<div id="hotNewDetalils" class="hotNewDetalils">
		<slot name="app-header"></slot>
		<div class="hotNewDetalils-con ">
			<div class="hot-details-tit">
				<p class="hot-details-name" v-text="msg.title"></p>
				<div class="hot-details-title clear">
					<p class="hot-details-time">发表于:<span v-text="msg.addTime"></span></p>
					<p class="hot-details-browse">浏览数:<span v-text="msg.hits"></span></p>
					<div class="collect-box"><span class="iconfont">&#xe61f;</span>收藏</div>
				</div>
			</div>
			<div class="hot-details-content" v-html="msg.content"></div>
		</div>
	</div>
</template>

<script>
export default {
  name: "hotNewDetalils",
  props: ['serviceUrl'],
  data: () => ({
  	msg:{},
  }),
  mounted: function(){
//	console.log(this.$route.params.id);
	beforeCreate: {
      this.$http({
//      url: "http://192.168.8.183:8088/app/article.htm",
		url: this.serviceUrl + "app/article.htm",
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
//      console.log(this.$route.params.id);
//      console.log(JSON.stringify(res.data));
        this.msg = res.data;
      }, function (res) {
        // 请求失败回调
        console.log("error from 详情页");
      });
	}
}
}
</script>

<style lang="scss" scoped>
@import "./../../../css/unit/common";
.hotNewDetalils-con {
	position: fixed;
	top: 1.408rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
	background-color: #fff;
}
.clear:after {
	content: "";
	display: block;
	clear: both;
}
.hot-details-tit{
	margin: 0 0.4rem;
	padding: 0.6rem 0 0.32rem;
	border-bottom: 0.03rem solid $green;
	.hot-details-name {
		font-size: .544rem;
		text-align: center;
		line-height: 0.8rem;
		height: 2rem;
	}
	.hot-details-title {
		color: #999999;
		font-size: 0.384rem;
		margin-top: 0.32rem;
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
	font-size: 0.428rem;
}
</style>