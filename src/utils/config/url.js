/**
 * @param {*} search 地址 不传默认获取当前地址栏
 * @returns 
 */
 export function getParams(search) {
  var r = {}
  search = search == undefined?window.location.href.split('?')[1]:search.split('?')[1];
  if (!search) return;

  // 解决参数拼在hash前面问题
  if(search && search.indexOf("#") != '-1'){
    search = search.slice(0,search.indexOf("#"));
  }

  var arr = search.split('&');
  if (!arr.length) return;

  for (var i = 0; i < arr.length; i++) {
    var s = arr[i].split('=');
    r[s[0]] = decodeURI(s[1]);
  }
  return r;
}

/**
*  //地址参数 对象合成
* @param {*} list 
* @returns 
*/
export function httprequestquery(list){
  let params = [];
  for(let i in list){
    params.push(i + "=" + list[i]);
  }
  return params.length>0 ? '?' + params.join("&") : '';
}

/**
 * 地址参数 对象合成 加密 
 * @param {*} list  传参对象  
 * @param {*} boolen boolen 如果不存在或者为真就加密  boolen false解密
 * @returns 
 */
 export function httprequestencode(list,boolen=true){
  let params = [];
  for(let i in list){
    let item =boolen?window.btoa(unescape(encodeURIComponent(list[i]))):decodeURIComponent(escape(window.atob(list[i])));
    params.push(i + "=" + item);
  }
  return params.length>0 ? '?' + params.join("&") : '';
}