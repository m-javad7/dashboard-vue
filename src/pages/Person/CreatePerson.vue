<template>
  <div>
    <data-table @rowSelected="onRowSelected" />
    <edit-form v-if="selectedEmployee" :selectedEmployee="selectedEmployee" />
  </div>
</template>

<script>
import DataTable from '@/components/dataTable.vue';
import EditForm from '@/components/edit-Form.vue';
EditForm
export default {
  data() {
    return {
      selectedEmployee: null,
    };
  },
  components: {
    DataTable,
    EditForm,
  },
  methods: {
    onRowSelected(employee) {
      this.selectedEmployee = employee;
    },
  },
};
</script>
