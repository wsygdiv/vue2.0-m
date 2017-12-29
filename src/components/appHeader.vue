<template>
  <div id="appHeader" class="haeder">
    <span class="iconfont header-back" @click="back">&#xe601;</span>
    <span class="header-text">绿色装修网</span>
    <span class="header-more"></span>
  </div>
</template>
<script>
export default {
  name: "appHeader",
  data: () => ({
  }),
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../css/unit/common";
.haeder {
  $height: 1.408rem;
  width: 100%;
  height: $height;
  background: $green;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  .header-back {
    font-size: .576rem;
    float: left;
    width: $height;
    height: $height;
    text-align: center;
    line-height: $height;
  }
  .header-text {
    font-size: .576rem;
    float: left;
    width: 12 - $height * 2;
    height: $height;
    text-align: center;
    line-height: $height;
  }
  .header-more {
    font-size: .576rem;
    float: left;
    width: $height;
    height: $height;
    text-align: center;
    line-height: $height;
  }
}
</style>
