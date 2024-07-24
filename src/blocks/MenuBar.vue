<template>
  <app-menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <router-link
        :to="item.path"
        v-bind="props.action"
        class="flex align-items-center">
        <span :class="item.icon"></span>
        <span>{{ item.label }}</span>
      </router-link>
    </template>
  </app-menubar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
}

const items = ref<IMenuItem[]>([
  {
    label: "Добавить",
    icon: "pi pi-plus",
    path: "/",
  },
  {
    label: "Авторизация",
    icon: "pi pi-user",
    path: "/auth",
  },
  {
    label: "Список собеседований",
    icon: "pi pi-list",
    path: "/list",
  },
  {
    label: "Статистика",
    icon: "pi pi-chart-pie",
    path: "/stat",
  },
]);
</script>

<style lang="scss" scoped>
.menu {
  margin: 30px 0;
}
.menu-exit {
  cursor: pointer;
}
</style>
