<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="text-uppercase font-weight-bold">مروارید</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" dark>
            <v-icon size="25px">mdi-account-circle</v-icon>
          </v-btn>
        </template>
      </v-menu>
      <v-btn text @click="signOut">
        <span>خروج</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      :permanent="isDesktop"
      app
      v-model="drawer"
      right
      class="bg-grey-lighten-5"
    >
      <v-list>
        <v-list-item
          :class="{ 'bg-blue-lighten-5': isRouteActive('dashboard') }"
          prepend-icon="mdi-view-dashboard"
          rounded="shaped"
          title="داشبورد"
          @click="navigateTo('dashboard')"
        ></v-list-item>

        <v-list-item
          :class="{ 'bg-blue-lighten-5': isRouteActive('People') }"
          prepend-icon="mdi-account-hard-hat"
          rounded="shaped"
          title="ثبت اشخاص"
          @click="navigateTo('People')"
        ></v-list-item>

        <v-list-group v-for="group in menuGroups" :key="group.title" color="primary">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="group.icon"
              rounded="shaped"
              :title="group.title"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="item in group.items"
            :key="item.title"
            :class="{ 'bg-blue-lighten-5': isRouteActive(item.route) }"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="navigateTo(item.route)"
            rounded="shaped"
          ></v-list-item>
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
import { computed } from 'vue';
import { useDisplay } from 'vuetify'; 

export default {
  data() {
    return {
      drawer: true,
      menuGroups: [
        {
          title: 'ایجاد کاربر',
          icon: 'mdi-account-multiple-plus',
          items: [
            { title: 'ثبت پرسنل', icon: 'mdi-account-details', route: 'Personnel' },
            { title: 'ثبت نام کاربری', icon: 'mdi-account-key', route: 'register' },
          ],
        },
        {
          title: 'تنظیمات',
          icon: 'mdi-cog-outline',
          items: [
            { title: 'منو3', icon: 'mdi-home', route: 'test' },
          ],
        },
      ],
    };
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
    signOut() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
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
.active-item {
  background-color: lightgray; /* رنگ آیتم‌های فعال */
}
</style>
