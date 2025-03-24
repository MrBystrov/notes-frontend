<template>
  <UForm
    class="max-w-sm w-full gap-4 flex-col flex"
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UButton
      type="submit"
      :class="[`bg-${selectedThemeColor}-500  dark:bg-${selectedThemeColor}-500 text-white hover:bg-${selectedThemeColor}-400 dark:hover:bg-${selectedThemeColor}-400 flex items-center justify-center transition duration-300`]"
    >
      Send
    </UButton>

    <p class="self-center">
      Have account?
      <ULink
        to="/register"
        active-class="text-green-500"
        inactive-class="text-green-500 dark:text-green-500 hover:text-green-500 dark:hover:text-green-400"
      >
        Sign in
      </ULink>
    </p>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import { useThemeStore } from "~/stores/theme/theme";
const { selectedThemeColor } =storeToRefs(useThemeStore())

definePageMeta({
  layout: "auth",
});

const state = reactive<UserInfoWithoutName>({
  email: "",
  password: "",
});

const schema = object({
  email: string().email("Invalid email").required("Required"),
  password: string()
    .required("Password is required"),
});
</script>

<style scoped></style>