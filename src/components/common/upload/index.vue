<template>
  <!-- :after-read="afterRead" -->
  <van-uploader :upload-icon="icon" v-model="fileList" :before-read="beforeRead"  :max-size="maxSize*1024*1024" :max-count="limit" @oversize="onOversize">
    <slot></slot>
  </van-uploader>
</template>

<script>
export default {
  props:{
    // 最大上传数
    limit:{
      type:Number,
      default:1
    },

    // 上传图片类型
    fileType:{
      type:Array,
      default:()=>{
        return ['jpg','png','jpeg']
      }
    },

    // 上传大小限制 默认 10M
    maxSize:{
      type:Number,
      default:10
    },

    // 用于父组件接受已上传的图片名称
    name:{
      type:String,
      default:"upload"
    },

    // 上传接口返回图片字段
    path:{
      type:String,
      default:'url'
    },

    // 默认展示图片
    value:{
      type:[String,Array],
    },

    // 是否使用自定义上传接口
    isCustom:{
      type:Boolean,
      default:false
    },

    // 自定义上传成功后传入值 {url:'xxx'}
    customFile:{
      type:Object,
      default:()=>{}
    },

    // 上传图标icon（vant icon）
    icon:{
      type:String,
      default:'plus'
    }
  },

  data () {
    return {
      fileList:[]
    };
  },

  methods: {
    beforeRead(file) {
      if(!this.handleFileType(file))return;

      // 图片压缩
      this.$config.kCompass({fileinput:file}).then(({result}) => {
        var files = this.$config.dataURLtoFile(result,file.name)
        
        // 手机拍照图片旋转90度修复
        this.$config.compressorImage(files).then(res=>{
          this.upload(res)
        })
      })
    },

    upload(files){
      var param = new FormData();
      param.append('file',files);

      // 是否自己写上传
      if(this.isCustom)return this.$emit('customUpLoad',param);

      // 需要保证url属性存在
      this.$api.common.upload(param).then(res=>{
        this.fileList.push({url:res.data[this.path],...res.data});
      })
    },

    // 上传类型判断
    handleFileType(file){
      let msg  = `只支持${this.fileType.join(',')}格式的文件`

      const flieArr = file.name.split('.'); // 根据.分割数组
      let suffix = flieArr[flieArr.length - 1]; // 取最后一个
      suffix = suffix && suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作

      if(this.fileType.indexOf(suffix) == -1){
        this.$config.tip(msg);
        return false;
      }
      return true;
    },

    onOversize(){
      this.$config.tip(`上传文件大小不能超过${this.maxSize}MB!`);
    },

    // 组件使用v-model绑定 直接处理成字符串拼接返回
    listToString(list){
      return list.map(item=>item[this.path]).join(',')
    }
  },

  watch:{
    // 默认值设置
    value:{
      handler(newVal){
        if(newVal){
          this.fileList = !Array.isArray(newVal) ? newVal.split(',').map(item=>({[this.path]:item})) : newVal;
        }
      },
      immediate: true
    },

    fileList:{
      handler(newVal){
        this.$emit('input',this.listToString(newVal))
        this.$emit("change",{name:this.name,value:newVal})
      }
    },

    // 自定义上传 传入值{url:'xxxx'}
    customFile:{
      handler(newVal){
        this.fileList.push(newVal);
      },
      deep:true
    }
  }
}
</script>
<style lang='less' scoped>
::v-deep.van-uploader{
  .van-uploader__upload-icon{
    font-size: 14px;
  }
}
</style>