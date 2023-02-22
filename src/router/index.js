import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/popular',
      name: 'popular',
      component: () => import('../views/PopularView.vue')
    },
    {
      path: '/top-rated',
      name: 'top-rated',
      component: () => import('../views/TopRated.vue')
    },
    {
      path: "/search/:id",
      name: "search",
      component: () => import("../views/SearchResult.vue"),
      props: true,
    },
    {
      path: "/detail/:id",
      name: "Detailed",
      component: () => import("../views/DetailedView.vue"),
      props: true,
    },
  ]
})

export default router
