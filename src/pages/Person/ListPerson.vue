<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>لیست اشخاص و شرکت‌ها</v-toolbar-title>
      <v-spacer></v-spacer>
      <SearchBar :query="searchQuery" @update:query="updateSearchQuery" class="mt-5 ml-2" />
    </v-toolbar>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="blue"
      class="mx-auto my-6"
    />

    <v-data-table
      v-else
      :headers="headers"
      :items="filteredEntities"
      item-value="id"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.type="{ item }">
        {{ item.type ? 'حقوقی' : 'حقیقی' }}
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ dialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col v-if="editedItem.type === true" cols="12">
                <v-text-field
                  v-model="editedItem.first_name"
                  label="نام"
                />
                <v-text-field
                  v-model="editedItem.last_name"
                  label="نام خانوادگی"
                />
                <v-text-field
                  v-model="editedItem.national_code"
                  label="کد ملی"
                />
                <v-text-field
                  v-model="editedItem.id_number"
                  label="شماره شناسنامه"
                />
                <v-date-input
                  v-model="editedItem.birth_date"
                  label="تاریخ تولد"
                />
                <v-text-field
                  v-model="editedItem.address"
                  label="آدرس"
                />
                <v-text-field
                  v-model="editedItem.postal_code"
                  label="کدپستی"
                />
                <v-text-field
                  v-model="editedItem.phone_number"
                  label="موبایل"
                />
              </v-col>

              <v-col v-else-if="editedItem.type === false" cols="12">
                <v-text-field
                  v-model="editedItem.company_name"
                  label="نام شرکت"
                />
                <v-text-field
                  v-model="editedItem.ceo_name"
                  label="نام مدیرعامل"
                />
                <v-text-field
                  v-model="editedItem.company_contact_name"
                  label="نام رابط شرکت"
                />
                <v-text-field
                  v-model="editedItem.company_contact_phone"
                  label="تلفن رابط شرکت"
                />
                <v-text-field
                  v-model="editedItem.economic_code"
                  label="کد اقتصادی"
                />
                <v-text-field
                  v-model="editedItem.registration_number"
                  label="شماره ثبت شرکت"
                />
                <v-text-field
                  v-model="editedItem.date_of_establishment"
                  label="تاریخ تاسیس"
                />
                <v-text-field
                  v-model="editedItem.address"
                  label="آدرس"
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
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      loading: true,
      dialog: false,
      dialogTitle: '',
      searchQuery: '',
      headers: [
        { text: 'ردیف', value: 'id' },
        { text: 'نام', value: 'first_name' },
        { text: 'نام خانوادگی', value: 'last_name' },
        { text: 'نوع', value: 'type' },
        { text: 'کد ملی', value: 'national_code' },
        { text: 'کد اقتصادی', value: 'economic_code' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      entities: [], // آرایه برای ذخیره داده‌ها
      editedIndex: -1, // شاخص آیتم در حال ویرایش
      editedItem: {
        type: null, // نوع آیتم (حقیقی یا حقوقی)
        id: '',
        first_name: '',
        last_name: '',
        national_code: '',
        id_number: '',
        birth_date: '',
        address: '',
        postal_code: '',
        phone_number: '',
        // برای شرکت‌ها
        company_name: '',
        ceo_name: '',
        company_contact_name: '',
        company_contact_phone: '',
        economic_code: '',
        registration_number: '',
        date_of_establishment: '',
      },
    };
  },

  computed: {
    filteredEntities() {
      const query = this.searchQuery.toLowerCase();
      return this.entities.filter((item) => {
        return (
          (item.first_name?.toLowerCase().includes(query)) ||
          (item.last_name?.toLowerCase().includes(query)) ||
          (item.national_code?.toLowerCase().includes(query))
        );
      });
    },
  },

  mounted() {
    this.fetchEntities(); // واکشی داده‌ها هنگام نصب کامپوننت
  },

  methods: {
    fetchEntities() {
      this.$http.get('/people') // درخواست داده‌ها از سرور
        .then((response) => {
          this.entities = Array.isArray(response.data.data) ? response.data.data : [];
          this.loading = false;
        })
        .catch((error) => {
          console.error('خطا در دریافت داده‌ها:', error);
          this.loading = false;
          this.entities = []; // توقف لودینگ و مقداردهی آرایه خالی در صورت خطا
        });
    },

    editItem(item) {
      this.$http.get(`/people/${item.id}`) // دریافت داده‌های آیتم برای ویرایش
        .then((response) => {
          this.editedItem = response.data; // داده‌های دریافت‌شده را در ویرایش قرار دهید
          this.dialogTitle = 'ویرایش'; // عنوان مودال
          this.dialog = true; // باز کردن مودال
        })
        .catch((error) => {
          console.error('خطا در دریافت داده‌ها:', error);
        });
    },

    deleteItem(item) {
      const confirmDelete = confirm("آیا از حذف این آیتم مطمئن هستید؟");
      if (!confirmDelete) return;

      this.$http.delete(`/people/${item.id}`) // درخواست حذف به سرور
        .then(() => {
          const index = this.entities.indexOf(item);
          if (index !== -1) {
            this.entities.splice(index, 1); // حذف آیتم از آرایه
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
  if (this.editedItem && this.editedItem.id) {
    const url = `/people/${this.editedItem.id}`; // آدرس برای ویرایش آیتم موجود

    this.$http.put(url, this.editedItem) // ارسال درخواست PUT برای ویرایش
      .then((response) => {
        Object.assign(this.entities[this.editedIndex], response.data); // به‌روزرسانی آیتم موجود
        this.dialog = false; // بستن مودال
      })
      .catch((error) => {
        console.error('خطا در ویرایش آیتم:', error); // مدیریت خطا
      });
  } else {
    console.error('آیتم یا شناسه آن معتبر نیست'); // مدیریت خطای ناشی از آیتم نامعتبر
  }
}

  },
};
</script>

<style scoped>
.v-toolbar {
  padding:
 }
 </style>
