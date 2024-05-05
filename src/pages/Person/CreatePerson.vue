<template>
  <v-container>
    <v-row>
      <v-radio-group v-model="type" row> <!-- تغییر به 'type' -->
        <v-radio label="حقیقی" value="1" />
        <v-radio label="حقوقی" value="0" />
      </v-radio-group>   
    </v-row>
    
      <NaturalPersonForm 
        v-if="type == '1'" 
        :person="naturalPerson"
      /> 
      
      <LegalEntityForm 
        v-else 
        :company="legalEntity"
      /> 
    
    <v-btn @click="handleSubmit" color="primary">ثبت</v-btn>

    <v-snackbar v-model="snackbar" :timeout="3000" bottom>
      {{ snackbarMessage }}
      <v-btn color="pink" @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'; // اضافه کردن axios
import NaturalPersonForm from '@/components/Person/NaturalPersonForm.vue';
import LegalEntityForm from '@/components/Person/LegalEntityForm.vue';

export default {
  components: {
    NaturalPersonForm,
    LegalEntityForm,
  },
  data() {
    return {
      type: '1', // تغییر به عدد
      naturalPerson: {
        first_name: '',
        last_name: '',
        national_code: '',
        id_number: '',
        date_of_birth: null,
        address: '',
        postal_code: '',
        phone_number: '',
        image: null,
        email: '',
      },
      legalEntity: {
        company_name: '',
        ceo_name: '',
        phone_number: '',
        company_contact_name: '',
        company_contact_phone: '',
        national_code: '',
        economic_code: '',
        registration_number: '',
        postal_code: '',
        address: '',
        date_of_establishment: null,
      },
      snackbar: false,
      snackbarMessage: '',
    };
  },

  methods: {
    handleSubmit() {
      let data;

      if (this.type == 1) { // تغییر به عدد
        data = {
          type: this.type,
          ...this.naturalPerson,
        };
      } else {
        data = {
          type: this.type,
          ...this.legalEntity,
        };
      }

      axios.post('/people', data)
      console.log(data)
        .then((response) => {
          this.snackbarMessage = 'اطلاعات با موفقیت ثبت شد';
          this.snackbar = true;
        })
        .catch((error) => {
          this.snackbarMessage = 'خطایی رخ داده است';
          this.snackbar = true;
        });
    },
  },
};
</script>
