import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {path: '/',component: () => import('@/views/index.vue')},
    // 栗子
    {path: '/example',component: () => import('@/views/example/tab/index.vue')},
    {path: '/example/list',component: () => import('@/views/example/list/list.vue'),meta: {title:"滚动页面-切换",keepAlive:true}},
    {path: '/example/Scroll',component: () => import('@/views/example/list/Scroll.vue'),meta: {title:"滚动页面-单一",keepAlive:true}},
    {path: '/example/list/detail',component: () => import('@/views/example/list/detail.vue'),meta:{title:"滚动详情",isBack:true}},
    {path: '/example/v-lazy',component: () => import('@/views/example/v-lazy.vue')},

    {path: '*',redirect:'/404'},
    {path: '/403',component: () => import('@/views/error-page/403.vue'),meta: {title:"403" }},
    {path: '/404',component: () => import('@/views/error-page/404.vue'),meta: {title:"404" }},
  ]
})

// 全局路由守卫
router.beforeEach((to,form,next)=>{
  useRouterUpdate(to,form)
  if(document.querySelector("#Y_loading")){
    document.body.removeChild(document.querySelector("#Y_loading"));
  }
  document.title = to.meta.title?to.meta.title:"模板"
  next();
})

function useRouterUpdate(to,from){
  if(to.meta.keepAlive){
    to.meta.isBack = from.meta.isBack?true:false;
  }
}


export default router;
