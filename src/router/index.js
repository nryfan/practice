import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home/index'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/Index.vue'),
                meta: {
                    title: '首页',
                    affix: true
                }
            },
            {
                path: 'other',
                name: 'other',
                component: () => import('@/views/Other.vue'),
                meta: {
                    title: '其他'
                }
            },
            {
                path: 'menu-1',
                name: 'menu-1',
                component: () => import('@/views/Menu1.vue'),
                meta: {
                    title: '菜单1'
                }
            },
            {
                path: 'menu-2',
                name: 'menu-2',
                component: () => import('@/views/Menu2.vue'),
                meta: {
                    title: '菜单2'
                }
            },
            {
                path: 'demo',
                name: 'demo',
                meta: {
                    title: '父菜单'
                },
                redirect:'/home/demo/one',
                children: [
                    {
                        path: 'one',
                        name: 'one',
                        component: () => import('@/views/Demo/One.vue'),
                        meta:{
                            title:'子菜单1'
                        }
                    },
                    {
                        path: 'two',
                        name: 'two',
                        component: () => import('@/views/Demo/Two.vue'),
                        meta:{
                            title:'子菜单2'
                        }
                    },
                    {
                        path: 'three',
                        name: 'three',
                        component: () => import('@/views/Demo/Three.vue'),
                        meta:{
                            title:'子菜单3'
                        }
                    },
                    {
                        path: 'four',
                        name: 'four',
                        component: () => import('@/views/Demo/Four.vue'),
                        meta:{
                            title:'子菜单4'
                        }
                    },
                    {
                        path: 'five',
                        name: 'five',
                        component: () => import('@/views/Demo/Five.vue'),
                        meta:{
                            title:'子菜单5'
                        }
                    },
                    {
                        path: 'six',
                        name: 'six',
                        component: () => import('@/views/Demo/Six.vue'),
                        meta:{
                            title:'子菜单6'
                        }
                    },
                    {
                        path: 'seven',
                        name: 'seven',
                        component: () => import('@/views/Demo/Seven.vue'),
                        meta:{
                            title:'子菜单7'
                        }
                    },
                    {
                        path: 'eight',
                        name: 'eight',
                        component: () => import('@/views/Demo/Eight.vue'),
                        meta:{
                            title:'子菜单8'
                        }
                    }
                ]
            }
        ]

    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//路由守卫
const whiteList=['/login']
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title
  if(!whiteList.includes(to.path)){
    if(!localStorage.getItem('token')){
      router.push('/login')
      return
    }
    next()
    return
  }
  next()
})

export default router