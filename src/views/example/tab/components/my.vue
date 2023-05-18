<template>
  <div class="j-full-curbox" style="background:#f1f1f1">
    <!-- 注意  必须等slides存在才去初始化 不然不显示-->
    <Swiper v-if="swiperOptions.virtual.slides.length > 0" ref="swiper" :options="swiperOptions"></Swiper>

    <p class="font16 mt-20" style="text-align:center;color:#f99">虚拟节点swiper 滚动</p>
  </div>

</template>

<script>
export default {
  data () {
    return {
      data:{
        "updateTime": "2022-12-13 09:07:01",
        "name": "小天使",
        "status": "1",
        "contacts": "联系人",
        "phone": "xxxxx",
        "mobile": "xxxxx",
        "address": "xxxxx",
        "chargePerMobile": "xxxxxx",
      },
      dataList:[],
      // swiper滚动配置
      swiperOptions:{
        virtual:{
          slides:[]
        },
        on: {
          click: function({target}){
            let data = target.dataset;
            console.log('data',data);
            switch(target.id){
              case 'goTo':
                break;
            }
          },
        },
      }
    };
  },

  created(){
    this.getData();
  },

  methods:{
    getData(){
      for (let i = 0; i < 500; i++) {
        this.dataList.push(this.data)
      }
      setTimeout(()=>{
        this.swiperOptions.virtual.slides = this.dataList.map((item,index) => {//data为获取到的数据，
          return `
            <section class="custom-box">
                <h2 class="j-flex">
                  <span class="font18 text-overflowMut" style="width:70%">${item.name}${index}</span>
                  <span id='goTo' class="ban-child ml-15 j-flex-a" data-url='${JSON.stringify(item)}'>
                    <span class="text-999">到这去</span>
                    <img class="j-img-fit" v-lazy="$config.LazyloadImg($RESOURE + 'map/nav.png')" width="24" alt="">
                  </span>
                </h2>

                <p class="mt-5 j-flex">
                  <span class="text-overflowMut flex-fit">${item.address || '暂无'}</span>
                  <span class="ml-10" v-if="item.distance">距你${item.distance || 0}</span>
                </p>

                <section class="b-t pt-15">
                  <p class="j-flex">
                    <span class="status" :class="{active:item.status == 2}">${item.name}</span>
                    <span data-phone='${item.phone}'>666</span>
                  </p>
                </section>
                
              </section>
            `;
          });
      },500)
    },

  }
}
</script>
<style lang='less' scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-wrapper{
  .swiper-slide{
    background-color: #fff;
    width: 350px !important;
  }

  .swiper-slide-active{
    background: transparent;
  }
}
</style>
