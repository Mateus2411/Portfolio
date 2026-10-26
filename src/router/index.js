import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: () => import('@/views/Quiz/QuizApp.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
