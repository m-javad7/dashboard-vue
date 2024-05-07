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
                    <tr v-for="item in filteredIndividualEntities" :key="item.id">
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
  import SearchBar from '@/components/SearchBar.vue';
  
  export default {
    components: {
      SearchBar,
    },
    data() {
      return {
        loading: true,
        dialog: false,
        selectedTab: 'individual', // مقدار پیش‌فرض برای تب اشخاص حقیقی
        entities: [],
        limit: 30, // تعداد اولیه آیتم‌ها
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
  
      editItem(item) {
        // ویرایش آیتم
      },
  
      deleteItem(item) {
        // حذف آیتم
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
  