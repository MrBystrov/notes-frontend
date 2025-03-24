import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { type TThemeColor, ELang } from "~/types/theme";

export const useThemeStore = defineStore("theme", () => {

  const selectedThemeColor = ref<TThemeColor>('primary');
  
  const selectedLang = ref<ELang>(ELang.english)

  const colorMode = useColorMode();
  const isDark = computed({
    get() {
      return colorMode.value === "dark";
    },
    set() {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
  });

  watch(selectedThemeColor, () => {
    localStorage.setItem('theme', selectedThemeColor.value)
  })

  onMounted(() => {
    if(typeof window !== undefined) {
      selectedThemeColor.value = localStorage.getItem('theme') as TThemeColor
    }
  })

  return {
    selectedThemeColor,
    isDark,
    selectedLang
  };
});
