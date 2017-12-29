<template>
  <div id="designerDetails" class="designer-details">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <div class="designer-details-box">
      <!-- Designer Datails -->
      <div class="designer">
        <div class="pic"><img :src="msg.designerPic" alt=""></div>
        <div class="name" v-text="msg.name">我是名字</div>
        <div class="decorate" v-text="msg.decorate">我是所在公司</div>
        <router-link :to="'/demo/order/' + msg.id" tag="div" class="order-btn">设计师预约</router-link>
      </div>

      <!-- Tab -->
      <div class="tab">
        <ul class="tab-box">
          <li :class="'tab-list' + ' ' + (0 === tabFlag ? 'cur' : '')" @click="tab(0)">设计作品</li>
          <li :class="'tab-list' + ' ' + (1 === tabFlag ? 'cur' : '')" @click="tab(1)">个人介绍</li>
        </ul>
      </div>

      <!-- Tab Box -->
      <swiper class="on-tab" :options="onTabSwiper" ref="onTabSwiper">
        <swiper-slide class="on-tab-list">

          <ul class="on-tab-list-box" v-if="msg.workset">
            <!-- Main List -->
            <router-link :to="'/demo/demoDetails/' + onTabList.id" tag="li" class="on-tab-list-box-list" v-for="(onTabList,index) in msg.workset" :key="onTabList.key">

              <div class="pic" :style="{backgroundImage:'url('+ onTabList.images +')'}"></div>
              <div class="demo-name" v-text="onTabList.title"></div>
              <div class="demo-text">
                {{index}}<span><span>户型：</span><span v-text="onTabList.houseType"></span></span>
                <span><span>风格：</span><span v-text="onTabList.style"></span></span>
              </div>
              <div class="demo-more">
                <span class="demo-more-look">
                  <span class="iconfont">&#xe646;</span>
                  <span v-text="onTabList.hits">666</span>
                </span>
                <!-- <router-link to="order" append tag="span" class="demo-more-btn" v-if="onTabList.designerId != 0">预约设计</router-link> -->
              </div>

            </router-link>
            <!-- Main List 为空的时候 -->
            <li class="cue-box" v-if="msg.workset.length == 0">
              <div class="cue">暂无数据...</div>
            </li>
            <!-- Main List 加载更多 -->
            <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="msg.workset.length != 0">
              <!-- 加载更多却没有数据的时候 -->
              <div class="no-more" slot="no-more">
                该分类下没有更多了...
              </div>
              <div class="no-more" slot="no-results">
                该分类下没有更多了...
              </div>
            </infinite-loading>
          </ul>

        </swiper-slide>
        <swiper-slide class="on-tab-list user-msg">
          <div class="user-msg-introduce" v-if="msg.introduce" v-html="msg.introduce"></div>
          <div class="user-msg-box" v-if="msg.userMsg">
            <div class="user-msg-box-tit">基本信息</div>
            <div class="user-msg-box-list" v-if="msg.userMsg.name">
              <span>姓名：</span><span v-text="msg.userMsg.name"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.country">
              <span>国籍：</span><span v-text="msg.userMsg.country"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.nation">
              <span>民族：</span><span v-text="msg.userMsg.nation"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.job">
              <span>职业：</span><span v-text="msg.userMsg.job"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.graduateSchool">
              <span>毕业院校：</span><span v-text="msg.userMsg.graduateSchool"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.achievement">
              <span>主要成就：</span><span v-text="msg.userMsg.achievement"></span>
            </div>
            <div class="user-msg-box-list" v-if="msg.userMsg.works">
              <span>代表作品：</span><span v-text="msg.userMsg.works"></span>
            </div>
          </div>
          <div class="user-msg-box" v-if="msg.abilityIntro">
            <div class="user-msg-box-tit">个人经历</div>
            <div class="user-msg-box-list" v-html="msg.abilityIntro">
            </div>
          </div>
        </swiper-slide>

      </swiper>
    </div>


  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
 name: "designerDetails",
 components: {
   InfiniteLoading,
 },
 props: ['serviceUrl'],
 data: () => ({
   msg: {},
   pageSize: 3,//每页 数据个数
   tabFlag: 0,//切换swiper 的index  同时也是请求的第几个（类别）数据

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
   onTabSwiperFn() {
     return this.$refs.onTabSwiper.swiper
   },
 },
 methods: {
   tab(num) {
     this.onTabSwiperFn.slideTo(num, 300, false);
     this.tabFlag = num;
   },
   infiniteHandler($state) {
     if(this.msg.currentPage >= this.msg.totalPage){
       // console.log("meiyou fen");
       $state.complete();
     } else {
       // console.log("fen");

       //分页请求 Start
       this.$http({
         url: this.serviceUrl + "app/worksPageList.htm",
         // url: "http://192.168.8.214:8443/app/worksPageList.htm",
         method:"POST",
         params: {
           designerId: this.msg.id,
           pageSize: this.pageSize,
           currentPage: parseInt(this.msg.currentPage) + 1
         },
         headers: {
           "Content-Type": "x-www-from-urlencoded"
         }
       }).then((res) => {
         //更新数据
         this.msg.currentPage = res.data.currentPage;
         this.msg.totalPage = res.data.totalPage;
         for(let i = 0,max = res.data.works.length; i < max; i++){
           this.msg.workset.push(res.data.works[i]);
         }
         $state.loaded();
       },(res) => {
         console.log("error from 设计师详情 designerDetails.vue");
       });
       //分页请求 End

     }
   },
 },
 mounted() {
   //do something after mounting vue instancev  ----------↓----------↓----------
   var that = this;

   // console.log(this.$route.params.id);
   //加载默认数据 Start
   this.$http({
     url: this.serviceUrl + "app/designerDetail.htm",
     // url: "http://192.168.8.214:8443/app/designerDetail.htm",
     method:"POST",
     params: {
       id: this.$route.params.id,
       pageSize: this.pageSize
     },
     headers: {
         "Content-Type": "x-www-from-urlencoded"
     }
   }).then((res) => {
     this.msg = res.data;
     // console.log(JSON.stringify(res.data));
   },(res) => {
     console.log("error from 设计师详情designerDetails.vue");
   });
   //加载默认数据 Start

   //切换Swiper的时候 改变Tab状态
   this.onTabSwiperFn.params.onSlideChangeEnd = function(swiper){
     that.tabFlag = swiper.activeIndex;
   }
 }
}
</script>
<style lang="scss" scoped>
@import "./../../../css/unit/common";
$padding: .32rem;
$listBar: #eeeeee;

