<template>
  <div>
    <!-- 设置一些自定义 -->
    <slot name="title" v-bind="{val:uploadList.length}"></slot>

    <div class="my-upload flex">
      <!-- 已上传图片展示区域 -->
      <div class="uploadList upBox" :class="!mode?'upBoxDefault':'dash'" @click="handleView(item)" v-for='(item,index) in uploadList' :key='index'>
        <img :src="item[path]" alt="图片">
        <p class="upBox-del" @click.stop="handleRemove(index)"><van-icon name="cross"/></p>
      </div>

      <!-- 选择图片区域 -->
      <label v-if="limit > uploadList.length" class="upBox" :class="!mode?'upBoxDefault':'dash'">
        <!-- 可自定义icon -->
        <p class="j-full-center">
          <slot name='icon'><van-icon name="plus" /></slot>
        </p>
        
        <input ref="inputer" type="file" accept="image/*" multiple style="display: none;" @change="change">
      </label>

      <!-- 预览图片区域 -->
      <div v-if="preview" @click="closeView" class="preview j-full-curbox ban-child">
        <img :src="previewImg" alt="图片">
      </div>
    </div>
  </div>

</template>

<script>
export default {

  props:{
    // 最大上传数
    limit:{
      type:Number,
      default:1
    },

    // 上传接口返回图片字段
    path:{
      type:String,
      default:'path'
    },

    // 用于父组件接受已上传的图片名称
    name:{
      type:String,
      default:"upload"
    },

    // 样式模式 false：背景模式  true：线条模式
    mode:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      // 预览图片
      preview:false,

      // 预览图片地址
      previewImg:'',

      // 已上传图片
      uploadList:[],
    };
  },

  created(){},

  methods: {
    // 上传图片
    change(){
      var inputDOM = this.$refs.inputer;

      var file = inputDOM.files;

      if(file.length < 1){
        this.$config.tip("请选择图片");
        return;
      }

      if(['jpeg', 'jpg', 'png'].indexOf(file[0].type.split('/')[1]) == -1){
        // 每次选中结束后清空选中值  保证下次选中也能够触发change事件
        this.$refs.inputer.value = null;
        this.$config.tip("只支持jpeg','jpg','png格式图片");
        return;
      }
      
      this.$config.kCompass({fileinput:file[0]}).then(({result}) => {
        var files = this.$config.dataURLtoFile(result,file.name)
        
        // 手机拍照图片旋转90度修复
        this.$config.compressorImage(files).then(res=>{
          this.upload(res)
        })
      })
    },


    // 上传图片
    upload(files){
      var param = new FormData();
      param.append('file',files);

      this.$api.common.upload(param).then(res=>{
        this.$refs.inputer.value = null;
        this.uploadList.push(res);
      })
    },

    // 预览大图
    handleView(item){
      this.$banScroll();
      if(item && item[this.path]){
        this.previewImg = item[this.path];
        this.preview = true;
      }
    },

    // 关闭大图
    closeView(){
      this.$canScroll();
      this.preview = false;
    },

    // 移除图片
    handleRemove(index){
      this.uploadList.splice(index,1)
    }
  },

  watch:{
    uploadList(newVal){
      var data = {
        name:this.name,
        value:newVal
      }
      this.$emit("change",data)
    }
  }
}
</script>
<style lang='less' scoped>
  @bg-color-upload: rgba(0, 0, 0, 0.3);
  .my-upload{
    .upBox{
      position: relative;
      display:inline-block;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border-radius:2px;
      i{color: #ddd;}
      .upBox-del{
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
        background-color: rgba(0,0,0,.7);
        border-radius: 0 0 0 15px;
        i{
          position: absolute;
          top: -1px;
          right: -2px;
          font-size: 14px;
          color: #fff;
          transform: scale(.5);
        }
      }

      &.upBoxDefault{
        background-color: #f7f8fa;
        &:active{
          background-color: #f2f3f5;
        }
      }
      &.dash{
        border: 1px dashed #ddd;
        &:active{
          border-color:#108ee9;
          i{color: #108ee9;}
        }
      }
    }

    .uploadList{
      border: 1px solid @bg-color-upload;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit:cover
      }
      .mask{
        opacity: 0;
        i{
          flex:1;
          color: #000;
          text-align: center;
        }
        &:hover{
          opacity: 1;
          background: @bg-color-upload;
        }
      }
    }

    .preview{
      position:fixed;
      z-index: 999;
      background: @bg-color-upload;
      img{
        width: 90%;
        margin: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  
</style>