<template>
  <v-container>
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-text-field
        label="کد ملی"
        v-model="nationalCode"
        readonly
      ></v-text-field>

      <v-text-field
        label="نام پرسنل"
        v-model="employeeName"
        readonly
      ></v-text-field>

      <v-text-field
        label="یوزر"
        v-model="username"
        :rules="[required]"
        hint="لطفاً یوزر خود را وارد کنید"
        persistent-hint
      ></v-text-field>

      <v-btn color="primary" type="submit">ثبت</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      nationalCode: "1234567890", 
      employeeName: "محمد جواد ",
      username: "",
    };
  },
  methods: {
    required(value) {
      return value ? true : "این فیلد باید پر شود";
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        // منطقی برای ارسال فرم یا انجام کاری دیگر
        console.log("فرم معتبر است و ارسال شد", {
          nationalCode: this.nationalCode,
          employeeName: this.employeeName,
          username: this.username,
        });
      } else {
        console.log("فرم نامعتبر است");
      }
    },
  },
};
</script>

<style scoped>
/* استایل‌های اضافی در صورت نیاز */
</style>
