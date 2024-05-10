//component:NavigationDrawer

<template>
    <v-navigation-drawer
    :permanent="isDesktop"
    app
    :value="drawer"
    @input="onInput"
    right
    class="bg-grey-lighten-5"
    :width="280"
  >
      <v-list>
        <v-list-item
          :class="{ 'bg-blue-grey-lighten-4': isRouteActive('dashboard') }"
          prepend-icon="mdi-view-dashboard"
          rounded="shaped"
          title="داشبورد"
          @click="navigateTo('dashboard')"
        />
  
        <!-- Grouped menu items -->
        <v-list-group
          v-for="(group, index) in menuGroups"
          :key="group.title"
          color="primary"
          v-model="groupExpanded[index]"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="group.icon"
              rounded="shaped"
              :title="group.title"
            />
          </template>
  
          <v-list-item
            v-for="item in group.items"
            :key="item.title"
            :class="{ 'bg-blue-grey-lighten-4': isRouteActive(item.route) }"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="navigateTo(item.route)"
            rounded="shaped"
          />
  
          <!-- Sub-groups -->
          <v-list-group
            v-for="(subGroup, subIndex) in group.subGroups"
            :key="subGroup.title"
            color="primary"
            v-model="subGroupExpanded[subIndex]"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="subGroup.icon"
                rounded="shaped"
                :title="subGroup.title"
              />
            </template>
  
            <v-list-item
              v-for="subItem in subGroup.items"
              :key="subItem.title"
              :class="{ 'bg-blue-grey-lighten-4': isRouteActive(subItem.route) }"
              :prepend-icon="subItem.icon"
              :title="subItem.title"
              @click="navigateTo(subItem.route)"
              rounded="shaped"
            />
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  import { reactive } from 'vue';
  import { useDisplay } from 'vuetify';
  
  export default {
    props: {
      menuGroups: {
        type: Array,
        required: true,
      },
      drawer: {
      type: Boolean,
      required: true,
    },
      toggleDrawer: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        groupExpanded: reactive([]),
        subGroupExpanded: reactive([]),
      };
    },
    mounted() {
      this.groupExpanded = this.menuGroups.map(() => false);
      this.subGroupExpanded = this.menuGroups.flatMap(group =>
        group.subGroups ? group.subGroups.map(() => false) : []
      );
    },
    computed: {
      isDesktop() {
        const { width } = useDisplay();
        return width.value > 999;
      },
    },
    methods: {
      navigateTo(route) {
        this.$router.push(`/${route}`);
      },
      isRouteActive(route) {
        return this.$route.path === `/${route}`;
      },
      onInput(newValue) {
      this.$emit("update:drawer", newValue);
    },
    },
  };
  </script>
  