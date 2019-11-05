import App from './App'
import User from './User'
import Index from './Index'
import Rank from './Rank'

axios.defaults.baseURL = 'http://api.txtxtx.com.cn';
// axios.defaults.baseURL = 'http://localhost:8999';

const router = new VueRouter({
    mode:'history',
    routes : [
        {path: '/', component: Index},
        {path: '/empty', component: Index},
        {path: '/rank', component: Rank},
        {path: '/user',name: 'user', component: User}
    ]
})



new Vue({
    el: '#app',
    router: router,
    render: h => h(App),

})



