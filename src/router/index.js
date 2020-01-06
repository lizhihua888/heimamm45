import Vue from 'vue'
import VueRouter from 'vue-router';

import index from '../views/index/index.vue';
import login from '../views/login/login.vue';


import subject from '../views/index/subject/subject.vue'
import user from '../views/index/user/user.vue'
import question from '../views/index/question/question.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import chart from '../views/index/chart/chart.vue'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index,
            children: [
               {
                    path: 'user',
                    component:user
                },{
                    path: 'question',
                    component:question
                },{
                    path: 'enterprise',
                    component:enterprise
                },{
                    path: 'subject',
                    component:subject
                },{
                    path:'chart',
                    component:chart
                }
            ]
        },
    ]
})

export default router;












