let _CONFIG_ = {};
// 获取js路径集合
const requireComponent = require.context('@/utils/config', true, /\.(js)$/)
// 遍历得到js路径
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  _CONFIG_ = {...componentConfig,..._CONFIG_}
})

export default {
  ..._CONFIG_,

  // 获取浏览器环境
  kgetUseragent(){
    const userAgent = window.navigator.userAgent.toLowerCase()
  
    const userFrom = {
      // 支付宝
      alipay: userAgent.indexOf('alipay') > -1,
  
      // 支付宝app内h5
      alipayh5: userAgent.indexOf('alipay') > -1 && userAgent.indexOf('miniprogram') === -1,
  
      // 支付宝小程序
      alipayminiprogram:userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1,
  
      // 微信
      wx: userAgent.indexOf('micromessenger') > -1,
  
      // 微信小程序
      wxminiprogram: userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('micromessenger') > -1,
  
      // 浙里办App
      zlb: userAgent.indexOf('dtdreamweb') > -1,
  
      // 浙里办支付宝小程序
      zlbminiprogram: userAgent.indexOf('miniprogram') > -1 && userAgent.indexOf('alipay') > -1,
  
      // 是否为手机
      isMobile: /android|iphone|symbianos|windows phone|ipad|ipod/.test(userAgent),
  
      // 是否为安卓
      isAndroid: userAgent.indexOf('android') > -1 || userAgent.indexOf('adr') > -1,
  
      // 是否为ios
      isIOS: /\(i[^;]+;( U;)? cpu.+mac os x/.test(userAgent)
    }
  
    return userFrom
  }
  
}

Date.prototype.format = function (fmt) { 
  var cNumber = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒
    'w+': cNumber[this.getDay()], //星期
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}