// * styles
import '@/assets/styles/main.css';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import Aura from '@primevue/themes/aura';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';

// * libraries
import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { createPinia } from 'pinia';

// * components
import App from './App.vue';

// * local exports
import { firebaseConfig } from '@/firebase';
import { router } from '@/router';

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
  .use(ConfirmationService)
  .component('app-menubar', Menubar)
  .component('app-button', Button)
  .component('app-input-text', InputText)
  .component('app-toast', Toast)
  .component('app-progress-spinner', ProgressSpinner)
  .component('app-card', Card)
  .component('app-data-table', DataTable)
  .component('app-column', Column)
  .component('app-dialog', ConfirmDialog)
  .mount('#app');
