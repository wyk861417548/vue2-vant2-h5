import {request} from "@/utils/request.js";
export default {
  common:{
    // 上传组件 opt:{loading:false} 关闭全局动画
    upload(data){return request({url:'file/comm/upload',method:'post',data,headers: {'Content-Type': 'multipart/form-data'},opt:{loading:false}})},
  }
}