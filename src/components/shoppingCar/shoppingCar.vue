<template>
  <div id="meun" class="meun"">
  	<slot name="app-header"></slot>
    <ul class="comBox">
	    <li class="gwc_list clear" v-for="(product,index) in goodsList">
	        <div class="checked-box">
	        	<input type="checkbox" class="checked" :id="product.id" :value="index" v-model="selectArr" v-on:click="choose(index)">
	        	<label class="checked_label" :for="product.id"></label>
	        </div>
	        <div class="gwc_img"><img src="../../assets/gwc-img.png"></div>
	        <div class="gwc_title">
            <p class="product-name" v-text="product.name">产品名称产品名称产品名称产品名称产品名称</p>
            <p class="product-size" v-text="product.size">产品规格产品规格产品规格产品规格产品规格产品规格</p>
            <div class="clear">
            	<span class="product-price"  v-text="'￥'+product.price">￥8.88</span>
			        <div class="bj_title">
		            <span class="reduce" v-on:click="numChange(index, -1)" v-bind:class="{'disable':product.num==1}">－</span>
		            <!--<input type="number" v-bind:value="product.num" class="number" v-bind:realStock="product.realStock" v-on:keyUp="numEntry(index1, $index)" v-on:keyDown="numEntry(index1, $index)" v-model="product.num"/>-->
		            <input type="number" v-bind:value="product.num" v-bind:realStock="product.realStock" v-on:keyUp="numEntry(index)" v-on:keyDown="numEntry(index)"/>
		            <span class="add" v-on:click="numChange(index, 1)" v-bind:class="{'disable':product.num==product.realStock}">＋</span>
			        </div>
			        <a class="product-delete">删除</a>
            </div>
	        </div>
	    </li>
    </ul>
    <div class="gwc-bottom">
    	<div class="checked-box">
	    	<div class="checkbox-all-box">
	    		<input type="checkbox" class="checked" id="checkbox-all" v-on:click="chooseAll">
	    		<label class="checked_label" for="checkbox-all"></label>
	    	</div>
	    	<span>全选</span>
	    </div>
	    <p class="total">合计：￥666</p>
	    <a class="settlement-btn">结算(0)</a>
    </div>
    <slot name="app-footer"></slot>
  </div>
