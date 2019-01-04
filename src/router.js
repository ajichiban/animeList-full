import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

/* --- Components --- */
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import WebApp from './views/WebApp.vue'
import Dashboard from './views/Dashboard.vue'

/* --- Child component --- */
import ContainerAnime from './components/ui/ContainerAnime.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: Login,
      beforeEnter : (to, from, next)=>{
        if(store.state.user.auth){
          next('webapp')
        }else{
          next()
        }
      }
    },
    {
      path:'/register',
      name:'register',
      component: Register,
      beforeEnter : (to, from, next)=>{
        if(store.state.user.auth){
          next('webapp')
        }else{
          next()
        }
      }
    },
    {
      path:'/webapp',
      name:'webapp',
      component: WebApp,
      beforeEnter : (to, from, next)=>{
        console.log('guard local')
        store.state.typeContentList = 'init'
        if(store.state.user.auth){
          next()
        }else{
          next('login')
        }
      }
    },
    {
      path:'/dashboard',
    /*   name:'dashboard', */
      component: Dashboard ,
      beforeEnter: (to, from, next)=>{
        if(store.state.user.auth){
          next()
        }else{
          next('login')
        }
      },
      children: [
        {
          path:'',
          name:'default-list',
          component: ContainerAnime,
          /* beforeEnter(to, from,next){
            store.state.typeContentList = 'list-complete'
          } */
        },
        {
          path:'list/complete',
          name:'complete',
          component: ContainerAnime,
          beforeEnter(to, from,next){
            store.state.typeContentList = 'list-complete'
          }
        },
        {
          path:'list/watching',
          name:'watching',
          component: ContainerAnime,
          beforeEnter(to, from,next){
            store.state.typeContentList = 'list-watching'
          }
        },
        {
          path:'list/abandoned',
          name:'abandoned',
          component: ContainerAnime,
          beforeEnter(to, from,next){
            store.state.typeContentList = 'list-abandoned'
          }
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
