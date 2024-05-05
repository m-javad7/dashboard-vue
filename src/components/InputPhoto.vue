<template>
  <v-container>
    <v-file-input
      v-model="fileList"
      :show-size="1000"
      label="بارگذاری عکس"
      prepend-icon=""
      prepend-inner-icon="$file"
      counter
      multiple
      @change="handleFileChange"
    >
      <template v-slot:selection="{ fileNames }">  <!-- برای نمایش فایل‌ها -->
        <template v-for="(fileName, index) in fileNames" :key="fileName">
          <v-chip
            v-if="index < 2"
            class="me-2"
            color="deep-purple-accent-4"
            size="small"
            label
          >
            {{ fileName }}
          </v-chip>
          <span
            v-else-if="index === 2"
            class="text-overline text-grey-darken-3 mx-2"
          >
            +{{ fileNames.length - 2 }} فایل(ها)
          </span>
        </template>
      </template>
    </v-file-input>

    <v-row >
      <v-col v-for="(preview, index) in filePreviews" :key="index" cols="6" md="4">
        <v-img :src="preview" :alt="'تصویر ' + (index + 1)" contain></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      filePreviews: [],
    };
  },
  methods: {
    handleFileChange() {
      // بازنشانی لیست پیش‌نمایش‌ها
      this.filePreviews = [];

      // ایجاد پیش‌نمایش برای هر فایل
      this.fileList.forEach((file) => {
        const fileURL = URL.createObjectURL(file);  // ساخت URL موقت برای فایل
        this.filePreviews.push(fileURL);
      });
    },
  },
};
</script>

<style scoped>
</style>
