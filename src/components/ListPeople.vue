<template>
    <v-data-table
      :headers="headers"
      :items="entities"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>لیست اشخاص و شرکت‌ها</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="openDialog">افزودن جدید</v-btn>
  
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.type"
                        :items="['حقیقی', 'حقوقی']"
                        label="نوع"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" v-if="editedItem.type === 'حقیقی'">
                      <v-text-field v-model="editedItem.name" label="نام"></v-text-field>
                      <v-text-field v-model="editedItem.lname" label="نام خانوادگی"></v-text-field>
                      <v-text-field v-model="editedItem.national_id" label="کد ملی"></v-text-field>
                      <v-text-field v-model="editedItem.birth_date" label="تاریخ تولد"></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="editedItem.type === 'حقوقی'">
                      <v-text-field v-model="editedItem.company_name" label="نام شرکت"></v-text-field>
                      <v-text-field v-model="editedItem.registration_number" label="شماره ثبت"></v-text-field>
                      <v-text-field v-model="editedItem.tax_id" label="کد اقتصادی"></v-text-field>
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: false,
        headers: [
          { title: 'نام', key: 'name' },
          { title: 'نوع', key: 'type' },
          { title: 'عملیات', key: 'actions', sortable: false },
        ],
        entities: [],
        editedIndex: -1,
        editedItem: {
          type: '',
          name: '',
          lname: '',
          national_id: '',
          birth_date: '',
          company_name: '',
          registration_number: '',
          tax_id: '',
        },
        defaultItem: {
          type: '',
          name: '',
          lname: '',
          national_id: '',
          birth_date: '',
          company_name: '',
          registration_number: '',
          tax_id: '',
        },
      };
    },
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'افزودن جدید' : 'ویرایش'
      },
    },
  
    methods: {
      openDialog() {
        this.dialog = true;
        this.editedItem = { ...this.defaultItem };
      },
      closeDialog() {
        this.dialog = false;
      },
      save() {
        if (this.editedIndex === -1) {
          this.entities.push(this.editedItem);
        } else {
          Object.assign(this.entities[this.editedIndex], this.editedItem);
        }
        this.closeDialog();
      },
      editItem(item) {
        this.editedIndex = this.entities.indexOf(item);
        this.editedItem = { ...item };
        this.dialog = true;
      },
      deleteItem(item) {
        this.editedIndex = this.entities.indexOf(item);
        this.entities.splice(this.editedIndex, 1);
      },
    },
  };
  </script>
  