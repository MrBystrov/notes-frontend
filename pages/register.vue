<template>
  <UForm
    class="max-w-sm w-full gap-4 flex-col flex"
    :schema="schema"
    :state="state"
    @submit="onClickRegister(state)"
  >
    <UFormGroup :label="$t('name')" name="name">
      <UInput :color="selectedThemeColor" v-model="state.username" />
    </UFormGroup>

    <UFormGroup :label="$t('email')" name="email">
      <UInput :color="selectedThemeColor" v-model="state.useremail" />
    </UFormGroup>

    <UFormGroup :label="$t('password')" name="password">
      <UInput :color="selectedThemeColor" v-model="state.password" type="password"/>
    </UFormGroup>

    <UButton
      type="submit"
      :color="selectedThemeColor"
      class="flex, items-center, justify-center, transition, duration-300"
    >
        {{$t('register')}}
    </UButton>

    <!-- <UCheckbox
      v-model="selectedTerms"
      :color="selectedThemeColor"
      name="notifications"
      label="I accept and agree with Terms of Use and Privacy Policy."
    /> -->
    <p class="self-center">
      {{ $t('haveAccount')}}
      <ULink
        to="/login"
        
        class="transition, duration-300"
        :active-class="`text-${selectedThemeColor}-500`"
        :inactive-class="`text-${selectedThemeColor}-500 dark:text-${selectedThemeColor}-500 hover:opacity-80 dark:hover:opacity-80`"
      >
        {{$t('signin')}}
      </ULink>
    </p>
    <UNotifications />
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { IUserInfo } from "~/types/auth";
import { useThemeStore } from "~/stores/theme/theme";
import { useRegisterStore } from "~/stores/register/registerStore";
const { selectedThemeColor } = storeToRefs(useThemeStore());

const registerStore = useRegisterStore();
const { fetchRegister } = registerStore;
const { t } = useI18n();


definePageMeta({
  layout: "auth",
});
const schema = object({
  username: string().required("Required"),
  useremail: string().email("Invalid email").required("Required"),
  password: string()
  .min(8, t('passRules'))
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    t('passRules')
  )
  .required(t('required')),
});

const state = reactive<IUserInfo>({
  username: "",
  useremail: "",
  password: "",
});
const toast = useToast()

const onClickRegister = async(data: IUserInfo) => {
  const response = await fetchRegister(data)
  console.log(response.value)
  if(response.value){
    toast.add({title: 'User successfully created'})
    state.username = '';
    state.useremail = '';
    state.password = '';
    navigateTo('/login')
  }else{
    toast.add({title: 'Error while creating of user', color: 'red'})
  }
}

const selectedTerms = ref<boolean>(false);

</script>

<style scoped></style>
