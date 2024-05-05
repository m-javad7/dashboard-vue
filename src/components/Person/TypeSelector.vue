<template>
    <v-radio-group :value="value" row @change="onChange">
      <v-radio label="حقیقی" value="1" />
      <v-radio label="حقوقی" value="0" />
    </v-radio-group>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: String,
        required: true,
      },
    },
    computed: {
      value() {
        return this.modelValue; // بازگرداندن مقدار فعلی
      },
    },
    methods: {
      onChange(newValue) {
        this.$emit("update:modelValue", newValue); // رویداد به‌روزرسانی را ارسال می‌کند
      },
    },
  };
  </script>
  