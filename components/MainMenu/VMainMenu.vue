<template>
  <UModal v-model="isOpenMenu" :fullscreen="isMobile">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ $t("account") }}
          </h3>
          <UButton
            :color="selectedThemeColor"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="transition"
            :ui="{ rounded: 'rounded-full' }"
            @click="closeMenu()"
          />
        </div>
      </template>
      <div class="flex flex-col gap-8">
        <div class="flex items-center justify-center gap-5 avatar-container">
          <UButton
          icon="i-material-symbols:delete-rounded"
            :color="selectedThemeColor"
            class="transition delete-avatar"
            @click="handleImageUpdate('')"
          />
          <AvatarUploader @update:image="handleImageUpdate"/>      
        </div>
        <div class="flex flex-col gap-2">
          <UInput :color="selectedThemeColor" v-model="currentUser.username" />
          <UInput :color="selectedThemeColor" v-model="currentUser.useremail" disabled />
          <UButton
            :label="$t('save')"
            :color="selectedThemeColor"
            class="h-10 transition"
            @click="updateUser({ username: currentUser.username})"
          />
        </div>
        <div class="flex flex-col gap-2">
          <UButton v-for="button of accountButtonActions" 
            :key="button.id"
            :icon="button.icon"
            size="sm"
            variant="outline"
            :color="selectedThemeColor"
            :label="$t(button.name)"
            class="transition"
            @click="button.action(getLinkedModal(button.name))"
          />
        </div>
      </div>
      <PlaceholderLogOut class="h-32" />
    </UCard>
  </UModal>
  <ModalConfirmLogOut ref="logOut"/>
  <ModalConfirmChPass ref="chPass"/>
  <ModalConfirmAccDel ref="accDel"/>
</template>

<script lang="ts" setup>
import { useModal } from "~/composables/useModal";
import { useThemeStore } from "~/stores/theme/theme";
import { useUserStore } from "~/stores/userStore/userStore";
import { accountButtonActions } from "./types";
import ModalConfirmLogOut from "../ModalConfirm/ModalConfirmLogOut.vue";
import ModalConfirmChPass from "../ModalConfirm/ModalConfirmChPass.vue";
import ModalConfirmAccDel from "../ModalConfirm/ModalConfirmAccDel.vue";
import AvatarUploader from "../AvatarUploader.vue";

const logOut = ref<InstanceType<typeof ModalConfirmLogOut> | null>(null);
const chPass = ref<InstanceType<typeof ModalConfirmChPass> | null>(null);
const accDel = ref<InstanceType<typeof ModalConfirmAccDel> | null>(null);

const { isMobile } = useScreenSize()
const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
const { updateUser } = userStore;

const {
  isOpen: isOpenMenu,
  openModal: openMenu,
  closeModal: closeMenu,
} = useModal();

const handleImageUpdate = (data: string) => {
  updateUser({ useravatar: data})
}


const getLinkedModal = (name: string) => {
  if(name === 'logOut') return logOut.value
  if(name === 'chPass') return chPass.value
  if(name === 'deleteAccount') return accDel.value
  
};

defineExpose({
  openMenu,
});
</script>

<style lang="scss" scoped>
  .avatar-container{
    align-self: center;
    max-width: max-content;
    height: max-content;
    position: relative;
    .delete-avatar{
      border-radius: 100%;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 5;
    }
  }
</style>
