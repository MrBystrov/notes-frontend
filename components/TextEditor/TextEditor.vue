<template>
  <div class="editor" ref="editor"></div>
  <TransitionFade>
    <div v-if="isEditing" class="gap-2 flex">
      <UButton
        :color="selectedThemeColor"
        class="flex, items-center, justify-center, transition, duration-300"
        @click="handleSaveNote()"
      >
        {{ $t("save") }}
      </UButton>
      <UButton
        v-if="currentOpenedNote"
        icon="i-material-symbols-light:save-as-outline-rounded"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, align-start justify-center, transition, duration-300 self-start"
        @click="handleSaveNewNote"
      >
        {{ $t("saveas") }}
      </UButton>
      <UButton
        :color="selectedThemeColor"
        variant="outline"
        class="flex, items-center, justify-center, transition, duration-300"
        @click="emit('cancel')"
      >
        {{ $t("cancel") }}
      </UButton>
    </div>
    <div class="gap-2 flex" v-else>
      <UButton
        @click="emit('new-note')"
        icon="i-tabler:file-plus"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, justify-center, transition, duration-300"
      >
        {{ $t("new") }}
      </UButton>
      <UButton
        icon="i-heroicons-pencil-square"
        :color="selectedThemeColor"
        variant="outline"
        class="flex, items-center, justify-center, transition, duration-300"
        @click="emit('edit')"
      >
        {{ $t("edit") }}
      </UButton>
      <UButton
        icon="i-tabler:file-type-pdf"
        size="sm"
        :color="selectedThemeColor"
        square
        variant="outline"
      />
    </div>
  </TransitionFade>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useNotesStore } from "~/stores/notes/notes";
import { type ITextEditorProps } from "./types";
import { useThemeStore } from "~/stores/theme/theme";

const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);
const props = defineProps<ITextEditorProps>();
const noteStore = useNotesStore();
const { currentOpenedNote, isEditing } = storeToRefs(noteStore);
const emit = defineEmits([
  "edit",
  "cancel",
  "open-modal",
  "new-note",
  "open-save-as",
  "save-note",
]);

const editor = ref<any>(null);
let quillInstance: any = null;

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

onMounted(() => {
  if (typeof document !== "undefined") {
    quillInstance = new Quill(editor.value, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }
});

onBeforeUnmount(() => {
  if (quillInstance) {
    quillInstance = null;
  }
});

const getContent = () => {
  return quillInstance.root.innerHTML;
};

const focus = () => {
  if (quillInstance) {
    quillInstance.focus();
  }
};
const blur = () => {
  if (quillInstance) {
    quillInstance.blur();
  }
};

const focusEditor = () => {
  if (quillInstance) {
    const length = quillInstance.getLength();
    quillInstance.setSelection(length, 0);
    quillInstance.focus();
  }
};

const handleSaveNote = () => {
  if (currentOpenedNote.value) {
    emit("save-note");
    return;
  }
  emit("open-save-as", "task");
};

const handleSaveNewNote = () => {
  if (!currentOpenedNote.value) {
    return;
  }
  emit("open-save-as", "task");
};

const disable = () => {
  quillInstance.disable();
};

const enable = () => {
  quillInstance.enable();
};

watch(isEditing, () => {
  if(!isEditing.value){
    console.log('ff', isEditing.value)
  }
})

defineExpose({
  getContent,
  focus,
  blur,
  focusEditor,
  disable,
  enable,
});
</script>

<style lang="scss" scoped>
.editor{
  height: 87%;
}
.editor-block {
  height: 90%;
}
:global(.ql-editor){
  min-height: 400px;
}
</style>
