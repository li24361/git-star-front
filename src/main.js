// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import User from './User.vue'
import Index from './Index.vue'
// import 've-charts/lib/ve-charts.min.css'
// import 've-charts/lib/common'
//  import VeRadarChart from 've-charts/lib/VeRadarChart'
// import VueCookies from 'vue-cookies'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'


// Vue.use(ElementUI);
//  Vue.component('VeRadarChart', VeRadarChart);
// Vue.use(VueCookies);
// Vue.use(VueAxios, axios);
// Vue.use(VueRouter);
// Vue.use(Vuex);

axios.defaults.baseURL = 'http://api.txtxtx.com.cn';

const router = new VueRouter({
    mode:'history',
    routes : [
        {path: '/', component: Index},
        {path: '/empty', component: Index},
        {path: '/user',name: 'user', component: User}
    ]
})

const loading =



new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})



