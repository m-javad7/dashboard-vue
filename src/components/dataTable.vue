<template>
    <div>
      <search-form @search="fetchData" />
      <v-data-table
        :headers="headers"
        :items="data"
        @click:row="selectRow"
      />
    </div>
  </template>
  
  <script>
  import Searchform from './searchform.vue';
  Searchform
  export default {
    data() {
      return {
        headers: [
          { text: 'نام', value: 'firstName' },
          { text: 'نام خانوادگی', value: 'lastName' },
          { text: 'کدملی', value: 'nationalCode' },
        ],
        data: [],
      };
    },
    components: {
      SearchForm,
    },
    methods: {
      async fetchData(query) {
        // Fetch data from database based on query
        // This is just a sample, replace with actual data fetching logic
        this.data = [
          { id: 1, firstName: 'علی', lastName: 'احمدی', nationalCode: '12345' },
          { id: 2, firstName: 'مریم', lastName: 'کریمی', nationalCode: '67890' },
        ];
      },
      selectRow(item) {
        this.$emit('rowSelected', item);
      },
    },
  };
  </script>
  