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
			                  <img ref="img" :src="imgSrc" alt="pic">
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
				<li @click="Location">
					<span class="user-info-name">所在地区</span>
					<!--<span class="edit-more"><router-link to="/my/list/details/setAddr"class=""tag="a"><span v-text="currentAddr"></span><span class="iconfont">&#xe602;</span></router-link>
					</span>-->
					<span class="edit-more" @click="popupVisibleLocation = true"><span v-text="currentAddr" size="large"ref="addT"></span><span class="iconfont">&#xe602;</span>
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
				<li style="text-align: center;"class="submitBtn">			
			  		<mt-button @click.native="submitConfirm" size="large"><span class="user-info-name">确认提交</span></mt-button>
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
		<mt-popup v-model="popupVisibleLocation" position="bottom" >
			<div>
				<div class="page-picker-wrapper">
					 <ul class="select" ref="select">
					      <li  value=""v-text="defaultProvince"@click="btnP =true">省份</li>
					      <ul v-show="btnP == true">
					      	<li v-for="(province,index) in addressProvince":key="index"@click="changeProvince(index)"ref="selValueP":id="province.id">{{province.name}}</li>
					      </ul>
					 </ul>
					 <ul class="select"  >
					      <li  value=""v-text="defaultCity"@click="btnC =true">市</li>
					      <ul v-show="btnC == true">
					      	<li v-for="(city,index) in addressCity"@click="changeCity(index)"ref="selValueC" :key="index":id="city.id">{{city.name}}</li>
					      </ul>
					      
					 </ul>
					 <ul class="select">
					      <li  value=""v-text="defaultRegion"@click="btnA =true">县</li>
					      <ul v-show="btnA == true">
					      	<li v-for="(area,index) in addressRegion"@click="changeRegion(index)"ref="selValueA":key="index":id="area.id">{{area.name}}</li>
					      </ul>
					      
					 </ul>
				</div>
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
		<!--<mt-datetime-picker ref="picker4" type="date" v-model="birthday" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleChange">
		</mt-datetime-picker>-->
		<transition name="slide-fade">
	      <router-view  :localPic="localPic" type="headPic" ></router-view>
	    </transition>
	</div>
