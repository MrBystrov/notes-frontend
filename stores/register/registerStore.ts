import { defineStore } from "pinia";
import type { IUserInfo } from "~/types/auth";

export const useRegisterStore = defineStore("register", () => {

  const fetchRegister = async (body: IUserInfo) => {
    const { data, error } = await useFetch(
      `${import.meta.env.VITE_BASE_URI}/auth/register`,
      {
        method: "POST",
        body: body,
        mode: 'cors'
      }
    );

    return data
  };

  return {
    fetchRegister,
  };
});
