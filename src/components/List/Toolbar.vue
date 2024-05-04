<template>
    <v-toolbar flat>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot></slot> <!-- برای اضافه کردن عناصر بیشتر -->
    </v-toolbar>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .v-toolbar {
    background-color: #f5f5f5;
  }
  </style>
  