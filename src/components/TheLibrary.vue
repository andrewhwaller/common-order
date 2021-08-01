<template>
  <div class="flex flex-col">
    <h1 style="font-family: Lusitana;" class="text-3xl text-red-700 font-semibold mb-5">The Library</h1>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <LibraryItem v-for="document in documents" :document="document" :key="document.data.name" />
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue';
import useDocumentsStore from '../stores/documents';
import LibraryItem from './LibraryItem.vue';

export default {
  name: 'TheLibrary',
  components: { LibraryItem },
  setup() {
    const documentsStore = useDocumentsStore();
    const { documents, setCurrentDocument } = toRefs(documentsStore);
    onMounted(async () => {
      documentsStore.getAllDocuments();
    });
    return {
      documents,
      setCurrentDocument,
    };
  },
};
</script>

<style scoped>

</style>
