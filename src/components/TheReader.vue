<template>
  <div class="flex flex-col">
    <h1 style="font-family: Lusitana;" class="text-lg md:text-3xl text-red-700 font-semibold mb-5">{{ currentDocument.data.name }}</h1>
    <p style="font-family: Lusitana;" class="text-sm md:text-base">{{ currentDocument.data.description }}</p>
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
