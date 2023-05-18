<template>
  <div class="j-full-curbox">
    <main>
      <section class="custom-box">
        <h2 class="box-title">前往栗子</h2>
        <button class="el-button el-button-primary" @click="skip">栗子</button>
      </section>
    </main>
  </div>

</template>

<script>
export default {
  data () {
    return {};
  },

  methods: {
    skip(){
      this.$store.commit('setToken','我是设置的token');
      this.$router.push({path:'/example'})
    }
  }
}
</script>
<style lang='less' scoped>
  header{}

  main{}

  footer{}

</style>