import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'
import Offers from '../views/Offers.vue'
import bookingHistory from '../views/bookingHistory.vue'
import orderHistory from '../views/orderHistory.vue'
import createOffer from '../views/createOffer.vue'
import myOffers from '../views/myOffers.vue'
import RegisterPrivate from '../views/RegisterPrivate.vue'
import RegisterCom from '../views/RegisterCom.vue'
import passwordReset from '../views/passwordReset.vue'
import Contact from '../views/Contact.vue'
import validateEmail from '../views/validateEmail.vue'
import verifyCom from '../views/verifyCom.vue'
import AGB from '../views/AGB.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/bookingHistory',
    name: 'bookingHistory',
    component: bookingHistory
  },
  {
    path: '/orderHistory',
    name: 'orderHistory',
    component: orderHistory
  },
  {
    path: '/createOffer',
    name: 'createOffer',
    component: createOffer
  },
  {
    path: '/myOffers',
    name: 'myOffers',
    component: myOffers
  },
  {
    path: '/registerPriv',
    name: 'RegisterPrivate',
    component: RegisterPrivate
  },
  {
    path: '/registerCom',
    name: 'RegisterCom',
    component: RegisterCom
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/passwordReset',
    name: 'passwordReset',
    component: passwordReset
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/validateEmail',
    name: 'validateEmail',
    component: validateEmail
  },
  {
    path: '/verifyCom',
    name: 'verifyCom',
    component: verifyCom
  },
  {
    path: '/agb',
    name: 'AGB',
    component: AGB
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router