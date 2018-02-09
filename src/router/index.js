import Vue from "vue";
import VueRouter from "vue-router";

//通用组件 ----------↓----------↓----------↓----------
// import AppHooter from "@/components/appHeader";
// import AppFooter from "@/components/appFeader";
//页面组件 ----------↓----------↓----------↓----------

// - 默认页面（首页） Start
import Home from "@/components/home/home";//  √  √
// - 默认页面（首页） End

// - 案例页面 Start
import Demo from "@/components/demo/demo";//  √  √
import DemoOrder from "@/components/demo/details/order";//√
import DemoDetails from "@/components/demo/details/demoDetails";//
import DemoDetailsBigImage from "@/components/demo/details/demoDetailsBigImage";//放大图片
// - 案例页面 End

// - 购物车页面 Start
import ShoppingCar from "@/components/shoppingCar/shoppingCar";
// - 购物车页面 End

// - 日记页面 Start
import Diary from "@/components/diary/diary";//  √
import DiaryDetails from "@/components/diary/details/diaryDetails";//  √
// - 日记页面 End

// - 我的页面（个人中心） Start
import My from "@/components/my/my";//个人中心二级
import MyInfo from "@/components/my/details/myInfo";//个人信息展示
import SetInfo from "@/components/my/details/setInfo";//设置
import MyMessege from "@/components/my/details/myMessege";//消息
import SetAddr from "@/components/my/details/setAddr";//添加新地址
import MyInfoEdit from "@/components/my/details/myInfoEdit";//编辑信息
import NewText from "@/components/my/details/newText";//新消息
import SetPwd from "@/components/my/details/setPwd";//更改密码
import ImageUpload from "@/components/my/details/imageUpload";//上传剪裁图片
import BigImage from "@/components/my/details/bigImage";//放大图片
// - 我的页面（个人中心） End

// - 搜索页面 Start
import Search from "@/components/search/search";
// - 搜索页面 End

// - 头条页面 Start
import HotNew from "@/components/hotNew/hotNew";
import HotNewList from "@/components/hotNew/details/hotNewList";
import HotNewDetails from "@/components/hotNew/details/hotNewDetails";
// - 头条页面 End

// - 视频直播页面 Start
import Live from "@/components/live/live";//  √  √
import LiveDetails from "@/components/live/details/liveDetails";
// - 视频直播页面 End

// - 百科页面 Start
import Encyclopedias from "@/components/encyclopedias/encyclopedias";//  √  √
import EncyclopediasDetails from "@/components/encyclopedias/details/details";
// - 百科页面 End

// - 绿色建材页面 Start
import Materials from "@/components/materials/materials";
import MatDetails from "@/components/materials/details/matDetails";
// - 绿色建材页面 End

// - 智能家居页面 Start
import Capacity from "@/components/capacity/capacity";
// - 智能家居页面 End

// - 家居检测页面 Start
import Detection from "@/components/detection/detection";
// - 家居检测页面 End

// - 知名企业页面 Start
import Enterprise from "@/components/enterprise/enterprise";
import FitmentDetail from "@/components/enterprise/details/fitDetail";
// - 知名企业页面 End

// - 设计师页面 Start
import Designer from "@/components/designer/designer";
import DesignerDetails from "@/components/designer/details/designerDetails";
// - 设计师页面 End

// - VR页面 Start
import Vr from "@/components/vr/vr";
// - VR页面 End

// - 装修平台页面 Start
import Fitment from "@/components/fitment/fitment";
// - 装修平台页面 End

