<template>
  <v-container>
    <v-form ref="form" class="d-flex flex-column align-center">
      <!-- ورودی‌های فرم -->
      <v-col cols="12" md="6">
      <v-text-field label="نام کاربری" v-model="form.username" required />
      </v-col>
      <v-col cols="12" md="6">
      <v-text-field label="رمز عبور" type="password" v-model="form.password" required />
      </v-col>
      <v-btn @click="register" color="primary">ثبت کاربر جدید</v-btn>

      <!-- پیام Snackbar برای نمایش پیام موفقیت یا خطا -->
      <v-snackbar v-model="snackbar.show" :timeout="4000" :color="snackbar.color">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snackbar.show = false">بستن</v-btn>
        </template>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import { api } from '@/config/api';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      snackbar: {
        show: false,
        message: '',
        color: 'success',
      },
    };
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) {
        this.snackbar.message = "لطفاً فرم را به‌درستی تکمیل کنید";
        this.snackbar.color = "error";
        this.snackbar.show = true;
        return;
      }

      try {
        const response = await axios.post(api + '/api/register', {
          username: this.form.username,
          password: this.form.password,
        });
        console.log(response)
        // پیام موفقیت‌آمیز
        this.snackbar.message = 'ثبت نام موفقیت‌آمیز بود';
        this.snackbar.color = 'success';
        this.snackbar.show = true;

      } catch (error) {
        // پیام خطا
        this.snackbar.message = (error.response.data.message) || 'خطا در ثبت کاربر';
        if (error.response) {
          this.snackbar.message = this.snackbar.message;
        }

        this.snackbar.color = 'error';
        this.snackbar.show = true;
      }
    },
  },
};
</script>

<style scoped>
</style>
