<template>
  <div class="flex flex-col gap-2">
    <UTabs
      v-model="selectedTab"
      :ui="tabsConfig"
      background="green"
      :items="tabs"
      :config="tabsConfig"
      @change="onChange"
    />
    <div class="flex flex-col gap-2">
      <UInput :color="selectedThemeColor" v-model="filtredTitle" placeholder="Найти по названию"/>
      <vSelect :options="SELECT_OPTIONS" v-model="currentSelectedOption"/>
    </div>
    <div class="notes-list-cont">
      
      <TransitionGroup class="notes-list overflow-x-scroll" name="list" tag="ul"  :class="[`flex gap-4`, isMobile ? 'flex-row' : 'flex-col']">
        <li v-for="note of selectedNotes" :key="note._id">
          <NoteCard
            :note="note"
            @click="openNote(note)"
            @open-note="openNote(note)"
            @delete-note="handleDeleteNote(note)"
            @to-archive="addNoteToArchive(note)"
          />
        </li>
      </TransitionGroup>
    </div>
  </div>
  <div
    v-if="selectedTypeOfNotes === 'Notes'"
    class="editor-block gap-2 flex flex-col"
  >
    <TextEditor
      :is-editing="isEditing"
      @open-modal="openModal('note')"
      @new-note="handleNewNote"
      @edit="handleEdit"
      @cancel="handleCancelEdit"
      @open-save-as="openModal('note')"
      @save-note="onSaveItem(textEditor?.getContent(), String(currentOpenedNote?._id))"
      ref="textEditor"
    />
  </div>
  <div v-else class="task-items">
    <TasksEditor :task-list="tasksList" @open-save-as="openModal('task')" @save-task="onSaveItem(JSON.stringify(tasksList), String(currentOpenedNote?._id))" @new-task="handleNewTask"/>
  </div>
  <ModalSave
    v-model:title="activeNoteTitle"
    ref="modalRef"
    @save="handleSaveNote"
    @cancel="handleCloseSaveModal()"
  />
</template>

<script lang="ts" setup>
import TextEditor from "~/components/TextEditor/TextEditor.vue";
import { useThemeStore } from "~/stores/theme/theme";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNotesStore } from "~/stores/notes/notes";
import type { INote, TNoteType } from "~/stores/notes/types";
import NoteCard from "~/components/NoteCard/NoteCard.vue";
import ModalSave from "~/components/ModalSave.vue";
import TasksEditor from "~/components/TasksEditor/TasksEditor.vue";
import { useScreenSize } from "#imports";
import vSelect from "~/components/v-select/v-select.vue";
import { SELECT_OPTIONS } from "~/stores/notes/types";


const { isMobile } = useScreenSize()
definePageMeta({
  middleware: "auth",
  title: "Main",
});

const notesStore = useNotesStore();
const { addNote, deleteNote, addNoteArchive, updateNote } = notesStore;
const {
  selectedNotes,
  selectedTypeOfNotes,
  currentOpenedNote,
  tasksList,
  activeNoteTitle,
  isEditing,
  filtredTitle,
  currentSelectedOption
} = storeToRefs(notesStore);

const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const modalRef = ref<InstanceType<typeof ModalSave> | null>(null);
const textEditor = ref<InstanceType<typeof TextEditor> | null>(null);

const selectedTab = ref<number>();

const handleSaveNote = async (type: TNoteType): Promise<void> => {
  let text;
  if (textEditor.value  && type === "note") {
    text = textEditor.value.getContent();
  }  
  if(type === "task") {
    text = JSON.stringify(tasksList.value);
  }
  const body = {
    title: activeNoteTitle.value,
    text: text,
    active: true,
    type: type,
  };
  await addNote(body);
  updateTextEditor("");
  isEditing.value = false;
};

const handleCancelEdit = (): void => {
  isEditing.value = false;
};
const handleEdit = (): void => {
  if (textEditor.value) {
    textEditor.value.focusEditor();
  }
  isEditing.value = true;
};

const handleDeleteNote = async (note: INote) => {
  if (note._id) {
    await deleteNote(note._id);
  }
};

function onChange(index: number) {
  if(textEditor.value){
    textEditor.value.disable();
  }
  currentOpenedNote.value = null;
  tasksList.value = [];
  const item = tabs[index];
  selectedTypeOfNotes.value = item.label;
}

const addNoteToArchive = async (note: INote) => {
  await addNoteArchive(note._id);
};

const openNote = (note: INote) => {
  if (selectedTypeOfNotes.value === "Notes") {
    if (textEditor.value) {
      textEditor.value.blur();
      currentOpenedNote.value = note;
      updateTextEditor(note.text);
      activeNoteTitle.value = note.title;
    }
  } else {
    currentOpenedNote.value = note;
    tasksList.value = JSON.parse(note.text);
  }
};

const tabsConfig = computed(() => {
  return {
    list: {
      background: `bg-${selectedThemeColor.value}-500 dark:bg-${selectedThemeColor.value}-900`,
      tab: {
        inactive: "text-gray-500 dark:text-gray-700",
      },
    },
  };
});

const openModal = (type: TNoteType) => {
  if (modalRef.value) {
    modalRef.value.handleOpenModal(type);
  }
};

const handleNewNote = () => {
  isEditing.value = true;
  currentOpenedNote.value = null;
  activeNoteTitle.value = "";
  updateTextEditor("");
  if (textEditor.value) {
    textEditor.value.focus();
  }
};

const handleNewTask = () => {
  activeNoteTitle.value = "";
  currentOpenedNote.value = null;
  tasksList.value = []
}

const updateTextEditor = (text: string) => {
  const editor: HTMLElement | null = document.querySelector(".ql-editor");
  if (editor) {
    editor.innerHTML = text;
  }
};

const onSaveItem = async(text: INote['text'], id: INote['_id']) => {
  const body = {
    text: text
  };
  console.log('111')
  await updateNote(body, id)
}

const handleCloseSaveModal = () => {
  activeNoteTitle.value = "";
};

const tabs = [
  {
    label: "Notes",
  },
  {
    label: "Tasks",
  },
];

onMounted(() => {
  if (textEditor.value) {
    textEditor.value.disable();
  }
});

watch(
  isEditing,
  (newVal) => {
    if (textEditor.value) {
      if (newVal) {
        textEditor.value.enable();
      } else {
        textEditor.value.disable();
      }
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.editor {
  min-height: 500px;
}
.notes-list-cont{
  @media (max-width: 768px){
    padding-left: 20px;
    margin-left: -20px;
    margin-right: -20px;
    overflow: hidden;
    max-height: 92px;
  }
}
.notes-list{
  scrollbar-width: none;
  max-height: 70vh;
  padding-bottom: 20px;
  margin-bottom: -20px;
  scrollbar-width: none;
  overflow: auto; 
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  &::-webkit-scrollbar{
    display: none;
  }
}
</style>
