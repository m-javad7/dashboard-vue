<template>
    <v-form>
      <v-text-field
        v-model="searchQuery"
        label="جستجو بر اساس نام، نام خانوادگی یا کدملی"
      />
      <v-btn @click="search">جستجو</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      search() {
        this.$emit('search', this.searchQuery);
      },
    },
  };
  </script>
  