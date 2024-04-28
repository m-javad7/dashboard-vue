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
          label="جستجوی پرسنل"
          @change="handleSearch"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>

    <!-- قسمت ورودی کد ملی و کد پرسنلی -->
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="nationalCode"
          label="کد ملی"
          outlined
          dense
          readonly
          model-value="13234434"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="personnelCode"
          label="کد پرسنلی"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- دکمه ثبت -->
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="submitForm">ثبت</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
   name: 'Register',
  data() {
    return {
      selectedPerson: null,
      nationalCode: "",
      personnelCode: "",
      personnelList: [
        { id: 1, name: "علی احمدی", nationalCode: "1234567890" },
        { id: 2, name: "مریم رضایی", nationalCode: "0987654321" },
      ],
    };
  },
  methods: {
    handleSearch(selected) {
      // پیدا کردن شخص بر اساس انتخاب
      const person = this.personnelList.find((p) => p.id === selected);
      if (person) {
        this.nationalCode = person.nationalCode; // پر کردن کد ملی
      }
    },
    submitForm() {
      // منطق ثبت داده‌ها
      console.log("اطلاعات ثبت شده:");
      console.log("کد ملی:", this.nationalCode);
      console.log("کد پرسنلی:", this.personnelCode);
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
