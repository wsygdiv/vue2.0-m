<template>
  <div id="search" class="search">
    search页面
    <button class="btn" type="button" name="button">按钮1</button>
  </div>
</template>
<script>
export default {
  name: "search",
  data: () => ({
  }),
}
</script>
<style lang="scss" scoped>
$baseFontSize:      10px !default;
@function pxToRem($px) {
  @return $px / $baseFontSize * 1rem;
}
@mixin btn($width,$height,$bg-color,$font-color:#fff,$font-size:.512rem) {
  width: $width;
  height: $height;
  background: $bg-color;
  font-size: $font-size;
  color: $font-color;
  border: 1px solid rgba(0,0,0,.2);
  /* box-sizing: border-box; */
  &:active {
    /* background: ; */
  }
}
.btn {
  /* @include btn(3rem,1.2rem,#969); */
  width: pxToRem(30px);
}
</style>
