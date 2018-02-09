<template>
	<div id="myMessege" class="myMessege">
		<!-- Header Start -->
		<div class="my-header">
			<span class="iconfont" style="position:absolute;font-size: .672rem;left: .32rem;" @click="back">
	    	 	    &#xe601;
	    	 </span>
			<span style="text-align: center;font-size: .554rem;color: #333333;">我的消息</span>
		</div>
		<!-- Header End -->

		<div class="encyclopedias-box">
			<!-- Tab -->
			<div class="tab">
				<ul class="tab-box">
					<li v-for="(tabListBox,index) in titMessege" :class="'tab-list' + ' ' + (index === tabFlag ? 'cur' : '')" :key="index" @click="tab(index)">
						<span v-text="tabListBox"></span>
						<span class="remind" ref="remind" v-if="remindFlag"></span>
					</li>
				</ul>
			</div>
			<!-- Tab Box -->
			<div class="on-tab" ref="onTabSwiper" v-if="msgNot!=null">
				<!--系统通知-->
				<div class="on-tab-list" v-if="tabFlag == 0">
					<ul class="on-tab-list-box">
						<!-- Main List -->
						<li v-for="(sysMes,index) in msgNot.messageList" :key="index.key">
							<router-link :to="'details/'" append tag="div" class="on-tab-list-box-list">
								<div class="leftDot">
									<span class="dotMes"></span>
								</div>
								<div class="rightContent">
									<div class="title">
										<span v-html="sysMes.sys_title" class="tit-content"></span>
										<span class="date" v-html="sysMes.sys_date"></span>
									</div>
									<div class="content" v-html="sysMes.sys_content"></div>
								</div>

							</router-link>
						</li>

						<!-- Main List 加载更多 -->
						<infinite-loading @infinite="infiniteHandler0($event)" spinner="circles" v-if="msgNot.length != 0">
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
				<!--系统公告-->
				<div class="on-tab-list" v-show="tabFlag == 1">
					<ul class="on-tab-list-box">
						<!-- Main List -->
						<router-link :to="'details/'" append tag="li" class="on-tab-list-box-list" v-for="(sysNot,index) in msg.docList" :key="sysNot.key">
							<div class="title">
								<span v-text="sysNot.doc_title"></span>12333
								<span class="date" v-text="sysNot.doc_click"></span>
							</div>
							<div class="content" v-text="sysNot.doc_description"></div>
						</router-link>
						<!-- Main List 加载更多 -->
						<infinite-loading @infinite="infiniteHandler1($event)" spinner="circles" v-if="msgNot.length != 0">
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
				<!--私信-->
				<div class="on-tab-list" v-show="tabFlag ==2">
					<ul class="on-tab-list-box">
						<!--<li class="inform-list"ref="infoLi"v-if="infoLi ==0 "v-for="(mesList,index) in msgMes.messageList":key="mesList.key">-->
						<li class="inform-list" v-if="infoLiX == 0 ">
							<div class="inform-con">1.你好你好你好！</div>
							<a class="inform-btn J_reply" href="javascript:;" @click="reply(index)">回复<span class="iconfont">&#xe70c;</span></a>
							<a class="inform-btn J_delete" @click="infoLi">删除</a>
							<p class="inform-time">2017-11-25 09:09:09</p>
							<div class="reply-textarea" v-show="replyFlag">
								<input class='reply-text' ref="replyText" name="replyT" v-model="text">
								<a class='send-btn' href='javascript:;' @click="sendReply">发送</a>
							</div>
							<div class="re-box" ref="reBox">
								<div class="reply-box" v-for="(item,index) in msgMes.messageList" :key="item.key">
									<p class="reply-con">回复<span class="reply-ts" v-text="item.fromUser">xxx</span>：<span v-text="item.sys_content"></span></p>
									<p class="reply-ts" v-text="item.sys_date"></p>
								</div>
							</div>
						</li>

						<!-- Main List 为空的时候 -->
						<!--<li class="cue-box" v-for="(sysNot,index) in msg.docList" :key="sysNot.key" v-if="index == 1">
							<div class="cue" v-if="sysNot.length == 0">暂无数据...</div>
						</li>-->
						<!-- Main List 加载更多 -->
						<!--<infinite-loading @infinite="infiniteHandler1($event)" spinner="circles" v-if="list.length != 0">-->
						<!-- 加载更多却没有数据的时候 -->
						<!--<div class="no-more" slot="no-more">
								该分类下没有更多了...
							</div>
							<div class="no-more" slot="no-results">
								该分类下没有更多了...
							</div>
						</infinite-loading>-->
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import InfiniteLoading from 'vue-infinite-loading'
	import { MessageBox } from 'mint-ui';
	export default {
		name: "myMessege",
		components: {
			InfiniteLoading,
		},
		props: ['serviceUrl'],
		data: () => ({
			msg: [],
			titMessege: ["系统通知", "系统公告", "私信"],
			pageSize: 10, //每页 数据个数
			tabFlag: 0, //切换swiper 的index  同时也是请求的第几个（类别）数据
			remindFlag: true,
			replyFlag: false,
			infoLiX: 0,
			text: '',
			msgNot: '',
			msgMes: "",
			//  currentPage:'',
			//  totalPage:''
			book: { //存一个json来接收数据
				sys_id: 0, //私信id
				fromUser: '', //发送方
				sys_date: '', //回复时间
				sys_content: '' //私信内容
			}
		}),
		computed: {},
		methods: {
			infoLi() {
				MessageBox.confirm('确定执行此操作?').then(action => {
					this.infoLiX = 1
				});

			},
			reply(index) {
				this.replyFlag = !this.replyFlag;
				console.log(index)
			},
			sendReply() {
				//				this.axios({
				//						url: this.serviceUrl + "app/sys_message.htm",
				//						//url:"http://192.168.8.183:8088/app/sys_message.htm",
				//						method: "POST",
				//						data: this.$qs.stringify({
				//							token: this.token,
				//							userId: this.userId,
				//							title: this.title,
				//							content: this.content,
				//						}),
				//					}).then((res) => {
				//						this.msg = res.data;
				//						console.log(res.data)
				//					}, (err) => {
				//						// 请求失败回调
				//									if(res.data.reply){
				//										
				//									}
				//						console.log("请求错误");
				//					});
				//			
				let that = this;
				this.book.sys_content = that.text;
				console.log(this.msgMes.messageList.length)
				if(that.text != "" && that.text != undefined && that.text != null) {
					this.book.sys_id = this.msgMes.messageList.length + 1;
					this.msgMes.messageList.push(this.book);
					console.log(this.msgMes.messageList)
					console.log(this.book)
					that.text = "";
					this.replyFlag = false;
				} else {
					alert("发送内容不能为空!");
				}
			},
			tab(num) {
				this.tabFlag = num;
				this.$refs.remind[num].remove();
				if(this.tabFlag == 0) {
					var that = this;
					this.axios({
						url: this.serviceUrl + "app/sys_message.htm",
						//	url:"http://192.168.8.183:8088/app/sys_message.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							pageSize: this.pageSize,
							currentPage: 1,
						}),
					}).then((res) => {
						this.msgNot = res.data;
						console.log(res.data)
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				} else if(this.tabFlag == 1) {
					this.axios({
						url: this.serviceUrl + "app/sys_doc.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							pageSize: this.pageSize,
							currentPage: this.currentPage,
						}),
					}).then((res) => {
						this.msg = res.data;
						console.log(res.data)
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				} else if(this.tabFlag == 2) {
					this.axios({
						url: this.serviceUrl + "app/sec_message.htm",
						//						url:"http://192.168.8.183:8088/app/app/sec_message.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							pageSize: this.pageSize,
							currentPage: this.currentPage,
						}),
					}).then((res) => {
						this.msgMes = res.data;
						console.log(res.data)
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				}
			},
			back() {
				this.$router.go(-1);
			},
			//系统通知分页
			infiniteHandler0($state) {
				// console.log(this.tabFlag);
				console.log(this.msgNot.currentPage)
				//				console.log(this.msg.totalPage)
				//    const temp = [];
				if(this.msgNot.currentPage >= this.msgNot.totalPage) {
					$state.complete();
				} else {
					this.axios({
						url: this.serviceUrl + "app/sys_message.htm",
						//											url:"http://192.168.8.183:8088/app/sys_message.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							currentPage: parseInt(this.msgNot.currentPage) + 1, //请求第几页的数据
							pageSize: this.pageSize
						}),
					}).then((res) => {
						console.log(res.data)
						//更新数据
						this.msgNot.currentPage = res.data.currentPage;
						this.msgNot.totalPage = res.data.totalPage;
						for(let i = 0, max = res.data.messageList.length; i < max; i++) {
							this.msgNot.messageList.push(res.data.messageList[i]);
						}
						$state.loaded();

						//console.log(JSON.stringify(this.msg));
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				}
			},

			//系统公告分页
			infiniteHandler1($state) {
				// console.log(this.tabFlag);
				var that = this;
				console.log(this.msg.currentPage)
				console.log(this.msg.totalPage)
				//    const temp = [];
				if(this.msg.currentPage >= this.msg.totalPage) {
					$state.complete();
				} else {
					this.axios({
						url: this.serviceUrl + "app/sys_doc.htm",
						//						url: "http://192.168.8.183:8088/app/app/sys_doc.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							currentPage: parseInt(this.msg.currentPage) + 1, //请求第几页的数据
							pageSize: this.pageSize
						}),
					}).then((res) => {
						//更新数据
						console.log(res.data)
						this.msg.currentPage = res.data.currentPage;
						this.msg.totalPage = res.data.totalPage;
						for(let i = 0, max = res.data.docList.length; i < max; i++) {
							this.msg.docList.push(res.data.docList[i]);
						}
						$state.loaded();

						//console.log(JSON.stringify(this.msg));
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				}
			},
		},
		mounted() {
			var that = this;
			//do something after mounting vue instancev  ----------↓----------↓----------
			if(!window.sessionStorage.getItem("userId")) {
				this.$router.push("/login");
			} else {
				this.userId = window.sessionStorage.getItem("userId");
				this.token = window.sessionStorage.getItem("token");
				if(this.tabFlag == 0) {
					//加载默认数据
					this.axios({
						url: this.serviceUrl + "app/sys_message.htm",
						//					url:"http://192.168.8.183:8088/app/sys_message.htm",
						method: "POST",
						data: this.$qs.stringify({
							token: this.token,
							userId: this.userId,
							pageSize: this.pageSize,
							currentPage: 1,
						}),
					}).then((res) => {
						this.msgNot = res.data;
						console.log(res.data)
					}, (err) => {
						// 请求失败回调
						console.log("请求错误");
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import "./../../../css/unit/common";
	$padding: .32rem;
	$listBar: #eeeeee;
	.my-header {
		color: $green;
		text-align: center;
		padding: .32rem;
		background-color: #FFFFFF;
		box-shadow: 0 0.08rem 0.16rem #cccccc;
		border-bottom: 1px solid #333333;
	}
	
	.encyclopedias-box {
		position: fixed;
		top: 1.408rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: auto;
	}
	
	//main-tab Start
	.tab {
		$tabHeight: 1.408rem;
		top: $tabHeight;
		left: 0;
		width: 100%;
		position: fixed;
		overflow-x: auto;
		background: #fff;
		height: $tabHeight;
		.tab-box {
			position: absolute;
			z-index: 5;
			min-width: 100%;
			width: auto;
			font-size: 0;
			height: $tabHeight;
			white-space: nowrap;
			border-bottom: .032rem solid $listBar;
			padding: 0 $padding;
			box-sizing: border-box;
			.tab-list {
				font-size: .448rem;
				height: $tabHeight;
				padding: 0 $padding;
				display: inline-block;
				line-height: $tabHeight;
				position: relative;
				width : 33%;
				text-align:center;
				.hide {
					display: none;
				}
				.remind {
					position: absolute;
					top: 20px;
					right: 15px;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #FF5715;
				}
				&.cur {
					color: $green;
					border-bottom: .064rem solid yellowgreen;
				}
			}
		}
	}
	
	//main-tab End
	//main Start
	.on-tab {
		bottom: 0;
		width: 100%;
		top: 1.508rem * 2;
		position: fixed;
		overflow-y: auto;
		overflow: hidden;
		.on-tab-list {
			width: 100%;
			overflow-y: auto;
			position: relative;
			height: 100%;
			.on-tab-list-box {
				width: 100%;
				overflow: hidden;
				//Edit Style Start ----------↓----------↓----------
				.on-tab-list-box-list {
					width: 100%;
					background: #fff;
					overflow: hidden;
					box-sizing: border-box;
					height: 2.976rem + $padding;
					padding: $padding / 2 $padding;
					border-bottom: .016rem solid $listBar;
					.leftDot {
						float: left;
						width: .8rem;
						height: 100%;
						position: relative;
						.dotMes {
							width: 0.16rem;
							height: 0.16rem;
							display: inline-block;
							background-color: green;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							bottom: 0;
						}
					}
					.rightContent {
						float: left;
					}
					.title {
						color: #333;
						line-height: 2em;
						font-size: .512rem;
						@include text-overflow;
						.tit-content {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 8rem;
							display: inline-block;
						}
					}
					.content {
						color: #999;
						overflow: hidden;
						height: 1.248rem;
						font-size: .416rem;
						line-height: 1.5em;
					}
					.date {
						float: right;
						font-size: .448rem;
					}
					.hits {
						float: right;
						.iconfont {
							margin: 0 $padding/2 0 0;
						}
					}
				}
				.inform-list {
					padding: .48rem .48rem;
					font-size: .448rem;
					border-bottom: 1px solid #DCDCDC;
					background-color: #FFFFFF;
					.inform-con {
						display: inline-block;
						width: 70%;
						line-height: .48rem;
						margin-right: .4rem;
					}
					.inform-btn {
						color: #4884BF;
						text-align: right;
						font-size: .32rem;
						margin: 0 .008rem;
					}
					.inform-btn {
						color: #4884BF;
						text-align: right;
						font-size: .32rem;
						margin: 0 .008rem;
					}
					.inform-time {
						height: .64rem;
						line-height: .64rem;
						border-top: 1px dashed #DADADA;
						margin-top: .24rem;
						text-align: right;
						color: #9D9D9D;
					}
					.reply-box {
						background-color: #f6f6f6;
						padding: .16rem;
						font-size: .32rem;
					}
					.reply-textarea {
						height: 1.52rem;
						.reply-text {
							width: 80%;
							height: 1.28rem;
							line-height: .4rem;
							resize: none;
							float: left;
							font-size: .448rem;
							border: 1px solid #333;
							padding: .16rem;
						}
						.send-btn {
							margin-left: .4rem;
							font-size: .32rem;
							border: 1px solid #4AAB2D;
							padding: 2px .16rem;
							border-radius: .048rem;
							color: #4AAB2D;
							margin-top: .628rem;
							float: left;
						}
					}
				}
				//Edit Style End ----------↑----------↑----------
				//没有数据
				.cue-box {
					top: 0;
					bottom: 0;
					width: 100%;
					height: auto;
					display: flex;
					position: absolute;
					align-items: center;
					justify-content: center;
					font-size: .448rem;
					.cue {}
				}
				//没有更多数据
				.no-more {
					padding: .5rem;
					font-size: .512rem;
				}
			}
		}
	}
	
	//main End
</style>