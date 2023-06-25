import { Dialog } from 'vant';

/**
 * title:'提示内容'
 * message:'文本内容，支持通过\n换行'
 * callback 接受回调 close异步关闭   在请求成功和catch调用一下就好了
 * @param {*} params
 */
export function confirm({title='是否确认通过',message,callback}){
  Dialog.confirm({title,message,beforeClose:(action, done)=>{
    console.log('action',action);
    if(action === 'confirm'){
      callback(close(done))
    }else{
      done()
    }
  }}).catch(()=>{})
}

function close(done){
  return ()=>{done();}
}