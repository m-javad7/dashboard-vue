<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>لیست پرسنل</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <!-- نشانگر لودینگ -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="blue"
      class="mx-auto my-6"
    />

    <!-- جدول داده‌ها -->
    <v-data-table
      v-else
      :headers="headers"
      :items="personnel"
      item-value="id"
    >
      <!-- ستون‌ها -->
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editPersonnel(item)">mdi-pencil</v-icon> <!-- ویرایش -->
        <v-icon @click="deletePersonnel(item)">mdi-delete</v-icon> <!-- حذف -->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import { api } from '@/config/api';  // اطمینان حاصل کنید که به درستی مقداردهی شده است

export default {
  data() {
    return {
      loading: true,
      headers: [
        { text: 'نام', value: 'first_name' },
        { text: 'نام خانوادگی', value: 'last_name' },
        { text: 'نام واحد', value: 'unit_name' },
        { text: 'کد پرسنلی', value: 'employee_code' },
        { text: 'تاریخ شروع کار', value: 'start_date' },
        { text: 'تاریخ ترک کار', value: 'end_date' },
        { text: 'فعال/غیرفعال', value: 'is_active' },
        { text: 'پست کاری', value: 'job_title' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      personnel: [],  // ذخیره‌سازی داده‌های پرسنل
    };
  },
  mounted() {
    this.fetchPersonnelList();  // فراخوانی متد هنگام بارگذاری
  },
  methods: {
     fetchPersonnelList() {
      try {
        const response = this.$http.get(`/personals`);
        console.log(response.data)
        this.personnel = response.data;
        this.loading = false;  // نشانگر لودینگ را خاموش کنید
      } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);  // مدیریت خطا
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
