import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

const loginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/components/Login.vue'),
};

const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/NotFound.vue'),
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    loginRoute,
    notFoundRoute,
    ...setupLayouts(generatedRoutes),
  ],
});


export default router;
