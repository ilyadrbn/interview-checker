<template>
  <app-menubar :model="items" />
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

<style scoped></style>
