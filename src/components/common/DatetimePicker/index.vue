<template>
  <van-popup v-model="show" round position="bottom">
    <van-datetime-picker
      :type="type"
      title="选择时间"
      v-model="date"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm='confirm'
      @cancel='cancel'
    />
  </van-popup>
</template>

<script>
export default {
  props:{
    type:{
      type:String,
      default:'date'
    },

    // 最小选择时间
    minDate:{
      type:Date,
      default:()=>{
        return new Date(2020,0,1)
      }
    },
    // 最大选择时间
    maxDate:{
      type:Date,
      default:()=>{
        return new Date()
      }
    },

    // 默认显示时间
    currentDate:{
      type:Date,
      default:()=>{
        return new Date()
      }
    },

    // 格式化
    format:{
      type:String,
      default:'yyyy-MM-dd'
    }
  },

  data () {
    return {
      show: false,

      // 当前时间
      date:this.currentDate,
    }
  },

  methods:{
    confirm(value){
      this.$emit('change',new Date(value).format(this.format))
      this.show = false;
    },

    cancel(){
      this.show = false;
    }
  }
}
</script>