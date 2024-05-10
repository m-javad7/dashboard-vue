<template>
    <v-table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <slot :item="item"></slot> <!-- استفاده از scoped slot -->
        </tr>
      </tbody>
    </v-table>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      headers: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  