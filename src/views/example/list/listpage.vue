<template>
  <div class='j-vh j-flex-col'>
    <van-tabs class="custom-van-tabs pb-10" @click="changeTab" background='transparent' style="width:60vw" line-width='20' color='#3A4675'>
      <van-tab v-for="(item,index) in tabs" :title="item.title" :name="item.name" :key="index" ></van-tab>
    </van-tabs>

    <p class="b-b"></p>

    <footer>
      <keep-alive>
        <components :is='curCom' :type="curCom"></components>
      </keep-alive>
    </footer>
  </div>
  
</template>

<script>
import listson1 from './components/listson.vue'
import listson2 from './components/listson.vue'

export default {
  components:{
    listson1,
    listson2,
  },
  
  data () {
    return {
      tabs:[
        {name:'listson1',title:"listson1"},
        {name:'listson2',title:"listson2"},
      ],

      curCom:'listson1'
    };
  },

  methods: {
    // 点击切换按钮
    changeTab(name){
      this.curCom=name;
    },
  }
}
</script>
<style lang='less' scoped>
  .j-vh{
    padding:0 15px;
    background-color: #fff;
  }
  footer{
    position: relative;
    flex: 1;
  }

</style>