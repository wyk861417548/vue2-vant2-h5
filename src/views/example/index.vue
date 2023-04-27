<template>
  <div >
    <!-- class="j-full-curbox" -->
      <section class="custom-box">
        <h2 class="box-title">测试上传图片压缩（基于vant组件）</h2>
        <upload v-model="pic"></upload>
        <!-- <upload path='url' :limit='3' :defaultFileList="defaultFileList" @change="changeUpload" :customFile="customFile" :isCustom="true" @customUpLoad="customUpLoad"></upload> -->
      </section>

      <section class="custom-box">
        <h2 class="box-title">测试上传图片压缩（自定义）</h2>
        <custom-upload path='url' :limit='3' @change="changeUpload"></custom-upload>
      </section>

      <section class="custom-box">
        <h2 class="box-title">测试上传多张图片</h2>
        <indexMut path='url' :limit='3' @change="changeUpload"></indexMut>
      </section>
      <section class="custom-box">

        <h2 class="box-title">测试上传视频</h2>
        <uploadVideo path='url' :limit='3' @change="changeUpload"></uploadVideo>
      </section>

      <section class="custom-box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip('/example/Scroll')">scroll-单一</button>
      </section>

      <section class="custom-box">
        <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
        <button class="el-button el-button-primary" @click="$skip('/example/list')">scroll-切换</button>
      </section>

      <section class="custom-box">
        <h2 class="box-title">图片懒加载</h2>
        <button class="el-button el-button-primary" @click="$skip('/example/v-lazy')">图片懒加载</button>
      </section>

      <section class="custom-box">
        <h2 class="box-title">二维码组件</h2>
        <Qrcode class="qrcode" code='我是二维码组件' color="#108ee9"></Qrcode>
      </section>

      <section class="custom-box">
        <h2 class="box-title">测试刷新页面vuex数据是否还是存在</h2>
        <p class="mb-5">vuex:{{$store.state.text}}</p>
        <button class="el-button el-button-primary" @click="reload">reload</button>
      </section>

      <section class="custom-box">
        <button class="el-button el-button-primary" @click="$refs.DatetimePicker.show = true">显示日期</button>
        <DatetimePicker type='year-month' ref="DatetimePicker" format="yyyy-MM" @change="changeDatetimePicker"></DatetimePicker>
      </section>


  </div>

</template>

<script>
import uploadVideo from '@/components/common/upload/uploadVideo.vue';
import indexMut from '@/components/common/upload/indexMut.vue';
export default {
  components:{
    uploadVideo,
    indexMut
  },
  data () {
    return {
      date:'',

      pic:[],

      defaultFileList:[
        {
          "msg": "操作成功",
          "fileName": "/profile/upload/2022/12/16/1.png_20221216142827A039.jpeg",
          "code": 200,
          "newFileName": "1.png_20221216142827A039.jpeg",
          "url": "http://192.168.0.187:8041/profile/upload/2022/12/16/1.png_20221216142827A039.jpeg",
          "originalFilename": "1.png.jpeg"
        },
        {
          "msg": "操作成功",
          "fileName": "/profile/upload/2022/12/16/1.png_20221216142832A040.jpeg",
          "code": 200,
          "newFileName": "1.png_20221216142832A040.jpeg",
          "url": "http://192.168.0.187:8041/profile/upload/2022/12/16/1.png_20221216142832A040.jpeg",
          "originalFilename": "1.png.jpeg"
        }
      ],

      customFile:{}
    };
  },

  methods: {
    // 上传图片测试
    changeUpload(data){
      console.log('changeUpload',data);
    },

    customUpLoad(FormData){
      //customFile中 需要保证url属性存在
      this.$api.common.upload(FormData).then(res=>{
        this.customFile = res;
        console.log('this.customFile',this.customFile);
      })
    },

    changeDatetimePicker(date){
      this.date = date;
    },

    // 重新加载页面
    reload(){
      window.location.reload();
    }
  }
}
</script>
<style lang='less' scoped>
.qrcode{
  width: 100px;
  height: 100px;
}
</style>