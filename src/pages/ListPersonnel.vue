<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.user="{ item }">
        <!-- دکمه‌ها در ستون یوزر -->
        <v-btn small color="primary" @click="Personnel(item)">پرسنل</v-btn>
        <v-btn small color="info" @click="Username(item)">نام کاربری</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'نام', value: 'firstName', sortable: true },
        { text: 'نام خانوادگی', value: 'lastName', sortable: true },
        { text: 'پرسنل', value: 'personnel', sortable: true },
        { text: 'یوزر', value: 'user', sortable: false }, // دکمه‌ها در این ستون
      ],
      items: [
        { id: 1, firstName: 'علی', lastName: 'رضایی', personnel: '123', user: 'ali.r' },
        { id: 2, firstName: 'نسرین', lastName: 'باقری', personnel: '456', user: 'nasrin.b' },
        { id: 3, firstName: 'مینا', lastName: 'کاظمی', personnel: '789', user: 'mina.k' },
        // سایر داده‌ها...
      ],
    };
  },
  methods: {
    Personnel(item) {
      // کد ویرایش یوزر
      console.log(`ویرایش یوزر: ${item.user}`);
    },
    Username(item) {
      // کد حذف یوزر
      console.log(`حذف یوزر: ${item.user}`);
    },
  },
};
</script>

<style scoped>
.v-data-table {
  background-color: white;
}
</style>
