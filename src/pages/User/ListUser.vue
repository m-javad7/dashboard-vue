<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>لیست کاربران</v-toolbar-title>
      <v-spacer></v-spacer>
      <SearchBar :query="searchQuery" @update:query="updateSearchQuery" class="mt-5 ml-2" />
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
      :items="filteredUsers"
      item-value="id"
    >
      <!-- فیلد عملیات -->
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editUser(item)">mdi-pencil</v-icon> <!-- ویرایش -->
        <v-icon @click="deleteUser(item)">mdi-delete</v-icon> <!-- حذف -->
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
              <v-col cols="12">
                <v-text-field v-model="editedUser.username" label="نام کاربری" />
                <v-text-field
                  v-model="editedUser.password"
                  label="رمز عبور"
                  type="password"
                  @click:append="togglePasswordVisibility"
                  :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
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
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import {api} from '@/config/api'

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      loading: true,
      dialog: false,
      passwordVisible: false,
      searchQuery: '',
      formTitle: 'ویرایش یا افزودن کاربر',
      headers: [
        { text: 'نام کاربری', value: 'username' },
        { text: 'رمز عبور', value: 'password' },
        { text: 'عملیات', value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedUser: {
        username: '',
        password: '',
      },
    };
  },

  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter((user) => {
        return (
          user.username.toLowerCase().includes(query)
        );
      });
    },
  },

  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    updateSearchQuery(newQuery) {
      this.searchQuery = newQuery;
    },

    editUser(user) {
      this.editedIndex = this.users.indexOf(user);
      this.editedUser = { ...user };
      this.dialog = true;
    },

    deleteUser(user) {
      const confirmDelete = confirm("آیا از حذف این کاربر مطمئن هستید؟");
      if (!confirmDelete) {
        return;
      }

      axios
      this.$http.delete(`/users/${user.id}`)
        .then((response) => {
          const index = this.users.indexOf(user);
          if (index !== -1) {
            this.users.splice(index, 1);
          }
        })
        .catch((error) => {
          console.error('خطا در حذف کاربر:', error);
        });
    },

    closeDialog() {
      this.dialog = false;
    },

    save() {
      const url = this.editedIndex === -1
  ? this.$http+'/users'
  : this.$http+`/users/${this.editedUser.id}`;

      const method = this.editedIndex === -1 ? 'post' : 'put';

      axios({
        method,
        url,
        data: this.editedUser,
      })
      .then((response) => {
        if (this.editedIndex === -1) {
          this.users.push(response.data);
        } else {
          Object.assign(this.users[this.editedIndex], response.data);
        }
        this.dialog = false;
      })
      .catch((error) => {
        console.error('خطا در ذخیره کاربر:', error);
      });
    },
  },

  mounted() {
    this.$http.get('/users')
      .then((response) => {
        this.users = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error('خطا در دریافت داده‌ها:', error);
        this.loading = false;
      });
  },
};
</script>
