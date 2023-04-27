<template>
  <Scroll ref="scroll" @scroll="getData">
    <div class="list"  v-for='(item,index) in dataList' :key='index' @click="$skip('/example/list/detail')">
      {{item.name}} -- {{item.age}}
    </div>
  </Scroll>

</template>

<script>
import keepAlive from '@/mixins/keepAlive.js'
export default {
  mixins:[keepAlive],
  data () {
    return {
      init:false,

      dataList:[],

      count:1,

      data:{
        //列表初始页码
        current: 1,   

        //每页条数
        size:10,   
      },
    };
  },

  activated(){
    // 如果不是从详情页进入 init为了解决在详情页面刷新，导致数据不在加载问题
    if(!this.$route.meta.isBack || !this.init){
      this.init = true;
      this.initData();
    }
  },

  methods: {
    initData(){
      this.dataList = [];
      this.data.current = 1;
      this.$refs.scroll.status =3;
      this.getData();
    },
    getData(){
      setTimeout(()=>{
        this.data.current++;
        for (let i = 0; i < 10; i++) {
          this.dataList.push({name:this.data.current+"---i---"+i,age:i})
        }
        
        this.$isScroll(this.$refs.scroll,this.dataList,30)
      },500)
    },
  }
}
</script>
<style lang='less' scoped>
  .list {
    margin-top: 20px;
    height: 100px;
    color: #fff;
    background: linear-gradient(to right,#ff6700,#f33);
    line-height: 100px;
    text-align: center;
  }

</style>