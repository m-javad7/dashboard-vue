<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>لیست اشخاص و شرکت‌ها</v-toolbar-title>
      <v-spacer></v-spacer>
      <SearchBar :query="searchQuery" @update:query="updateSearchQuery" class="mt-5 ml-2"/>
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
      item-value="id"
    >
      <!-- فیلد عملیات -->
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon> <!-- ویرایش -->
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon> <!-- حذف -->
      </template>
       <!-- نمایش نوع به عنوان حقیقی یا حقوقی -->
       <template v-slot:item.type="{ item }">
        {{ item.type ? 'حقیقی' : 'حقوقی' }}
      </template>
    </v-data-table>

    <!-- مودال ویرایش -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <!-- فرم برای افراد حقیقی -->
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
          label="تاریخ تولد"
          prepend-icon=""
          prepend-inner-icon="$calendar"
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
                <v-file-input
                 label="بار گذاری تصویر"
                 v-model="image"
                 ></v-file-input>
              </v-col>

              <!-- فرم برای شرکت‌ها -->
              <v-col v-else-if="editedItem.type === false" cols="12">
                <v-text-field
                  v-model="editedItem.company_name"
                  label="نام شرکت"
                />
                <v-text-field
                  v-model="editedItem.phone_number"
                  label="شماره تماس"
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
                  v-model="editedItem.id_national"
                  label="شناسه ملی"
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
                  v-model="editedItem.postal_code"
                  label="کدپستی"
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
  </div>
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
      searchQuery: '',
      headers: [
        { text: 'نام', value: 'first_name' },
        { text: 'نام خانوادگی', value: 'last_name' },
        { text: 'نوع', value: 'type' },
        { text: 'کد ملی', value: 'national_code' },
        { text: 'کد اقتصادی', value: 'economic_code' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      entities: [],
      editedIndex: -1,
      editedItem: {
        type: null, // نوع آیتم
        first_name: '',
        last_name: '',
        national_code: '',
        id_number: '',
        birth_date: '',
        address: '',
        postal_code: '',
        phone_number: '',
        image: [],
        // داده‌های برای فرد حقوقی
        company_name: '',
        id_national:'',
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
          item.first_name.toLowerCase().includes(query) ||
          item.last_name.toLowerCase().includes(query) ||
          (item.national_code && item.national_code.toLowerCase().includes(query))
        );
      });
    },
  },


  mounted() {
    this.$http.get('/people')
      .then((response) => {
        console.log(response)
        this.entities = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error('خطا در دریافت داده‌ها:', error);
        this.loading = false;
      });
  },

  methods: {
    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    },
    editItem(item) {
      this.editedIndex = this.entities.indexOf(item);
      this.editedItem = { ...item };  // کپی آیتم برای ویرایش
      this.dialog = true;
    },
    deleteItem(item) {
    // نمایش تاییدیه قبل از حذف
    const confirmDelete = confirm("آیا از حذف این آیتم مطمئن هستید؟");
    if (!confirmDelete) {
      return;
    }

    // ارسال درخواست DELETE
    this.$http.delete(`/people/${item.id}`)
      .then((response) => {
        // حذف آیتم از لیست
        const index = this.entities.indexOf(item);
        if (index !== -1) {
          this.entities.splice(index, 1);
        }
      })
      .catch((error) => {
        console.error('خطا در حذف آیتم:', error);
      });
  },

  save() {
  const url = `/parts/${this.editedItem.id}`;

  this.$http.put(url, this.editedItem)
    .then((response) => {
      Object.assign(this.parts[this.editedIndex], response.data); // به‌روزرسانی آیتم موجود
      this.dialog = false;
    })
    .catch((error) => {
      console.error('خطا در ویرایش آیتم:', error);
    });
},

closeDialog() {
  this.dialog = false; 
},


  },

};
</script>
