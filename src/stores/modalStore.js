// stores/modalStore.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    isOpen: false, // حالت اولیه مودال
  }),
  actions: {
    openModal() {
      this.isOpen = true; // باز کردن مودال
    },
    closeModal() {
      this.isOpen = false; // بستن مودال
    },
  },
});
