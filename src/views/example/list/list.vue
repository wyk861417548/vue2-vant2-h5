<template>
  <listpage v-if="init"></listpage>
</template>

<script>
import listpage from './listpage.vue'

export default {
  components:{
    listpage
  },

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