import axios from 'axios';
import F from "@/utils/config.js";

// 请求超时时间10000
axios.defaults.timeout = 10000;
//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials = true;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_URL,
  // 超时
  timeout: 30000
})

// loading加载动画计数器
var count = 0;

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
    loading(false);
    return Promise.resolve(res);
  },
  // 服务器状态码不是200的情况    
  error => {
    loading(false)
    if (error.response) {
      switch (error.response.status) {       
        case 401: 
          break;          
        case 403:
          break;   
        case 404:
          F.tip('网络请求不存在');
          break;
        default:
          F.tip("请稍后再试");
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * @param {*} params 
 * @param {Object} params.opt 用于自定义处理配置 
 * @param {Object} opt.back true 表示无论code为多少，都会返回不会进入统一错误处理
 * @param {Object} opt.loading false 表示当前接口不使用全局自定义加载动画
 * @returns 
 */
export function request(params){
  if(params.opt && params.opt.loading === false){
    ++count
  }else{
    loading(true);
  }

  return new Promise((resolve,reject) => {
    service(params).then(res=>{
      requestHandle(res,params.opt,resolve,reject);
    }).catch((err)=>{reject(err)})
  })
}

// 统一请求动画计数
function loading(boolean){
  if(boolean){
    ++count == 1 ? F.loading() : "";
  }else{
    --count == 0 ? F.loading(false) : "";
  }
}

// 请求返回处理
function requestHandle(res,opt={},resolve,reject){
  if (res && res.data.code == 200 || opt.back) {
    resolve(res.data)
    return;
  }
  reject(res)
  res && handle(res.data)
}

//错误统一处理
function handle(res) {
  //  未登录处理
  if (res.code == "401" || res.code == '-9001') {
    F.tip(res.msg ? res.msg : "请稍后再试");
    return;
  }
  F.tip(res.msg ? res.msg : "请稍后再试");
}




