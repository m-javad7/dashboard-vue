<template>
  <v-app class="back-login">
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card :width="400" class="pa-4 bg-blue-lighten-5 rounded-xl">
        <v-card-title class="justify-center text-center font-weight-bold v-ma-2">سامانه مروارید</v-card-title>
        <v-card-text>
          <v-form ref="form" @keydown.enter="login" v-model="valid">
            <v-text-field
              v-model="form.username"
              label="نام کاربری"
              prepend-icon="mdi-account-circle"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="رمز عبور"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <p v-if="errorMessage" class="text-red-darken-1">{{ errorMessage }}</p> <!-- نمایش پیام خطا -->
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="login" depressed class="w-50 bg-blue-darken-4 text-white">
            ورود
          </v-btn>
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
      form: {
        username: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  computed: {
    usernameRules() {
      return [
        v => !!v || 'نام کاربری نباید خالی باشد',
        v => v && v.trim().length >= 3 || 'نام کاربری باید حداقل 3 کاراکتر باشد'
      ];
    },
    passwordRules() {
      return [
        v => !!v || 'رمز عبور نباید خالی باشد',
        v => v && v.trim().length >= 4 || 'رمز عبور باید حداقل 4 کاراکتر باشد'
      ];
    }
  },
  methods: {
    async login() {
      if (!this.$refs.form.validate()) {
        return;
      }

      try {

        const response = await axios.post(api+'/api/login', {
          username: this.form.username,
          password: this.form.password,
        });

        console.log(response)
        if (response.status !== 200) {
          throw new Error('نام کاربری یا رمز عبور اشتباه است.');
        }

        const data = response.data;
        const token = data.result.auth_token;
        localStorage.setItem('authToken', token);

        this.setAuthInterceptor();

        this.$router.push('/');
      } catch (error) {
        this.errorMessage =  'خطایی رخ داده است.';
      }
    },
    setAuthInterceptor() {
      axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
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
.pa-4 {
  padding: 1rem;
}
</style>
