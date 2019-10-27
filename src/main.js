import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import User from './User.vue'
import Index from './Index.vue'
import 've-charts/lib/ve-charts.min.css'
import 've-charts/lib/common'
import VeRadarChart from 've-charts/lib/VeRadarChart'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Vuex from 'vuex'


Vue.use(ElementUI);
Vue.component('VeRadarChart', VeRadarChart);
Vue.use(VueCookies);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);

axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.validateStatus=  (status >= 200 && status < 300)



const router = new VueRouter({
    mode:'history',
    routes : [
        {path: '/', component: Index},
        {path: '/empty', component: Index},
        {path: '/user',name: 'user', component: User}
    ]
})



const store = new Vuex.Store({
    state: {
        loginUser: {
            loginName:'登录',
            token: ''
        },
        showQuery: false,
    },

    mutations: {
        save(state,payload){
            state.loginUser.loginName = payload;
        },
        show(state,payload){
            state.showQuery = payload;
        }
    }
})

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
})



