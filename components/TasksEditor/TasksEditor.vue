<template>
  <div class="gap-2 mb-2 flex">
    <UInput
      class="grow"
      :color="selectedThemeColor"
      variant="outline"
      :placeholder="$t('enterTasks')"
      @keyup.enter="handleAddTask"
      v-model="editTaskText"
    />
    <UButton
      icon="i-mynaui:save"
      size="sm"
      :color="selectedThemeColor"
      square
      variant="solid"
      @click="handleAddTask"
    />
  </div>
  <div class="flex flex-col h-full min-h-80 gap-2">
    <TransitionFade>
      <TransitionGroup
        v-if="tasksList.length"
        name="list" tag="ul" 
        class="task-items-list flex flex-col gap-2"
      >
        <li v-for="(task, index) of tasksList" :key="index" class="task-item">
          <div :class="[`rounded-md p-2 flex gap-2 bg-${taskBg(task)}-100`]">
            <UCheckbox
              class="grow"
              :color="selectedThemeColor"
              :ui="{
                base: 'flex',
                label: 'text-gray-700 dark:text-gray-800',
                background: 'bg-white dark:bg-gray-500',
                container: 'max-w-md',
                wrapper: 'max-w-90',
              }"
              v-model="task.completed"
              name="notifications"
              :label="task.text"
            />
            <UButton
              icon="i-tabler:trash"
              size="sm"
              color="red"
              square
              variant="solid"
              :ui="{
                base: 'w-8 h-8',
              }"
              @click="handleDeleteTaskItem(task.text)"
            />
          </div>
        </li>
      </TransitionGroup>
      <p :class="[`p-2 h-24 rounded-md bg-${selectedThemeColor}-100`]" v-else>{{ $t("taskListEmpty") }}</p>
    </TransitionFade>
    <div class="flex gap-2 mt-auto">
      <UButton
        @click="emit('new-task')"
        icon="i-tabler:file-plus"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, justify-center, transition, duration-300"
      >
        {{ $t("new") }}
      </UButton>
      <UButton
        icon="i-material-symbols-light:save-outline-sharp"
        :color="selectedThemeColor"
        variant="solid"
        class="flex, items-center, align-start justify-center, transition, duration-300 self-start"
        @click="handleSaveTasks"
      >
        {{ $t("save") }}
      </UButton>
      <TransitionFade>
        <UButton
          v-if="currentOpenedNote"
          icon="i-material-symbols-light:save-as-outline-rounded"
          :color="selectedThemeColor"
          variant="solid"
          class="flex, items-center, align-start justify-center, transition, duration-300 self-start"
          @click="handleSaveNewTasks"
        >
          {{ $t("saveas") }}
        </UButton>
      </TransitionFade>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "~/stores/theme/theme";
import { useNotesStore } from "~/stores/notes/notes";
import type { ITaskItem } from "~/stores/notes/types";
import type { ITaskEditorProps } from "./types";

const emit = defineEmits([
  "save-task",
  "open-save-as",
  "new-task",
  "save-note",
]);
const props = defineProps<ITaskEditorProps>();

const themeStore = useThemeStore();
const { selectedThemeColor } = storeToRefs(themeStore);

const noteStore = useNotesStore();
const { tasksList, currentOpenedNote } = storeToRefs(noteStore);

const editTaskText = ref<string>("");
const model = defineModel<ITaskItem[]>();

const taskBg = (task: ITaskItem) => {
  return task.completed ? "green" : selectedThemeColor.value;
};

const handleAddTask = () => {
  if (editTaskText.value.length) {
    console.log("Adding task:", editTaskText.value);
    tasksList.value.push({ text: editTaskText.value, completed: false });
    editTaskText.value = "";
    console.log("Current tasks:", tasksList.value);
  }
};

const handleDeleteTaskItem = (taskText: string) => {
  const index = tasksList.value.findIndex((item) => item.text === taskText);
  tasksList.value.splice(index, 1);
};

const handleSaveTasks = () => {
  if (!tasksList.value.length) {
    return;
  }
  if (currentOpenedNote.value) {
    emit("save-task");
    return;
  }
  emit("open-save-as", "task");
};

const handleSaveNewTasks = () => {
  if (!currentOpenedNote.value) {
    return;
  }
  emit("open-save-as", "task");
};
</script>

<style scoped>

</style>
