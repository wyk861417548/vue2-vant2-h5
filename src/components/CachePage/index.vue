<template>
  <div v-if="init">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      init:false
    }
  },

  activated(){
    // 如果不是从详情页返回  整个页面重新加载
    if(!this.$route.meta.isBack){
      this.init = false;
      this.$nextTick(()=>{
        this.init = true
      })
    }else if(!this.init){
      this.init = true;
    }
    
  }
}
</script>