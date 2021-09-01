import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: () => import('@/views/article/'),
    props: true
  },
  {
    path: '/editUserInfo',
    name: 'edit-user-info',
    component: () => import('@/views/edit-user-info/')
  },
  {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('@/views/user-chat/')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
