import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from "../store"
function checkEnter(path,next){
   if(store.state.userInfo.menus_url.includes(path)){
     next()
   }else{
     next("/")
   }
}

// 导出二级路由
export let indexRoutes=[
  {
   path:"menu",
   name:"菜单管理",
   component:()=>import("../pages/menu/menu.vue"),
   beforeEnter(to,from,next){
     checkEnter("/menu",next)
   }
  },
  {
   path:"role",
   name:"角色管理",
   component:()=>import("../pages/role/role.vue"),
   beforeEnter(to,from,next){
     checkEnter("/role",next)
   }
  },
  {
   path:"manage",
   name:"管理员管理",
   component:()=>import("../pages/manage/manage.vue"),
   beforeEnter(to,from,next){
     checkEnter("/manage",next)
   }
  },
  {
   path:"cate",
   name:"商品分类",
   component:()=>import("../pages/cate/cate.vue"),
   beforeEnter(to,from,next){
     checkEnter("/cate",next)
   }
  },
  {
   path:"specs",
   name:"商品规格",
   component:()=>import("../pages/specs/specs.vue"),
   beforeEnter(to,from,next){
     checkEnter("/specs",next)
   }
  },
  {
   path:"goods",
   name:"商品管理",
   component:()=>import("../pages/goods/goods.vue"),
   beforeEnter(to,from,next){
     checkEnter("/goods",next)
   }
  },
  {
   path:"member",
   name:"会员管理",
   component:()=>import("../pages/member/member.vue"),
   beforeEnter(to,from,next){
     checkEnter("/member",next)
   }
  },
  {
   path:"banner",
   name:"轮播图管理",
   component:()=>import("../pages/banner/banner.vue"),
   beforeEnter(to,from,next){
     checkEnter("/banner",next)
   }
  },
  {
   path:"seckill",
   name:"秒杀活动",
   component:()=>import("../pages/seckill/seckill.vue"),
   beforeEnter(to,from,next){
     checkEnter("/seckill",next)
   }
  },
 ]


let router = new Router({
  routes: [
    {
      path: '/login',    
      component:()=>import("../pages/login/login.vue")
    },
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"",
          component:()=>import("../pages/home/home.vue")
        },
        ...indexRoutes
      ]
     
    },
  
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.path==="/login"){
    next()
    return
  }
  if(store.state.userInfo.id){
    next()
    return;
  }

  next("/login")
})

export default router
