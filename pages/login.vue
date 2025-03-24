<template>
  <UForm
    class="max-w-sm w-full gap-4 flex-col flex"
    :schema="schema"
    :state="state"
    @submit.prevent="handleLogin(state)"
  >
    <UFormGroup :label="$t('email')" name="useremail">
      <UInput :color="selectedThemeColor" v-model="state.useremail" />
    </UFormGroup>

    <UFormGroup :label="$t('password')" name="password">
      <UInput :color="selectedThemeColor" v-model="state.password" type="password" />
    </UFormGroup>
    <UButton
    type="submit"
      :color="selectedThemeColor"
      class="flex, items-center, justify-center, transition, duration-300"
    >
      {{$t('login')}}
    </UButton>

    <p class="self-center">
     {{$t('notHaveAccount')}}
      <ULink
        to="/register"
        class="transition, duration-300"
        :active-class="`text-${selectedThemeColor}-500`"
        :inactive-class="`text-${selectedThemeColor}-500 dark:text-${selectedThemeColor}-500 hover:opacity-80 dark:hover:opacity-80`"
      >
        {{$t('signup')}}
      </ULink>
    </p>
    <ULink
        to="/"
        class="transition, duration-300"
        :active-class="`text-${selectedThemeColor}-500`"
        :inactive-class="`text-${selectedThemeColor}-500 dark:text-${selectedThemeColor}-500 hover:opacity-80 dark:hover:opacity-80`"
      >
        go
      </ULink>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { UserInfoWithoutName } from "~/types/auth";
import { useThemeStore } from "~/stores/theme/theme";
import { storeToRefs } from "pinia";
import { useLoginStore } from "~/stores/login/loginStore";

const loginStore = useLoginStore();
const { fetchLogin } = loginStore;
const { t } = useI18n();

definePageMeta({
  layout: "auth"
});

const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const state = reactive<UserInfoWithoutName>({
  useremail: "",
  password: "",
});

const schema = object({
  useremail: string().email(t('invalidEmail')).required(t('required')),
  password: string().required(t('required')),
});

const handleLogin = async (state: UserInfoWithoutName) => {
  const res = await fetchLogin(state);
  if(res){
    navigateTo('/')
  }
};
</script>

<style scoped></style>
