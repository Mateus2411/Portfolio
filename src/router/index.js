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
      path: '/sobre',
      name: 'Sobre Mim',
      component: () => import('@/views/SobreMim/SobreMim.vue'),
      // meta: { hideFooter: true, requiresAuth: true},
    },
    {
    path: '/projetos',
    name: 'Projetos',
    component: () => import('@/views/Projetos/MeusProjeto.vue'),
    // meta: { hideFooter: true, requiresAuth: true},
    },
    {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('@/views/Quiz/QuizApp.vue'),
    // meta: { hideFooter: true, requiresAuth: true},
    },
  ],
})

export default router
