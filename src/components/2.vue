<template>
    <v-container>
      <v-card>
        <!-- تب‌های اصلی -->
        <v-tabs
          v-model="selectedTab"
          color="primary"
        >
          <v-tab value="individual">اشخاص حقیقی</v-tab>
          <v-tab value="company">اشخاص حقوقی</v-tab>
        </v-tabs>
  
        <!-- محتوا بر اساس تب انتخاب‌شده -->
        <v-card-text>
          <!-- افزونه اسکرول بی‌نهایت برای تب انتخاب‌شده -->
          <v-infinite-scroll
            :height="500"
            :items="filteredEntities"
            :onLoad="loadMoreItems"
          >
            <!-- تب اشخاص حقیقی -->
            <v-tabs-window v-model="selectedTab">
              <v-tabs-window-item value="individual">
                <v-table>
                  <thead>
                    <tr>
                      <th>نام</th>
                      <th>نام خانوادگی</th>
                      <th>کد ملی</th>
                      <th>نوع</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in filteredIndividualEntities"
                      :key="item.id + (isEditingRow(item) ? '-edit' : '')" 
                      :class="{ 'edit-mode': isEditingRow(item) }"
                    >
                      <!-- سلول‌های ویرایش‌پذیر -->
                      <td>
                        <v-text-field
                          v-if="isEditingRow(item)"
                          v-model="item.first_name"
                        />
                        <span v-else>{{ item.first_name }}</span>
                      </td>
                      <td>
                        <v-text-field
                          v-if="isEditingRow(item)"
                          v-model="item.last_name"
                        />
                        <span v-else>{{ item.last_name }}</span>
                      </td>
                      <td>
                        <v-text-field
                          v-if="isEditingRow(item)"
                          v-model="item.national_code"
                        />
                        <span v-else>{{ item.national_code }}</span>
                      </td>
                      <td>
                        <v-btn
                          small
                          @click="toggleEdit(item)"
                          :color="isEditingRow(item) ? 'green' : 'primary'"
                        >
                          {{ isEditingRow(item) ? 'ثبت' : 'ویرایش' }}
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
  
              <!-- تب اشخاص حقوقی -->
              <v-tabs-window-item value="company">
                <v-table>
                  <thead>
                    <tr>
                      <th>نام شرکت</th>
                      <th>کد اقتصادی</th>
                      <th>مدیرعامل</th>
                      <th>نوع</th>
                      <th>عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredCompanyEntities" :key="item.id">
                      <td>{{ item.first_name }}</td>
                      <td>{{ item.last_name }}</td>
                      <td>{{ item.national_code }}</td>
                      <td>{{ item.type ? 'حقیقی' : 'حقوقی' }}</td> 
                      <td>
                        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-infinite-scroll>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // حالت ویرایش اضافه شده
        editMode: null, 
        editText: '', 
        selectedTab: 'individual',
        entities: [],
      };
    },
  
    computed: {
      filteredIndividualEntities() {
        return this.entities.filter((item) => item.type === true);
      },
  
      filteredCompanyEntities() {
        return this.entities.filter((item) => item.type === false);
      },
  
      filteredEntities() {
        return this.selectedTab === 'individual'
          ? this.filteredIndividualEntities
          : this.filteredCompanyEntities;
      },
    },
    mounted() {
      this.fetchEntities(); // واکشی داده‌ها هنگام نصب کامپوننت
    },
  
    methods: {
      fetchEntities() {
        this.$http
          .get('/person', { params: { limit: this.limit } })
          .then((response) => {
            this.entities = Array.isArray(response.data) ? response.data : [];
            this.loading = false;
          })
          .catch((error) => {
            console.error('خطا در دریافت داده‌ها:', error);
          });
      },
      isEditingRow(item) {
        return this.editRow === item; // بررسی اینکه آیا این ردیف در حالت ویرایش‌پذیر است
      },
  
      toggleEdit(item) {
        if (this.editRow === item) {
          // اگر در حال ویرایش است، ذخیره کنید
          this.saveChanges(item); 
          this.editRow = null; // خروج از حالت ویرایش
        } else {
          // در غیر این صورت، وارد حالت ویرایش شوید
          this.editRow = item;
        }
      },
  
      editCell(field, item) {
        this.editMode = { item, field };
        this.editText = item[field]; // مقدار اولیه برای فیلد ویرایش‌پذیر
      },
      editCell(field, item) {
        // تنظیم حالت ویرایش و مقدار اولیه
        this.editMode = { item, field };
        this.editText = item[field];
        // اطمینان از رندر مجدد
        this.$forceUpdate(); 
      },
  
      isEditing(item, field) {
        return this.editMode && this.editMode.item === item && this.editMode.field === field;
      },
  
      saveCell(field, item) {
        // ذخیره تغییرات و بازگشت به حالت معمولی
        item[field] = this.editText;
        this.editMode = null;
      },
      editItem(item) {
        // ویرایش آیتم
      },
  
      deleteItem(item) {
        // حذف آیتم
      },
      isEditingRow(item) {
        return this.editRow === item;
      },
  
      toggleEdit(item) {
        if (this.isEditingRow(item)) {
          // اگر در حالت ویرایش است، ذخیره کنید
          this.saveChanges(item); 
          this.editRow = null; // خروج از حالت ویرایش
        } else {
          // در غیر این صورت، وارد حالت ویرایش شوید
          this.editRow = item;
        }
      },
  
      async loadMoreItems({ done }) {
        try {
          const newItems = await this.$http.get('/person', {
            params: {
              offset: this.entities.length,
              limit: 10,
            },
          });
  
          if (newItems && newItems.data.length > 0) {
            this.entities.push(...newItems.data);
            done('ok');
          } else {
            done('done'); // نشان می‌دهد که تمام آیتم‌ها بارگذاری شده‌اند
          }
        } catch (error) {
          console.error('خطا در بارگذاری آیتم‌های بیشتر:', error);
          done('error');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-toolbar {
    padding: 16px; /* مثال */
  }
  </style>
  