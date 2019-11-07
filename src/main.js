import App from './App'
import redirect from './redirect'
import Index from './Index'
import Rank from './Rank'
import profile from "~/profile";

// axios.defaults.baseURL = 'http://api.txtxtx.com.cn';
axios.defaults.baseURL = 'http://localhost:8999';

const router = new VueRouter({
    mode:'history',
    routes : [
        {path: '/', component: Index},
        {path: "/query", component: profile},
        {path: '/empty', component: Index},
        {path: '/rank', component: Rank},
        {path: '/redirect', component: redirect}
    ]
})



new Vue({
    el: '#app',
    router: router,
    render: h => h(App),

})



