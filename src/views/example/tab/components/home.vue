<template>
  <div class="j-full-curbox">
    <section class="custom-box">
      <h2 class="box-title">测试上传图片压缩（基于vant组件）</h2>
      <upload v-model="pic"></upload>
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
      <Qrcode class="qrcode" text='我是二维码组件' color="#108ee9"></Qrcode>
    </section>

    <section class="custom-box">
      <h2 class="box-title">测试刷新页面vuex数据是否还是存在</h2>
      <p class="mb-5">vuex:{{$store.state.storage.token}}</p>
      <button class="el-button el-button-primary" @click="reload">reload</button>
    </section>

    <section class="custom-box">
      <button class="el-button el-button-primary" @click="$refs.DatetimePicker.show = true">显示日期 {{date}}</button>
      <DatetimePicker type='year-month' ref="DatetimePicker" format="yyyy-MM" @change="changeDatetimePicker"></DatetimePicker>
    </section>
  </div>

</template>

<script>
export default {
  data () {
    return {
      date:'',

      pic:'https://img01.yzcdn.cn/vant/leaf.jpg',

      // pic:[{url:'https://img01.yzcdn.cn/vant/leaf.jpg'}]
    };
  },

  methods: {
    changeVideo(){},

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