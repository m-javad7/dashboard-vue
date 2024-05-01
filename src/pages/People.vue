<template>
  <v-container>
    <!--   برای انتخاب حقیقی یا حقوقی -->
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

    <!-- ورودی‌های برای فرد حقیقی -->
    <v-row v-if="type === 'حقیقی'">
      <v-col cols="12" md="6">
        <v-text-field
          label="نام"
          v-model="firstName"
          :rules="nameRules"
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="نام خانوادگی"
          v-model="lastName"
          :rules="nameRules"
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="کد ملی"
          v-model="nationalCode"
          :rules="nationalCodeRules"
          maxlength="11"
          required
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="تاریخ تولد (1400/12/29)"
          v-model="birthDate"
          :rules="birthDateRules"
          required
        />
      </v-col>
    </v-row>

    <!-- ورودی‌های برای فرد حقوقی -->
    <v-row v-if="type === 'حقوقی'">
      <v-col cols="12" md="8">
        <v-text-field
          label="نام شرکت"
          v-model="companyName"
          required
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          label="شناسه ملی"
          v-model="NationalID"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          label="شناسه اقتصادی"
          v-model="economicID"
        />
      </v-col>
    </v-row>

    <v-btn color="primary" @click="handleSubmit">ثبت</v-btn>
  </v-container>
</template>

<script>
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
      NationalID: '',
      economicID: '',
    };
  },
  computed: {
    nationalCodeRules() {
      return [
        (v) => !!v || 'کد ملی باید وارد شود',
        (v) => /^\d{10}$/.test(v) || 'کد ملی باید 10 رقم عددی باشد',
      ];
    },
    birthDateRules() {
      return [
        (v) => !!v || 'تاریخ تولد باید وارد شود',
        (v) => {
          const isValid = dayjs(v, 'YYYY/MM/DD', true).isValid();
          return isValid = "فرمت تاریخ باید به صورت YYYY/MM/DD باشد";
        },
      ];
    },
    nameRules() {
      return [
        (v) => !!v || 'این فیلد باید پر شود',
        (v) => (v && v.trim().length >= 3) || 'حداقل 3 حرف لازم است',
      ];
    },
  },
  methods: {
    handleSubmit() {
      // اینجا می‌توانید اعتبارسنجی‌های اضافی انجام دهید و داده‌ها را ارسال کنید
      console.log("داده‌ها ارسال شدند.");
    },
  },
};
</script>
