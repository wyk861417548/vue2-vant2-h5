// 长条banner图
export function LazyloadImg(img){
  return {
    src: img,
    error: require('@/assets/images/lazy/banner.png'),
    loading: require('@/assets/images/lazy/banner.png'),
  }
}