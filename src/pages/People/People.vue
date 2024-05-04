<template>
  <v-container>
    <!-- گروه رادیوباکس برای انتخاب حقیقی یا حقوقی -->
    <v-radio-group v-model="type" row>
      <v-radio label="حقیقی" value="0" color="primary" />
      <v-radio label="حقوقی" value="1" color="primary" />
    </v-radio-group>

    <v-form ref="form" v-model="valid" md="pa-6">
      <!-- ورودی‌های برای فرد حقیقی -->
      <v-row v-if="type === '0'">
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
          <v-text-field label="شناسنامه" v-model="id_number" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-date-input label="تاریخ تولد" 
          prepend-inner-icon="$calendar"
          prepend-icon=""
          ></v-date-input>

        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس" v-model="address" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کدپستی" v-model="postal_code" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره موبایل" v-model="phone_number" :rules="nameRules" required />
        </v-col>
        <v-col cols="12" md="6">
          <input-photo  v-model="files"/>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-text-field label="ایمیل" v-model="firstName" :rules="nameRules" required />
        </v-col> -->
      </v-row>

      <!-- ورودی‌های برای فرد حقوقی -->
      <v-row v-if="type === '1'">
        <v-col cols="12" md="6">
          <v-text-field label="نام شرکت" v-model="company_name" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="تلفن تماس" v-model="phone_number" />
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
          <v-text-field label="کد اقتصادی" v-model="economic_code" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شناسه ملی" v-model="national_code" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره ثبت شرکت" v-model="registration_number" />
        </v-col>
        <v-col cols="12" md="6">
          <v-date-input label="تاریخ تاسیس" 
          prepend-icon=""
          ></v-date-input>
                </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="کدپستی" v-model="postal_code" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="آدرس" v-model="address" />
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
// import api from '@/config/api'
import dayjs from 'dayjs';
import jalali from 'dayjs-jalali';
import InputPhoto from '@/components/InputPhoto.vue';
import DatePicker from '@/components/DatePicker.vue';

dayjs.extend(jalali);

export default {
  components: { InputPhoto },
  data() {
    return {
      type: '0',  // حالت پیش‌فرض
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
      files: [],
      // داده‌های برای فرد حقوقی
      company_name: '',
      ceo_name: '',
      company_contact_name: '',
      company_contact_phone: '',
      economic_code: '',
      registration_number: '',
      date_of_establishment: '',
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

      // ایجاد FormData و اضافه کردن داده‌ها
      const formData = {
        type: this.type,
        first_name: this.first_name,
        last_name: this.last_name,
        national_code: this.national_code,
        certificate_number: this.certificate_number,
        birth_date: this.birth_date,
        address: this.address,
        postal_code: this.postal_code,
        mobile_number: this.mobile_number,
        company_name: this.company_name,
        phone: this.phone,
        ceo_name: this.ceo_name,
        contact_name: this.contact_name,
        contact_phone: this.contact_phone,
        economic_code: this.economic_code,
        registration_number: this.registration_number,
        date_of_establishment: this.date_of_establishment,
        files: this.files,
      };
      console.log(formData)

      try {
        const response = await axios.post('http://192.168.100.152:8080/api/people', formData, {
          headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('authToken'),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
        });

        console.log('اطلاعات با موفقیت ارسال شد:', response.data);
      } catch (error) {
        console.error('خطا در ارسال اطلاعات:', error);
      }
    },
  },
};
</script>
