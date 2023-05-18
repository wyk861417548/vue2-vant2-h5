<template>
  <div class='j-full-curbox j-flex-col'>
    <main>
      <section v-for="(item,index) in imgList" :key="index">
        <img v-lazy="item.img" alt="" style="width:200px;height:200px;">
      </section>

      <section v-for="(item) in bgList" :key="item.menuId">
        <div v-lazy:background-image="item.img" style="width:200px;height:200px;background-repeat:no-repeat;background-size:100% 100%;background-position:0 0;"></div>
      </section>
    </main>
  </div>

</template>

<script>
export default {
  data () {
    return {
      imgList:[
        {name:"1",menuId:'1',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
        {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
      ],

      bgList:[
        {name:"1",menuId:'10',img:require('@/assets/images/error/nodata.png')}
      ]
    };
  },

  created(){},

  methods: {
  }
}
</script>
<style lang='less' scoped>
  header{}

  main{}

  footer{}

</style>