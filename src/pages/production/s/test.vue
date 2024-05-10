<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>لیست موقعیت‌ها</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-snackbar v-model="deleteSnackbar.show" :color="deleteSnackbar.color" :timeout="10000" top>
      {{ deleteSnackbar.message }}
      <v-btn color="green" @click="confirmDelete">بله</v-btn>
      <v-btn color="white" @click="cancelDelete">خیر</v-btn>
    </v-snackbar>

    <v-card>
      <v-infinite-scroll :height="500" :items="locations" :onLoad="loadMoreItems">
        <v-table>
          <thead>
            <tr>
              <th>نام</th>
              <th>شرح</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in locations" :key="item.id" :class="{ 'edit-mode': isEditingRow(item) }">
              <td>
                <v-text-field v-if="isEditingRow(item)" v-model="item.name" density="compact" />
                <span v-else>{{ item.name }}</span>
              </td>
              <td>
                <v-text-field v-if="isEditingRow(item)" v-model="item.description" density="compact" />
                <span v-else>{{ item.description }}</span>
              </td>
              <td>
                <v-icon small @click="toggleEdit(item)" :color="isEditingRow(item) ? 'green' : 'primary'">
                  mdi-pencil
                  {{ isEditingRow(item) ? 'ثبت' : 'ویرایش' }}
                </v-icon>
                <v-icon small @click="requestDelete(item)" class="red--text">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-infinite-scroll>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
        {{ snackbar.message }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  meta: {
    layout: 'ProductLayout', // استفاده از لایوت سفارشی
  },
  data() {
    return {
      locations: [],
      editRow: null,
      snackbar: {
        show: false,
        color: '',
        message: '',
      },
      deleteSnackbar: {
        show: false,
        color: '',
        message: '',
      },
      limit: 5,
    };
  },

  mounted() {
    this.fetchLocations();
  },

  methods: {
    fetchLocations() {
      this.$http.get('/personnel')
        .then((response) => {
          this.locations = response.data;
        })
        .catch((error) => {
          this.showSnackbar('خطا در دریافت داده‌ها', 'red');
          console.error('خطا در دریافت داده‌ها:', error);
        });
    },

    isEditingRow(item) {
      return this.editRow === item; // بررسی اینکه آیا ردیف در حالت ویرایش است
    },

    toggleEdit(item) {
      if (this.isEditingRow(item)) {
        this.save(item); // اگر در حالت ویرایش است، ذخیره می‌شود
        this.editRow = null; // خروج از حالت ویرایش
      } else {
        this.editRow = item; // وارد حالت ویرایش شوید
      }
    },

    save(item) {
      const url = `/personnel/${item.id}`;
      this.$http.put(url, item)
        .then((response) => {
          const index = this.locations.findIndex((e) => e.id === item.id);
          if (index !== -1) {
            Object.assign(this.locations[index], response.data.data);
          }
          this.showSnackbar('تغییرات با موفقیت ذخیره شد', 'green');
        })
        .catch((error) => {
          this.showSnackbar('خطا در ذخیره‌سازی', 'red');
          console.error('خطا در ذخیره‌سازی:', error);
        });
    },

    requestDelete(item) {
      this.itemToDelete = item;
      this.deleteSnackbar = {
        show: true,
        color: 'red',
        message: 'آیا از حذف این آیتم مطمئن هستید؟',
      };
    },

    confirmDelete() {
      if (!this.itemToDelete) return;

      this.$http.delete(`/personnel/${this.itemToDelete.id}`)
        .then(() => {
          this.locations = this.locations.filter(loc => loc.id !== this.itemToDelete.id); // حذف آیتم
          this.showSnackbar('آیتم با موفقیت حذف شد', 'green');
          this.resetDeleteSnackbar();
        })
        .catch((error) => {
          this.showSnackbar('خطا در حذف آیتم', 'red');
          console.error('خطا در حذف:', error);
          this.resetDeleteSnackbar();
        });
    },

    cancelDelete() {
      this.resetDeleteSnackbar();
    },

    resetDeleteSnackbar() {
      this.deleteSnackbar.show = false;
      this.itemToDelete = null;
    },

    showSnackbar(message, color) {
      this.snackbar.show = true;
      this.snackbar.color = color;
      this.snackbar.message = message;
    },

    loadMoreItems({ done }) {
      this.$http.get('/personnel', {
        params: {
          offset: this.locations.length,
          limit: this.limit,
        },
      })
        .then((response) => {
          if (response.data.length > 0) {
            this.locations.push(...response.data); // افزودن داده‌های جدید
            done('ok'); // نشان‌دهنده موفقیت
          } else {
            done('done'); // نشان‌دهنده پایان داده‌ها
          }
        })
        .catch((error) => {
          this.showSnackbar('خطا در بارگذاری آیتم‌های بیشتر', 'red');
          done('error');
          console.error('خطا در بارگذاری آیتم‌های بیشتر:', error);
        });
    },
  },
};
</script>
