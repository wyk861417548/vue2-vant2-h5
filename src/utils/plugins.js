import Vue from 'vue'

// vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 自动注册全局公共组件
import "@/utils/automatic.js";

// 图片预览
import { ImagePreview } from 'vant';
Vue.prototype.$ImagePreview = ImagePreview;


import Vconsole from 'vconsole'
// process.env.VUE_APP_MODE != 'production' ||
if(sessionStorage.__CONSOLE__ == 'true') {
  setTimeout(()=>{
    let vConsole = new Vconsole()
    Vue.use(vConsole)
  },0)
}


// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
  error: require('@/assets/images/lazy/error.png'),
  loading: require('@/assets/images/lazy/default.png'),
  preLoad: 1,
  attempt: 1,
});

// 禁用页面滚动 * { touch-action: pan-y; }  使用这个控制台解决报错
Vue.prototype.$banScroll = ()=>{
  const mo = function(e){e.preventDefault()};
  document.body.style.overflow='hidden';
  document.addEventListener("touchmove",mo,false);//禁止页面滑动
}
// 取消页面滚动限制
Vue.prototype.$canScroll = ()=>{
  var mo=function(e){e.preventDefault();};
  document.body.style.overflow='';//出现滚动条
  document.removeEventListener("touchmove",mo,false);
}


/**
 * 搭配滚动组件一起使用
 * @param {*} SCROLL 滚动组件ref
 * @param {*} list  滚动列表
 * @param {*} total 列表总长度
 * @returns 
 */
//上拉加载默认状态 0：可加载， 1：无数据， 2已结束， 3:加载中
Vue.prototype.$isScroll = (SCROLL,list,total)=>{
  //处理数据还在加载中，已经离开本页面
  if(!SCROLL) return;

  // 加载状态结束
  SCROLL.status = 0;

  // 无数据
  if(list.length < 1){
    SCROLL.status = 1;
    return;
  }

  // 如果已经是最后一页了 结束
  if(total <= list.length){
    SCROLL.status = 2;
  }
}