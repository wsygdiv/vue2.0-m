<template>
  <div id="demoDetails" class="demo-details">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <div class="demo-details-box">
      <!-- Details -->
      <div class="details">
        <swiper class="details-image" :options="demoDetails" res="demoDetails">
          <swiper-slide class="details-image-list" v-for="(detailsImageList,index) in msg.photos" :key="detailsImageList.key">

            <router-link :to="'bigImage/' + msg.id" tag="div" append class="pic" :style="{backgroundImage:'url('+ detailsImageList.path +')'}"></router-link>
            <div class="pic-text" v-text="detailsImageList.name"></div>
          </swiper-slide>
          <div class="demo-details-pagination" slot="pagination"></div>
        </swiper>
        <div class="details-text">
          <div class="details-text-list">
            <span v-if="msg.size" v-html="msg.size + ' M<sup>2</sup>/'"></span>
            <span v-if="msg.houseType" v-text="msg.houseType + '/'"></span>
            <span v-if="msg.style" v-text="msg.style"></span>
          </div>
          <div class="details-text-list" v-if="msg.decorateCompanyName" v-text="'设计公司：' + msg.decorateCompanyName"></div>
          <div class="details-text-list" v-if="msg.constructionUnit" v-text="'施工单位：' + msg.constructionUnit"></div>
          <div class="details-text-list" v-if="msg.addr" v-text="'项目地址：' + msg.addr"></div>
          <div class="details-text-list big" v-if="msg.designerName">
            <div class="pic" v-if="msg.photo"><img :src="msg.photo" alt=""></div>
            <div class="name" v-text="'设计师：' + msg.designerName"></div>
            <router-link :to="'/demo/order/' + msg.designerId" tag="div" class="order-btn" v-if="msg.designerId">预约设计</router-link>
          </div>
        </div>
      </div>

      <!-- Tab -->
      <div class="tab">
        <ul class="tab-box">
          <li :class="'tab-list' + ' ' + (0 === tabFlag ? 'cur' : '')" @click="tab(0)">项目介绍</li>
          <li :class="'tab-list' + ' ' + (1 === tabFlag ? 'cur' : '')" @click="tab(1)">设计公司介绍</li>
          <li :class="'tab-list' + ' ' + (2 === tabFlag ? 'cur' : '')" @click="tab(2)">施工单位介绍</li>
        </ul>
      </div>

      <!-- Tab Box -->
      <swiper class="on-tab" :options="onTabSwiper" ref="onTabSwiper" >
        <swiper-slide class="on-tab-list">
          <div class="on-tab-list-text edit-html" v-html="msg.declaration"></div>
          <div class="on-tab-list-text none" v-if="!msg.declaration">暂无介绍...</div>
        </swiper-slide>
        <swiper-slide class="on-tab-list">
          <div class="on-tab-list-text edit-html" v-html="msg.decorateCompanyDes"></div>
          <div class="on-tab-list-text none" v-if="!msg.decorateCompanyDes">暂无介绍...</div>
        </swiper-slide>
        <swiper-slide class="on-tab-list">
          <div class="on-tab-list-text edit-html" v-html="msg.constructionUnitDes"></div>
          <div class="on-tab-list-text none" v-if="!msg.constructionUnitDes">暂无介绍...</div>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: "demoDetails",
  props: ['serviceUrl'],
  components: {
    InfiniteLoading,
  },
  data: () => ({
    msg:{},
    tabFlag: 0,//切换swiper 的index  同时也是请求的第几个（类别）数据

    demoDetails: {
      notNextTick: true,
      slidesPerView:"auto",

      spaceBetween: 20,

      pagination : '.demo-details-pagination',
      paginationType : 'fraction',
    },

    onTabSwiper: {
      notNextTick: true,

      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:false,//修改swiper的父元素时，自动初始化swiper
      onSlideChangeEnd: function(swiper){
        swiper.update();
      },
    },

  }),
  computed:{
    demoDetailsFn() {
      return this.$refs.demoDetails.swiper
    },
    onTabSwiperFn() {
      return this.$refs.onTabSwiper.swiper
    },
  },
  methods: {
    tab(num) {
      this.onTabSwiperFn.slideTo(num, 100, false);
      this.tabFlag = num;
    }
  },
  mounted() {
    //do something after mounting vue instancev  ----------↓----------↓----------
    var that = this;

    //加载默认数据 Start
    this.$http({
      url: this.serviceUrl + "app/works_message.htm",
      // url: "http://192.168.8.53/app/works_message.htm",
      method:"POST",
      params: {
        worksId: this.$route.params.id,
      },
      headers: {
          "Content-Type": "x-www-from-urlencoded"
      }
    }).then((res) => {
      this.msg = res.data;
      console.log(JSON.stringify(res.data));
    },(res) => {
      console.log("error from 案例详情demoDetails.vue");
    });
    //加载默认数据 Start

    //切换Swiper的时候 改变Tab状态
    that.onTabSwiperFn.params.onSlideChangeEnd = function(swiper){
      that.tabFlag = swiper.activeIndex;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../../../css/unit/common";
$padding: .32rem;
//details Start
.demo-details-box {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
}
.details {
  .details-image {
    height: 6.464rem;
    background: #fff;
    position: relative;
    .demo-details-pagination {
      right: .32rem;
      bottom: 0;
      height: 1.28rem;
      line-height: 1.28rem;
      left: auto;
      width: 3rem;
      text-align: right;
      position: absolute;
    }
    .details-image-list {
      height: 6.464rem - 1.28rem;
      width: 11.36rem;
      .pic {
        @include pic-bg(11.36rem,6.464rem - 1.28rem);
      }
      .pic-text {
        display: none;
        position: absolute;
        bottom: -1.28rem;
        height: 1.28rem;
        padding: 0 $padding;
        line-height: 1.28rem;
        width: 8rem;
      }
      &.swiper-slide-active {
        .pic-text {
          display: block;
        }
      }
    }
  }
  .details-text {
    margin-bottom: $padding;
    .details-text-list {
      padding: 0 $padding;
      height: 1.28rem;
      line-height: 1.28rem;
      font-size: .416rem;
      color: #333;
      background: #fff;
      border-top: 1px solid #ccc;
      @include text-overflow;
      &.big {
        height: auto;
        overflow: hidden;
        position: relative;
        padding: $padding;
        .pic {
          @include pic(2.24rem,2.24rem);
          float: left;
          margin: 0 $padding 0 0;
          border-radius: 50%;
        }
        .order-btn {
          top: 50%;
          margin-top: -.5rem;
          right: .32rem;
          width: 3rem;
          background: #ff9b54;
          border-radius: .096rem;
          position:absolute;
          border: .032rem solid rgba(0,0,0,.1);
          box-sizing: border-box;
          line-height: 1rem;
          height: 1rem;
          text-align: center;
          color: #fff;
        }
      }
    }
  }
}
//details End


//Tab Start
.tab {
  width: 100%;
  height: 1.408rem;
  padding: 0 $padding;
  font-size: 0;
  background: #fff;
  border-bottom: 0.032rem solid #eeeeee;
  .tab-list {
    width: (12rem - $padding * 4) / 3;
    font-size: .48rem;
    box-sizing: border-box;
    overflow: hidden;
    height: 1.408rem;
    padding: 0 $padding;
    text-align: center;
    display: inline-block;
    margin: 0 $padding 0 0;
    line-height: 1.408rem;
    &:last-child {
      margin: 0;
    }
    &.cur {
      color: #4aab2d;
      border-bottom: .064rem solid yellowgreen;
    }
  }
}
//Tab End

//OnTab Start
.on-tab {
  background: #fff;
  .on-tab-list {
    width: 100%;
    overflow: hidden;
    padding: $padding;
    box-sizing: border-box;
    .on-tab-list-text {
      font-size: .416rem;
      line-height: 1.8em;
      img {
        display: block;
        margin: 0 auto;
        border: 1px solid #ccc;
        background: #eee;
      }
    }
  }
}
//OnTab End
</style>
