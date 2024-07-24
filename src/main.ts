// * styles
import "@/assets/styles/main.css";

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
initializeApp( firebaseConfig );

// * app init
createApp( App )
.use( router )
.use( createPinia() )
.mount( "#app" );
