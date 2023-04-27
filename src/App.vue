<template>
  <div id="app" class="page-bg">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default{
  data(){
    return {}
  },

  created(){
    // 将游览器环境存入vuex
    this.$store.commit('setBrower',this.brower);

    window.addEventListener('beforeunload',this.beforeunloadFn);
    // 用于线上打开调试工具
    sessionStorage.__CONSOLE__ = this.$config.getParams() && this.$config.getParams().vconsole;
  },

  methods:{
    // 页面刷新调用  防止vuex丢失
    beforeunloadFn(){
      this.$store.commit('updateState');
    }
  }
}
</script>

<style lang="less">
@import url('~@/assets/css/common.css');
</style>
