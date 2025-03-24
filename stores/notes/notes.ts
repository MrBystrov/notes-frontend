import { defineStore } from "pinia";
import type { INote, ITaskItem, TNotesType } from "./types";
import type { TSelectOption } from "~/components/v-select/types";
import { useDebounceFn } from "@vueuse/core";

export const useNotesStore = defineStore("notes", () => {
  const selectedNotes = ref<INote[]>([]);
  const tasksList = ref<ITaskItem[]>([]);
  const selectedTypeOfNotes = ref<string>("Notes");
  const currentOpenedNote = ref<INote | null>(null);
  const activeNoteTitle = ref<string>("");
  const isEditing = ref<boolean>(false);
  const filtredTitle = ref<string>('');

  const currentSelectedOption = ref<TSelectOption | null>(null);

  const getActiveNotes = async (range?: string, title?: string) => {
    try {
      const queryParams = new URLSearchParams();
      if (range) {
        queryParams.append("range", range);
      }

      if (title) {
        queryParams.append("title", title);
      }

      const url = `${
        import.meta.env.VITE_BASE_URI
      }/notes/active?${queryParams.toString()}`;

      const { data, error } = await useFetch<INote[]>(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      });

      if (data.value) {
        return data.value;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTasksNotes = async () => {
    try {
      const { data, error } = await useFetch<INote[]>(
        `${import.meta.env.VITE_BASE_URI}/notes/tasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (data.value) {
        return data.value;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getArchiveNotes = async () => {
    try {
      const { data, error } = await useFetch<INote[]>(
        `${import.meta.env.VITE_BASE_URI}/notes/archive`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (data.value) {
        return data.value;
      } else {
        return [];
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async (body: Partial<INote>) => {
    try {
      const { data, error } = await useFetch<INote>(
        `${import.meta.env.VITE_BASE_URI}/notes`,
        {
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Update failed");
      }

      const responseData = data.value;
      if (responseData) {
        selectedNotes.value.push(responseData);
      }
      return responseData;
    } catch (err) {
      throw new Error("No data received from server");
    }
  };
  const updateNote = async (body: Partial<INote>, id: INote["_id"]) => {
    try {
      const { data, error } = await useFetch<INote>(
        `${import.meta.env.VITE_BASE_URI}/notes/tasks/${id}`,
        {
          method: "PATCH",
          body: body,
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Update failed");
      }

      const responseData = data.value;
      const index = selectedNotes.value.findIndex((item) => {
        return item._id === data.value?._id;
      });
      selectedNotes.value[index] = data.value as INote;
      // if (responseData) {
      //   selectedNotes.value.push(responseData);
      // }
      return responseData;
    } catch (err) {
      throw new Error("No data received from server");
    }
  };

  const addNoteArchive = async (id: INote["_id"]) => {
    try {
      const { data, error } = await useFetch<INote>(
        `${import.meta.env.VITE_BASE_URI}/notes`,
        {
          method: "PATCH",
          body: { id, active: false },
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Update failed");
      }

      const responseData = data.value;
      if (responseData) {
        const index = selectedNotes.value.findIndex((item) => item._id === id);
        selectedNotes.value.splice(index, 1);
      }
      return responseData;
    } catch (err) {
      throw new Error("No data received from server");
    }
  };

  const deleteNote = async (id: INote["_id"]) => {
    try {
      const { data, error } = await useFetch<INote>(
        `${import.meta.env.VITE_BASE_URI}/notes/` + `${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );

      if (error.value) {
        throw new Error(error.value.message || "Update failed");
      }

      const responseData = data.value;
      if (responseData) {
        const index = selectedNotes.value.findIndex((item) => item._id === id);
        selectedNotes.value.splice(index, 1);
      }
      return responseData;
    } catch (err) {
      throw new Error("No data received from server");
    }
  };

  watch(
    selectedTypeOfNotes,
    async (newVal) => {
      selectedNotes.value = [];
      if (newVal === "Notes") {
        selectedNotes.value = (await getActiveNotes()) as INote[];
      } else {
        selectedNotes.value = (await getTasksNotes()) as INote[];
      }
    },
    { immediate: true }
  );

   const debouncedFilter = useDebounceFn((range, title) => {
      return getActiveNotes(range, title); 
    }, 300);


  watch(currentSelectedOption,  async() => {
    if(currentOpenedNote || filtredTitle){
      selectedNotes.value = (await getActiveNotes(currentSelectedOption.value?.range, filtredTitle.value)) as INote[]
    }
  })
 watch(filtredTitle, async (newValue) => {
  if (newValue || newValue === '') {
    if (newValue) {
      // Если есть значение, выполняем фильтрацию
      selectedNotes.value = (await debouncedFilter(currentSelectedOption.value?.range, newValue)) as INote[];
    } else {
      // Если значение пустое, сбрасываем фильтрацию (например, показываем все заметки)
      selectedNotes.value = (await debouncedFilter(currentSelectedOption.value?.range, '')) as INote[];
    }
  }
});

  return {
    addNote,
    selectedNotes,
    getActiveNotes,
    selectedTypeOfNotes,
    deleteNote,
    addNoteArchive,
    currentOpenedNote,
    tasksList,
    getArchiveNotes,
    activeNoteTitle,
    isEditing,
    updateNote,
    filtredTitle,
    currentSelectedOption,
  };
});
