import { createRouter, createWebHistory } from 'vue-router'
import SignersList from '../views/SignersList.vue'

const routes = [
  {
    path: '/',
    name: 'SignersList',
    component: SignersList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router