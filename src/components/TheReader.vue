<template>
  <div id="markable">
    <div v-if="currentDocument" class="flex flex-col">
      <h1 class="text-2xl md:text-4xl text-red-700 font-display mx-auto mb-5">{{ currentDocument.data.name }}</h1>
      <p class="text-sm md:text-base font-display mx-auto text-justify">{{ currentDocument.data.description }}</p>
      <div v-for="chapter in filteredDocument.data.chapters" :key="chapter.name" class="mt-10">
        <div class="flex flex-row">
          <span class="text-2xl md:text-3xl text-red-700 font-display mr-3">{{ chapter.id }}</span>
          <span class="text-lg md:text-2xl font-display">{{ chapter.title }}</span>
        </div>
        <div v-if="chapter.sections" class="flex flex-col px-5">
          <div v-for="section in chapter.sections" :key="section.id" class="my-2">
            <span class="text-base md:text-lg text-red-700 font-display mr-2">§</span>
            <span class="text-base md:text-lg font-display mr-3">{{ section.id }}</span>
            <p class="text-base md:text-lg font-display text-justify whitespace-pre-wrap leading-relaxed">{{ section.text }}</p>
          </div>
        </div>
        <div v-else class="flex flex-col px-5">
          <div class="my-2">
            <p class="text-base md:text-lg font-display text-justify whitespace-pre-wrap leading-relaxed">{{ chapter.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col">
      <h1 class="text-2xl md:text-4xl text-red-700 font-display mb-5">Select a text from the library to begin reading.</h1>
    </div>
  </div>
</template>

<script>
import {
  computed, onMounted, onUpdated, nextTick, toRefs,
} from 'vue';
import Mark from 'mark.js';
import useDocumentsStore from '../stores/documents';

export default {
  name: 'TheReader',
  setup() {
    const documentsStore = useDocumentsStore();
    const { currentDocument } = documentsStore;
    const { searchTerm } = toRefs(documentsStore);
    const filteredDocument = computed(() => {
      if (searchTerm.value.length) {
        const document = {
          data: {
            chapters: [],
          },
        };

        currentDocument.data.chapters.forEach((chapter) => {
          if (chapter.sections) {
            const sections = chapter.sections.filter((section) => section.text.toLowerCase().includes(searchTerm.value.toLowerCase()));

            const filteredChapter = {
              id: chapter.id,
              title: chapter.title,
              sections,
            };

            if (filteredChapter.sections.length > 0) {
              document.data.chapters.push(filteredChapter);
            }
          }

          if (chapter.text && chapter.text.toLowerCase().includes(searchTerm.value.toLowerCase())) {
            document.data.chapters.push(chapter);
          }
        });

        return document;
      }
      return currentDocument;
    });
    onMounted(async () => {
      window.dispatchEvent(new Event('esv-crossref.trigger-linkify'));
    });
    onUpdated(async () => {
      const instance = new Mark(document.getElementById('markable'));
      if (searchTerm.value.length > 2) {
        await instance.unmark();
        await instance.mark(searchTerm.value, {
          separateWordSearch: false,
        });
      } else if (searchTerm.value.length <= 2) {
        await instance.unmark();
      }
      window.dispatchEvent(new Event('esv-crossref.trigger-linkify'));
    });
    return {
      searchTerm,
      currentDocument,
      filteredDocument,
    };
  },
};
</script>

<style>
mark {
  @apply bg-green-300 rounded-sm;
}
</style>
