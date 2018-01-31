<template>
  <div class="file-wrapper">
    <slot></slot>
    <!-- 因为android和ios调用拍照和本地的方式不同，所以进行区分 -->
    <input class="file"name="photo" v-if="isAndroid && isImage" type="file" :accept="imageAccept" capture="camera" @change="upload" ref="file"multiple />
    <input class="file" name="photo"v-if="isIphone && isImage" type="file" :accept="imageAccept" @change="upload" ref="file"multiple="multiple"/>
    <input class="file"name="photo" v-if="isAndroid && !isImage" type="file" :accept="videoAccept" capture="camcorder" @change="upload" ref="file" multiple/>
    <input class="file"name="photo" v-if="isIphone && !isImage" type="file" :accept="videoAccept" @change="upload" ref="file" multiple/>
  </div>
</template>

<script>
/**
 * 参数
 * type：剪裁类型   （图片/视频）
 * Boff：是否已经加载完成（true：未加载完成   false：已经加载完成）；
 *返回值：
 *图片：图片路径
 *视频：视频路径、视频显示图片路径
 */
import { Toast } from 'mint-ui';
export default {
  props: {
  	serviceUrl: [String, Number],
    type: {
      type: String,
      default: 'image'
    }
  },
  data () {
    return {
      imageAccept: 'image/*',
      videoAccept: 'video/*',
      file: '',
      isAndroid: false,
      isIphone: false,
    }
  },
  methods: {
    upload: function () {
      this.$indicator.open()
      let formData = new FormData()
      let file = this.$refs.file.files[0]
      let size = file.size / 1024 / 1024
//       允许上传的文件大小小于100M
      if (size > 100) {
      	 Toast({
				          message: '请上传大小在100M以内的文件',
				          position: 'middle',
				          className:"tip",
				        });
        return
      }
      formData.append('photo', file)
      var avater = this.$refs.file.value
      var photoId = "";
//    console.log(this.$refs.file.value)
      let config = {
            headers:{'Content-Type':'multipart/form-data'}
      }
      this.axios.post(this.serviceUrl+"app/uploadTouxiang.htm" , formData,config).then((res) => {
      	avater = res.data.imgUrl
      	console.log(res.data)
        photoId = res.data.photoId
        this.$emit('pic',avater)
         this.$emit('id',photoId)
        if (res.data.imgUrl) {
          this.$emit('poster', res.data.imgUrl)
        }
        this.$refs.file.value = ''
        this.$indicator.close()
      }, (res) => {
        this.$indicator.close()
         Toast({
				          message: '上传失败',
				          position: 'middle',
				          className:"tip",
				        });
      })
    }
  },
  created() {
    // 判断设备是android还是ios
    let u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      this.isAndroid = true
    } else if (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      this.isIphone = true
    }
  },
  computed: {
    // 剪裁类型是否为图片
    isImage: function () {
      let data = true
      if (this.type === 'video') {
        data = false
      }
      return data
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.file-wrapper{
  position: relative;
  .file{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 99;
  }
}
</style>
