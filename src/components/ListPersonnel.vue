<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>لیست اشخاص و شرکت‌ها</v-toolbar-title>
      <v-spacer></v-spacer>
      <SearchBar :query="searchQuery" class="mt-6 ml-2" @update:query="updateSearchQuery" />
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
      :items="filteredEntities"
    >
      <!-- فیلد عملیات -->
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon> <!-- ویرایش -->
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon> <!-- حذف -->
      </template>
    </v-data-table>

    <!-- مودال ویرایش -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <!-- محتویات فرم ویرایش -->
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name.firstname"
                  label="نام"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.name.lastname"
                  label="نام خانوادگی"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.national_id"
                  label="کد ملی"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.birth_date"
                  label="تاریخ تولد"
                ></v-text-field>
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
  </div>
</template>

<script>
import SearchBar from './List/Search.vue'; // کامپوننت جستجو

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      loading: true, // وضعیت لودینگ
      dialog: false,
      searchQuery: '',
      headers: [
        { text: 'نام', value: 'name.firstname' },
        { text: 'نام خانوادگی', value: 'name.lastname' },
        { text: 'کد ملی', value: 'national_id' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      entities: [],
      editedIndex: -1,
      editedItem: {
        firstname: '',
        lastname: '',
        national_id: '',
        birth_date: '',
      },
      defaultItem: {
        firstname: '',
        lastname: '',
        national_id: '',
        birth_date: '',
      },
    };
  },

  computed: {
    filteredEntities() {
      const query = this.searchQuery.toLowerCase();
      return this.entities.filter((item) => {
        return (
          item.name.firstname.toLowerCase().includes(query) ||
          item.name.lastname.toLowerCase().includes(query) ||
          (item.national_id && item.national_id.toLowerCase().includes(query))
        );
      });
    },
  },

  methods: {
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery; // به‌روزرسانی مقدار جستجو
    },
    editItem(item) {
      this.editedIndex = this.entities.indexOf(item); // موقعیت آیتم
      this.editedItem = { ...item };  // کپی آیتم برای ویرایش
      this.dialog = true; // باز کردن مودال
    },
    deleteItem(item) {
      const index = this.entities.indexOf(item);
      if (index !== -1) {
        this.entities.splice(index, 1);  // حذف آیتم
      }
    },
    closeDialog() {
      this.dialog = false; // بستن مودال
    },
    save() {
      if (this.editedIndex === -1) {
        this.entities.push(this.editedItem); // افزودن آیتم جدید
      } else {
        Object.assign(this.entities[this.editedIndex], این.editedItem); // ویرایش آیتم موجود
      }
      this.closeDialog(); // بستن مودال
    },
  },

  mounted() {
    // دریافت داده‌ها از API
    fetch('https://fakestoreapi.com/users')
      .then((res) => res.json())
      .then((json) => {
        this.entities = json; // بارگذاری داده‌ها
        this.loading = false; // توقف لودینگ
      })
      .catch((error) => {
        console.error('Error fetching data:', error);  // مدیریت خطا
        this.loading = false; // توقف لودینگ حتی در صورت خطا
      });
  },
};
</script>

<style scoped>
.v-toolbar {
  background-color: #f5f5f5;
}
</style>
