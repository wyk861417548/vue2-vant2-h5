
const localDataKey = 'localDataKey'

// 初始化vuex数据，以及每次刷新页面保证vuex不丢失
export function initState(state){
  if(sessionStorage[localDataKey]){
    const tempData = JSON.parse(sessionStorage[localDataKey])
    for(var i in tempData){
      state[i] = tempData[i];
    }
    sessionStorage[localDataKey] = '';
  }
  updateLocalStorage(state,false)
  return state;
}

//存储状态数据到本地sessionStorage 用于保证vuex刷新不丢失
export function saveState(state){
	sessionStorage[localDataKey] = JSON.stringify(state);
}


// 更新数据到本地 boolean:true  从vuex更新到本地  false:从本地更新到vuex
export function updateLocalStorage(state,boolean=true){
  if(boolean){
    for (const key in state.storage) {
      localStorage[key] = state.storage[key];
    }
  }else{
    for (const key in state.storage) {
      state.storage[key] = localStorage[key];
    }
  }
}

