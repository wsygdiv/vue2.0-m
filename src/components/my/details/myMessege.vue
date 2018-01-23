<template>
  <div id="myMessege" class="myMessege">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <div class="encyclopedias-box">
      <!-- Tab -->
      <div class="tab">
        <ul class="tab-box">
          <li v-for="(tabListBox,index) in msg"
            :class="'tab-list' + ' ' + (index === tabFlag ? 'cur' : '')"
            :key="index"
            @click="tab(index)">
            <span v-text="tabListBox.name"></span>
            <span class="remind"v-show="remindFlag == 0"ref="remind"></span>
          </li>
        </ul>
      </div>
      <!-- Tab Box -->
      <swiper class="on-tab" :options="onTabSwiper" ref="onTabSwiper">
        <swiper-slide class="on-tab-list" v-for="(onTabListBox,index) in msg" :key="index.key">
          <ul class="on-tab-list-box">
            <!-- Main List -->
            <router-link :to="'details/' + onTabList.id" append tag="li" class="on-tab-list-box-list" v-for="onTabList in onTabListBox.list" :key="onTabList.key">
              <div class="title" >
              	<span v-text="onTabList.title"></span>
              	 <span class="date" v-text="onTabList.date"></span>
              </div>
              <div class="content" v-text="onTabList.content"></div>
             
            </router-link>
            <!-- Main List 为空的时候 -->
            <li class="cue-box" v-if="onTabListBox.list.length == 0">
              <div class="cue">暂无数据...</div>
            </li>
            <!-- Main List 加载更多 -->
            <infinite-loading @infinite="infiniteHandler($event,index)" spinner="circles" v-if="onTabListBox.list.length != 0">
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
      </swiper>
    </div>

  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: "myMessege",
  components: {
    InfiniteLoading,
  },
  props: ['serviceUrl'],
  data: () => ({
    msg:[],
    pageSize: 10,//每页 数据个数
    tabFlag: 0,//切换swiper 的index  同时也是请求的第几个（类别）数据
    remindFlag : 0,
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
      console.log(this.$children[1])
    },
    infiniteHandler($state,num) {
      // console.log(this.tabFlag);
      // console.log(num);
      if(this.msg[num].currentPage >= this.msg[num].totalPage){
        $state.complete();
      } else {
        this.$http({
//        url: this.serviceUrl + "applet/encycList.htm",
          method:"POST",
          params: {
            type: this.msg[num].type,//请求那个分类下的数据
            currentPage: parseInt(this.msg[num].currentPage) + 1,//请求第几页的数据
            pageSize: this.pageSize
          },
          headers: {
            "Content-Type": "x-www-from-urlencoded"
          }
        }).then((res) => {
          //更新数据
          this.msg[num].currentPage = res.data.encyObj.currentPage;
          this.msg[num].totalPage = res.data.encyObj.totalPage;
          for(let i = 0,max = res.data.encyObj.list.length; i < max; i++){
            this.msg[num].list.push(res.data.encyObj.list[i]);
          }
          $state.loaded();
          //console.log(JSON.stringify(this.msg));
        },(res) => {
          console.log("error from 我的消息");
        });
      }
    },
  },
  mounted() {
    //do something after mounting vue instancev  ----------↓----------↓----------
    var that = this;
    //加载默认数据
    this.$http({
      // url: "http://192.168.8.214:8443/applet/encycIndex.htm",
      url: this.serviceUrl + "applet/encycIndex.htm",
      method:"POST",
      params: {
        pageSize:this.pageSize
      },
      headers: {
          "Content-Type": "x-www-from-urlencoded"
      }
    }).then((res) => {
      //console.log(JSON.stringify(res.data));
      this.msg = res.data;
    },(res) => {
      console.log("error from 百科encyclo.vue");
    });
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
.encyclopedias-box {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
}

//main-tab Start
.tab {
  $tabHeight: 1.408rem;
  top: $tabHeight;
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
      font-size: .448rem;
      height: $tabHeight;
      padding: 0 $padding;
      display: inline-block;
      margin: 0 $padding 0 0;
      line-height: $tabHeight;
      position:relative;
      .remind{
      	position: absolute;
		    top: 20px;
		    right: 15px;
		    width: 10px;
		    height: 10px;
		    border-radius: 50%;
		    background-color: #FF5715;
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
  top: 1.408rem * 2;
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
        width: 100%;
        background: #fff;
        overflow: hidden;
        box-sizing: border-box;
        height: 2.976rem + $padding;
        padding: $padding / 2 $padding;
        border-bottom: .016rem solid $listBar;
        .title {
          color: #333;
          line-height: 2em;
          font-size: .512rem;
          @include text-overflow;
        }
        .content {
          color: #999;
          overflow: hidden;
          height: 1.248rem;
          font-size: .416rem;
          line-height: 1.5em;
        }
          .date {
            float: right;
            font-size: .448rem;
          }
          .hits {
            float: right;
            .iconfont {
              margin: 0 $padding/2 0 0;
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
      //没有更多数据
      .no-more{
        padding: .5rem;
        font-size: .512rem;
      }
    }
  }
}
//main End
</style>
