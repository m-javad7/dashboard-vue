<template>
    <v-form>
      <v-text-field v-model="employee.codePersonnel" label="کد پرسنلی" />
      <v-text-field v-model="employee.unit" label="واحد کاری" />
      <v-text-field v-model="employee.position" label="پست" />
      <v-text-field v-model="employee.startDate" label="تاریخ شروع کار" />
      <v-text-field v-model="employee.endDate" label="تاریخ ترک کار" />
      <v-switch v-model="employee.active" label="فعال/غیرفعال" />
      <v-btn @click="submit">ارسال</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      selectedEmployee: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        employee: { ...this.selectedEmployee },
      };
    },
    methods: {
      submit() {
        // ارسال اطلاعات ویرایش شده به دیتابیس
        console.log('ارسال داده:', this.employee);
        // درخواست ارسال به سرور
      },
    },
  };
  </script>
  