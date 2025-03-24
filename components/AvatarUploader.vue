<template>
  <div class="avatar-uploader">
    <div
      class="avatar-container"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="triggerFileInput"
      :class="{ 'dragging': isDragging }"
    >
      <img v-if="imageSrc" :src="imageSrc" alt="Avatar" class="avatar-image" />
      <span v-else class="avatar-placeholder">{{ currentUser.username }}</span>
      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        style="display: none;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import imageCompression from 'browser-image-compression';
import { useUserStore } from '~/stores/userStore/userStore';

const emit = defineEmits<{
  (e: 'update:image', imageSrc: string): void;
}>();

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore)

const isDragging = ref<boolean>(false);
const imageSrc = computed(() => currentUser.value.useravatar);
const fileInput = ref<HTMLInputElement | null>(null);

const onDragOver = (): void => {
  isDragging.value = true;
};

const onDragLeave = (): void => {
  isDragging.value = false;
};

const onDrop = (event: DragEvent): void => {
  isDragging.value = false;
  const file = event.dataTransfer?.files[0] as File;
  handleFile(file);
};

// Открытие диалога выбора файла
const triggerFileInput = (): void => {
  fileInput.value?.click();
};

// Обработка выбора файла
const onFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0]; // [0] для получения первого файла
  if (file) {
    handleFile(file);
  }
};

// Обработка файла
const handleFile = async (file: File | undefined): Promise<void> => {
  if (file && file.type.startsWith('image/')) {
    try {
      const compressedFile = await compressImage(file);
      const base64 = await fileToBase64(compressedFile);
      emit('update:image', base64); // Emit события с изображением
    } catch (error) {
      console.error('Ошибка при обработке изображения:', error);
    }
  }
};

// Сжатие изображения
const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // Максимальный размер файла в MB
    maxWidthOrHeight: 150, // Максимальная ширина или высота
    useWebWorker: true,
  };
  return await imageCompression(file, options);
};

// Преобразование файла в base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); // Явное указание типа результата
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

</script>

<style lang="scss" scoped>
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
background-color: rgb(236, 236, 236);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s, transform 0.3s;
  &:hover{
    background-color: rgb(237, 238, 206);
    transform: scale(1.05);
  }
}

.avatar-container.dragging {
  border-color: #000;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: #ccc;
  font-size: 14px;
  text-align: center;
}
</style>