import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = () =>
  import(/* webpackChunkName: "Index" */ '@/views/vueDemo/index')
// const Login = () =>
//   import(/* webpackChunkName: "Login" */ '@/views/login/index')
// const Application = () =>
//   import(/* webpackChunkName: "Application" */ '@/views/application/index')
// const VueDemo = () =>
//   import(/* webpackChunkName: "VueDemo" */ '@/views/vueDemo/index')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/',
    name: 'Home',
    component: Index,
    // children: [
    //   {
    //     path: '/login',
    //     name: 'Login',
    //     component: Login
    //   },
    //   {
    //     path: '/application',
    //     name: 'Application',
    //     component: Application
    //   }
    // ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
