import { useLoginStore } from "~/stores/login/loginStore";
import { storeToRefs } from "pinia";
import { vModelCheckbox } from "vue";

const loginStore = useLoginStore();

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');

  // if (!token.value && to.name !== 'login') { 
  //     return navigateTo('/login');
  // }
});