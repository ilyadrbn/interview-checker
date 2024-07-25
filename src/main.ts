// * styles
import "@/assets/styles/main.css";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primeflex/primeflex.scss";
import Aura from "@primevue/themes/aura";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import ProgressSpinner from "primevue/progressspinner";

// * libraries
import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";

// * components
import App from "./App.vue";

// * local exports
import { firebaseConfig } from "@/firebase";
import { router } from "@/router";

// * main part
initializeApp(firebaseConfig);

const app = createApp(App);

// * app init
app
  .use(createPinia())
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(ToastService)
  .component("app-menubar", Menubar)
  .component("app-button", Button)
  .component("app-input-text", InputText)
  .component("app-toast", Toast)
  .component("app-progress-spinner", ProgressSpinner)
  .mount("#app");
