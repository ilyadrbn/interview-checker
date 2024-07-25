<script lang="ts" setup>
import MenuBar from "@/blocks/MenuBar.vue";
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useStore } from "./store";

const useUserStore = useStore();

const isLoading = ref<boolean>(true);

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    isLoading.value = false;
    if (user) {
      useUserStore.userID = user.uid;
    } else {
      useUserStore.userID = "";
    }
  });
});
</script>

<template>
  <app-progress-spinner v-if="isLoading" class="absolute top-50 left-50" />
  <div v-else class="container">
    <MenuBar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
