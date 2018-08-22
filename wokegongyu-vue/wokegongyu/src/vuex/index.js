import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);

export default  new vuex.Store({//store对象
    state:{
        cityShow:false
    },
    // mutations:{
    //     changeCity(state,isShow){
    //         state.changeCityShow = isShow;
    //     }
    // },
    // actions:{
    //     changeCity(context, isShow){
    //         context.commit("changeCity",isShow);
    //     }
    // }
})

 