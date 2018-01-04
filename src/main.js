// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./app"
import router from "./router"
import VueResource from "vue-resource"
import VueAwesomeSwiper from "vue-awesome-swiper"
require('swiper/dist/css/swiper.css')
require("./css/unit/base.scss")
require("./js/unit/common.js")
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
import AlloyFinger from 'alloyfinger' // 手势库
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerPlugin, {
    AlloyFinger
})
import Transform from 'alloyfinger/transformjs/transform'

Vue.use(Transform, {
  AlloyFinger
})
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
