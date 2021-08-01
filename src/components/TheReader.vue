<template>
  <div class="flex flex-col">
    <h1 class="text-2xl md:text-4xl text-red-700 font-display mb-5">{{ currentDocument.data.name }}</h1>
    <p class="text-sm md:text-base font-display">{{ currentDocument.data.description }}</p>
    <div v-for="chapter in currentDocument.data.chapters" :key="chapter.name" class="mt-10">
      <div class="flex flex-row">
        <span class="text-2xl md:text-3xl text-red-700 font-display mr-3">{{ chapter.id }}</span>
        <span class="text-lg md:text-2xl font-display">{{ chapter.title }}</span>
      </div>
      <div class="flex flex-col px-5">
        <div v-for="section in chapter.sections" :key="section.id" class="my-2">
          <span class="text-base md:text-lg text-red-700 font-display mr-2">§</span>
          <span class="text-base md:text-lg font-display mr-3">{{ section.id }}</span>
          <p class="text-base md:text-lg font-display text-justify whitespace-pre-wrap leading-relaxed">{{ section.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useDocumentsStore from '../stores/documents';

export default {
  name: 'TheReader',
  setup() {
    const documentsStore = useDocumentsStore();
    const { currentDocument } = documentsStore;
    return {
      currentDocument,
    };
  },
};
</script>

<style scoped>

</style>
