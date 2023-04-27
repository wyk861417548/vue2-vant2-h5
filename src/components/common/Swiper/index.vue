<template>
  <swiper
    class="swiper-container"
    :options="swiperOption"
    ref="mySwiper"
    @mouseenter.native="on_bot_enter" 
    @mouseleave.native="on_bot_leave"
  >
    <slot></slot>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// 引入插件 swiperSlide
import { swiper } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  props: ["options"],
  components: {
    swiper,
  },
  data() {
    return {
      swiperOption: {
        // loop: true,

        // 自动播放
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },

        //初始化显示
        initialSlide: 0,

        // 设定为true时，active slide会居中，而不是默认状态下的居左。
        // centeredSlides: true,

        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 1,

        // 显示分页小圆点
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true //允许分页点击跳转
        // },

        // 设置点击箭头
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        // on: {
        //   slideChangeTransitionEnd: ()=> { //切换结束时，告诉我现在是第几个slide
        //     if(!this.swiper)return;
        //     this.$emit("change",this.swiper.activeIndex)
        //   },
        // },
      },
    };
  },
  created() {
    console.log('options',this.options);
    this.merge(this.options);
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    //通过获得的swiper对象来暂停自动播放
    on_bot_enter() {
      this.swiper.autoplay.stop()
    },
    on_bot_leave() {
      this.swiper.autoplay.start()
    },

    merge(options) {
      if (options) {
        for (const key in options) {
          this.swiperOption[key] = options[key];
        }
      }
      return this.swiperOption;
    },
  },

  watch: {
    options: {
      handler(newVal) {
        for (const key in newVal) {
          this.swiperOption[key] = newVal[key];
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="less">
.swiper-slide {
  height: auto;
  color: #000;
  /*font-size: 16px;*/
  font-size: 16px;
  transition: all 0.3s;
  /* transform: scale(0.5) */
}
/deep/ .swiper-pagination {
  width: 60% !important;
  left: 50% !important;
  bottom: 0px;
  .swiper-pagination-bullet {
    width: 4px;
    height: 4px;
    background: #a3f0eb;
  }
  .swiper-pagination-bullet-active {
    background: #fff !important;
    width: 12px;
    height: 4px;
    border-radius: 4px;
  }
  transform: translate(-50%) !important;
}
</style>