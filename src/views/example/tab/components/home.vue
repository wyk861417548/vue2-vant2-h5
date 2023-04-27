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

  created(){

  },

  methods: {
    skip(){
      this.$store.commit('setToken','xxxxxxxxx');
      this.$router.push({path:'/example/index'})
    }
  }
}
</script>
<style lang='less' scoped>
  header{}

  main{}

  footer{}

</style>