

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <!-- Toggle Drawer Button -->
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title class="text-uppercase font-weight-bold">مروارید</v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text @click="signOut">
        <span>خروج</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" right>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-action>
        </v-list-item>
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
export default {
  data() {
    return {
      drawer: true, // Drawer starts in an open state
      links: [
        { icon: "mdi-view-dashboard", text: "داشبورد", route: "/" },
        { icon: "mdi-folder", text: "ایجاد پرسنل", route: "/MainLayout" },
        { icon: "mdi-account-group", text: "سایر", route: "/dashboard" },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer; // Toggles the drawer open/closed
    },
    signOut() {
      console.log("Signing out...");
      // Logic for signing out the user
    },
  },
};
</script>



<style scoped>
.v-app-bar {
  background-color: #1976d2; /* Background color for the app bar */
}

.v-navigation-drawer {
  transition: transform 0.3s; /* Adding a smooth transition to the drawer */
}

.v-btn {
  font-weight: bold; /* Making text bold for buttons */
}

.v-icon {
  font-size: 24px; /* Increasing icon size for better visibility */
}

.v-list-item {
  padding: 16px; /* Adding padding for spacing between list items */
}
</style>


