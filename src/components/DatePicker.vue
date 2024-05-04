<template>
  <v-text-field
            label="Data di nascita"
            color="primary"
            persistentPlaceholder
          >
            <template #append-inner>
              <v-btn icon flat
                ><v-icon>mdi-calendar</v-icon>
                <v-menu activator="parent">
                  <v-date-picker
                    color="primary"
                    hideHeader
                    hideWeekdays
                    v-model="birthDate"

                  >
                  </v-date-picker>
                </v-menu>
              </v-btn>
            </template>
          </v-text-field>

</template>

<script setup>
import { ref } from 'vue';

const date = ref(new Date());
const popover = ref(true);
</script>
