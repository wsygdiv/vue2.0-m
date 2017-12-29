<template>
  <div id="designer" class="designer">
    <!-- Header Start -->
    <slot name="app-header"></slot>
    <!-- Header End -->

    <ul class="designer-list-box" v-if="msg.list">
      <router-link :to="'details/' + onTabList.id" append tag="li" class="designer-list" v-for="onTabList in msg.list" :key="onTabList.key">
        <div class="pic">
          <img :src="onTabList.designerPic" alt="">
        </div>
        <div class="name" v-text="onTabList.name"></div>
        <div>
        </div>
      </router-link>


      <!-- Main List 为空的时候 -->
      <li class="cue-box" v-if="msg.list.length == 0">
        <div cla ss="cue">暂无数据...</div>
      </li>
      <!-- Main List 加载更多 -->
      <infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="msg.list.length != 0">
        加载更多却没有数据的时候
        <div class="no-more" slot="no-more">
          没有更多了...
        </div>
        <div class="no-more" slot="no-results">
          没有更多了...
        </div>
      </infinite-loading>
    </ul>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: "designer",
  components: {
    InfiniteLoading,
  },
  props: ['serviceUrl'],
  data: () => ({
    msg:{},
    pageSize: 10,//每页 数据个数
  }),
  computed: {
    //计算
  },
  methods: {
    infiniteHandler($state) {
      if(this.msg.currentPage >= this.msg.totalPage){
        $state.complete();
      } else {
        //分页请求 Start
        this.$http({
          // url: this.serviceUrl + "app/designerPageList.htm",
          url: this.serviceUrl + "app/designerPageList.htm",
          method:"POST",
          params: {
            //code: this.msg.code,//请求那个分类下的数据
            currentPage: parseInt(this.msg.currentPage) + 1,//请求第几页的数据
            pageSize: this.pageSize
          },
          headers: {
            "Content-Type": "x-www-from-urlencoded"
          }
        }).then((res) => {
          //console.log(JSON.stringify(res.data));
          //更新数据
          this.msg.currentPage = res.data.currentPage;
          this.msg.totalPage = res.data.totalPage;
          for(let i = 0,max = res.data.list.length; i < max; i++){
            this.msg.list.push(res.data.list[i]);
          }
          $state.loaded();
        },(res) => {
          console.log("error from 设计师 designer.vue");
        });
        //分页请求 End
      //
      }
    },
  },
  mounted() {
    //do something after mounting vue instance
    //加载默认数据 Start
    this.$http({
      // url: this.serviceUrl + "main/works_json_list.htm",
      url: this.serviceUrl + "app/designerPageList.htm",
      method:"POST",
      params: {
        pageSize: this.pageSize,
      },
      headers: {
          "Content-Type": "x-www-from-urlencoded"
      }
    }).then((res) => {
      this.msg = res.data;
      // console.log(JSON.stringify(this.msg));
    },(res) => {
      console.log("error from 设计师designer.vue");
    });
    //加载默认数据 Start

  },
}
</script>
<style lang="scss" scoped>
@import "./../../css/unit/common";
$padding: .32rem;
$listBar: #eeeeee;
.designer {
  position: fixed;
  top: 1.408rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
}

//main Start
 .designer-list-box {
  bottom: 0;
  top: 1.408rem;
  position: fixed;
  overflow-y: auto;
  width: 100%;
  //Edit Style Start ----------↓----------↓----------
  .designer-list {
    $demoListW: 5.92rem;
    $demoListH: 8.4rem;
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
    @include pic($demoListW - .096rem - .096rem,$demoListH - 1.024rem - .096rem);
    }
    .name {
    width: 100%;
    color: #333;
    height: 1.024rem;
    text-align: center;
    font-size: .48rem;
    line-height: 1.024rem;
    padding: 0 $padding/2;
    @include text-overflow;
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
//main End
</style>
