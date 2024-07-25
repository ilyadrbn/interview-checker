<script lang="ts" setup>
import { ref, computed } from "vue";
// ! ComputedRef для вычисляемых свойств в TS
import type { ComputedRef } from "vue";

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const router = useRouter();
const useUserStore = useStore();

interface IMenuItem {
  label: string;
  icon: string;
  pathName: string;
  show: ComputedRef<boolean>;
}

const items = ref<IMenuItem[]>([
  {
    label: "Авторизация",
    icon: "pi pi-user",
    pathName: "AuthorizationPage",
    show: computed(() => !useUserStore.userID),
  },
  {
    label: "Добавить",
    icon: "pi pi-plus",
    pathName: "HomePage",
    show: computed(() => !!useUserStore.userID),
  },
  {
    label: "Список собеседований",
    icon: "pi pi-list",
    pathName: "InterviewListPage",
    show: computed(() => !!useUserStore.userID),
  },
  {
    label: "Статистика",
    icon: "pi pi-chart-pie",
    pathName: "StatisticsPage",
    show: computed(() => !!useUserStore.userID),
  },
]);

const signOutMethod = async (): Promise<void> => {
  await signOut(getAuth());
  router.push({ name: "AuthorizationPage" });
};
</script>

<template>
  <app-menubar :model="items" class="menu">
    <template #item="{ item, props }">
      <template v-if="item.show">
        <router-link
          :to="{ name: item.pathName }"
          class="flex align-items-center"
          v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </template>
    </template>
    <template #end>
      <app-button
        v-if="useUserStore.userID"
        class="card flex justify-center"
        icon="pi pi-power-off"
        label="Выход"
        @click="signOutMethod" />
    </template>
  </app-menubar>
</template>

<style lang="scss" scoped>
.menu {
  margin: 30px 0;
}

.menu-exit {
  cursor: pointer;
}
</style>
