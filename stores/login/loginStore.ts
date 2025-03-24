import { createGlobalState, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type { UserInfoWithoutName } from "~/types/auth";
import type { IUserData } from "./types";

export const useLoginStore = defineStore("login", () => {
  const fetchLogin = async (body: UserInfoWithoutName) => {
    try {
      const { data, error } = await useFetch<IUserData>(
        `${import.meta.env.VITE_BASE_URI}/auth/login`,
        {
          method: "POST",
          body: body,
          credentials: 'include',
        }
      );

      if (error.value) {
        console.error('Login error:', error.value);
        throw new Error(error.value.message || 'Login failed');
      }
      
      const responseData = data.value;
      console.log(responseData)
      if (responseData) {
        localStorage.setItem('user', JSON.stringify({
          id: responseData.user._id,
          useremail: responseData.user.useremail,
          username: responseData.user.username,
          useravatar: responseData.user.useravatar,
        }))

      } else {
        throw new Error('No data received from server');
      }
      return data; 
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  };

  const logOut = () => {
    const token = useCookie('token');
    token.value = null;
  
    navigateTo('login');
  };
  
  return {
    fetchLogin,
    logOut
  };
});