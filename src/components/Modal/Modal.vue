<template>
    <v-dialog
      :value="localIsOpen" <!-- از متغیر داخلی استفاده کنید -->
      @input="handleDialogChange" <!-- رویداد برای به‌روزرسانی والد -->
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <v-card-text>
          <!-- فیلدها -->
          <v-form ref="editForm">
            <v-container>
              <v-row v-for="(field, index) in fields" :key="index">
                <v-col cols="12">
                  <v-text-field
                    v-model="field.value"
                    :label="field.label"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="handleSave">ذخیره</v-btn>
          <v-btn @click="handleClose">لغو</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        localIsOpen: this.isOpen, // متغیر داخلی
      };
    },
    watch: {
      isOpen(newVal) {
        this.localIsOpen = newVal; // تغییر وضعیت داخلی وقتی پروپ تغییر می‌کند
      },
    },
    methods: {
      handleDialogChange(val) {
        this.$emit('update:isOpen', val); // ارسال رویداد به والد
      },
      handleSave() {
        this.$emit('save', this.fields);
        this.handleDialogChange(false); // برای بستن مودال
      },
      handleClose() {
        this.handleDialogChange(false); // برای بستن مودال
      },
    },
  };
  </script>
  