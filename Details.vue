<template>
  <div>
    <h1>جزییات آیتم با شناسه: {{ $route.params.id }}</h1>
    <!-- اطلاعات جزییات آیتم را اینجا نمایش دهید -->
  </div>
</template>

<script>
export default {
  props: {
    // دریافت شناسه آیتم از روتر
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // اینجا می‌توانید اطلاعات مربوط به آیتم با استفاده از شناسه دریافتی بارگیری کنید
    console.log('شناسه آیتم:', this.id);
  },
};
</script>
