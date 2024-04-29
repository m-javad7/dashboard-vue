<template>
  <v-container>
    <!-- گروه رادیوباکس برای انتخاب حقیقی یا حقوقی -->
    <v-radio-group
      v-model="entityType"
      row
    >
      <v-radio
        label="حقیقی"
        value="حقیقی"
        color="primary"
      />
      <v-radio
        label="حقوقی"
        value="حقوقی"
        color="primary"
      />
    </v-radio-group>

    <!-- ورودی‌های برای فرد حقیقی -->
    <v-row v-if="entityType === 'حقیقی'">
      <v-col cols="12" md="6">
        <v-text-field
          label="نام"
          v-model="firstName"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="نام خانوادگی"
          v-model="lastName"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="کد ملی"
          v-model="nationalCode"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="تاریخ تولد"
          v-model="age"
        />
      </v-col>
    </v-row>

    <!-- ورودی‌ها برای شرکت حقوقی -->
    <v-row v-if="entityType === 'حقوقی'">
      <v-col cols="8">
        <v-text-field
          label="نام شرکت"
          v-model="companyName"
        />
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="شناسه ملی"
          v-model="economicIdentifier"
        />
      </v-col>
      <v-col cols="8">
        <v-text-field
          label="شناسه اقتصادی"
          v-model="economicIdentifier"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      entityType: 'حقیقی', // مقدار اولیه
      firstName: '',
      lastName: '',
      nationalCode: '',
      companyName: '',
      economicIdentifier: '',
    };
  },
};
</script>

<style scoped>
</style>
