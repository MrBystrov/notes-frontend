<template>
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#sun"></use>
  </svg>
  <span>Icon not found</span>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const iconExists = ref(false);
const iconHref = ref('');

onMounted(async () => {
  try {
    // Динамически импортируем SVG-файл
    const iconModule = await import(`../assets/svg/${props.name}.svg`);
    iconExists.value = true;
    iconHref.value = `#${props.name}`;
  } catch (e) {
    iconExists.value = false;
  }
});
</script>

<style scoped>
.icon {
  width: 24px; /* Установите нужный размер */
  height: 24px;
}
</style>