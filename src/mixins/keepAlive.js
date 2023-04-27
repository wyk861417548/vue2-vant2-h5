export default{
  beforeRouteEnter(to, from, next){
    if (from.meta.isBack) {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },

  // 每次离开页面 将isBack设置false
  beforeRouteLeave(to,from,next){
    from.meta.isBack = false;
    next();
  },
}