<template>
  <v-container class="fill-height bg-blue d-flex justify-center align-center">
    <v-card class="text-center pa-4" max-width="400">
      <v-card-title>404 - صفحه یافت نشد</v-card-title>
      <v-card-text>
        متأسفانه، صفحه‌ای که به دنبال آن هستید یافت نشد.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" to="/">بازگشت به خانه</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.bg-blue{
  background-color: #0a2c6b;
}
.fill-height {
  height: 100vh;
}
</style>
