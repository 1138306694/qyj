import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import BaseInfo from "../components/student/BaseInfo";
import UpdatePassword from "../components/student/UpdatePassword";
import StudentsWarn from "../components/student/StudentsWarn";
import StudentsProgress from "../components/student/StudentsProgress";
import GraduationProject from "../components/student/GraduationProject";
import Leave from "../components/student/Leave";
import LeaveCancellation from "../components/student/LeaveCancellation";
import TeachTable from "../components/student/TeachTable";
import TeachEvaluation from "../components/student/TeachEvaluation";
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
import ClassDetailInfo from "../components/student/classDetailInfo";
import PracticeDetailInfo from "../components/student/practiceDetailInfo";
import PickClassResult from "../components/student/PickClassResult";
import TeaEvaluationDetail from "../components/student/TeaEvaluationDetail";
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
                },
                {
                    path: '/classDetailInfo',
                    component: ClassDetailInfo
                },
                {
                    path: '/practiceDetailInfo',
                    component: PracticeDetailInfo
                },
                {
                    path: '/pickClassResult',
                    component: PickClassResult
                },
                {
                    path: '/teaEvaluationDetail',
                    component: TeaEvaluationDetail
                },
            ]
        }
    ]
})

//????????????????????????
router.beforeEach((to, from, next) => {
    //to???????????????????????????
    //from???????????????????????????
    //next????????????  next()???????????????  next('/xxx')???????????????xxx
    if (to.path === '/login') {
        return next();
    }

    //??????token
    const token = window.sessionStorage.getItem('token');
    if (token === null || token === '' || token === undefined) {  //?????????token?????????????????????????????????
        next('/login');
    }
    next();

})

export default router
