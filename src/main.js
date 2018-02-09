// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./app"
import router from "./router"
import VueResource from "vue-resource"
import VueAwesomeSwiper from "vue-awesome-swiper"
import VueCropper from "vue-cropper"
require('swiper/dist/css/swiper.css')
require("./css/unit/base.scss")
require("./js/unit/common.js")
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
//请求方式
import axios from 'axios'
Vue.prototype.axios  = axios
import qs from 'qs'
/* 注入vue全局中，这样我们可以在组件内或者JS内通过使用this.$qs来使用qs库*/
Vue.prototype.$qs = qs
//ui组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
// vue-resource 允许跨域携带cookie
Vue.http.options.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: "#app",//指向index.html.
  router,
  template: "<app/>",
  components: { App }
})
