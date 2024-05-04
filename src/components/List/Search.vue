<template>
    <v-text-field
      v-model="localQuery"
      label="جستجو"
      @input="updateQuery"
      clearable
      prepend-inner-icon="mdi-magnify"
            variant="solo"
           
            rounded
    />
  </template>
  
  <script>
  export default {
    props: {
      query: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localQuery: this.query, // مقدار جستجو برای بایندینگ دو طرفه
      };
    },
    methods: {
      updateQuery() {
        this.$emit('update:query', this.localQuery); // ارسال رویداد به کامپوننت والد
      },
    },
  };
  </script>
  