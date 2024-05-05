<template>
  <v-container>
    <!-- گروه رادیوباکس برای انتخاب حقیقی یا حقوقی -->
    <v-radio-group v-model="type" row>
      <v-radio label="حقیقی" value="1" color="primary" />
      <v-radio label="حقوقی" value="0" color="primary" />
    </v-radio-group>

    <v-form ref="form" v-model="valid" md="pa-6">
      <!-- ورودی‌های برای فرد حقیقی -->
      <v-row v-if="type === '1'">
        <v-col cols="12" md="6">
          <v-text-field label="نام" v-model="first_name" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام خانوادگی" v-model="last_name" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کد ملی" v-model="national_code" :rules="nationalCodeRules" maxlength="10" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شناسنامه" v-model="id_number"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-date-input
          label="تاریخ تولد"
          prepend-icon=""
          v-model="date_of_birth"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس" v-model="address" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کدپستی" v-model="postal_code" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره موبایل" v-model="phone_number" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
          label="بارگذاری تصویر"
          v-model="image"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="ایمیل" v-model="email"/>
        </v-col>
      </v-row>

      <!-- ورودی‌های برای فرد حقوقی -->
      <v-row v-if="type === '0'">
        <v-col cols="12" md="6">
          <v-text-field label="نام شرکت" v-model="company_name" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن تماس" v-model="phone_number" required/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام مدیرعامل" v-model="ceo_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام رابط شرکت" v-model="company_contact_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن رابط شرکت" v-model="company_contact_phone" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کد اقتصادی" v-model="economic_code" required/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شناسه ملی" v-model="national_code" required/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره ثبت شرکت" v-model="registration_number" />
        </v-col>
        <v-col cols="12" md="6">
          <v-date-picker label="تاریخ تاسیس"
          v-model="date_of_establishment"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کدپستی" v-model="postal_code" required/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس" v-model="address" required/>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="handleSubmit">
        ثبت
      </v-btn>
    </v-form>

    <!-- نمایش اخطار برای پیام‌های خطا -->
    <v-snackbar v-model="snackbar" :timeout="3000" bottom>
      {{ snackbarMessage }}
      <v-btn color="pink" @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      type: '1',  // حالت پیش‌فرض
      valid: false,
      // داده‌های برای فرد حقیقی
      first_name: '',
      last_name: '',
      national_code: '',
      id_number: '',
      date_of_birth: '',
      address: '',
      postal_code: '',
      phone_number: '',
      image: '',
      email: '',
      // داده‌های برای فرد حقوقی
      company_name: '',
      ceo_name: '',
      company_contact_name: '',
      company_contact_phone: '',
      economic_code: '',
      registration_number: '',
      date_of_establishment: '',
      // برای کنترل اسنک‌بار
      snackbar: false,
      snackbarMessage: '',
    };
  },

  computed: {
    nationalCodeRules() {
      return [
        (v) => !!v || 'کد ملی باید وارد شود',
        (v) => /^\d{10}$/.test(v) || 'کد ملی باید 10 رقم عددی باشد',
      ];
    },
    nameRules() {
      return [
        (v) => !!v || 'این فیلد باید پر شود',
        (v) => v.trim().length >= 3  ||'حداقل 3 حرف لازم است',
      ];
    },
  },

  methods: {
    async handleSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const formData = new FormData();
      formData.append('type', this.type);
      formData.append('first_name', this.first_name);
      formData.append('last_name', this.last_name);
      formData.append('national_code', this.national_code);
      formData.append('id_number', this.id_number);
      formData.append('date_of_birth', this.date_of_birth);
      formData.append('address', this.address);
      formData.append('postal_code', this.postal_code);
      formData.append('phone_number', this.phone_number);
      formData.append('email', this.email);

      formData.append('company_name', this.company_name);
      formData.append('ceo_name', this.ceo_name);
      formData.append('company_contact_name', this.company_contact_name);
      formData.append('company_contact_phone', this.company_contact_phone);
      formData.append('economic_code', this.economic_code);
      formData.append('registration_number', this.registration_number);
      formData.append('date_of_establishment', this.date_of_establishment);



      if (this.image) {
        formData.append('image', this.image); // اضافه کردن تصویر
      }

      try {
        const response = this.$http.post('/people', formData);

        this.snackbarMessage = 'اطلاعات با موفقیت ارسال شد';
        this.snackbar = true;
      } catch (error) {
        this.snackbarMessage = 'خطا در ارسال اطلاعات';
        if (error.response && error.response.data) {
          this.snackbarMessage += `: ${error.response.data.message}`; // اگر پیام خطا از سرور وجود دارد
        }
        this.snackbar = true;
      }
    },
  },
};
</script>
