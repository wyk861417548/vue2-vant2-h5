/**
 * @param {*} bool 为真或不传 显示loading， false关闭loading
 * @returns 
 */
export function loading(bool) {
  if (bool == undefined || bool) {
    if(document.querySelector("#Y_tip")){
      return;
    }
    var div = document.createElement("div");
    div.id = "Y_loading";
    div.innerHTML = `
    <div class="l-box j-full-curbox" style="position:fixed;z-index:999">
      <div class="l-circle">
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
      </div>
      <span>loading</span>
    </div>`;
    document.body.appendChild(div);
    return;
  }
  document.querySelector("#Y_loading") ? document.body.removeChild(document.querySelector("#Y_loading")) : "";
}

/**
 * @param {*} val 提示语
 * @param {*} col  颜色
 * @param {*} bool 时间
 * @returns 
 */
export function tip(val, col, bool) {
  if(document.querySelector("#Y_tip")){
    return;
  }
  var div = document.createElement("div");
  div.id = "Y_tip";
  if (!val) {
    val = '暂无数据';
  }
  div.innerHTML = `<span style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background:${col?col:'#999'};opacity:0.8;z-index:999;color:#fff;">${val}</span>`;
  document.body.appendChild(div);
  setTimeout(function () {
    document.body.removeChild(document.querySelector("#Y_tip"));
  }, bool ? bool : 1500)
}