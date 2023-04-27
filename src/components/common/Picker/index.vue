<template>
  <van-popup v-model="show" round position="bottom">
    <van-picker
      :title="title"
      show-toolbar
      :value-key="text"
      :columns="vdata"
      @confirm="confirm"
      @cancel="cancel"
    />
  </van-popup>
</template>

<script>
export default {
  props:{
    vdata:{
      type:Array,
      default:()=>[]
    },

    title:{
      type:String,
      default:'标题'
    },

    text:{
      type:String,
      default:'text'
    },
  },

  data () {
    return {
      show: false,
    }
  },

  methods:{
    confirm(value){
      this.$emit('change',value)
      this.show = false;
    },

    cancel(){
      this.show = false;
    }
  }
}
</script>