<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>واحدهای کاری</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <!-- نشانگر لودینگ -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="blue"
      class="mx-auto my-6"
    />

    <!-- جدول داده‌ها -->
    <v-data-table
      v-else
      :headers="headers"
      :items="parts"
      item-value="id"
      class="elevation-1"
    >
      <!-- فیلد عملیات -->
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon> 
      </template>
    </v-data-table>

    <!-- مودال ویرایش -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="نام واحد کاری"
                />
                <v-text-field
                  v-model="editedItem.description"
                  label="توضیحات"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" @click="closeDialog">لغو</v-btn>
          <v-btn color="blue-darken-1" @click="save">ذخیره</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dialog: false,
      dialogTitle: '',
      headers: [
        { text: 'نام واحد کاری', value: 'name' },
        { text: 'توضیحات', value: 'description' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      parts: [], // آرایه برای ذخیره داده‌ها
      editedItem: {}, // آیتمی که در حال ویرایش است
      editedIndex: -1, // شاخص آیتمی که در حال ویرایش است
    };
  },

  mounted() {
    this.fetchparts();
  },

  methods: {
    fetchparts() {
      this.$http.get('/parts')
        .then((response) => {
          this.parts = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error('خطا در دریافت داده‌ها:', error);
          this.loading = false;
        });
    },

    editItem(item) {
      this.dialogTitle = 'ویرایش واحد کاری';
      this.editedItem = { ...item };
      this.editedIndex = this.parts.indexOf(item);
      this.dialog = true;
    },

    deleteItem(item) {
      const confirmDelete = confirm('آیا از حذف این آیتم مطمئن هستید؟');
      if (!confirmDelete) return;

      this.$http.delete(`/parts/${item.id}`)
        .then(() => {
          const index = this.parts.indexOf(item);
          if (index !== -1) {
            this.parts.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error('خطا در حذف آیتم:', error);
        });
    },

    closeDialog() {
      this.dialog = false;
    },

    save() {
      const method = this.editedIndex === -1 ? 'post' : 'put';
      const url = this.editedIndex === -1
        ? '/parts'  // برای آیتم جدید
        : `/parts/${this.editedItem.id}`;

      this.$http({
        method,
        url,
        data: this.editedItem,
      })
        .then((response) => {
          if (this.editedIndex === -1) {
            this.parts.push(response.data);
          } else {
            Object.assign(this.parts[this.editedIndex], response.data);
          }
          this.dialog = false;
        })
        .catch((error) => {
          console.error('خطا در ذخیره آیتم:', error);
        });
    },
  },
};
</script>

<style scoped>
.v-toolbar {
  padding: 10px;
}
</style>
