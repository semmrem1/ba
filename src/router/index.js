import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Offers from '../views/Offers.vue'
import myCrops from '../views/myCrops.vue'
import Organisations from '../views/Organisations.vue'
import Register from '../views/Register.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  },
  {
    path: '/myCrops',
    name: 'myCrops',
    component: myCrops
  },
  {
    path: '/organisations',
    name: 'organisations',
    component: Organisations
  },
  {
    path: '/register',
    name: 'Regsiter',
    component: Register
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
