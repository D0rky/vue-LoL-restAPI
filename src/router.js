/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'

const routes = [
  { path: '/LoL-RESTAPI/', name: 'Home', component: HomePage },
  {
    path: '/cards/:id',
    name: 'Cards',
    component: () => import('@/views/CharacterDetails.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
