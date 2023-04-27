import Vue from 'vue'

// 获取公共组件文件路径集合（只获取文件夹下面的index.vue）
const requireComponent = require.context('@/components/common', true, /index+\.(vue|js)$/)

// 遍历得到组件路径
requireComponent.keys().forEach(fileName => {
  
  // 组件内容
  const componentConfig = requireComponent(fileName).default;

  // 以文件夹名称作为公共组件的名字
  let arr = fileName.split('/');
  const componentName =  arr[arr.length-2].replace(/\.\w+$/, '');

  // 挂载全局
  Vue.component(componentName,componentConfig)
})

