import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome";
import BaseInfo from "../components/student/BaseInfo";
import UpdatePassword from "../components/student/UpdatePassword";
import StudentsWarn from "../components/student/StudentsWarn";
import StudentsProgress from "../components/student/StudentsProgress";
import GraduationProject from "../components/student/GraduationProject";
import Leave from "../components/student/Leave";
import LeaveCancellation from "../components/student/LeaveCancellation";
import TeachTable from "../components/student/TeachTable";
import TeachEvaluation from "../components/student/TeachEvaluation";
import ExamInfo from "../components/student/ExamInfo";
import ExamNotification from "../components/student/ExamNotification";
import ExamTable from "../components/student/ExamTable";
import Score from "../components/student/Score";
import Rebuild from "../components/student/Rebuild";
import SchoolCalendar from "../components/student/SchoolCalendar";
import DownloadFile from "../components/student/DownloadFile";
import Notice from "../components/student/Notice";
import Class from "../components/student/Class";
import DeleteClass from "../components/student/DeleteClass";
import AddClass from "../components/student/AddClass";
import LeaveDetailInfo from "../components/student/LeaveDetailInfo";
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
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/baseInfo',
                    component: BaseInfo
                },
                {
                    path: '/updatePassword',
                    component: UpdatePassword
                },
                {
                    path: '/studentsWarn',
                    component: StudentsWarn
                },
                {
                    path: '/studentsProgress',
                    component: StudentsProgress
                },
                {
                    path: '/graduationProject',
                    component: GraduationProject
                },
                {
                    path: '/class',
                    component: Class
                },
                {
                    path: '/deleteClass',
                    component: DeleteClass
                },
                {
                    path: '/addClass',
                    component: AddClass
                },
                {
                    path:'/leave',
                    component: Leave
                },
                {
                    path:'/leaveCancellation',
                    component:LeaveCancellation
                },
                {
                    path: '/teachTable',
                    component: TeachTable
                },
                {
                    path:'/teachEvaluation',
                    component: TeachEvaluation
                },
                {
                    path:'/examInfo',
                    component: ExamInfo
                },
                {
                    path:'/examNotification',
                    component: ExamNotification
                },
                {
                    path:'/examTable',
                    component: ExamTable
                },
                {
                    path:'/score',
                    component: Score
                },
                {
                    path:'/rebuild',
                    component: Rebuild
                },
                {
                    path:'/schoolCalendar',
                    component: SchoolCalendar
                },
                {
                    path: '/downloadFile',
                    component: DownloadFile
                },
                {
                    path: '/notice',
                    component: Notice
                },
                {
                    path: '/leaveDetailInfo',
                    component: LeaveDetailInfo
                }
            ]
        }
    ]
})

//挂在路由导航守卫
router.beforeEach((to, from, next) => {
    //to表示将要去哪个页面
    //from表示从哪个页面而来
    //next表示放行  next()表示放行，  next('/xxx')强制跳转到xxx
    if (to.path === '/login') {
        return next();
    }

    //获取token
    const token = window.sessionStorage.getItem('token');
    if (token === null || token === '' || token === undefined) {  //若没有token则直接强制跳转到登录页
        next('/login');
    }
    next();

})

export default router
