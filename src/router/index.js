import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome";
Vue.use(VueRouter)

const routes = []


const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component:Home,
            redirect:'/welcome',
            children:[{
                path: '/welcome',
                component:Welcome
            }]
        }
    ]
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
    //to表示将要去哪个页面
    //from表示从哪个页面而来
    //next表示放行  next()表示放行，  next('/xxx')强制跳转到xxx
    if(to.path === '/login'){
        return next();
    }

    //获取token
    const token  =  window.sessionStorage.getItem('token');
    if (token === null || token === '' || token === undefined){  //若没有token则直接强制跳转到登录页
        next('/login');
    }
    next();

})

export default router