.designer-details-box {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
}

//designer Start
.designer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.6rem;
  background: rgba(0,0,0,.5);
  position: relative;
  padding: $padding;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    background-image: url("./../../../assets/designer-details.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .pic {
    @include pic(2.96rem,2.96rem);
    margin: 0 $padding 0 0;
    float: left;
    border-radius: 50%;
    border: .064rem solid #fff;
  }
  .name {
    width: 12rem - $padding * 3 - 2.96rem;
    float: left;
    font-size: .512rem;
    line-height: 1.8em;
    color: rgba(255,255,255,1);
    @include text-overflow;
  }
  .decorate {
    width: 12rem - $padding * 3 - 2.96rem;
    float: left;
    font-size: .48rem;
    line-height: 1.8em;
    color: rgba(255,255,255,.9);
    color: #fff;
    @include text-overflow;
  }
  .order-btn {
    float: left;
    /* width: 3.2rem; */
    font-size: .48rem;
    height: 1.1rem;
    border-radius: .16rem;
    margin-top: 0.0744rem;
    line-height: 1.1rem;
    text-align: center;
    padding: 0 .6rem;
    color: #fff;
    background: linear-gradient(150deg,#4aab2d,#67ca16);
    border: .032rem solid rgba(0,0,0,.1);
    box-sizing: border-box;
  }
}
//designer End

