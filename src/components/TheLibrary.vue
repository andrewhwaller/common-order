<template>
  <div class="flex flex-col sm:pt-16 sm:pb-16 pb-32 pt-14">
    <h1 class="text-2xl md:text-4xl text-red-700 font-display mb-5">{{ t('library.title') }}</h1>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <LibraryItem v-for="document in documents" :document="document" :key="document.data.name" />
      </ul>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import useDocumentsStore from '../stores/documents';
import LibraryItem from './LibraryItem.vue';

export default {
  name: 'TheLibrary',
  components: { LibraryItem },
  setup() {
    const { t, locale } = useI18n();
    const documentsStore = useDocumentsStore();
    const { documents, setCurrentDocument } = toRefs(documentsStore);
    return {
      t,
      locale,
      documents,
      setCurrentDocument,
    };
  },
};
</script>

<style scoped>

</style>
