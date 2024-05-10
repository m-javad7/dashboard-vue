//appheader : component
<template>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
      <v-toolbar-title class="text-uppercase font-weight-bold">مروارید</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ attrs }">
          <v-btn v-bind="attrs" dark>
            <v-icon size="25px">mdi-account-circle</v-icon>
          </v-btn>
        </template>
      </v-menu>
      <v-btn text @click="handleLogout">
        <span>خروج</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      handleLogout() {
        axios.post('http://192.168.100.70:8888/auth/logout').then(() => {
          localStorage.removeItem('authToken');
          this.$router.push('/login');
        }).catch((error) => {
          console.error('خطا در خروج:', error);
        });
      },
    },
  };
  </script>
  