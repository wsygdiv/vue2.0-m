<template>
	<div id="setAddr" class="setAddr">
		<div class="my-header">
			<span class="iconfont" style="position:absolute;font-size: .672rem;left: .32rem;" @click="back">
    	 	    &#xe601;
    	 </span>
			<span style="text-align: center;font-size: .554rem;color: #333333;">添加新地址</span>
			<span style="position:absolute;font-size: .554rem;right: .32rem;" @click="submit">
    	 	    保存
    	    </span>
		</div>

		<div class="user-info user-main">
			<ul>
				<li>

					<span class="user-info-name">收货人</span>
					<span class="edit-more" @click="popupVisibleReceiving = true" size="large"><span class="btn-right iconfont"><span v-text="receiving"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">联系电话</span>
					<span class="edit-more" @click="popupVisibleTel = true" size="large"><span class="btn-right iconfont"><span v-text="tel"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">所在地区</span>
					<span class="edit-more" @click="popupVisibleLocation = true" size="large"><span class="btn-right iconfont"><span class="info-private">{{ addressProvince }} {{ addressCity }}</span>&#xe602;</span>
					</span>
				</li>
				<li>
					<span class="user-info-name">街道</span>
					<span class="edit-more" @click="popupVisibleStreet = true" size="large"><span class="btn-right iconfont"><span v-text="street"class="info-private"></span>&#xe602;</span>
					</span>
				</li>
			</ul>
			<div>
				<mt-field label="" placeholder="请填写详细地址" type="textarea" rows="4"></mt-field>
			</div>
			<div class="patientia">
				<span class="user-info-name">默认设置</span>
				<span class="edit-more"><mt-switch class="mtS"v-model="defaultState":class="{'act':defaultState}" @click="defaultState=!defaultState">
					 
				</mt-switch></span>
			</div>
		</div>
		<mt-popup v-model="popupVisibleStreet" position="right" closeOnClickModal="closeUser">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSure">
						确定
					</span>
				</div>
				<mt-field label="街道" placeholder="请输入街道" v-model="street1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleTel" position="right" closeOnClickModal="closeUser">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSure">
						确定
					</span>
				</div>
				<mt-field label="联系电话" placeholder="请输入联系电话" v-model="tel1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleReceiving" position="right" closeOnClickModal="closeUser">
			<div>
				<div class="confirm-btn">
					<span class="" @click="confirmClose">
						取消
					</span>
					<span class="" @click="confirmSure">
						确定
					</span>
				</div>
				<mt-field label="收货人" placeholder="请输入收货人" v-model="receiving1"></mt-field>
			</div>
		</mt-popup>
		<mt-popup v-model="popupVisibleLocation" position="bottom" closeOnClickModal="closeUser">
			<div>
				<div class="page-picker-wrapper">
					<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	const address = {
		'北京': ['北京'],
		'广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
		'上海': ['上海'],
		'天津': ['天津'],
		'重庆': ['重庆'],
		'辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
		'江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
		'湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
		'四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
		'陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
		'河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
		'山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
		'河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
		'吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
		'黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
		'内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
		'山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
		'安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
		'浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
		'福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
		'湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
		'广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
		'江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
		'贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
		'云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
		'西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
		'海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
		'甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
		'宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
		'青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
		'新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
		'香港': ['香港'],
		'澳门': ['澳门'],
		'台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
	};
	export default {
		name: "setInfo",
		props: ['serviceUrl'],
		data: () => ({
			defaultState: false,
			popupVisibleStreet: false,
			popupVisibleReceiving: false,
			popupVisibleTel: false,
			popupVisibleLocation: false,
			buttonBottom: 0,
			showToolbar: true,
			closeUser: false,
			receiving: "argvar",
			receiving1: "qwdqw",
			tel: "wefqwegf",
			tel1: "1124324123",
			street: "sdv",
			street1: "sdv",
			addressProvince:"",
			addressCity:"",
			//			numberSlot: [{
			//				flex: 1,
			//				defaultIndex: 0,
			//				values: ["男", "女", "保密"],
			//				className: 'slot1',
			//			}],
			addressSlots: [{
				flex: 1,
				values: Object.keys(address),
				className: 'slot1',
				textAlign: 'center'
			}, {
				divider: true,
				content: '-',
				className: 'slot2'
			}, {
				flex: 1,
				values: ['北京'],
				className: 'slot3',
				textAlign: 'center'
			}],
			addressProvince: '北京',
			addressCity: '北京',

		}),
		methods: {
			back() {
				this.$router.go(-1);
			},
			onNumberChange(picker, values) {
				this.number = values[0];
			},
			onAddressChange(picker, values) {
				picker.setSlotValues(1, address[values[0]]);
				this.addressProvince = values[0];
				this.addressCity = values[1];
			},
			confirmSure() {
				this.tel = this.tel1;
				this.street = this.street1;
				this.receiving = this.receiving1;
				this.popupVisibleTel = false;
				this.popupVisibleReceiving = false;
				this.popupVisibleStreet = false;
			},
			confirmClose() {
				this.popupVisibleStreet = false;
			},
			submit: function(item) {
				if(!/\s{0,}[\S]{1,}[\s\S]{0,}/.test(this.receiving)) {
					Toast({
				          message: '收件人不能为空',
				          position: 'middle',
				          className:"tip",
				        });
				} 
				else if(!/^1[3|4|5|7|8][0-9]{9}$/.test(this.tel)) {
					Toast({
				          message: '手机号输入错误',
				          position: 'middle',
				          className:"tip",
				        });
				} else if(!/\s{0,}[\S]{1,}[\s\S]{0,}/.test(this.addressProvince)) {
					Toast({
				          message: '所在地区不能为空',
				          position: 'middle',
				          className:"tip",
				        });
				} else if(this.detial.length < 5) {
					Toast({
				          message: '详细地址至少5个字',
				          position: 'middle',
				          className:"tip",
				        });
				} else {
					var parameter = '?wxbdopenId=' + this.id + '&consignee=' + this.name + '&phone=' + this.tel + '&areaName=' + this.place + '&address=' + this.detial + '&isDefault=' + this.defaultState
					var url = ''
//					if(this.editId) {
//						url = this.apiURL + 'member/receiver/update.jhtml' + parameter + '&id=' + this.editId
//					} else {
//						url = this.apiURL + 'member/receiver/save.jhtml' + parameter
//					}
					this.$http.get(url).then((response) => {
						if(response.data.state) {
							this.$emit('addState', true)
							window.history.go(-1)
						} else {
							Toast({
				          message: '最多只能添加8条',
				          position: 'middle',
				          className:"tip",
				        });
						}
					}, (response) => {
						Toast({
				          message: '操作失败',
				          position: 'middle',
				          className:"tip",
				        });
					})
				}
			}

		},
		mounted: function() {

			beforeCreate: {
				this.$http({
					//					url: this.serviceUrl + "app/goods.htm",
					method: "POST",
					// 请求后台发送的数据
					params: {
						id: this.$route.params.goodsId,
						data: {

						}
					},
					// 设置请求头
					headers: {
						"Content-Type": "x-www-from-urlencoded"
					}
				}).then(function(res) {
					// 请求成功回调
					console.log(JSON.stringify(res.data));
					this.msg = res.data;
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
	}
	
	.user-info {
		$padding: .32rem 0 0 .32rem;
		width: 100%;
		ul {
			overflow: hidden;
			li {
				border-bottom: 1px solid #cccccc;
				overflow: hidden;
				height: 1.376rem;
				padding: .24rem .32rem .24rem .24rem;
				font-size: .512rem;
				background-color: #FFFFFF;
				.edit-more {
					float: right;
					a {
						color: #999999;
					}
				}
				span {
					display: inline-block;
					height: .88rem;
					line-height: .88rem;
				}
				.user-info-name {
					vertical-align: top;
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
	
	.mint-cell /deep/ .mint-field-core {
		font-size: .448rem;
	}
	
	.patientia {
		background-color: #FFFFFF;
		margin-top: .6rem;
		padding: .24rem;
		.edit-more {
			float: right;
			a {
				color: #999999;
			}
		}
		.mtS /deep/.mint-switch-core {
			width: 1.664rem;
			height: 1rem;
			border-radius: .448rem;
		}
		.mtS /deep/ .mint-switch-input:checked+.mint-switch-core {
			border-color: $green;
			background-color: $green;
		}
		.mtS /deep/ .mint-switch-input:checked+.mint-switch-core::after {
			-webkit-transform: translateX(20px);
			transform: translateX(42px);
		}
		.mtS /deep/ .mint-switch-core::after {
			width: .96rem;
			height: .96rem;
			background-color: #fff;
			-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
			box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
		}
		.mtS /deep/ .mint-switch-core::after,
		.mint-switch-core::before {
			border-radius: 28px;
		}
		span {
			display: inline-block;
			height: .88rem;
			line-height: .88rem;
		}
		.user-info-name {
			vertical-align: top;
		}
	}
</style>