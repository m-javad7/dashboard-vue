<template>
  <v-container>
    <!-- قسمت جستجو -->
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-autocomplete
          v-model="selectedPerson"
          :items="personnelList"
          item-text="name"
          item-value="id"
          label="🔎 جستجوی پرسنل"
          @change="fetchPersonDetails"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>

    <!-- قسمت ورودی کد ملی و کد پرسنلی -->
    <v-row class="d-flex flex-column align-center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nationalCode"
          label="کد ملی"
          outlined
          dense
          readonly
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="personnelCode"
          label="کد پرسنلی"
          outlined
          dense
          :rules="[required]"
        ></v-text-field>
      </v-col>
      <v-btn color="primary" class="w-25" @click="submitPersonnelCode">ثبت</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { api } from '@/config/api'; // اطمینان حاصل کنید که api به درستی تعریف شده است

export default {
  data() {
    return {
      selectedPerson: null,
      personnelList: [],
      nationalCode: '',
      personnelCode: '',
    };
  },
  methods: {
    async fetchPersonDetails() {
      if (!this.selectedPerson) return; // اطمینان حاصل کنید که یک فرد انتخاب شده است

      try {
        const response = await axios.get(`${api}/api/personnel/${this.selectedPerson}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('authToken'),
            Accept: 'application/json',
          },
        });

        const person = response.data;
        this.nationalCode = person.national_code;  // کد ملی را از پاسخ بگیرید
        this.personnelCode = '';  // کد پرسنلی را خالی کنید تا کاربر بتواند وارد کند
      } catch (error) {
        console.error('خطا در دریافت اطلاعات پرسنل:', error);
      }
    },
    async submitPersonnelCode() {
      if (!this.selectedPerson || !this.personnelCode) {
        return; // اطمینان حاصل کنید که کد پرسنلی وارد شده است
      }

      try {
        const response = await axios.put(
          `${api}/api/personnel/${this.selectedPerson}`,
          { personnel_code: this.personnelCode },  // ارسال کد پرسنلی جدید
          {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('authToken'),
              Accept: 'application/json',
            },
          }
        );

        console.log('کد پرسنلی با موفقیت ثبت شد:', response.data);
      } catch (error) {
        console.error('خطا در ثبت کد پرسنلی:', error);
      }
    },
    required(value) {
      return value ? true : "کد پرسنلی باید اختصاص داده شود!";
    },
  },
  mounted() {
    this.fetchPersonnelList();  // دریافت لیست پرسنل
  },
  async fetchPersonnelList() {
    try {
      const response = await axios.get(`${api}/api/people`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('authToken'),
          Accept: 'application/json',
        },
      });

      this.personnelList = response.data.map(person => {
        return {
          name: `${person.first_name} ${person.last_name}`,  // ترکیب نام و نام خانوادگی
          id: person.id,  // استفاده به عنوان شناسه
        };
      });
    } catch (error) {
      console.error('خطا در دریافت لیست پرسنل:', error);
    }
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}

.v-text-field {
  font-weight: bold;
}
</style>
