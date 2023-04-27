<template>
  <!-- j-full-curbox 当前元素占满全屏  j-flex-col flex垂直布局 -->
  <div class='j-full-curbox j-flex-col'>
    <main>
      <keep-alive>
        <component :is="cur"></component>
      </keep-alive>
    </main>

    <footer>
      <section class="j-v-c" v-for='(item, index) in tab' :key='index' @click="change(item.prop)">
        <img :src="require(`@/assets/images/tab/${item.prop}${cur == item.prop ? '_active.gif' : '.png'}`)" alt="">
        <p>{{ item.name }}</p>
      </section>
    </footer>

  </div>

</template>

<script>
import home from "./components/home.vue"
import my from "./components/my.vue"
export default {
  components: {
    home,
    my
  },
  data() {
    return {
      tab: [
        { name: "首页", prop: "home" },
        { name: "我的", prop: "my" },
      ],

      cur: "home"
    };
  },

  created() { },

  methods: {
    change(cur) {
      this.cur = cur;
    }
  }
}
</script>
<style lang='less' scoped>
main {
  position: relative;
  flex: 1;
}

footer {
  position: relative;
  z-index: 10;
  display: flex;
  height: 60px;
  background: #fff;
  box-shadow: 0 0 5px #ddd;

  section {
    flex: 1;
    text-align: center;
    color: #999;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>