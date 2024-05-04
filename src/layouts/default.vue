<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="text-uppercase font-weight-bold">مروارید</v-toolbar-title>
      <!-- <v-card>
    <v-img
      height="200px"
      :src="logo"
      alt="Logo Image"
    ></v-img>
  </v-card> -->
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs }">
          <v-btn v-bind="attrs" dark>
            <v-icon size="25px">mdi-account-circle</v-icon>
          </v-btn>
        </template>
      </v-menu>
      <v-btn text @click="Logout">
        <span>خروج</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer :permanent="isDesktop" app v-model="drawer" right class="bg-grey-lighten-5" :width="280">
      <v-list>
        <!-- منو اصلی آیتم ها بئون زیرگروه-->
        <v-list-item :class="{ 'bg-blue-grey-lighten-4': isRouteActive('dashboard') }" prepend-icon="mdi-view-dashboard"
          rounded="shaped" title="داشبورد" @click="navigateTo('dashboard')" />

        <!-- گروه منوها -->
        <v-list-group v-for="(group, index) in menuGroups" :key="group.title" color="primary"
          v-model="groupExpanded[index]">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="group.icon" rounded="shaped" :title="group.title" />
          </template>

          <v-list-item v-for="item in group.items" :key="item.title"
            :class="{ 'bg-blue-grey-lighten-4': isRouteActive(item.route) }" :prepend-icon="item.icon"
            :title="item.title" @click="navigateTo(item.route)" rounded="shaped" />

          <!-- زیرمنو -->
          <v-list-group v-for="(subGroup, subIndex) in group.subGroups" :key="subGroup.title" color="primary"
            class="bg-grey-lighten-3" v-model="subGroupExpanded[subIndex]">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :prepend-icon="subGroup.icon" rounded="shaped" :title="subGroup.title" />
            </template>

            <v-list-item v-for="subItem in subGroup.items" :key="subItem.title"
              :class="{ 'bg-blue-grey-lighten-4': isRouteActive(subItem.route) }" :prepend-icon="subItem.icon"
              :title="subItem.title" @click="navigateTo(subItem.route)" rounded="shaped" />
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import { computed, reactive } from 'vue';
import { useDisplay } from 'vuetify';
import { api } from '@/config/api';
// import logo from '../assets/Images/logo_mor'
export default {
  data() {
    return {
      // logo,
      drawer: true,
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
                { title: 'ثبت', icon: 'mdi-plus-box', route: 'People/People' },
                { title: 'لیست', icon: 'mdi-folder-plus', route: 'People/ListPeople' },
              ],
            },
            {
              title: 'پرسنلی',
              icon: 'mdi-card-account-details-outline',
              items: [
                { title: 'ثبت', icon: 'mdi-plus-box', route: 'register/Personnel' },
                { title: 'لیست', icon: 'mdi-folder-plus', route: 'Personnel/ListPersonnel' },
              ],
            },
            {
              title: 'کاربران',
              icon: 'mdi-account-key',
              items: [
                { title: 'ثبت', icon: 'mdi-plus-box', route: 'register/User' },
                { title: 'لیست', icon: 'mdi-folder-plus', route: 'ListUsers' },
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
            { title: 'ثبت', icon: 'mdi-account-check', route: 'WorkUnits' },
            { title: 'لیست', icon: 'mdi-list-status', route: 'ListUnits' },
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
      groupExpanded: reactive([]),  // برای مدیریت وضعیت باز و بسته شدن گروه ها استفاده می شود
      subGroupExpanded: reactive([]), //برای زیرمنوها
    };
  },
  mounted() {
    this.groupExpanded = this.menuGroups.map(() => false);
    this.subGroupExpanded = this.menuGroups.flatMap(group =>
      group.subGroups ? group.subGroups.map(() => false) : []
    );
  },
  computed: {
    isDesktop() {
      const { width } = useDisplay();
      return width.value > 999;
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async Logout() {
      try {
        await axios.post(api + '/api/auth/logout');
        localStorage.removeItem('authToken');
        this.$router.push('/login');
      } catch (error) {
        console.error('خطا در خروج:', error);
      }
    },
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
    isRouteActive(route) {
      return this.$route.path === `/${route}`;
    },
  },
};
</script>

<style scoped>
.v-list-group__items .v-list-item {
  padding-inline-start: calc(1px + var(--indent-padding)) !important;
}
</style>
