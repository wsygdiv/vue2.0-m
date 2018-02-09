<template>
	<div id="imageUpload" class="imageUpload">
		<div class="btn-wrapper">
			<a class="fl" @click="cancel">取消</a>
			<a class="fr" @click="finish('base64')">确定</a>
		</div>
		<vueCropper ref="cropper" :img="option.img" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :canMoveBox="option.canMove" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox"></vueCropper>
		<div class="test-button">
			<label class="btn" for="uploads">上传本地图片</label>
			<input type="file" id="uploads" name="photo" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
		</div>
		<div class="test-button">
			<label class="btn" for="uploadsPhoto">拍照上传</label>
			<input type="file" id="uploadsPhoto" accept="image/*" style="position:absolute; clip:rect(0 0 0 0);" capture="camera" @change="uploadImg($event, 1)">
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import vueCropper from 'vue-cropper'
	export default {
		props: {
			serviceUrl: [String],
		},
		data: function() {

			return {
				crap: true,
				previews: {},
				isAndroid: false,
				isIphone: false,
				option: {
					img: '',
					autoCrop: true,
					autoCropWidth: 300,
					autoCropHeight: 300,
					fixedBox: true,
					canMove: false,
				},
			}
		},
		methods: {
			clearCrop() {
				// clear
				this.$refs.cropper.clearCrop()
			},
			// 实时预览函数
			realTime(data) {
				this.previews = data
			},
			// 取消剪裁
			cancel: function() {
				window.history.go(-1)
			},
			// 确认剪裁
			finish(type) {
				// 输出

				if(type === 'base64') {
					this.$refs.cropper.getCropBlob((data) => {
						console.log(data)
						this.$indicator.open()
						let formData = new FormData()
						formData.append('photo', data)
						let config = {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
						this.axios.post(this.serviceUrl + "app/uploadTouxiang.htm", formData, config).then((res) => {
							this.avater = res.data.imgUrl
							console.log(res.data)
							this.photoId = res.data.photoId
							this.$emit('pic', this.avater)
							this.$emit('id', this.photoId)
							if(res.data.imgUrl) {
								this.$emit('poster', res.data.imgUrl)
							}
							Toast("上传成功")
							this.$indicator.close()
						}, (res) => {
							this.$indicator.close()
							Toast({
								message: '上传失败',
								position: 'middle',
								className: "tip",
							});
						})
					})
				}
				this.$router.go(-1);
			},

			uploadImg(e, num) {
				//上传图片
				// this.option.img
				var file = e.target.files[0]
				if(!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					Toast('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
					return false
				}
				var reader = new FileReader()
				reader.onload = (e) => {
					let data
					if(typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} else {
						data = e.target.result
					}
					if(num === 1) {
						this.option.img = data
					} else if(num === 2) {
						this.example2.img = data
					}
				}
				// 转化为base64
				// reader.readAsDataURL(file)
				// 转化为blob
				reader.readAsArrayBuffer(file)
			}
		},
		created() {
			// 判断设备是android还是ios
			let u = navigator.userAgent
			if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				this.isAndroid = true
				console.log("isAndroid")
			} else if(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.isIphone = true
				console.log("isIphone")
			}
		},
		computed: {
			// 剪裁类型是否为图片
			isImage: function() {
				let data = true
				if(this.type === 'video') {
					data = false
				}
				return data
			}
		},
		components: {
			vueCropper
		},
	}
</script>
<style lang="scss" scoped>
	@import "./../../../css/unit/common";
	.imageUpload {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: auto;
		.vue-cropper {
		  height: 12rem;
	   }
	}
	
	.cropper-crop-box .cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.cropper-face {
		background-color: none;
	}
	
	.test-button {
		position: relative;
		top: 1rem;
		text-align: center;
		margin-bottom: 0.36rem;
		label {
			padding: .16rem;
			border: 1px solid #CCCCCC;
			font-size: .48rem;
			background-color: #26a2ff;
			color: #FFFFFF;
		}
	}
	
	.btn-wrapper {
		line-height: 2rem;
		height: 2rem;
		background: rgba(100, 100, 100, 0.5);
		font-size: 0.8rem;
		z-index: 4;
		position: relative;
		top: 0;
		.fl {
			float: left;
		}
		.fr {
			float: right;
		}
		a {
			width: 4rem;
			text-align: center;
			color: #fff
		}
	}
</style>