<template>
<v-app class=" back-login">
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card :width="400" class="pa-4 bg-blue-lighten-5 rounded-xl">
      <v-card-title class="justify-center text-center font-weight-bold v-ma-2">سامانه مروارید</v-card-title>
      <v-card-text>
        <v-form @keydown.enter="login">
          <v-text-field
            v-model="form.username"
            label="نام کاربری"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="رمز عبور"
            prepend-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>
          <p v-if="errorMessage" class="text-red-darken-1">{{ errorMessage }}</p> <!-- نمایش پیام خطا -->
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="login" depressed class="w-50 bg-blue-darken-4 text-white ">ورود</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</v-app>
</template>

<script>
import axios from 'axios';
import { api } from '@/config/api';

export default {
  data() {
    return {
      form: { username: '', password: '' },
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${api}/auth/login`, {
          username: this.form.username,
          password: this.form.password,
        });

        if (response.status !== 200) {
          throw new Error('نام کاربری یا رمز عبور اشتباه است.');
        }

        const data = response.data;
        const token = data.token;
        localStorage.setItem('authToken', token);

        this.setAuthInterceptor();

        this.$router.push('/'); 
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'نام کاربری یا رمز اشتباه است.';
      }
    },

    setAuthInterceptor() {
      axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.back-login {
  background-image: url('/src/assets/Images/back-login.webp'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}
.fill-height {
  height: 100vh;
}
.error-message {
  color: red;
}
.pa-4 {
  padding: 1rem;
}
</style>
