<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card :width="500" class="pa-4">
      <v-card-title class="justify-center text-center font-weight-bold v-ma-2">ورود</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="username"
            label="نام کاربری"
            prepend-icon="mdi-account-circle"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="رمز عبور"
            prepend-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>
          <!-- نمایش پیام خطا -->
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="login" depressed color="primary">ورود</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { api } from '@/config/api';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const loginData = {
          username: this.username,
          password: this.password,
        };

        const response = await fetch(`${api}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // ارسال داده‌ها به‌عنوان JSON
          },
          body: JSON.stringify(loginData), // داده‌های فرم
        });

        if (!response.ok) {
          throw new Error('نام کاربری یا رمز عبور اشتباه است.');
        }

        const data = await response.json();

        const token = data.access_token;

        localStorage.setItem('authToken', token);

        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>


<style scoped>
.fill-height {
  height: 100vh;
}
.error-message {
  color: red;
}
.v-card {
  max-width: 400px;
}

.pa-4 {
  padding: 1rem;
}
</style>

<!-- 

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card :width="500" class="pa-4">
      <v-card-title class="justify-center text-center font-weight-bold">ورود</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            label="نام کاربری"
            prepend-icon="mdi-account-circle"
            :rules="usernameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="رمز عبور"
            prepend-icon="mdi-lock"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn @click="login" :disabled="!valid" depressed color="primary">ورود</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';  // وارد کردن axios
import { api } from "/src/config/api";  // استفاده از متغیر api

export default {
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  computed: {
    usernameRules() {
      return [
        (v) => !!v || 'نام کاربری الزامی است.',
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || 'رمز عبور الزامی است.',
        (v) => /[0-9]/.test(v) || 'رمز عبور باید حداقل یک عدد داشته باشد.',
      ];
    },
  },
  methods: {
    async login() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }

        const loginData = {
          username: this.username,
          password: this.password,
        };

        const response = await axios.post(`${api}/api/login`, loginData, {
          headers: {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (response.status >= 400) {
          throw new Error('نام کاربری یا رمز عبور اشتباه است.');
        }

        const data = response.data;

        // ریدایرکت به صفحه اصلی پس از ورود موفق
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.error-message {
  color: red
}
.v-card {
  max-width: 400px
}
.pa-4 {
  padding: 1rem
}
</style> -->
