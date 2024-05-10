<template>
  <!-- استفاده از Layout مناسب بر اساس ویژگی‌های `meta` -->
  <component :is="getLayoutComponent">
    <router-view /> <!-- محتوای مسیرهای تولید‌شده -->
  </component>
</template>

<script setup>
import DefaultLayout from '@/layouts/default.vue';
import ProductLayout from '@/layouts/productLayout.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const getLayoutComponent = computed(() => {
  // استفاده از یک شرط برای تعیین Layout بر اساس مسیر
  if (route.fullPath.startsWith('/production')) {
    return ProductLayout; // اگر مسیر با /production شروع می‌شود، از این Layout استفاده کنید
  }
  return DefaultLayout; // در غیر این صورت، از Layout پیش‌فرض استفاده کنید
});
</script>
