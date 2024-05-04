<template>
  <v-container>
    <!-- قسمت جستجو -->
    <v-row>
      <v-col cols="12">
        <v-autocomplete
          v-model="selectedPerson"
          :items="personnelList"
          item-text="name"
          item-value="id"
          label="🔎جستجوی پرسنل"
          @change="handleSearch"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>

    <!-- قسمت ورودی کد ملی و کد پرسنلی -->
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="nationalCode"
          label="کد ملی"
          outlined
          dense
          readonly
          model-value="13234434"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="personnelCode"
          label="کد پرسنلی"
          outlined
          dense
        :rules="[required]"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="submitForm">ثبت</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedPerson: null,
      personnelList: [], // لیست پرسنل
      nationalCode: '', // کد ملی
      personnelCode: '', // کد پرسنلی
    };
  },
  methods: {
    handleSearch(value) {
      console.log(`جستجو برای: ${value}`);
    },
    submitForm() {
      console.log('فرم ثبت شد');
    },
    required(value) {
      return value ? true : "کد پرسنلی اختصاص داده نشده!";
    },
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
