<template>
  <UModal v-model="isOpen" :fullscreen="isMobile" :class="{'modal--mobile': isMobile}">
    <div class="p-4 flex flex-col gap-4">
      <div class="modal-header flex justify-between">
        <h3>{{ $t("enterName") }}</h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="closeModal"
        />
      </div>
      <UInput
        class="grow"
        :color="selectedThemeColor"
        size="xl"
        variant="outline"
        v-model="model"
      />

      <div class="flex gap-2">
        <UButton
          icon="i-mynaui:save"
          :color="selectedThemeColor"
          variant="solid"
          class="flex items-center align-start justify-center transition duration-300 self-start"
          @keyup.enter="handleSaveTasks"
          @click="handleSaveTasks"
        >
          {{ $t("save") }}
        </UButton>
        <UButton
          icon="i-tabler:cancel"
          :color="selectedThemeColor"
          variant="outline"
          class="flex, items-center, align-start justify-center, transition, duration-300 self-start"
          @click="handleCloseSaveModal"
        >
          {{ $t("cancel") }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import { useScreenSize } from "#imports";
import { useModal } from "~/composables/useModal";
import { useThemeStore } from "~/stores/theme/theme";
import { useNotesStore } from "~/stores/notes/notes";
import type { TNoteType } from "~/stores/notes/types";

const { isMobile } = useScreenSize();
const { isOpen = true, openModal, closeModal } = useModal();

const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const notesStore = useNotesStore();
const model = defineModel<string>("title");
const currentNoteType = ref<string>("");

const emit = defineEmits(["save"]);

const handleCloseSaveModal = () => {
  closeModal();
};

const handleSaveTasks = () => {
  emit("save", currentNoteType.value);
  closeModal();
  model.value = "";
};

const handleOpenModal = (noteType: TNoteType) => {
  openModal();
  currentNoteType.value = noteType;
};

defineExpose({
  handleOpenModal,
});
</script>
