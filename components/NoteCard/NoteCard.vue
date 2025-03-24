<template>
  <UContainer :class="[`rounded-md border border-gray-600 p-2 transition, duration-300 cursor-pointer hover:bg-${selectedThemeColor}-100`, selectedBgColor(note), {'flex gap-1': isMobile}]">
    <div :class="['flex flex-col justify-between']">
      <p class="text-l text-gray-500">
          {{ dateFormatted }}
      </p>
      <h3 class="font-semibold text-xl">
          {{ note.title }}
      </h3>
    </div>
    
    <div :class="['flex gap-2', {'flex-col': isMobile}]">
      <UButton
      v-if="!isMobile"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, justify-center, transition, duration-300"
        @click="$emit('open-note', note)"
      >
        {{ $t("open") }}
      </UButton>
      <UButton
        v-if="note.active"
        icon="i-tabler:archive"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, justify-center, transition, duration-300"
        @click.stop="$emit('to-archive')"
      >
        {{ isMobile ? '' : $t("toArchive") }}
      </UButton>
      <UButton
        icon="i-tabler:trash"
        size="sm"
        color="red"
    
        variant="solid"
        @click.stop="$emit('delete-note')"
      />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { useThemeStore } from "~/stores/theme/theme";
import type { INoteCardProps } from "./types";
import { useNotesStore } from "~/stores/notes/notes";
import type { INote } from "~/stores/notes/types";
import dayjs from "dayjs";
import { useScreenSize } from "#imports";

const { isMobile } = useScreenSize();
const props = defineProps<INoteCardProps>();

const notesStore = useNotesStore();
const { currentOpenedNote } = storeToRefs(notesStore);
const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const selectedBgColor = (note: INote) => {
  if(note._id === currentOpenedNote.value?._id){
    return `bg-${selectedThemeColor.value}-100`
  }
  return false
}

const dateFormatted = computed(() => isMobile ? dayjs(props.note.createdAt).format('DD.MM.YYYY') : dayjs(props.note.createdAt).format('DD.MM.YYYY HH:mm:ss'))

</script>
