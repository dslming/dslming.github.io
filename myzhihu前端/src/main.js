// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import store from './store/index'

// 引入 Mint UI
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

// 引入 iconfont
import './assets/fonts/iconfont.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 注册全局后置钩子函数，用以监听 url 地址变化
router.afterEach((to, from) => {
  // console.warn(to, from);
  let name = to.name;
  if(name == 'index'){
     store.commit('CHANGE_CURRENT_INDEX', -1);
  }else if(name == 'theme'){
     let id = to.params.id,
         themeList = store.state.themeList,
         i,
         len;
     for(i=0, len=themeList.length; i<len; i++){
        if(id*1===themeList[i].id*1){
           store.commit('CHANGE_CURRENT_INDEX', i);
           break;
        }
     } 
  }
});
