<template>
  <div class="container">
    <MenuBar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuBar from "@/blocks/MenuBar.vue";
</script>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  margin: auto;
  padding: 20px;
}
</style>
