<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import type { IInterviewInfo } from '@/interfaces';
import { useConfirm } from 'primevue/useconfirm';

import { useStore } from '@/store';

const useUserStore = useStore();
const db = getFirestore();

const interviews = ref<IInterviewInfo[]>([]);
const isLoading = ref<boolean>(true);

const confirm = useConfirm();

const getAllInterviews = async <T extends IInterviewInfo>(): Promise<T[]> => {
  const getData = query(
    collection(db, `users/${useUserStore.userID}/interviews`),
    orderBy('createdAt', 'desc')
  );
  const listDocs = await getDocs(getData);
  return listDocs.docs.map((doc) => doc.data() as T);
};

onMounted(async () => {
  const listInterviews: Array<IInterviewInfo> = await getAllInterviews();
  interviews.value = [...listInterviews];
});

const confirmRemoveInterview = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, `users/${useUserStore.userID}/interviews`, id));
  interviews.value = interviews.value.filter(
    (interview) => interview.id !== id
  );
};
</script>

<template>
  <h1>Список собеседований</h1>
  <app-data-table :value="interviews">
    <app-column field="company" header="Компания"> </app-column>
    <app-column field="hrName" header="Имя HR"> </app-column>
    <app-column field="vacancyLink" header="Вакансия">
      <template #body="slotProps">
        <router-link
          :to="{ path: `${slotProps.data.vacancyLink}` }"
          target="_blank">
          {{ slotProps.data.vacancyLink }}
        </router-link>
      </template>
    </app-column>
    <app-column header="Контакты">
      <template #body="slotProps">
        <div class="contacts">
          <a
            v-if="slotProps.data.contactTelegram"
            :href="`https://t.me/${slotProps.data.contactTelegram}`"
            target="_blank"
            class="contacts__telegram">
            <span class="contacts__icon pi pi-telegram"></span>
            <span></span>
          </a>
          <a
            v-if="slotProps.data.contactWhatsApp"
            :href="`https://wa.me/${slotProps.data.contactWhatsApp}`"
            target="_blank"
            class="contacts__whatsapp">
            <span class="contacts__icon pi pi-whatsapp"></span>
            <span></span>
          </a>
          <a
            v-if="slotProps.data.contactPhone"
            :href="`tel: +${slotProps.data.contactPhone}`"
            target="_blank"
            class="contacts__phone">
            <span class="contacts__icon pi pi-phone"></span>
            <span></span>
          </a>
        </div>
      </template>
    </app-column>
    <app-column>
      <template #body="slotProps">
        <div class="flex gap-2">
          <router-link :to="`/interview/${slotProps.data.id}`">
            <app-button icon="pi pi-pencil" severity="info"></app-button>
          </router-link>

          <app-button
            icon="pi pi-trash"
            severity="danger"
            @click="confirmRemoveInterview(slotProps.data.id)"></app-button>
        </div>
      </template>
    </app-column>
  </app-data-table>
</template>

<style lang="scss" scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__whatsapp {
  color: #25d366;
}
.contacts__phone {
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.interview-stages {
  display: flex;
  gap: 5px;
}
</style>
