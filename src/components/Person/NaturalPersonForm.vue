<template>
    <v-form ref="naturalForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="نام" v-model="person.first_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="نام خانوادگی" v-model="person.last_name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="کد ملی"
            v-model="person.national_code"
            :rules="nationalCodeRules"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شناسنامه" v-model="person.id_number" />
        </v-col>
        <v-col cols="12" md="6">
          <v-date-input
            label="تاریخ تولد"
            v-model="person.date_of_birth"
            prepend-icon=""
            prepend-inner-icon="$calendar"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="آدرس"
            v-model="person.address"
            :rules="nameRules"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="کدپستی"
            v-model="person.postal_code"
            :rules="nameRules"
            required
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="شماره موبایل" v-model="person.phone_number" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="ایمیل" v-model="person.email" />
        </v-col>
        <v-col cols="12" md="6">
            <v-file-input
          v-model="person.image"
          :show-size="1000"
          label="بارگذاری عکس"
          prepend-inner-icon="$file"
          prepend-icon=""
          counter
          multiple
          @change="handleFileChange"
        >
          <template v-slot:selection="{ fileNames }">
            <template v-for="(fileName, index) in fileNames" :key="fileName">
              <v-chip
                v-if="index < 2"
                class="me-2"
                color="deep-purple-accent-4"
                size="small"
                label
              >
                {{ fileName }}
              </v-chip>
              <span
                v-else-if="index === 2"
                class="text-overline text-grey-darken-3 mx-2"
              >
                +{{ fileNames.length - 2 }} فایل(ها)
              </span>
            </template>
          </template>
        </v-file-input>

          <!-- نمایش پیش‌نمایش عکس‌ها -->
        <v-row>
          <v-col v-for="(preview, index) in filePreviews" :key="index" cols="6" md="4">
            <v-img :src="preview" :alt="'تصویر ' + (index + 1)" contain></v-img>
          </v-col>
        </v-row>

        </v-col>
      </v-row>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      person: {
        type: Object,
        required: true,
      },
    },
    data() {
       return {
      image: [], 
      filePreviews: [],
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
          (v) => v.trim().length >= 3 || 'حداقل 3 حرف لازم است',
        ];
      },
    },
    methods: {
    handleFileChange() {
      this.filePreviews = [];

      console.log(this.person.image); 

      if (this.person.image && Array.isArray(this.person.image)) {
        this.person.image.forEach((file) => {
          const fileURL = URL.createObjectURL(file); // ساخت URL موقت
          this.filePreviews.push(fileURL); // اضافه کردن پیش‌نمایش به لیست
        });
      }
    },
  },
  };
  </script>
  