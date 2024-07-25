import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("counter", () => {
  const userID = ref<string>("");

  return { userID };
});
