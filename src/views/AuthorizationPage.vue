<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const toast = useToast();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const accountExists = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const switchAuthOptions = () => {
  accountExists.value = !accountExists.value;
};

const subtitleText = computed(() => {
  return accountExists.value ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?';
});

const linkAccountText = computed(() => {
  return accountExists.value ? 'Создайте сейчас.' : 'Войти.';
});

const submitButtonText = computed(() => {
  return accountExists.value ? 'Войти' : 'Зарегистрироваться';
});

const registerMethod = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      email.value,
      password.value
    );
    router.push({ name: 'HomePage' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({
        severity: 'error',
        summary: 'Info',
        detail: error.message,
        life: 3000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const loginMethod = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    router.push({ name: 'HomePage' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({
        severity: 'error',
        summary: 'Info',
        detail: error.message,
        life: 3000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};

const submitForm = (): void => {
  if (accountExists.value) {
    loginMethod();
  } else {
    registerMethod();
  }
};
</script>

<template>
  <app-toast position="bottom-right" />
  <div class="flex justify-content-center p-2">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-3">
        <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
        <span class="text-600 font-medium line-height-3 select-none">
          {{ subtitleText }}
        </span>
        <a
          class="font-medium no-underline ml-2 cursor-pointer select-none color-white-blue"
          @click="switchAuthOptions">
          {{ linkAccountText }}
        </a>
      </div>

      <form @submit.prevent="submitForm">
        <label for="email1" class="block text-900 font-medium mb-2">
          Email
        </label>
        <app-input-text
          v-model="email"
          id="email1"
          type="email"
          class="w-full mb-3"
          :disabled="isLoading" />
        <label for="password1" class="block text-900 font-medium mb-2">
          Пароль
        </label>
        <app-input-text
          v-model="password"
          id="password1"
          type="password"
          class="w-full mb-3"
          :disabled="isLoading" />
        <app-button
          :label="submitButtonText"
          type="submit"
          icon="pi pi-user"
          :loading="isLoading"
          class="w-full" />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-white-blue {
  color: rgb(0, 138, 252);
}
</style>
