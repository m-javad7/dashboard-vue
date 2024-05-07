<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="first_name"
          label="نام"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="last_name"
          label="نام خانوادگی"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="national_code"
          label="کد ملی"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" @click="search">جستجو</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="Array.isArray(results) ? results : []"
      item-value="id"
      item-key="id"
      hide-default-footer
    >
      <template v-slot:item.unit="{ item }">
        <v-text-field v-model="item.unit"></v-text-field>
      </template>

      <template v-slot:item.start_date="{ item }">
        <v-text-field
          v-model="item.start_date"
          label="تاریخ شروع کار"
        ></v-text-field>
      </template>

      <template v-slot:item.end_date="{ item }">
        <v-text-field
          v-model="item.end_date"
          label="تاریخ ترک کار"
        ></v-text-field>
      </template>

      <template v-slot:item.status="{ item }">
        <v-select
          v-model="item.status"
          :items="['فعال', 'غیرفعال']"
          label="وضعیت"
        ></v-select>
      </template>
    </v-data-table>

    <v-row>
      <v-col>
        <v-btn color="primary" @click="submitChanges">ارسال تغییرات</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      national_code: '',
      results: [],
      headers: [
        { text: 'نام', value: 'first_name' },
        { text: 'نام خانوادگی', value: 'last_name' },
        { text: 'کد ملی', value: 'national_code' },
        { text: 'واحد کاری', value: 'unit' },
        { text: 'تاریخ شروع کار', value: 'start_date' },
        { text: 'تاریخ ترک کار', value: 'end_date' },
        { text: 'وضعیت', value: 'status' },
      ],
    };
  },
  methods: {
    async search() {
      const params = {};

      if (this.first_name) {
        params.first_name = this.first_name;
      }
      if (this.last_name) {
        params.last_name = this.last_name;
      }
      if (this.national_code) {
        params.national_code = this.national_code;
      }

      try {
        const response = await this.$http.get('/get/personal/code', { params });

        if (Array.isArray(response.data)) {
          this.results = response.data;
          console.log()
        } else {
          console.error('Expected an array but got:', response.data);
          this.results = []; // reset if data is invalid
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.results = []; // reset on error
      }
    },

    async submitChanges() {
      try {
        await this.$http.post('/update/personal/code', { results: this.results });
        console.log('Changes submitted successfully');
      } catch (error) {
        console.error('Error in submitting changes:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
