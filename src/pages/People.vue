<template>
  <v-container>
    <!-- گروه رادیوباکس برای انتخاب حقیقی یا حقوقی -->
    <v-radio-group
      v-model="type"
      row
    >
      <v-radio
        label="حقیقی"
        value="حقیقی"
        color="primary"
      />
      <v-radio
        label="حقوقی"
        value="حقوقی"
        color="primary"
      />
    </v-radio-group>

    <v-form ref="form" v-model="valid" md="pa-6">
      <!-- ورودی‌های برای فرد حقیقی -->
      <v-row v-if="type === 'حقیقی'">
        <v-col cols="12" md="6">
          <v-text-field label="نام" v-model="firstName" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام خانوادگی" v-model="lastName" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کد ملی" v-model="nationalCode" :rules="nationalCodeRules" maxlength="10" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تاریخ تولد" hint="تاریخ باید به فرمت 1400/12/29" v-model="birthDate" :rules="DateRules" required />
        </v-col>
      </v-row>

      <!-- ورودی‌های برای فرد حقوقی -->
      <v-row v-if="type === 'حقوقی'">
        <v-col cols="12" md="6">
          <v-text-field label="نام شرکت" v-model="companyName" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن تماس" v-model="Phone" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام مدیرعامل" v-model="ceoName" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام رابط شرکت" v-model="CompanyContact" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن رابط شرکت" v-model="CompanyPhone" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کد اقتصادی" v-model="EconomicCode" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شناسه ملی" v-model="NationalID" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره ثبت شرکت" v-model="CompanyRegistrationNumber" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تاریخ تاسیس" hint="تاریخ باید به فرمت 1400/12/29" v-model="DateEstablishment" :rules="DateRules" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس/کدپستی" v-model="economicID" />
        </v-col>
      </v-row>

      <v-btn color="primary" @click="handleSubmit">
        ثبت
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import jalali from 'dayjs-jalali';

dayjs.extend(jalali);

export default {
  data() {
    return {
      type: 'حقیقی',
      firstName: '',
      lastName: '',
      nationalCode: '',
      birthDate: '',

      companyName: '',
      phone: '',
      ceoName: '',
      economicID: '',
      CompanyContact: '',
      CompanyPhone: '',
      EconomicCode: '',
      NationalID: '',
      CompanyRegistrationNumber: '',
      DateEstablishment: '',
    };
  },
  computed: {
    nationalCodeRules() {
      return [
        (v) => !!v || 'کد ملی باید وارد شود',
        (v) => /^\d{10}$/.test(v) || 'کد ملی باید 10 رقم عددی باشد',
      ];
    },
    DateRules() {
      return [
        (v) => !!v || 'تاریخ باید وارد شود',
        (v) => {
          const isValid = dayjs(v, 'YYYY/MM/DD', true).isValid();
          return isValid ? true : 'فرمت تاریخ باید YYYY/MM/DD باشد';
        },
      ];
    },
    nameRules() {
      return [
        (v) => !!v || 'این فیلد باید پر شود',
        (v) => v.trim().length >= 3 || 'حداقل 3 حرف لازم است',
      ];
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const formData = {
        type: this.type,
        firstName: this.firstName,
        lastName: this.lastName,
        nationalCode: this.nationalCode,
        birthDate: this.birthDate,
        companyName: this.companyName,
        phone: this.phone,
        ceoName: this.ceoName,
        economicID: this.economicID,
        CompanyContact: this.CompanyContact,
        CompanyPhone: this.CompanyPhone,
        EconomicCode: this.EconomicCode,
        NationalID: this.NationalID,
        CompanyRegistrationNumber: this.CompanyRegistrationNumber,
        DateEstablishment: this.DateEstablishment,
      };

      try {
        const response = await axios.post('/api/register', formData);

        console.log('داده‌ها با موفقیت ارسال شدند:', response.data);
      } catch (error) {
        console.error('خطا در ارسال داده‌ها:', error);
      }
    },
  },
};
</script>
