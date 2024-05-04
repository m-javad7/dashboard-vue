<template>
  <v-dialog
    :value="isOpen" 
    max-width="500px"
    @input="updateDialog"  
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <!-- محتویات فرم ویرایش -->
        <slot></slot>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" @click="$emit('cancel')">لغو</v-btn>
        <v-btn color="blue-darken-1" @click="$emit('save')">ذخیره</v-btn>
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
  },
  methods: {
    updateDialog(newValue) {
      this.$emit('update:isOpen', newValue); 
    },
  },
};
</script>
