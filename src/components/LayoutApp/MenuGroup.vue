<template>
    <v-list-group v-model="isExpanded" :prepend-icon="group.icon" rounded="shaped" :title="group.title">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" />
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
      <v-list-group
        v-for="subGroup in group.subGroups"
        :key="subGroup.title"
        color="primary"
        class="bg-grey-lighten-3"
        v-model="isSubGroupExpanded[subGroup.title]"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="subGroup.icon" rounded="shaped" :title="subGroup.title" />
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
  </template>
  
  <script>
  export default {
    props: {
      group: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isExpanded: false,
        isSubGroupExpanded: {},
      };
    },
    created() {
      this.isSubGroupExpanded = this.group.subGroups
        ? this.group.subGroups.reduce((acc, subGroup) => {
          acc[subGroup.title] = false;
          return acc;
        }, {})
        : {};
    },
    methods: {
      navigateTo(route) {
        this.$router.push(`/${route}`);
      },
      isRouteActive(route) {
        return this.$route.path === `/${route}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .v-list-group__items .v-list-item {
    padding-inline-start: calc(1px + var(--indent-padding)) !important;
  }
  </style>
  