<template>
  <div class="picker" ref="colorsListRef">
    <UButton
      icon="i-material-symbols:palette-outline"
      size="sm"
      :color="modelValue"
      square
      variant="outline"
      @click="isOpen = !isOpen"
    />
    <TransitionFade>
        <ul v-if="isOpen" class="picker__list bg-white shadow-xl p-1">
          <li
            class="picker__list-item"
            v-for="(color, index) in colorsList"
            :key="index"
            :class="`bg-${color}-500`"
            @click="updateColor(color)"
          />
        </ul>
    </TransitionFade>
  </div>
</template>

<script lang="ts" setup>
import type { TThemeColor } from "~/types/theme";
import { defaultProps, type ISelectThemeProps } from "./types";
import { useModal } from "~/composables/useModal";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

// Состояния
const { isOpen, closeModal, openModal } = useModal();
const props = withDefaults(defineProps<ISelectThemeProps>(), defaultProps);
const emit = defineEmits<{
  (e: "update:modelValue", color: TThemeColor): void;
}>();

const colorsListRef = ref<HTMLElement | null>(null);

// Закрываем модалку при клике вне элементов
onClickOutside(colorsListRef, () => {
  if (isOpen) {
    closeModal();
    isOpen.value = false; // Обновляем значение isOpen, если оно открыто
  }
});

const updateColor = (color: TThemeColor): void => {
  closeModal();
  emit("update:modelValue", color);
};
</script>

<style lang="scss" scoped>
.picker {
  
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: max-content;
  &__selected {
    cursor: pointer;
    border-radius: 6px;
    width: 32px;
    height: 32px;
  }
  &__list {
  z-index: 10;
    position: absolute;
    display: flex;
    min-width: 110px;
    top: 35px;
    right: 0;
    width: 100%;
    flex-wrap: wrap;
    gap: 5px;
    &-item {
      cursor: pointer;
      flex: 1 0 20%;
      max-width: 23%;
      border-radius: 6px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
