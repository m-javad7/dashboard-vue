<template>
  <v-app>
    <v-main>
  <component :is="getLayoutComponent">
      <router-view />
  </component>
    </v-main>
  </v-app>
</template>

<script setup>
import DefaultLayout from '@/layouts/default.vue';
import ProductLayout from '@/layouts/ProductLayout'
import { useRoute } from 'vue-router';
import Null from './layouts/Null.vue';

const route = useRoute();

const getLayoutComponent = computed(() => {
  // استفاده از یک شرط برای تعیین Layout بر اساس مسیر
  if (route.fullPath.startsWith('/Production')) {
    return ProductLayout;
  }
  if (route.fullPath === '/login') {
    // اگر مسیر فعلی مربوط به لاگین است، لایوتی را بر نگردان
    return Null;
  }
  return DefaultLayout;
});
</script>


