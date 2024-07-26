<script lang="ts" setup>
import { ref, computed } from 'vue';

import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from 'primevue/usetoast';

import type { IInterviewInfo } from '@/interfaces';

const router = useRouter();
const db = getFirestore();
const toast = useToast();

const company = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const contactTelegram = ref<string>('');
const contactWhatsApp = ref<string>('');
const contactPhone = ref<string>('');
const loading = ref<boolean>(false);
const disabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value);
});

const addNewInterview = async (): Promise<void> => {
  loading.value = true;
  const payload: IInterviewInfo = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactWhatsUp: contactWhatsApp.value,
    contactPhone: contactPhone.value,
    createdAt: new Date(),
  };

  const userID = getAuth().currentUser?.uid;
  if (userID) {
    await setDoc(doc(db, `users/${userID}/interviews`, payload.id), payload)
      .then(() => {
        router.push({ name: 'InterviewListPage' });
      })
      .catch((error) => {
        toast.add({
          severity: 'error',
          summary: 'Info',
          detail: error.message,
          life: 3000,
        });
      })
      .finally(() => {
        loading.value = false;
      });
  }
};
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>Новое собеседование</template>
      <template #content>
        <app-input-text
          class="input mb-3"
          placeholder="Компания"
          v-model="company" />
        <app-input-text
          v-model="vacancyLink"
          class="input mb-3"
          placeholder="Описание вакансии (ссылка)" />
        <app-input-text
          v-model="hrName"
          class="input mb-3"
          placeholder="Контакт HR" />
        <app-input-text
          v-model="contactTelegram"
          class="input mb-3"
          placeholder="Telegram HR" />
        <app-input-text
          v-model="contactWhatsApp"
          class="input mb-3"
          placeholder="WhatsApp HR" />
        <app-input-text
          v-model="contactPhone"
          class="input mb-3"
          placeholder="Телефон HR" />
        <app-button
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"></app-button>
      </template>
    </app-card>
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
</style>
