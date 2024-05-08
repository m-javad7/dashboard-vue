<template>
    <v-snackbar
      :model-value="modelValue"
      @click:outside="hideSnackbar"
      @update:model-value="updateModelValue"
      :color="color"
      :timeout="timeout"
    >
      {{ message }}
    </v-snackbar>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Boolean,
        required: true,
      },
      color: String,
      message: String,
      timeout: {
        type: Number,
        default: 3000,
      },
    },
    methods: {
      hideSnackbar() {
        this.$emit("update:modelValue", false);
      },
      updateModelValue(value) {
        this.$emit("update:modelValue", value);
      },
    },
  };
  </script>
  