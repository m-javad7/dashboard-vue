import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';

// مسیر لاگین
const loginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/components/Login.vue'),
};

// مسیر 404
const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/NotFound.vue'),
};

// افزودن متا‌تگ برای مسیرهای محافظت‌شده
const protectedRoutes = setupLayouts(generatedRoutes).map((route) => {
  return {
    ...route,
    meta: { requiresAuth: true }, // مسیرهای محافظت‌شده نیاز به احراز هویت دارند
  };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    loginRoute, // اضافه کردن مسیر لاگین
    ...protectedRoutes, // مسیرهای تولید‌شده
    notFoundRoute, // مسیر 404

  ],
});

// Navigation Guard برای بررسی احراز هویت
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken'); // بررسی توکن
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // اگر مسیر نیاز به احراز هویت دارد و کاربر لاگین نشده، به لاگین هدایت شود
      next('/login');
    } else {
      next(); // اگر کاربر لاگین شده، ادامه دهید
    }
  } else {
    next(); // اگر مسیر نیازی به احراز هویت ندارد، ادامه دهید
  }
});

export default router;
