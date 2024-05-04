<template>
  <v-data-table :headers="headers" :items="items">
    <!-- عملیات مرتبط با هر آیتم -->
    <template v-slot:item.actions="{ item }">
      <v-icon @click="$emit('edit', item)">mdi-pencil</v-icon> <!-- ارسال رویداد ویرایش -->
      <v-icon @click="$emit('delete', item)">mdi-delete</v-icon> <!-- ارسال رویداد حذف -->
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
