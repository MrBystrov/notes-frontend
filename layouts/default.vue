<template>
  <div :class="styles">
   
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useScreenSize } from '#imports';
const { isMobile } = useScreenSize();
  const styles = computed(() => {
    let styles = `mx-8 my-16 grid grid-cols-[300px_minmax(300px,1fr)] gap-4`
    if(isMobile.value){
      styles =  `mx-8 my-16 flex flex-col gap-4 p-2`
    }
    return styles;
  })
</script>


<style scoped>

</style>
