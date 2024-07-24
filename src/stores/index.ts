import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore( "counter", () => {
    const count = ref( 0 );

    return {
        count
    };
} );
