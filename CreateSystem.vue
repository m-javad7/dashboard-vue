<template>
  <v-container>
    <v-form ref="form">
      <v-row>

        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" :rules="[v => !!v || 'نام را وارد کنید']" label="نام سیستم"
            required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">

          <v-text-field v-model="form.description" label="توضیحات سیستم" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">

          <v-select v-model="form.executivePart_id" :items="parts" item-title="name" item-value="id"
            label="واحد مجری"></v-select>
        </v-col>
        <v-col cols="12" md="6">

          <v-select v-model="form.operatingPart_id" :items="parts" item-title="name" item-value="id"
            label="واحد بهره برداری"></v-select>
        </v-col>
      </v-row>
      <v-btn @click="save" color="primary">
        ثبت
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        executivePart_id: null,
        operatingPart_id: null,
      },
      parts: [],
      location: [],
      snackbar: {
        show: false,
        color: '',
        message: '',
      },
    };
  },
  mounted() {
    this.getParts();
  },

  methods: {
    getParts() {
      this.$http.get('/parts')
        .then(response => {
          this.parts = response.data
          console.log(this.parts)
        })
        .catch(error => {
          console.error('partsخطا هنگام دریافت داده', error);
        });
    },

    save() {
      this.$http.post('/systems', this.form)
        .then(response => {
          this.form.name = null;
          this.form.description = null;
          this.showSnackbar('داده ها با موفقیت ذخیره شد', 'green');
        })
        .catch(error => {
          console.error('خطا هنگام ارسال داده', error);
          this.showSnackbar('خطا هنگام ارسال داده‌ها', 'red');
        });
    },
    showSnackbar(message, color) {
      this.snackbar.show = true;
      this.snackbar.color = color;
      this.snackbar.message = message;
    },
  },
};
</script>

<style scoped>
/* سبک‌های دلخواه خود را اضافه کنید */
</style>
