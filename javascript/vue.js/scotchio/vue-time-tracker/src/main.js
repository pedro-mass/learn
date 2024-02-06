import Vue from 'vue'
import App from './App.vue'
import Hello from './components/Hello.vue'
import Home from './components/Home.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

// Pointing routes to the components they should use
const router = new VueRouter({
  routes: [
    {path: '/', component: App},
    {path: '/hello', component: Hello},
    {path: '/home', component: Home},
    {path: '/time-entries', component: Hello},

    // catch all redirect
    {path: '*', redirect: '/home'}
  ]
})

new App({
  router
}).$mount('#app')
