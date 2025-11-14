import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/invitation/:guestName',
    name: 'invitation',
    component: HomePage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router