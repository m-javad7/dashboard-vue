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
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filteredIndividualEntities"
                    :key="item.id + (isEditingRow(item) ? '-edit' : '')" 
                    :class="{ 'edit-mode': isEditingRow(item) }"
                  >
                    <td>
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.first_name"
                        outlined
                        density="compact"
                      />
                      <span v-else>{{ item.first_name }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.last_name"
                        outlined
                        density="compact"
                      />
                      <span v-else>{{ item.last_name }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.national_code"
                        outlined
                        density="compact"
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
                      <v-btn
                        small
                        color="red"
                        @click="deleteItem(item)"
                      >
                        حذف
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
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredCompanyEntities" 
                  :key="item.id + (isEditingRow(item) ? '-edit' : '')" 
                    :class="{ 'edit-mode': isEditingRow(item) }"
                  >
                    <td >
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.first_name"
                        outlined
                        density="compact"
                      />
                      <span v-else>{{ item.first_name }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.last_name"
                        outlined
                        density="compact"
                      />
                      <span v-else>{{ item.last_name }}</span>
                    </td>
                    <td>
                      <v-text-field
                        v-if="isEditingRow(item)"
                        v-model="item.national_code"
                        outlined
                        density="compact"
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
                      <v-btn
                        small
                        color="red"
                        @click="deleteItem(item)"
                      >
                        حذف
                      </v-btn>
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
      editRow: null, // برای ردیف در حالت ویرایش

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
    isEditingRow(item) {
      return this.editRow === item;
    },

    toggleEdit(item) {
      if (this.isEditingRow(item)) {
        // اگر در حالت ویرایش است، ذخیره کنید
        this.saveChanges(item);
        this.editRow = null; // خروج از حالت ویرایش
      } else {
        // وارد حالت ویرایش شوید
        this.editRow = item;
      }
    },

    saveChanges(item) {
      const url = `/people/${item.id}`; // آدرس API برای بروزرسانی

      this.$http.put(url, item) // درخواست PUT برای بروزرسانی
        .then((response) => {
          const index = this.entities.findIndex((e) => e.id === item.id);
          if (index !== -1) {
            Object.assign(this.entities[index], response.data); // بروزرسانی آیتم در آرایه
          }
        })
        .catch((error) => {
          console.error('خطا در بروزرسانی آیتم:', error); // مدیریت خطا
        });
    },
  },
  deleteItem(item) {
      const confirmDelete = confirm("آیا از حذف این آیتم مطمئن هستید؟");
      if (!confirmDelete) return; // اگر تأیید نشد، خروج

      const url = `/people/${item.id}`; // آدرس API برای حذف

      this.$http.delete(url) // درخواست DELETE برای حذف
        .then(() => {
          const index = this.entities.findIndex((e) => e.id === item.id);
          if (index !== -1) {
            this.entities.splice(index, 1); // حذف آیتم از آرایه
          }
        })
        .catch((error) => {
          console.error('خطا در حذف آیتم:', error); // مدیریت خطا
        });
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
  };
</script>
<style scoped>
</style>
