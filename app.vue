<template>
  <div>
    <div class="theme-controllers">
      <div class="avatar"  @click="menu?.openMenu()">
        <UAvatar
          v-if="route.path !== '/login' && route.path !== '/register'"
          :src="avatar"
          :alt="currentUser.username"              
        />
      </div>
      <USelectMenu
        v-model="selectedLang"
        :options="Object.values(ELang)"
        :color="selectedThemeColor"
        @change="setLocale(selectedLang)"
      />
      <ClientOnly class="dark-switcher">
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          :color="selectedThemeColor"
          variant="outline"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
        <template #fallback>
          <div class="w-8 h-8" />
        </template>
      </ClientOnly>
      <VSelectTheme v-model="selectedThemeColor" :colorsList="colorsList" />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <VMainMenu ref="menu"/>
</template>

<script lang="ts" setup>
import { useThemeStore } from "~/stores/theme/theme";
import { colorsList, ELang } from "~/types/theme";
import VMainMenu from "./components/MainMenu/VMainMenu.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "./stores/userStore/userStore";
import { useToken } from "#imports";
import VSelectTheme from "./components/v-color-select/VSelectTheme.vue";

const userSore = useUserStore();
const { currentUser } = storeToRefs(userSore);

const route = useRoute();
const { setLocale } = useI18n();
const themeStore = useThemeStore();
const { isDark, selectedThemeColor, selectedLang } = storeToRefs(themeStore);
const menu = ref<InstanceType<typeof VMainMenu> | null>(null);
const { token } = useToken()
const avatar = computed(() => {
  return currentUser.value.useravatar
})

</script>

<style lang="scss" src="./assets/styles/main.scss"/>