</template>
<script>
	import Upload from '@/components/my/details/Upload'
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	const address = {};
	export default {
		name: "myInfoEdit",
		props: ['serviceUrl',"id"],
		components: {
			Upload
		},
		data: () => ({
			btnP:false,
			btnC:false,
			btnA:false,
			popupVisibleSex: false,
			popupVisibleUser: false,
			popupVisibleInterests: false,
			popupVisibleWorkUnit: false,
			popupVisibleWorkTit: false,
			popupVisibleTeach: false,
			popupVisibleIndustry: false,
			popupVisibleLocation:false,
			popupVisibleIdentity: false,
			popupVisibleMIncome: false,
			popupVisibleMarriage: false,
			popupVisibleBirth: false,
			buttonBottom: 0,
			closeUser: false,
			imgSrc:'',
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
			addrId:"",
			form:"",
			provinceName:"",
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
			addressProvince: {},
			addressCity: '',
            addressRegion: '',
            currentP:'',//选中省
            currentC:'',//选中市
            currentR:'',//选中县
			msg: "",
			defaultProvince:"",
			defaultCity:"",//默认市
			defaultRegion:"",//默认地区
			hasDefaultAddr:"",//判断
			areaId:'',//县级ID
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
			submitConfirm() {
			   	   MessageBox.confirm('确定执行此操作?').then(action => {
			   	   	  let formData = new FormData();
			   	   	  formData.append('userId', this.userId);
			   	   	  formData.append('areaId', this.areaId);
			   	   	  formData.append('addrId', this.addrId);
			   	   	  formData.append('photoId', this.photoId);
			   	   	  formData.append('birthday', this.birthday);
			   	   	  formData.append('sex', this.sex);
			   	   	  formData.append('userName', this.userName);
			   	   	  formData.append('birthday', this.birthday);
			   	   	  formData.append('hobbies', this.interests);
			   	   	  formData.append('workPlace', this.workUnit);
			   	   	  formData.append('workName', this.workTit);
			   	   	  formData.append('marryState', this.marriage);
			   	   	  formData.append('monthMoney', this.mIncome);
			   	   	  formData.append('idcard', this.identity);
			   	   	  formData.append('industry', this.industry);
			   	   	  formData.append('education', this.teach);
			   	   	  formData.append('address', this.currentAddr);
			   	   	   let config = {
          			  headers:{'Content-Type':'multipart/form-data'}
				      }
				      this.axios.post(this.serviceUrl+"app/uploadTouxiang.htm",formData,config).then((res) => {
				           Toast({
								          message: '上传成功',
								          position: 'middle',
								          className:"tip",
								        });
								        this.$router.go(-1);
				      }, (res) => {
				         Toast({
								          message: '上传失败',
								          position: 'middle',
								          className:"tip",
								        });
				      })
                      
			       });
			   },
			//地区修改
			Location(){
				this.axios({
					url: this.serviceUrl + "app/getLinkAddr.htm",
//					url:"http://192.168.8.214:8443/app/getLinkAddr.htm",
					method: "POST",
					data: this.$qs.stringify({
//						areaId: this.areaId, 
					}),
				}).then((res) => {
//                     console.log(res.data)
                       this.form = res.data;
                       this.hasDefaultAddr = res.data.hasDefaultAddr;
                       if(this.hasDefaultAddr){
						this.defaultCity = res.data.defaultCity.name;
						this.defaultRegion = res.data.defaultRegion.name;
                       }else{
                       	  this.defaultProvince = res.data.provinces[0].name;
                       	 
                       }
						 this.addressProvince = res.data.provinces;
						console.log(this.addressProvince)
				},  (err)=>  {
					// 请求失败回调
					console.log("地址请求错误");
				});
			},
			//市区修改
			changeProvince(index){
//				console.log(this.$refs.selValueP[index].innerText)
                 console.log(this.$refs.selValueP[index].id)
				this.btnP = false;
				this.defaultProvince = this.$refs.selValueP[index].innerText;
				this.defaultCity = "请选择",
				this.defaultRegion ="请选择",
				this.addrId = this.$refs.selValueP[index].id
				console.log(this.addrId);
//				console.log(this.currentP);
				this.axios({
					url: this.serviceUrl + "app/getChildAddr.htm",
//					url:"http://192.168.8.214:8443/app/getChildAddr.htm",
					method: "POST",
					data: this.$qs.stringify({
						addrId: this.addrId, 
					}),
				}).then((res) => {
                       this.form = res.data;
//                     console.log(res.data)
						this.addressCity = res.data;
//						console.log(this.addressCity)
				},  (err)=>  {
					// 请求失败回调
					console.log("地址请求错误");
				});
			},
			changeCity(index){
				console.log(this.$refs.selValueC[index].innerText)
				this.btnC = false;
				this.defaultCity = this.$refs.selValueC[index].innerText;
				this.addrId = this.$refs.selValueC[index].id;
				this.axios({
					url: this.serviceUrl + "app/getChildAddr.htm",
//					url:"http://192.168.8.214:8443/app/getChildAddr.htm",
					method: "POST",
					data: this.$qs.stringify({
						addrId: this.addrId, 
					}),
				}).then((res) => {
                       this.form = res.data;
//                     console.log(res.data)
						this.addressRegion = res.data;
//						console.log(this.addressRegion)
				},  (err)=>  {
					// 请求失败回调
					console.log("地址请求错误");
				});
			},
			changeRegion(index){
				console.log(this.$refs.selValueA[index].innerText)
				this.btnA= false;
				this.defaultRegion = this.$refs.selValueC[index].innerText;
				this.areaId = this.$refs.selValueA[index].id;
				console.log(this.areaId)
//				console.log(this.$refs.selectId)
				this.currentAddr =this.defaultProvince+this.defaultCity+this.defaultRegion
				console.log(this.$refs.select.value)
				this.popupVisibleLocation = false;
			},
   //			出生日期修改
			handleChange() {
				this.axios.post({
					//					url: this.serviceUrl + "app/goods.htm",
					data: this.$qs.stringify({
						birthday: this.birthday, 
					}),
				}).then((res) => {
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
				this.popupVisibleSex = false;
			},
			//			用户名修改
			confirmSureUser() {
				this.username = this.username1;
				this.popupVisibleUser = false;
			},
			//			兴趣爱好修改
			confirmSureInterests() {
				this.interests = this.interests1;
				this.popupVisibleInterests = false;
			},
			//			工作单位修改
			confirmSureUnit() {
				this.workUnit = this.workUnit1;
			},
		    	//			工作职称修改
			confirmSureTit() {
				this.workTit = this.workTit1;
				this.popupVisibleWorkTit = false;
			},
				//			是否已婚修改
			confirmSureMarri() {
				this.marriage = this.marriage1;
				this.popupVisibleMarriage = false;
			},
			//			月收入修改
			confirmSureIncome() {
				this.mIncome = this.mIncome1;
				this.popupVisibleMIncome = false;
			},
			//			身份证修改
			confirmSureIden() {
				this.identity = this.identity1;
				this.popupVisibleIdentity = false;
			},
			//			教育程度修改
			confirmSureIndustry() {
				this.industry = this.industry1;
				this.popupVisibleTeach = false;
			},
				//			所在行业修改
			confirmSureTeach() {
					this.teach = this.teach1;
				this.popupVisibleIndustry = false;
			},
			confirmClose() {
				this.popupVisibleSex = false;
				this.popupVisibleUser = false;
				this.popupVisibleInterests = false;
				this.popupVisibleWorkUnit = false;
				this.popupVisibleWorkTit = false;
				this.popupVisibleTeach = false;
				this.popupVisibleIndustry = false;
				this.popupVisibleIdentity = false;
				this.popupVisibleMIncome = false;
				this.popupVisibleMarriage = false;
				this.popupVisibleBirth = false;
			},
			// 跳转到图片剪裁
			getLocalPic: function(url) {
				this.localPic = url;
				//			      console.log(this.avater);
				//			      console.log(this.localPic)
//				this.$router.push('/my/setEdit/imageUpload')
			},
		},
		mounted: function() {
			if(!window.sessionStorage.getItem("userId")) {
					this.$router.push("/login");
				} else {
					this.userId = window.sessionStorage.getItem("userId");
					this.token = window.sessionStorage.getItem("token");
				this.axios({
//				url: this.serviceUrl + "app/personDetail.htm",
				url:"http://192.168.8.214:8443/app/personDetail.htm",
				method: "POST",
				// 请求后台发送的数据
				data: this.$qs.stringify({
//					userId: 32816, //测试用的id
					userId: this.userId, 
				}),
			
			}).then((res) => {
				// 请求成功回调
				console.log(JSON.stringify(res.data));
//				this.msg = res.data;
       			this.areaId=res.data.areaId;
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
			.submitBtn{
    			
    			.mint-button--large{
    				background-color: #4aab2d;
    				color: #FFFFFF;
    			}
			}
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
	.select{
		font-size: .448rem;
		width: 30%;
		max-height:2rem ;
		overflow-y:auto;
		float: left;
	}
	.select option{
		width: 100%;
		font-size: .448rem;
	}
</style>
<style>
	.user-info-name{
    			vertical-align: top;
    		}
    .mint-button--large {
    display: block;
    width: 100%;
    background: #ffffff;
    height: 100%;
    /* border: none; */
    font-size: .576rem;}
    .mint-button--default {
    -webkit-box-shadow: 0 0 1px #ffffff;
}
.mint-msgbox{
	font-size: .448rem;
}
.mint-msgbox-title{
	font-size: .448rem;
}
.mint-msgbox-btn{
    font-size: .448rem;	
}
</style>