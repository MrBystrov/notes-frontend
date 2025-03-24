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
        <UIcon
          name="i-dashicons:lock"
          :color="selectedThemeColor"
          class="w-5 h-5 self-center"
        />
        <h3 class="text-lg font-semibold self-center">
          {{ $t("chPassTitle") }}
        </h3>
        <div class="input-with-toggle"></div>
        <div class="input-with-toggle">
          <UInput
            :type="currInputType"
            :color="selectedThemeColor"
            variant="outline"
            :placeholder="$t('enterPass')"
            v-model="currentPass"
          />
          <button @click="toggleVisibility('cur')" class="toggle-button">
            <span v-if="inputCurrVisible">👁️</span>
            <span v-else>🙈</span>
          </button>
        </div>
        <div class="input-with-toggle">
          <UInput
          class="pass-input"
            :type="newInputType"
            :color="selectedThemeColor"
            variant="outline"
            :placeholder="$t('enterNewPass')"
            v-model="newPass"
          />
          <button @click="toggleVisibility('new')" class="toggle-button">
            <span v-if="inputNewVisible">👁️</span>
            <span v-else>🙈</span>
          </button>
        </div>

        <UButton
          @click="updatePassword({ currentPass, newPass })"
          :color="selectedThemeColor"
          variant="solid"
          :label="$t('change')"
        />
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { useModal } from "~/composables/useModal";
import { useThemeStore } from "~/stores/theme/theme";
import { useUserStore } from "~/stores/userStore/userStore";
import { useLoginStore } from "~/stores/login/loginStore";
import type { IUserData } from "~/stores/login/types";

const { isMobile } = useScreenSize();
const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const loginStore = useLoginStore();
const { logOut } = loginStore;

const userStore = useUserStore();
const { updatePassword } = userStore;

const {
  isOpen: isOpenModal,
  openModal: openModal,
  closeModal: closeModal,
} = useModal();

const currentPass = ref<string>("");
const newPass = ref<string>("");
const inputCurrVisible = ref<boolean>(false);
const inputNewVisible = ref<boolean>(false);

const currInputType = computed(() => {
  return inputCurrVisible.value ? "text" : "password";
});
const newInputType = computed(() => {
  return inputNewVisible.value ? "text" : "password";
});

const toggleVisibility = (inputName) => {
  if (inputName === "new") {
    inputNewVisible.value = !inputNewVisible.value;
  } else {
    inputCurrVisible.value = !inputCurrVisible.value;
  }
};

defineExpose({
  openModal,
});
</script>

<style lang="scss" scoped>
.input-with-toggle {
  position: relative;
}

.toggle-button {
  position: absolute;
  background: none;
  right: 5px;
  top: 2px;
  border: none;
  cursor: pointer;
}

:deep(.form-input){
  padding-right: 30px;
}
</style>
