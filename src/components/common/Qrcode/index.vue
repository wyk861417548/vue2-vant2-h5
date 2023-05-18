<template>
  <div id="qrCode" ref="qrCodeDiv" @click="$ImagePreview([img])"></div>
</template>

<script>
import QRCode from 'qrcodejs2';
export default {
  props:{
    // 二维码内容
    text:{
      type:String,
      default:'无'
    },

    // 二维码颜色
    color:{
      type:String,
      default:'#333'
    },

    // 是否开启点击二维码预览
    preview:{
      type:Boolean,
      default:true
    }
  },

  data(){
    return{
      img:''
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const ref = this.$refs.qrCodeDiv;
      new QRCode(ref, {
        text: this.text,
        width: 1080, //防止分辨率大的时候模糊
        height: 1080, //防止分辨率大的时候模糊
        colorDark: this.color, //二维码颜色
        colorLight: "#fff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })

      setTimeout(()=>{
        this.img = ref.querySelector('img').src;
      },0)
    },

    reset() {
      let text = document.getElementById("qrCode");
      text.innerHTML = '';
    },
  },

  watch: {
    // 不使用makeCode  是因为  不能再动态改变颜色
    text() {
      this.reset();
      this.$nextTick(()=>{this.init()})
    }
  }
}
</script>

<style scoped>
/* 注意这里别写lang='less'或者其他  不然>>>不生效 */
#qrCode>>>canvas {
  width: 100% !important;
  height: 100% !important;
}

#qrCode>>>img {
  width: 100% !important;
  height: 100% !important;
}
</style>