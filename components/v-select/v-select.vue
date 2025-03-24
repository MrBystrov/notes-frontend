<template>
  <div ref="dropdown" class="v-dropdown">
    <div class="v-dropdown-toggle" @click="handleClickSelect">
      {{ modelValue?.name || $t('selectOption') }}
    </div>
    <transition-fade>
      <div  class="v-dropdown-list  bg-white dark:bg-gray-900 shadow-xl"  v-if="isOpen">
        <div class="v-dropdown-item" v-for="option in options" :key="option.id" @click="onClickOption(option)">
          {{ option.name }}
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script lang="ts" setup>
import type { ISelectProps, TSelectOption } from "./types";
import { useModal } from "@/composables/useModal";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import TransitionFade from "../transition-fade/TransitionFade.vue";
import { storeToRefs } from "pinia";

const props = defineProps<ISelectProps>();
const emit = defineEmits(['update:modelValue']);
const { isOpen, openModal, closeModal } = useModal();

const modelValue = defineModel<TSelectOption | null>({ required: true });

const dropdown = ref<HTMLElement | null>(null);

const handleClickSelect = (): void => {
  isOpen.value = ! isOpen.value 
};

const onClickOption = (option: TSelectOption): void => {
  modelValue.value = option; 
  emit('update:modelValue', option); 
  closeModal();
};

onClickOutside(dropdown, () => {
  closeModal();
});
</script>

<style lang="scss" scoped src="./v-select.scss" />
