<template>
    <v-navigation-drawer :permanent="isDesktop" app :value="drawer" right class="bg-grey-lighten-5" :width="280">
      <v-list>
        <v-list-item
          :class="{ 'bg-blue-grey-lighten-4': isRouteActive('dashboard') }"
          prepend-icon="mdi-view-dashboard"
          rounded="shaped"
          title="داشبورد"
          @click="navigateTo('dashboard')"
        />
        <menu-group
          v-for="group in menuGroups"
          :key="group.title"
          :group="group"
        />
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  import MenuGroup from './MenuGroup.vue';
  import { useDisplay } from 'vuetify';
  import { reactive } from 'vue';
  
  export default {
    components: {
      'menu-group': MenuGroup,
    },
    props: {
      drawer: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      isDesktop() {
        const { width } = useDisplay();
        return width.value > 999;
      },
    },
    methods: {
      navigateTo(route) {
        this.$router.push(`/${route}`);
      },
      isRouteActive(route) {
        return this.$route.path === `/${route}`;
      },
    },
    data() {
      return {
        menuGroups: [
          {
            title: 'مدیریت اشخاص',
            icon: 'mdi-account-multiple-plus',
            items: [],
            subGroups: [
              {
                title: 'اشخاص',
                icon: 'mdi-account-multiple',
                items: [
                  { title: 'ثبت', icon: 'mdi-plus-box', route: 'Person/CreatePerson' },
                  { title: 'لیست', icon: 'mdi-folder-plus', route: 'Person/ListPerson' },
                ],
              },
              {
                title: 'پرسنلی',
                icon: 'mdi-card-account-details-outline',
                items: [
                  { title: 'ثبت', icon: 'mdi-plus-box', route: 'Personnel/CreatePersonnel' },
                  { title: 'لیست', icon: 'mdi-folder-plus', route: 'Personnel/ListPersonnel' },
                ],
              },
              {
                title: 'کاربران',
                icon: 'mdi-account-key',
                items: [
                  { title: 'ثبت', icon: 'mdi-plus-box', route: 'User/CreateUser' },
                  { title: 'لیست', icon: 'mdi-folder-plus', route: 'User/ListUser' },
                ],
              },
            ],
          },
          {
            title: 'لاگ‌ها',
            icon: 'mdi-alert-octagon-outline',
            items: [
              { title: 'کاربران', icon: 'mdi-account-group', route: 'Log' },
            ],
          },
          {
            title: 'واحدهای کاری',
            icon: 'mdi-office-building-marker-outline',
            items: [
              { title: 'ثبت', icon: 'mdi-account-check', route: 'part/Listpart' },
              { title: 'لیست', icon: 'mdi-list-status', route: 'Part/CreateList' },
            ],
          },
          {
            title: 'مدیریت دسترسی‌ها',
            icon: 'mdi-cog-outline',
            items: [
              { title: 'دسترسی نرم‌افزار', icon: 'mdi-key', route: 'ManSoftware' },
            ],
            subGroups: [
              {
                title: 'گروه‌های دسترسی',
                icon: 'mdi-folder',
                items: [
                  { title: 'ایجاد', icon: 'mdi-plus-box', route: 'AccessGroups' },
                  { title: 'انتساب', icon: 'mdi-folder-plus', route: 'Attribution' },
                ],
              },
            ],
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .v-list-group__items .v-list-item {
    padding-inline-start: calc(1px + var(--indent-padding)) !important;
  }
  </style>
  