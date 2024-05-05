<template>

</template>

<script>
export default {
  created() {
    this.$http.get('/people')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
</script>

<style scoped>

</style>
