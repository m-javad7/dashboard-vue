<template>
  <v-container>
    <!-- فیلد ورودی برای واحد کاری -->
    <v-text-field
      v-model="name"
      label="واحد کاری"
      outlined
      dense
    ></v-text-field>
    <!-- فیلد ورودی برای توضیحات -->
    <v-text-field
      v-model="description"
      label="توضیحات"
      outlined
      dense
    ></v-text-field>
    <!-- دکمه برای ارسال داده‌ها -->
    <v-btn color="primary" @click="submit">ثبت واحد کاری</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',  // متغیر برای نگهداری مقدار "واحد کاری"
      description: '',  // متغیر برای نگهداری مقدار "توضیحات"
    };
  },
  methods: {
    submit() {
      // داده‌های موردنیاز برای ارسال به سرور
      const data = {
        name: this.name,
        description: this.description,
      };

      // ارسال داده‌ها به سرور با استفاده از POST
      this.$http.post('/parts', data)
        .then(response => {
          console.log('داده‌ها با موفقیت ارسال شدند:', response.data);
        })
        .catch(error => {
          console.error('خطا در ارسال داده‌ها:', error);
        });
    },
  },
};
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}
</style>
