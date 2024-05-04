<template>
    <div>
      <v-toolbar flat>
        <v-toolbar-title>لیست اشخاص</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
  
      <v-data-table
        :headers="headers"
        :items="entities"
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
            <span class="text-h5">ویرایش اطلاعات</span>
          </v-card-title>
  
          <v-card-text>
            <!-- فرم ویرایش -->
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editedItem.firstname" label="نام"></v-text-field>
                  <v-text-field v-model="editedItem.lastname" label="نام خانوادگی"></v-text-field>
                  <v-text-field v-model="editedItem.national_id" label="کد ملی"></v-text-field>
                  <v-text-field v-model="editedItem.employee_code" label="کد پرسنلی"></v-text-field>
                  <v-text-field v-model="editedItem.username" label="یوزرنیم"></v-text-field>
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
  export default {
    data() {
      return {
        dialog: false, // وضعیت مودال
        headers: [
          { text: 'نام', value: 'firstname' },
          { text: 'نام خانوادگی', value: 'lastname' },
          { text: 'کد ملی', value: 'national_id' },
          { text: 'عملیات', value: 'actions', sortable: false },
        ],
        entities: [
          {
            firstname: 'محمد',
            lastname: 'رضایی',
            national_id: '1234567890',
            employee_code: '001',
            username: 'mohammad.rz',
          },
          {
            firstname: 'زهرا',
            lastname: 'احمدی',
            national_id: '0987654321',
            employee_code: '002',
            username: 'zahra.ahmadi',
          },
        ],
        editedIndex: -1,
        editedItem: {
          firstname: '',
          lastname: '',
          national_id: '',
          employee_code: '',
          username: '',
        },
      };
    },
  
    methods: {
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
        this.dialog = false;  // بستن مودال
      },
      save() {
        if (this.editedIndex === -1) {
          // افزودن آیتم جدید
          this.entities.push(this.editedItem);
        } else {
          // ویرایش آیتم موجود
          Object.assign(this.entities[this.editedIndex], this.editedItem);
        }
        this.closeDialog(); // بستن مودال
      },
    },
  };
  </script>
  
  <style scoped>
  .v-toolbar {
    background-color: #f5f5f5;
  }
  </style>
  