<template>
	<div id="myInfoEdit" class="myInfoEdit">
		<div class="my-header">
			<span class="iconfont" style="position:absolute;font-size: .672rem;left: .32rem;" @click="back">
    	 	    &#xe601;
    	    </span>
			<span style="text-align: center;font-size: .554rem;color: #333333;">个人信息</span>
		</div>
		<div class="user-info user-main">
			<ul>
				<li>
					<span class="user-info-name title">头像</span>
					<div class="edit-more">
						<!--<div class="imgpre"><img :src="inversePic"  v-show="inversePic" alt="pic">
						</div>-->
						<!--<Upload class="upload" @pic="(url) => {inversePic = url}">
							<span class="btn-right iconfont">&#xe602;</span>
						</Upload>-->
						<Upload @pic="getLocalPic" :serviceUrl="serviceUrl">
							<span class="head-pic">
			                  <img ref="img" :src="avater" alt="pic">
			                </span>
							<span class="btn-right iconfont">&#xe602;</span>
						</Upload>

					</div>
				</li>
				<li>
					<span class="user-info-name">用户名</span>
					<span class="edit-more" @click="popupVisibleUser = true" size="large"><span class="btn-right iconfont"><span v-text="username"></span>&#xe602;</span>
					</span>
				</li>
				<li>

					<span class="user-info-name">出生日期</span>
					<span class="edit-more" size="large" @click="open('picker4')"><span class="btn-right iconfont"><span class="info-private"v-text="birthday"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">性别</span>
					<span class="edit-more" @click="popupVisibleSex = true" size="large"><span class="btn-right iconfont"><span v-text="sex"class="info-private"></span>&#xe602;</span>
					</span>
				</li>

			</ul>
		</div>
		<div class="user-info">
			<ul>
				<li>

					<span class="user-info-name">兴趣爱好</span>
					<span class="edit-more" @click="popupVisibleInterests = true" size="large"><span class="btn-right iconfont"><span v-text="interests"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">工作单位</span>
					<span class="edit-more" @click="popupVisibleWorkUnit = true" size="large"><span class="btn-right iconfont"><span v-text="workUnit"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>

					<span class="user-info-name">职务职称</span>
					<span class="edit-more" @click="popupVisibleWorkTit = true" size="large"><span class="btn-right iconfont"><span v-text="workTit"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">联系地址</span>
					<span class="edit-more"><router-link to="/my/list/details/setAddr"class=""tag="a"><span v-text="currentAddr"></span><span class="iconfont">&#xe602;</span></router-link>
					</span>
				</li>
				<li>
					<span class="user-info-name">婚姻状况</span>
					<span class="edit-more" @click="popupVisibleMarriage = true" size="large"><span class="btn-right iconfont"><span v-text="marriage"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>

					<span class="user-info-name">月收入</span>
					<span class="edit-more" @click="popupVisibleMIncome = true" size="large"><span class="btn-right iconfont"><span v-text="mIncome"class=""></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">身份证号码</span>
					<span class="edit-more" @click="popupVisibleIdentity = true" size="large"><span class="btn-right iconfont"><span v-text="identity"class=""></span>&#xe602;</span>
					</span>
				</li>
				<li>

					<span class="user-info-name">教育程度</span>
					<span class="edit-more" @click="popupVisibleTeach = true" size="large"><span class="btn-right iconfont"><span v-text="teach"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">所在行业</span>
					<span class="edit-more" @click="popupVisibleIndustry = true" size="large"><span class="btn-right iconfont"><span v-text="industry"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
			</ul>
		</div>
		<mt-popup v-model="popupVisibleSex" position="bottom">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureSex">
						确定
					</span>
				</div>
				<div class="page-picker-wrapper">
					<mt-picker :slots="numberSlot" @change="onNumberChange" :visible-item-count="3"></mt-picker>
				</div>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleUser" position="right" closeOnClickModal="closeUser">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureUser">
						确定
					</span>
				</div>
				<mt-field label="用户名" placeholder="请输入用户名" v-model="username1" @confirm="handleChange(value)"></mt-field>
			</div>

		</mt-popup>
		<mt-popup v-model="popupVisibleInterests" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureInterests">
						确定
					</span>
				</div>
				<mt-field label="兴趣爱好" placeholder="请输入兴趣爱好" v-model="interests1"></mt-field>
			</div>

		</mt-popup>
		<mt-popup v-model="popupVisibleWorkUnit" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureUnit">
						确定
					</span>
				</div>
				<mt-field label="工作单位" placeholder="请输入工作单位" v-model="workUnit1"></mt-field>
			</div>

		</mt-popup>
		<mt-popup v-model="popupVisibleWorkTit" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureTit">
						确定
					</span>
				</div>
				<mt-field label="工作职称" placeholder="请输入工作职称" v-model="workTit1"></mt-field>
			</div>

		</mt-popup>
		<mt-popup v-model="popupVisibleMarriage" position="bottom">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureMarri">
						确定
					</span>
				</div>
				<div class="page-picker-wrapper">
					<mt-picker :slots="numberSlotM" @change="onMChange" :visible-item-count="3"></mt-picker>
				</div>
			</div>
		</mt-popup>

		<mt-popup v-model="popupVisibleMIncome" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureIncome">
						确定
					</span>
				</div>
				<mt-field label="月收入" placeholder="请输入月收入" v-model="mIncome1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleIdentity" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureIden">
						确定
					</span>
				</div>
				<mt-field label="身份证号码" placeholder="请输入身份证号码" v-model="identity1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleTeach" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureTeach">
						确定
					</span>
				</div>
				<mt-field label="教育程度" placeholder="请输入教育程度" v-model="teach1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleIndustry" position="right">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSureIndustry">
						确定
					</span>
				</div>
				<mt-field label="所在行业" placeholder="请输入所在行业" v-model="industry1"></mt-field>
			</div>
		</mt-popup>
		<mt-datetime-picker ref="picker4" type="date" v-model="birthday" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleChange">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import Upload from '@/components/my/details/Upload'
	export default {
		name: "myInfoEdit",
		props: ['serviceUrl'],
		components: {
			Upload
		},
		data: () => ({
			popupVisibleSex: false,
			popupVisibleUser: false,
			popupVisibleInterests: false,
			popupVisibleWorkUnit: false,
			popupVisibleWorkTit: false,
			popupVisibleTeach: false,
			popupVisibleIndustry: false,
			popupVisibleIdentity: false,
			popupVisibleMIncome: false,
			popupVisibleMarriage: false,
			popupVisibleBirth: false,
			buttonBottom: 0,
			closeUser: false,
			currentAddr: '',
			sex: "",
			sex1: "",
			marriage: "",
			interests: "",
			interests1: "",
			username: "",
			username1: "",
			workUnit: "",
			workUnit1: "",
			workTit: "",
			workTit1: "",
			identity: "",
			identity1: "",
			teach: "",
			teach1: "",
			industry: "",
			industry1: "",
			mIncome: "",
			mIncome1: "",
			inversePic: '', //上传图片
			birthday: null, //生日
			value: null,
			avater: '', //头像地址
			localPic: '', // 未剪裁的头像地址
//			positivePic: '',
			numberSlot: [{
				flex: 1,
				defaultIndex: 0,
				values: ["男", "女", "保密"],
				className: 'slot1',
			}],
			numberSlotM: [{
				flex: 1,
				defaultIndex: 0,
				values: ["未婚", "已婚"],
				className: 'slot2',
			}],
			msg: "",
		}),
		methods: {
			open(picker) {
				this.$refs[picker].open();
			},
			back() {
				this.$router.go(-1);
			},
			onNumberChange(picker, values) {
				this.sex1 = values[0];
			},
			onMChange(picker, values) {
				this.marriage1 = values[0];
			},
//			出生日期修改
			handleChange() {
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						birthday: this.birthday, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('生日修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
			},
			//			性别确认
			confirmSureSex() {
				this.sex = this.sex1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						sex: this.sex, //测试用的id
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('性别修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleSex = false;
			},
			//			用户名修改
			confirmSureUser() {
				this.username = this.username1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						username: this.username, //测试用的id
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('用户名修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleUser = false;
			},
			//			兴趣爱好修改
			confirmSureInterests() {
				this.interests = this.interests1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						interests: this.interests, //测试用的id
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('兴趣爱好修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleInterests = false;
			},
			//			工作单位修改
			confirmSureUnit() {
				this.workUnit = this.workUnit1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						workUnit: this.workUnit,
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('工作单位修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleWorkUnit = false;
			},
		    	//			工作职称修改
			confirmSureTit() {
				this.workTit = this.workTit1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						workTit: this.workTit, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('工作职称修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleWorkTit = false;
			},
				//			是否已婚修改
			confirmSureMarri() {
				this.marriage = this.marriage1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						marriage: this.marriage, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('婚姻状态修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleMarriage = false;
			},
			//			月收入修改
			confirmSureIncome() {
				this.mIncome = this.mIncome1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						mIncome: this.mIncome, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('月收入修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleMIncome = false;
			},
			//			身份证修改
			confirmSureIden() {
				this.identity = this.identity1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						identity: this.identity, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('身份证修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleIdentity = false;
			},
			//			教育程度修改
			confirmSureIndustry() {
				this.industry = this.industry1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						industry: this.industry, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('教育程度修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleTeach = false;
			},
				//			所在行业修改
			confirmSureTeach() {
					this.teach = this.teach1;
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						teach: this.teach, 
					}),
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
                       if (!res.data.state) {
				          alert('所在行业修改失败')
				        }
				}, function(res) {
					// 请求失败回调
					console.log("error from matDetail");
				});
				this.popupVisibleIndustry = false;
			},
			confirmClose() {
				popupVisibleSex: false;
				popupVisibleUser: false;
				popupVisibleInterests: false;
				popupVisibleWorkUnit: false;
				popupVisibleWorkTit: false;
				popupVisibleTeach: false;
				popupVisibleIndustry: false;
				popupVisibleIdentity: false;
				popupVisibleMIncome: false;
				popupVisibleMarriage: false;
				popupVisibleBirth: false;
			},
			// 跳转到图片剪裁
			getLocalPic: function(url) {
				this.localPic = url;
				//			      console.log(this.avater);
				//			      console.log(this.localPic)
				this.$router.push('/my/setEdit/imageUpload')
			},
		},
		mounted: function() {
			if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
				this.axios({
				//					url: this.serviceUrl + "app/goods.htm",
				url:"http://192.168.8.214:8443/app/personDetail.htm",
				method: "POST",
				// 请求后台发送的数据
				data: this.$qs.stringify({
					userId: 32816, //测试用的id
				}),
			
			}).then((res) => {
				// 请求成功回调
				console.log(JSON.stringify(res.data));
//				this.msg = res.data;
				this.avater = res.data.touxiang //头像
				this.username = res.data.userName //用户名
				this.birthday = res.data.birthday,//出生日期
				this.sex = res.data.sex,//性别
				this.interests = res.data.hobbies, //爱好
				this.workUnit = res.data.workPlace,
				this.workTit = res.data.workName,
				this.marriage = res.data.marryState,
				this.mIncome = res.data.monthMoney,
				this.identity = res.data.idcard,
				this.industry = res.data.industry,
				this.teach = res.data.education,
				this.currentAddr = res.data.address
				//console.log(this.msg.companyArray)
			}, function(res) {
				// 请求失败回调
				console.log("error from matDetail");
			});
		}
			}
	}
</script>
<style lang="scss" scoped>
	@import "./../../../css/unit/common";
	.my-header {
		color: $green;
		text-align: center;
		padding: .32rem;
		box-shadow: 0 0.08rem 0.16rem #cccccc;
		border-bottom: 1px solid #333333;
		.my-name {
			overflow: hidden;
			text-align: center;
			.user-contain {
				width: 2.43rem;
				height: 2.43rem;
				text-align: center;
				padding: .06rem;
				border-radius: 50%;
				background-color: #FFFFFF;
				img {
					width: 2.3rem;
					height: 2.3rem;
					vertical-align: middle;
					border-radius: 50%;
				}
			}
			.my-name-info {
				margin: 0 0 0 .32rem;
				h3 {
					font-size: .67rem;
					height: 1.4rem;
					line-height: 1.4rem;
				}
				span {
					font-size: .448rem;
				}
			}
		}
	}
	
	.confirm-btn {
		overflow: hidden;
		width: 100%;
		margin-bottom: .32rem;
		span {
			width: 50%;
			display: inline-block;
			color: #26a2ff;
			font-size: .675rem;
			height: .675rem;
			line-height: .675rem;
			float: left;
			text-align: center;
		}
	}
	
	.mint-popup {
		background-color: #f6f6f7;
		width: 100%;
		padding: .32rem 0;
		.page-picker-wrapper /deep/ .picker-slot-wrapper {
			font-size: .448rem;
			/*.picker-item{
      			padding: .16rem 0 !important;
      		}*/
		}
		.page-picker-wrapper /deep/ .picker-selected {
			font-size: .675rem !important;
		}
		.page-picker-wrapper /deep/ .picker-center-highlight {
			height: .736rem !important;
			line-height: .736rem !important;
		}
	}
	
	.mint-cell /deep/ .mint-cell-wrapper {
		font-size: .576rem;
	}
	
	.mint-field /deep/ .mint-cell-title {
		min-width: 1.92rem;
		width: auto;
		margin-right: .32rem;
	}
	
	.mint-field /deep/ .mintui {
		font-size: .448rem;
	}
	
	.mint-datetime /deep/ .picker-toolbar .mint-datetime-action {
		font-size: .576rem;
	}
	
	.mint-datetime /deep/.mint-datetime-picker .picker-slot {
		font-size: .448rem;
	}
	
	.btn-box {
		$height: 2.82rem;
		$padding: .32rem;
		width: 100%;
		height: $height;
		padding: $padding;
		margin: $padding 0 $padding*2;
		background: #fff;
		ul {
			overflow: hidden;
			height: $height - 2 * $padding;
			li {
				width: 33%;
				text-align: center;
				padding: $padding/2 0 0 0;
				height: $height / 2 - $padding;
				position: relative;
				float: left;
				&>.btn-icon {
					height: 1.12rem;
					font-size: .8rem;
					color: $green;
					line-height: 1.12rem;
					display: block;
				}
				&>.btn-text {
					height: .8rem;
					line-height: .8rem;
					font-size: .384rem;
					color: $green;
					display: block;
				}
				&>.num-msg {
					position: absolute;
					top: 0.1rem;
					right: 1.1rem;
					width: 0.6rem;
					height: 0.6rem;
					font-size: 0.5rem;
					border-radius: 50%;
					color: #FFFFFF;
					text-align: center;
					line-height: 0.6rem;
					background-color: #e11112;
				}
			}
		}
	}
	
	.user-main li {
		margin-top: .32rem;
	}
	
	.user-info {
		$padding: .32rem 0 0 .32rem;
		width: 100%;
		/*padding: $padding;*/
		margin: 0 0 .24rem 0;
		ul {
			overflow: hidden;
			li {
				border-bottom: 1px solid #cccccc;
				overflow: hidden;
				height: 1.376rem;
				padding: .24rem .32rem .24rem .24rem;
				font-size: .512rem;
				background-color: #FFFFFF;
				.iconG {
					color: $green;
					margin-right: 0.5rem;
					font-size: .8rem;
					width: 50px;
				}
				.iconOO {
					color: #f15323;
					margin-right: 0.5rem;
					font-size: .8rem;
				}
				.iconO {
					margin-right: 0.5rem;
					font-size: .8rem;
					color: $orange;
				}
				.edit-more {
					float: right;
					a {
						color: #999999;
					}
					.info-private {
						width: 3.36rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap
					}
					img{
						    width: auto;
						    height: .88rem;
						    vertical-align: middle;
					}
				}
				span {
					height: .88rem;
					line-height: .88rem;
					text-align: right;
				}
				.user-info-name {
					vertical-align: top;
					.user-tit {
						width: 2.5rem;
						display: inline-block;
						color: #999999;
					}
				}
				.title {
					display: inline-block;
					text-align: justify;
					text-align-last: justify;
					padding: 0;
				}
				.text {
					width: 11rem;
					font-size: 0.7rem;
					color: #333333;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.imgpre {
					max-width: 1.152rem;
					max-height: 1.024rem;
					display: inline-block;
					border: 1px solid #ccc;
					vertical-align: middle;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.upload {
					display: inline-block;
					border-radius: 0.2rem;
					text-align: center;
					vertical-align: middle;
					position: relative;
					font-size: 0.7rem;
					input {
						width: 100%;
						height: 100%;
						opacity: 0;
						position: absolute;
						left: 0;
						top: 0;
					}
				}
			}
		}
	}
</style>