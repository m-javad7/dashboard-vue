<template>
    <v-form ref="legalForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="نام شرکت" v-model="company.company_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام مدیرعامل" v-model="company.ceo_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن تماس" v-model="company.phone_number" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام رابط شرکت" v-model="company.company_contact_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن رابط شرکت" v-model="company.company_contact_phone" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="شناسه ملی"
            v-model="company.national_code"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="کد اقتصادی"
            v-model="company.economic_code"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره ثبت" v-model="company.registration_number" />
        </v-col>
        <v-col cols="12" md="6">
          <v-date-input
            label="تاریخ تاسیس"
            v-model="company.date_of_establishment"
            prepend-icon=""
            prepend-inner-icon="$calendar"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="کدپستی"
            v-model="company.postal_code"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس" v-model="company.address" required />
        </v-col>
      </v-row>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      company: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  