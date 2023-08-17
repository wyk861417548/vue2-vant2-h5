<template>
  <div class='j-full-curbox j-flex-col'>
    <main>
      <section v-for="(item,index) in imgList" :key="index">
        <img v-lazy="item.img" alt="" class="img">
      </section>

      <section v-for="(item) in bgList" :key="'bgList-'+item.menuId">
        <div v-lazy:background-image="item.img" class="img bg"></div>
      </section>
    </main>
  </div>

</template>

<script>
import img from '@/assets/images/error/nodata.png'
export default {
  data () {
    return {
      imgList:[
        {name:"1",menuId:'1',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
        {name:"2",menuId:'10013',img},
      ],

      bgList:[
        {name:"1",menuId:'10',img}
      ]
    };
  },

  created(){},

  methods: {
  }
}
</script>
<style lang='less' scoped>
  main{
    text-align: center;
    .img{
      width:200px;
      height:200px;
    }
    .bg{
      display:inline-block;
      background-repeat:no-repeat;
      background-size:100% 100%;
      background-position:0 0;
    }
  }
</style>