// - 登录页面 Start
import Login from "@/components/login/login";
import Register from "@/components/login/mobileRegister";//手机注册
// - 登录页面 End

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // 重定向
    {
        path: '/',
        redirect: '/home'
    },
    // 定义
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/demo",
      component: Demo,
    },
    {
      path: "/demo/order/:id",
      component: DemoOrder,
    },
    {
      path: "/demo/demoDetails/:id",
      component: DemoDetails,
    },
    {
      path: "/demo/demoDetails/:designerId/bigImage/:demoId",
      component: DemoDetailsBigImage
    },
    {
      path: "/shoppingCar",
      component: ShoppingCar,
    },
    {
      path: "/diary",
      component: Diary,
    },
    {
      path: "/diary/details",
      component: DiaryDetails,
    },
    {
      path: "/my",
      component: My,
    },
    {
      path: "/my/list",/*增加个人中心我的信息*/
      component: MyInfo,
    },
    {
      path: "/my/setEdit",/*增加个人中心设置路由*/
      component: SetInfo,
    },
     {
      path: "/my/list/details/setAddr",/*增加个人中心添加地址路由*/
      component: SetAddr,
    },
    {
      path: "/my/list/details",/*增加个人中心编辑信息路由*/
      component: MyInfoEdit,
    },
    {
      path: "/my/setEdit/newText",/*增加个人中心新消息路由*/
      component: NewText,
    },
    {
      path: "/my/setEdit/setPwd",/*增加个人中心设置密码路由*/
      component: SetPwd,
    },
    {
      path: "/my/setEdit/imageUpload",/*增加个人中心上传剪裁路由*/
      component: ImageUpload,
    },
    {
      path: "/my/setEdit/myMessege",/*增加个人中心我的消息路由*/
      component: MyMessege,
    },
    {
      path: "/my/setEdit/bigImage",/*增加个人中心放大图片路由*/
      component: BigImage,
    },
    {
      path: "/hotNew",
      component: HotNew,
    },
    {
      path: "/hotNew/list/:id",
      component: HotNewList,
    },
    {
      path: "/hotNew/list/details/:id",
      component: HotNewDetails,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/live",
      component: Live,
    },
    {
      path: "/live/details/:userId/:type/:id",
      component: LiveDetails,
    },
    {
      path: "/encyclopedias",
      component: Encyclopedias,
    },
    {
      path: "/encyclopedias/details/:id",
      component: EncyclopediasDetails,
    },
    {
      path: "/materials",
      component: Materials,
    },
    {
      path: '/materials/details/:goodsId',
      component: MatDetails,
    },
    {
      path: "/capacity",
      component: Capacity,
    },
    {
      path: "/detection",
      component: Detection,
    },
    {
      path: "/enterprise",
      component: Enterprise,
    },
    {
      path: '/enterprise/details/:id',
      component: FitmentDetail,
    },
    {
      path: "/vr",
      component: Vr,
    },
    {
      path: "/designer",
      component: Designer,
    },
    {
      path: "/designer/details/:id",
      component: DesignerDetails,
    },
    {
      path: "/fitment",
      component: Fitment,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/mobileRegister",
      component: Register,
    },

  ],
linkActiveClass: 'cur'
});



//
//
//
// Vue.use(VueRouter);
//
// export default new VueRouter({
//   routes: [
//     // 重定向
//     {
//         path: '/',
//         redirect: '/home'
//     },
//     // 定义
//     {
//       path: "/home",
//       component: Home,
//     },
//     {
//       path: "/demo",
//       component: Demo,
//     },
//     {
//       path: "/shoppingCar",
//       component: ShoppingCar,
//     },
//     {
//       path: "/diary",
//       component: Diary,
//     },
//     {
//       path: "/my",
//       component: My,
//     },
//     {
//       path: "/hotNew",
//       component: HotNew,
//     },
//     {
//       path: "/hotNew/list/:id",
//       component: HotNewList,
//     },
//     {
//       path: "/hotNew/list/details/:id",
//       component: HotNewDetails,
//     },
//     {
//       path: "/search",
//       component: Search,
//     },
//     {
//       path: "/live",
//       component: Live,
//     },
//     {
//       path: "/live/details",
//       component: LiveDetails,
//     },
//     {
//       path: "/encyclopedias",
//       component: Encyclopedias,
//     },
//     {
//       path: "/materials",
//       component: Materials,
//     },
//     {
//       path: "/capacity",
//       component: Capacity,
//     },
//     {
//       path: "/detection",
//       component: Detection,
//     },
//     {
//       path: "/enterprise",
//       component: Enterprise,
//     },
//     {
//       path: "/vr",
//       component: Vr,
//     },
// //  {
// //    path: "/fitment",
// //    component: Fitment,
// //  },
//     {
//       path: "/login",
//       component: Login,
//     },
//     {
//       path: "/mobileRegister",
//       component: Register,
//     },
//
//   ],
//   linkActiveClass: 'cur'
// });
