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
        // اگر در حال ویرایش است، ذخیره کنید
        this.saveChanges(item); 
        this.editRow = null; // خروج از حالت ویرایش
      } else {
        // وارد حالت ویرایش شوید
        this.editRow = item;
      }
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
