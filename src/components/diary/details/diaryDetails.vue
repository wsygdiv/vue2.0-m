<template>
  <div id="diaryDetails" class="diary-details">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <div class="content">
      <textarea class="content-title" v-model="msgTitle" placeholder="日记标题"></textarea>
      <textarea class="content-text" v-model="msg" placeholder="日记内容"></textarea>
    </div>

    <div class="diary-details-more">
      <div class="btn" @click="submit">删除</div>
      <div class="btn" @click="submit">图片</div>
      <div class="btn" @click="submit">字号</div>
      <div class="btn" @click="submit">保存</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "diaryDetails",
  data: () => ({
    msgTitle:"",
    msg:""
  }),
  mounted() {
    //do something after mounting vue instance
  },
  methods: {
    submit() {
      alert("正在开发中...");
      // alert(this.msg);
    }
  },
}
</script>
<style lang="scss" scoped>
@import "./../../../css/unit/common";
$padding: .32rem;
/* .diary-details {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
} */

.content {
  width: 100%;
  position: fixed;
  top: 1.408rem;
  left: 0;
  bottom: 1.12rem;
  background: #fff;
  textarea {
    outline: none;
    resize:none;
    left: 0;
    width: 100%;
    line-height: 2em;
    background: #fff;
    position: absolute;
    padding: 0 $padding;
    &.content-title {
      font-size: .512rem;
      top: 0;
      height: 2.048rem;
    }
    &.content-text {
      top: 2.048rem;
      bottom: 0;
      padding: $padding;
      font-size: .384rem;
      border-top: 1px solid #e4e4e4;
    }
  }
}
.diary-details-more {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.12rem;
  background: #e4e4e4;
  .btn {
    text-align: center;
    width: 25%;
    float: left;
    font-size: .384rem;
    height: 1.12rem;
    line-height: 1.12rem;
  }
}
</style>
