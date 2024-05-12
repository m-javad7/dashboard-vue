<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>لیست ایستگاه های کاری</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-snackbar v-model="deleteSnackbar.show" :color="deleteSnackbar.color" :timeout="10000" top>
      {{ deleteSnackbar.message }}
      <v-btn color="green" @click="confirmDelete">بله</v-btn>
      <v-btn color="white" @click="cancelDelete">خیر</v-btn>
    </v-snackbar>

    <v-card>
      <!-- <v-infinite-scroll :height="500" :items="workStation" :onLoad="loadMoreItems"> -->
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="font-weight-black">ردیف</th>
            <th class="font-weight-black">نام</th>
            <th class="font-weight-black">واحد مجری</th>
            <th class="font-weight-black">واحد بهره برداری</th>
            <th class="font-weight-black">دیدکاری</th>
            <th class="font-weight-black">جزییات سیستم</th>
            <th class="font-weight-black">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in system" :key="item.id" :class="{ 'edit-mode': isEditingRow(item) }">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field v-if="isEditingRow(item)" v-model="item.name" density="compact" />
              <span v-else>{{ item.name }}</span>
            </td>
            <td>
              <v-autocomplete v-if="isEditingRow(item)" v-model=item.executive_part.name :items="parts" item-title="name"
                item-value="id" density="compact" />
              <span v-else>{{ item.executive_part.name }}</span>
            </td>
            <td>
              <v-autocomplete v-if="isEditingRow(item)" v-model=item.operating_part.name :items="parts" item-title="name"
                item-value="id" density="compact" />
              <span v-else>{{ item.operating_part.name }}</span>
            </td>
            <td>
              <v-btn icon @click="openViewModal">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </td>
            <td>
              <v-btn icon  @click="viewDetails(item)">
                <v-icon>mdi-information</v-icon>
              </v-btn>
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
      <v-dialog v-model="viewModal" max-width="500">
        <v-card>
          <v-card-title>مشاهده دیدکاری</v-card-title>
            <!-- محتوای دیدکاری -->
            <v-table>
              <tbody>
          <tr v-for="(item, index) in process" :key="item.id" >
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            </tr>
            </tbody>
            </v-table>
          <v-card-actions>
            <v-btn color="primary" @click="closeViewModal">بستن</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- </v-infinite-scroll> -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
        {{ snackbar.message }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      viewModal: false,
      system: [],
      process: [],
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
      // limit: 5,
    };
  },

  mounted() {
    this.getSystem();
    this.getParts();
    this.getProcess();
  },

  methods: {
    getSystem() {
      this.$http.get('/systems')
        .then((response) => {
          console.log(response)
          this.system = response.data;
          console.log(this.system)
        })
    },
    getParts() {
      this.$http.get('/parts')
        .then(response => {
          this.parts = response.data
          console.log(this.parts)
        })
        .catch(error => {
          console.error('partsخطا هنگام دریافت داده', error);
        });
    },
    getProcess() {
      this.$http.get('/processes')
        .then((response) => {
          this.process = response.data;
          console.log(this.process)
        })
    },

    isEditingRow(item) {
      return this.editRow === item;
    },

    toggleEdit(item) {
      if (this.isEditingRow(item)) {
        this.save(item);
        this.editRow = null;
      } else {
        this.editRow = item;
      }
    },
    viewDetails(item) {
      // ارسال کاربر به صفحه جزییات با استفاده از روتر
      this.$router.push({path: `Production/system/details/${item.id}`});
    },
    save(item) {
      const url = `/workStation/${item.id}`;
      this.$http.put(url, item)
        .then((response) => {
          const index = this.workStation.findIndex((e) => e.id === item.id);
          if (index !== -1) {
            Object.assign(this.workStation[index], response.data.data);
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

      this.$http.delete(`/workStation/${this.itemToDelete.id}`)
        .then(() => {
          this.workStation = this.workStation.filter(loc => loc.id !== this.itemToDelete.id); // حذف آیتم
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

    openViewModal() {
      this.viewModal = true;
      this.getProcesses();
    },
    closeViewModal() {
      this.viewModal = false;
    },

  },
};
</script>
