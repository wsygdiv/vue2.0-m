<template>
  <div id="vr" class="vr">
  	<slot name="app-header"></slot>
    <ul>
    	<li class="vr-list">
    		<div class="vr-img">
    			<img src="../../assets/vr-img.png">
    			<a class="vr-btn">VR全景漫游<span class="iconfont">&#xe676;</span></a>
    		</div>
    		<div class="z-vr">
    			<p class="vr-name">地中海一居室</p>
    			<p class="vr-style">欧式</p>
    			<p class="vr-browse"><span class="iconfont">&#xe646;</span>66666</p>
    		</div>
    	</li>
    	<li class="vr-list">
    		<div class="vr-img">
    			<img src="../../assets/vr-img.png">
    			<a class="vr-btn">VR全景漫游<span class="iconfont">&#xe676;</span></a>
    		</div>
    		<div class="z-vr">
    			<p class="vr-name">地中海二居室</p>
    			<p class="vr-style">欧式</p>
    			<p class="vr-browse"><span class="iconfont">&#xe646;</span>66666</p>
    		</div>
    	</li>
    	<li class="vr-list">
    		<div class="vr-img">
    			<img src="../../assets/vr-img.png">
    			<a class="vr-btn">VR全景漫游<span class="iconfont">&#xe676;</span></a>
    		</div>
    		<div class="z-vr">
    			<p class="vr-name">地中海三居室</p>
    			<p class="vr-style">欧式</p>
    			<p class="vr-browse"><span class="iconfont">&#xe646;</span>66666</p>
    		</div>
    	</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "vr",
  data: () => ({
  })
}
</script>
<style lang="scss" scoped>
@import "./../../css/unit/common";
.vr{
	position: fixed;
	top: 1.408rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
}
.vr-list {
	margin-bottom: 0.3rem;
	background-color: #fff;
	&:last-child {
		margin-bottom: 0;
	}
}
.vr-img{
	position: relative;
	@include pic(100%,8.512rem);
	.vr-btn {
		position: absolute;
		width: 3.84rem;
		height: 0.92rem;
		line-height: 0.8rem;
		background-color: rgba(0,0,0,0.5);
		border: 0.06rem solid #f5f5f5;
		text-align: center;
		border-radius: 0.8rem;
		top: 50%;
		left: 50%;
		margin-left: -1.92rem;
		font-size: 0.44rem;
		color: #fff;
		.iconfont {
			margin-left: 0.18rem;
		}
	}
}
.z-vr{
	height: 2.12rem;
	/*line-height: 1.5rem;*/
	padding:0.4rem 0.24rem;
	.vr-name{
		font-size: 0.58rem;
	}
	.vr-style {
		color: #CCCCCC;
		width: 9rem;
		float: left;
	}
	.vr-browse {
		width: 2.5rem;
		color: #CCCCCC;
		float: right;
    text-align: right;
	}
	.iconfont {
		margin-right: 0.1rem;
	}
}
</style>
