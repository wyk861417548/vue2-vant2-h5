<template>
  <van-uploader 
    :upload-icon="icon" 
    v-model="fileList" 
    :before-read="beforeRead"
    :after-read="afterRead"
    :before-delete="beforeDelete"
    :max-size="maxSize*1024*1024" 
    :max-count="maxCount"
    @oversize="onOversize"
    :preview-size='size'
  >
    <slot></slot>
  </van-uploader>
</template>

<script>
export default {
  props:{
    // 最大上传数
    maxCount:{type:Number,default:3},

    // 上传接口返回图片字段
    path:{type:String,default:'url'},

    // 上传图片类型
    fileType:{type:Array,default:()=>['jpg','png','jpeg']},

    // 上传大小限制 默认 10M
    maxSize:{type:Number,default:10},

    //预览图和上传区域的尺寸 默认单位px 
    size:{type:[String,Number],default:80},

    // 默认展示图片
    value:{type:[String,Array]},

    // 上传图标icon（vant icon）图片链接
    icon:{type:String,default:'plus'}
  },

  data () {
    return {
      // 注意：需要保证url属性存在
      fileList:[],
    };
  },

  methods: {
    // 注意：beforeRead要执行返回True之后  afterRead方法才能接受到
    beforeRead(file) {
      if(!this.handleFileType(file))return;
      return true
    },

    afterRead(files){
      this.handleStatus(files,'uploading','上传中')
      // 图片压缩
      this.kCompass(files).then(() => {this.upload(files)}) 
    },

    upload(files){
      var param = new FormData();
      param.append('file',files.file);

      this.$api.common.upload(param).then(res=>{
        this.handleStatus(files)
        files.url = res.data[this.path]
        this.change();
      }).catch(()=>{this.handleStatus(files,'failed','上传失败')})
    },

    // 压缩处理
    kCompass(files){
      const {file} = files;
      return new Promise(resolve=>{
        this.$config.kCompass({fileinput:file}).then(({result}) => {
          const _files_ = this.$config.dataURLtoFile(result,file.name)
          // 手机拍照图片旋转90度修复
          this.$config.compressorImage(_files_).then(res=>{
            files.file = res;
            resolve();
          })
        })
      })
    },

    // 图片上传状态处理
    handleStatus(files,status='done',message='上传成功'){
      files.status = status;
      files.message = message;
    },

    // 上传类型判断
    handleFileType(file){
      let msg  = `只支持${this.fileType.join(',')}格式的文件`

      const flieArr = file.name.split('.'); // 根据.分割数组
      let suffix = flieArr[flieArr.length - 1]; // 取最后一个
      suffix = suffix && suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作

      if(this.fileType.indexOf(suffix) == -1){
        this.$toast(msg);
        return false;
      }
      return true;
    },

    onOversize(){
      this.$toast(`上传文件大小不能超过${this.maxSize}MB!`);
    },
    
    beforeDelete(files,{index}){
      this.fileList.splice(index,1)
      this.change()
    },

    // 组件使用v-model绑定 直接处理成字符串拼接返回
    listToString(list){
      return list.map(item=>item.url).join(',')
    },

    // 是否删除或者新增
    change(){
      this.$emit('input',Array.isArray(this.value)?this.fileList:this.listToString(this.fileList))
    }
  },

  watch:{
    // 默认值设置
    value:{
      handler(newVal){
        if(newVal){
          this.fileList = !Array.isArray(newVal) ? newVal.split(',').map(item=>({url:item})) : newVal;
        }
      },
      immediate: true
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