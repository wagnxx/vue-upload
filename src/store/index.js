import Vue from 'vue';
import Vuex from 'vuex';
const upload= require('./modules/upload')
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        upload,
    },
    state:{
        openUploader:false
    },
     
    mutations:{},
});