</template>
<script>
export default {
  name: "meun",
  data: () => ({
  	selectArr : [],
  	ids:[],
		goodsList : [
      {
      	id:1,
        name : '山本汉方1',
        price : '19.00',
        size : "黑色",
        num : 1,
        realStock:10
      },
      {
      	id:2,
        name : '山本汉方2',
        price : '19.00',
        size : "白色",
        num : 8,
        realStock:10
      },
      {
      	id:3,
        name : '山本汉方3',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
      {
      	id:4,
        name : '山本汉方4',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
      {
      	id:5,
        name : '山本汉方5',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
      {
      	id:6,
        name : '山本汉方6',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
      {
      	id:7,
        name : '山本汉方7',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
      {
      	id:8,
        name : '山本汉方8',
        price : '19.00',
        size : "绿色",
        num : 2,
        realStock:10
      },
    ]
  }),
  computed: {
    height: function () {
      return document.documentElement.clientHeight + 'px'
    },
    openId: function () {
      return localStorage.getItem('openId')
    },
    state: function () {
      return localStorage.getItem('state')
    }
  },
  methods : {
    numChange : function(index, numChange) {
      var goods = this.goodsList[index];
      if ( numChange == 1 ) {
        goods.num++;
      } else if ( numChange == -1 ) {
        goods.num--;
      }
      if ( goods.num <= 1 ) {
        goods.num = 1;
      } 
      if ( goods.num >= goods.realStock ) {
        goods.num = goods.realStock;
      }
    },
 
    numEntry : function(index) {
      var goods = this.goodsList[index];
      if ( goods.num <=1 ) {
        goods.num = 1;
      }
      if ( goods.num > goods.realStock ) {
        goods.num = goods.realStock;
      }
    },
    chooseAll : function(event) {
      var oThis = this;
      oThis.selectArr = [];
      oThis.ids = [];
      if ( event.currentTarget.checked ) {
        oThis.goodsList.forEach(function(item , index) {
          oThis.selectArr.push(index);
          oThis.ids.push(item.id)
        });
      }
//    console.log(oThis.selectArr);
//    console.log(oThis.ids);
    },
    // 单个选择
//  choose : function(index) {
//    var list = this.goodsList,
//      len = list.length;
//      for(var i=0;i<len;i++){
//      	
//      }
//    if (list['checked'].length==len) {
//      this.allChecked = true;
//    } else {
// 				this.allChecked = true;
//    }
//    // 判断是否选择所有商品的全选
//    this.isChooseAll();
//  },
	}
}
</script>
<style lang="scss" scoped>
@import "./../../css/unit/common";
.clear:after {
	content: "";
	display: block;
	clear: both;
}
.meun{
	position: fixed;
	top: 1.408rem;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
	background-color: #fff;
}
.comBox {
	/*padding: 0.3rem 0 1.9rem;*/
	padding: 0.3rem 0;
	position: fixed;
	top: 1.408rem;
	bottom: 3.2rem;
	left: 0;
	width: 100%;
	overflow-y: auto;
	background-color: #fff;
}
.gwc_list {
	padding: 0.3rem 0;
	.checked_label {
		margin: 1.2rem auto;
	}
	.checked-box {
		width: 1.44rem;
		height: 2.88rem;
	}
}
.checked-box {
	float: left;
}
.checked {
	display: none;
}

.checked_label {
	width: 0.6rem;
	height: 0.6rem;
	text-align: center;
	line-height: 0.6rem;
	background-color: #FFF;
	border: 0.01rem solid #C1CACA;
	display: block;
	position: relative;
	border-radius: 50%;
}

.checked:checked+label {
	background-color: $orange;
	border: 0.01rem solid $orange;
}

.checked:checked+label:after {
	content: '\2714';
	position: absolute;
	top: 0px;
	left: 0px;
	color: #fff;
	width: 100%;
	text-align: center;
	font-size: 0.48rem;
	vertical-align: text-top;
}
.gwc_img {
	float: left;
	@include pic(2.88rem,2.88rem);
}
.gwc_title{
	float: left;
	width: 7.68rem;
	box-sizing: border-box;
	padding: 0 0.2rem;
}
.product-name {
	line-height: 1rem;
	@include text-overflow;
}
.product-size {
	height: 1.1rem;
	color: #b7b7b7;
	line-height: 1.2em;
	overflow: hidden;
}
.product-price {
	width: 1.8rem;
	float: left;
	color: $orange;
	margin-right: 0.2rem;
}
.bj_title{
	float: left;
	span {
		display: inline-block;
		width: 0.8rem;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size: 0.58rem;
		background-color: $green;
		border-radius: 50%;
		color: #fff;
		border: 0.02rem solid $green;
		&.disable {
		  color: $green;
		  background-color: #fff;
		  border: 0.02rem solid $green;
		}
	}
	input {
		width: 1.4rem;
		font-size: 0.48rem;
		text-align: center;
	}
}
.product-delete {
	float: right;
	color: $orange;
	border: 0.01rem solid $orange;
	width: 1.8rem;
	height: 0.8rem;
	line-height: 0.8rem;
	text-align: center;
	border-radius: 0.4rem;
}
.gwc-bottom {
	width: 100%;
	$height: 1.6rem;
	height: $height;
	line-height: $height;
	position: fixed;
	bottom: 1.6rem;
	background-color: #fff;
	.checked-box {
		width: 3rem;
		/*text-align: center;*/
		.checkbox-all-box {
			width: 1.15rem;
			height: $height;
			line-height: $height;
			font-size: 0;
			float: left;
			text-align: right;
			.checked_label {
				margin-right: 0.1rem;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	.total {
		width: 4.776rem;
		float: left;
		line-height: 1.6rem;
		color: $orange;
	}
	.settlement-btn {
		float: left;
		width: 4.224rem;
		height: $height;
		line-height: $height;
		text-align: center;
		background-color: $orange;
		color: #fff;
	}
}
</style>
