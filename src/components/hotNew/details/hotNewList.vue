<template>
	<div id="hotNewList" class="hotNewList">
		<!-- <slot name="app-header"></slot> -->
		<div class="hotNewList-con">
			<ul class="hot-list-box">
				<li class="hot-list" v-for="hotList in msg.articles">
				<router-link :to="'/hotNew/list/details/'+hotList.id" tag="a">
					<p class="hot-name" v-text="hotList.title"></p>
			  		<p class="hot-intro" v-text="hotList.intro"></p>
			  		<div class="hot-info clear">
			  			<p class="hot-time" v-text="hotList.addTime"></p>
			  			<p class="hot-hits"><span class="iconfont">&#xe646;</span><span v-text="hotList.hits"></span></p>
			  		</div>
		  		</router-link>
				</li>


				<li class="cue-box" v-if="article.length == 0">
			        <div cla ss="cue">暂无数据...</div>
			    </li>
				<infinite-loading @infinite="infiniteHandler" spinner="circles" v-if="article.length != 0">
			        <!-- 加载更多却没有数据的时候 -->
			        <div class="no-more" slot="no-more">
			          没有更多数据了...
			        </div>
			        <div class="no-more" slot="no-results">
			          没有更多数据了...
			        </div>
			    </infinite-loading>
			</ul>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: "hotNewList",
  components: {
    InfiniteLoading,
  },
  props: ['serviceUrl'],
  data: () => ({
  	msg:{},
  	article:[],
  	pageSize:10
  }),
  methods: {
    infiniteHandler($state) {
      if(this.msg.currentPage >= this.msg.totalPage){
        console.log("meiyou fen");
        $state.complete();
      } else {
        console.log("fen");
//      console.log(this.msg.currentPage);

        //分页请求 Start
        this.$http({
//        url: "http://192.168.8.183:8088/app/articleList.htm",
          url: this.serviceUrl + "app/articleList.htm",
          method:"POST",
          params: {
          	ac_id:this.$route.params.id,
            currentPage: parseInt(this.msg.currentPage) + 1,//请求第几页的数据
            pageSize: this.pageSize,
          },
          headers: {
            "Content-Type": "x-www-from-urlencoded"
          }
        }).then((res) => {
//        console.log(JSON.stringify(res.data));
          //更新数据
          this.msg.currentPage = res.data.currentPage;
          this.msg.totalPage = res.data.totalPage;
          for(let i = 0,max = res.data.articles.length; i < max; i++){
            this.msg.articles.push(res.data.articles[i]);
          }
          $state.loaded();
        },(res) => {
          console.log("error from 设计师List designer.vue");
        });
        //分页请求 End
      //
      }
    },
  },
  mounted: function(){
//	console.log(this.$route.params.id);
	beforeCreate: {
      this.$http({
//      url: "http://192.168.8.183:8088/app/articleList.htm",
		url: this.serviceUrl + "app/articleList.htm",
        method: "POST",
        // 请求后台发送的数据
        params: {
        	ac_id:this.$route.params.id,
        	currentPage:1,
        	pageSize:this.pageSize,
        },
        // 设置请求头
        headers: {
            "Content-Type": "x-www-from-urlencoded"
        }
      }).then(function (res) {
        // 请求成功回调
//      console.log(JSON.stringify(res.data));
        this.msg = res.data;
        this.article = res.data.articles;
      }, function (res) {
        // 请求失败回调
        console.log("error from hotNewList.vue列表页");
      });
	}
  }
}
</script>

<style lang="scss" scoped>
@import "./../../../css/unit/common";
.hotNewList-con {
	position: fixed;
	//top: 1.408rem;//App专用
	top: 0;//微信专用
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
}
.clear:after {
	content: "";
	display: block;
	clear: both;
}
.hot-list-box {
	background-color: #fff;
}
.hot-list {
	padding: 0.25rem 0.32rem;
	border-bottom:0.016rem solid #eee;
}
.hot-name {
	height: 1rem;
  line-height: 1rem;
	font-size: 0.512rem;
	@include text-overflow;
}
.hot-intro{
	height: 1.12rem;
	text-indent:2em;
	line-height: 0.56rem;
	color: #999;
	font-size: 0.416rem;
}
.hot-info{
	color: #B3B3B3;
	padding: 0 0.6rem;
	margin-top: 0.15rem;
	font-size: 0.416rem;
	.hot-time {
		float: left;
	}
	.hot-hits {
		float: right;
		.iconfont{
			margin-right: 0.15rem;
		}
	}
}
.no-more {
	line-height: 1.5rem;
	text-align: center;
}
</style>
