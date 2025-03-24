import { defineStore } from "pinia";
import { reactive, onMounted } from "vue";
import type { IUserData } from "../login/types";

export const useUserStore = defineStore("user", () => {
  const currentUser = reactive<IUserData>({
    id: "",
    useremail: "",
    username: "",
    useravatar: "",
  });

  const updateUser = async (body: Partial<IUserData>) => {
    try {
      const { data, error } = await useFetch<IUserData>(
        `${import.meta.env.VITE_BASE_URI}/user`,
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
      if (responseData) {
        await setUserToLocalStorage(responseData)
        await updateCurrentUser(responseData);
      } else {
        throw new Error("No data received from server");
      }

      return responseData;
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };
  const updatePassword = async (body: Record<string, string>) => {
    try {
      const { data, error } = await useFetch<IUserData>(
        `${import.meta.env.VITE_BASE_URI}/user/change-password`,
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
      
      return responseData;
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  };

  const deleteAccount = async () => {
    try {
      const { data, error } = useFetch<any>(
        `${import.meta.env.VITE_BASE_URI}/user/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${useCookie("token").value}`,
          },
        }
      );
      if (data) {
        localStorage.removeItem("user");
      }
    } catch (err) {
      throw err;
    }
  };

  const updateCurrentUser = (data: IUserData): void => {
    currentUser.id = data.id;
    currentUser.useremail = data.useremail;
    currentUser.username = data.username;
    currentUser.useravatar = data.useravatar || "";
  };

  const setUserToLocalStorage = (data: IUserData): void => {
    JSON.stringify({
      id: data.id,
      useremail: data.useremail,
      username: data.username,
      useravatar: data.useravatar,
    });
  };

  onMounted(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "null");
    if (userData) {
      updateCurrentUser(userData);
    }
  });

  return { currentUser, updateUser, deleteAccount, updatePassword };
});
