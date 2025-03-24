<template>
  <UModal v-model="isOpenModal">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            :color="selectedThemeColor"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="closeModal"
          />
        </div>
      </template>
      <div class="flex flex-col gap-2">
        <UIcon name="i-cil:account-logout" :color="selectedThemeColor" class="w-5 h-5 self-center" />
        <h3 class="text-lg font-semibold self-center">{{$t('lgOutQuest')}}</h3>

        <UButton :color="selectedThemeColor" @click="handleLogOut" variant="solid" :label="$t('yesLogOut')" />
        <UButton :color="selectedThemeColor" @click="handleCancel" variant="outline" :label="$t('noStay')" />
      </div>
      <Placeholder class="h-32" />
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>

import { useModal } from "~/composables/useModal";
import { useThemeStore } from "~/stores/theme/theme";
import { useUserStore } from "~/stores/userStore/userStore";
import { useLoginStore } from "~/stores/login/loginStore";

const { isMobile } = useScreenSize()
const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const loginStore = useLoginStore()
const { logOut } = loginStore;

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const {
  isOpen: isOpenModal,
  openModal: openModal,
  closeModal: closeModal,
} = useModal();


const handleLogOut = () => {
  logOut()
  closeModal()
}
const handleCancel = () => {
  closeModal()
}

defineExpose({
  openModal,
});
</script>
