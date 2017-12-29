<template>
<div id="liveDetails" class="liveDetails">
	<slot name="app-header"></slot>
	<div class="liveDetails-con">
		<div class="live-info">
			<div class="live-img"><img :src="msg.imgUrl"></div>
			<div class="info-box clear">
				<p class="live-name" v-text="msg.title"></p>
				<p class="live-time" v-text="msg.playTime">时间：<span></span></p>
				<p class="live-count clear" v-if="this.$route.params.type==1">预约人数：<span v-text="msg.applyCount"></span>人</p>
				<p class="live-count clear" v-if="this.$route.params.type==3">浏览量：<span v-text="msg.hits"></span>人</p>
			</div>
		</div>
		<div class="expert-info clear">
			<div class="expert-img">
				<img :src="msg.touxiang">
				<!--<span>专家</span>-->
			</div>
			<div class="expert-title">
				<p class="expert-name" v-text="msg.expertName"></p>
				<p class="expert-job">职业：<span v-text="msg.job">专家</span></p>
				<p class="expert-specialty">职称：<span v-text="msg.jobTitles"></span></p>
				<a class="order-btn" v-if="this.$route.params.type==1" v-text="this.hasApply" @click="order"></a>
				<!--<a class="order-btn" v-if="this.$route.params.type==1&&msg.hasApply==true" v-text="this.hasApply" @click="">取消预约</a>-->
				<a class="order-btn" v-if="this.$route.params.type==2">进入直播</a>
				<a class="order-btn" v-if="this.$route.params.type==3">播放</a>
			</div>
		</div>
		<div class="introduce-box">
			<p class="introduce-tit">视频介绍</p>
			<div class="introduce" v-html="msg.introduce"></div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: "liveDetails",
  props: ['serviceUrl'],
  data: () => ({
	msg:{},
	hasApply:"",
	state:"",
	userId:"",
  }),
  methods: {
  	//修改预约状态
  	order:function(){
  		this.$http({
//      url: "http://192.168.8.214:8443/applet/changeApplyState.htm",
		url: this.serviceUrl + "applet/changeApplyState.htm",
        method: "post",
        // 请求后台发送的数据
        params: {
        	"userId": this.userId,
        	"id": this.$route.params.id,
        	"state": this.state,
        },
        // 设置请求头
        headers: {
            "Content-Type": "x-www-from-urlencoded"
        }
      }).then(function (res) {
        // 请求成功回调
//      console.log(this.$route.params.id);
        console.log(JSON.stringify(res.data));
        if(res.data.code==1){
        	if(this.hasApply=="取消预约"){
        		this.hasApply="立即预约";
        		this.state=1;
        	}else if(this.hasApply=="立即预约"){
        		this.hasApply="取消预约";
        		this.state=0;
        	}
        }else if(res.data.code==-1){
        	alert("操作失败,请稍后再试")
        }
      }, function (res) {
        // 请求失败回调
        console.log("error from 详情页");
      });
  	}
  },
  mounted: function(){
  	this.userId = window.sessionStorage.getItem('userId');
	beforeCreate: {
      this.$http({
//      url: "http://192.168.8.214:8443/applet/liveDetail.htm",
        url: this.serviceUrl + "applet/liveDetail.htm",
        method: "post",
        // 请求后台发送的数据
        params: {
        	"userId": this.userId,
        	"type": this.$route.params.type,
        	"id": this.$route.params.id,
        },
        // 设置请求头
        headers: {
            "Content-Type": "x-www-from-urlencoded"
        }
      }).then(function (res) {
        // 请求成功回调
//      console.log(this.$route.params.id);
        console.log(JSON.stringify(res.data));
        this.msg = res.data;
        if(res.data.hasApply==true){
        	this.hasApply="取消预约";
        	this.state=0;
        }else{
        	this.hasApply="立即预约";
        	this.state=1;
        }
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
.liveDetails-con {
	position: fixed;
	top: 1.408rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
}
.clear:after {
	content: "";
	display: block;
	clear: both;
}
.info-box {
	padding: 0 0.32rem 0.32rem;
}
.live-info {
	margin-bottom: 0.32rem;
	background-color: #fff;
	.live-img{
		$width: 12rem;
		$height: 6.736rem;
		@include pic($width,$height);
	}
	.live-name {
		font-size: .576rem;
		line-height: 1.3rem;
		width: 100%;
		float: left;
	}
	.live-time {
		color: #747474;
		float: left;
	}
	.live-count {
		color: #747474;
		float: right;
		span {
			color: $green;
		}
	}
}
.expert-info {
	height: 3.6rem;
	margin-bottom: 0.3rem;
	padding: 0 0.32rem;
	background-color: #fff;
	.expert-img{
		$width: 2.272rem;
		$height: 2.272rem;
		float: left;
		margin-top: 0.5rem;
		border-radius: 50%;
		position: relative;
		@include pic($width,$height);
		span {
			position: absolute;
			width: $width;
			height: 0.48rem;
			line-height: 0.48rem;
			background-color: $green;
			color: #fff;
			left: 0;
			bottom: 0.3rem;
			text-align: center;
		}
	}
	.expert-title{
		float: left;
		width: 8.588rem;
		margin-left: 0.5rem;
		position: relative;
		.expert-name {
			font-size: .52rem;
			line-height: 1.5rem;
		}
		.expert-job {
			color: #747474;
			font-size: 0.448rem;
			span {
				color: #333;
			}
		}
		.expert-specialty {
			color: #747474;
			font-size: 0.448rem;
			span {
				color: #333;
			}
		}
		.order-btn {
			position: absolute;
			top: 0.8rem;
			right: 0;
			width: 2.4rem;
			height: 0.96rem;
			line-height: 0.96rem;
			text-align: center;
			background-color: $orange;
			color: #fff;
			border-radius: 0.06rem;
		}
	}
}
.introduce-box {
	background-color: #fff;
	.introduce-tit {
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: 0.02rem solid #eee;
		border-left: 0.2rem solid $green;
		font-size: 0.6rem;
		padding-left: 0.4rem;
	}
	.introduce {
		font-size: 0.448rem;
		padding: 0.2rem;
	}
}

</style>