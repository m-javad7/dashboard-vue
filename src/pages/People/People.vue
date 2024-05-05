<template>
  <v-container>
    <v-row>
      <!-- انتخاب نوع شخص -->
      <v-radio-group v-model="personType" row>
        <v-radio label="حقیقی" value="natural" />
        <v-radio label="حقوقی" value="legal" />
      </v-radio-group>
    </v-row>

    <v-divider class="my-4" />

    <!-- فرم برای افراد حقیقی -->
    <v-form v-if="personType === 'natural'" ref="naturalForm">
      <v-text-field label="نام" v-model="naturalPerson.firstName" />
      <v-text-field label="نام خانوادگی" v-model="naturalPerson.lastName" />
      <v-text-field label="کد ملی" v-model="naturalPerson.nationalId" />
      <v-date-input v-model="naturalPerson.birthDate" label="تاریخ تولد" />
      <v-file-input label="عکس" v-model="naturalPerson.photo" />
    </v-form>

    <!-- فرم برای شرکت های حقوقی -->
    <v-form v-else ref="legalForm">
      <v-text-field label="نام شرکت" v-model="legalEntity.companyName" />
      <v-text-field label="کد اقتصادی" v-model="legalEntity.taxId" />
      <v-text-field label="شماره ثبت" v-model="legalEntity.registrationNumber" />
      <v-text-field label="شماره موبایل" v-model="legalEntity.mobileNumber" />
    </v-form>

    <!-- دکمه ثبت -->
    <v-btn @click="handleSubmit">ثبت</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      personType: 'natural', // حالت پیش فرض حقیقی است
      naturalPerson: {
        firstName: '',
        lastName: '',
        nationalId: '',
        birthDate: null,
        photo: null,
      },
      legalEntity: {
        companyName: '',
        taxId: '',
        registrationNumber: '',
        mobileNumber: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.personType === 'natural') {
        console.log('اطلاعات شخص حقیقی:', this.naturalPerson);
      } else {
        console.log('اطلاعات شرکت حقوقی:', this.legalEntity);
      }
    },
  },
};
</script>

<style scoped>
/* استایل‌های اضافی در صورت نیاز */
</style>
