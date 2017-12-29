<template>
  <div id="app" class="app">
    <div class="count">
      <router-view :serviceUrl="serviceUrl">
        <app-header slot="app-header"></app-header>
        <app-footer slot="app-footer"></app-footer>
      </router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from "./components/appHeader";
  import AppFooter from "./components/appFooter";
  import VueAwesomeSwiper from "vue-awesome-swiper"

  export default {
    name: "app",
    data: () => ({
      serviceUrl: "http://124.204.40.11:8088/",
      //serviceUrl: "http://192.168.8.183:8088/app/",
    }),
    components: {
      AppFooter,
      AppHeader
    },
    mounted: function(){
    }
  }
</script>

<style lang="scss" scoped type="text/css">
</style>