//main-tab Start
.tab {
 $tabHeight: 1.408rem;
 top: 3.6rem + $tabHeight;
 left: 0;
 width: 100%;
 position: fixed;
 overflow-x: auto;
 background: #fff;
 height: $tabHeight;
 .tab-box {
   position: absolute;
   z-index: 5;
   min-width: 100%;
   width: auto;
   font-size:0;
   height: $tabHeight;
   white-space: nowrap;
   border-bottom: .032rem solid $listBar;
   padding: 0 $padding;
   box-sizing: border-box;
   .tab-list {
     width: 5.52rem;
     font-size: .448rem;
     height: $tabHeight;
     padding: 0 $padding;
     text-align: center;
     display: inline-block;
     margin: 0 $padding 0 0;
     line-height: $tabHeight;
     &:last-child {
       margin: 0;
     }
     &.cur {
       color: $green;
       border-bottom: .064rem solid yellowgreen;
     }
   }
 }
}
//main-tab End


//main Start
.on-tab {
  bottom: 0;
  width: 100%;
  top: 5.008rem + 1.408rem;
  position: fixed;
  overflow-y: auto;
  .on-tab-list {
    width: 100%;
    overflow-y: auto;
    .on-tab-list-box {
      width: 100%;
      overflow: hidden;

      //Edit Style Start ----------↓----------↓----------
      .on-tab-list-box-list {
        $demoListW: 5.92rem;
        $demoListH: 6.272rem;
        float: left;
        width: $demoListW;
        height: $demoListH;
        margin: 0 0 $padding/2 0;
        padding: .096rem .096rem 0;
        box-sizing: border-box;
        background: #fff;
        &:nth-child(2n + 1){
          margin-right: $padding/2;
        }
        .pic {
          @include pic-bg($demoListW - .096rem - .096rem,$demoListH - 2.384rem);
        }
        .demo-name {
          width: 100%;
          color: #333;
          font-size: .416rem;
          height: .832rem;
          line-height: .832rem;
          padding: .16rem $padding/2 0;
          @include text-overflow;
        }
        .demo-text {
          width: 100%;
          color: #666;
          font-size: .384rem;
          height: .704rem;
          line-height: .704rem;
          padding: 0 $padding/2;
          @include text-overflow;
        }
        .demo-more {
          width: 100%;
          color: #999;
          font-size: .352rem;
          line-height: .672rem;
          hieght: .672rem;
          padding: 0 $padding/2;
          @include text-overflow;
          .demo-more-btn {
            width: 1.92rem;
            height: .672rem;
            float: right;
            font-size: .352rem;
            color: #fff;
            text-align: center;
            border-radius: .048rem;
            background: $orange;
          }
        }
      }
      //Edit Style End ----------↑----------↑----------

     //没有数据
     .cue-box {
       top: 0;
       bottom: 0;
       width: 100%;
       height: auto;
       display: flex;
       position: absolute;
       align-items: center;
       justify-content: center;
       font-size: .448rem;
       .cue {
       }
     }
   }

   &.user-msg {
     .user-msg-introduce {
       padding: $padding*1.5 $padding $padding;
       background: #fff;
       margin-bottom: $padding/2;
       font-size: .416rem;
       line-height: 1.8em;
     }
     .user-msg-box {
       background: #fff;
       margin-bottom: $padding/2;
       padding: 0 0 $padding;
       .user-msg-box-tit {
         height: 1.28rem;
         line-height: 1.28rem;
         font-size: .48rem;
         border-top: 1px solid #eeeeee;
         border-bottom: 1px solid #eeeeee;
         margin-bottom: $padding;
         position: relative;
         padding: 0 $padding;
         &:before {
           content: "";
           position: absolute;
           left: 0;
           height: 1.28rem;
           width: $padding/2;
           background: $green;
         }
       }
       .user-msg-box-list {
         font-size: .416rem;
         line-height: 2em;
         padding: 0 $padding;
       }
     }
   }

 }
}
//main End
</style>
