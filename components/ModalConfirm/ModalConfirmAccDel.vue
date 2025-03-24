<template>
  <UModal v-model="isOpenModal" :fullscreen="isMobile">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="closeModal"
          />
        </div>
      </template>
      <div class="flex flex-col gap-2">
        <UIcon name="i-heroicons-solid:trash" :color="selectedThemeColor" class="w-5 h-5 self-center" />
        <h3 class="text-lg font-semibold self-center">{{$t('delTitle')}}</h3>
        <p class="text-md self-center">{{$t('delSubtitle')}}</p>
        <UButton :color="selectedThemeColor" @click="handleDeleteAccount" variant="solid" :label="$t('yesDeleteAcc')" />
        <UButton :color="selectedThemeColor"  variant="outline" :label="$t('noKeepAcc')" />
      </div>
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

const userStore = useUserStore();
const { deleteAccount } = userStore;

const handleDeleteAccount = () => {
  deleteAccount()
  closeModal()
  navigateTo('/login')
}

const {
  isOpen: isOpenModal,
  openModal: openModal,
  closeModal: closeModal,
} = useModal();

defineExpose({
  openModal,
});
</script>
