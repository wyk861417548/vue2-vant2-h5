import Vue from 'vue'
import Vuex from 'vuex'
import * as $ST from './storage'
Vue.use(Vuex)

let state = {
  // 需要本地持久化放这里
  storage:{
    token:''
  },

  text:'xxx'
}

const store = new Vuex.Store({
  state:$ST.initState(state),

  mutations: {
    // 设置游览器环境全局使用
    setBrower(state,data){
      state.brower = data;
    },

    // 设置token，调用 updateLocalStorage 并将其在 localStorage 持久化存储
    setToken(state,data){
      state.storage.token = data;
      $ST.updateLocalStorage(state);
    },

    // 更新数据到sessionStorage 搭配 window.addEventListener('beforeunload') 监听页面刷新 保证vuex数据不丢失
    updateState(state){
      $ST.saveState(state);
    },
  }
})

export default store
