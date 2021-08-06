<template>
  <div>
    <div id="markable" v-if="currentDocument" class="flex flex-col">
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
      <router-link to="/library" class="relative block w-full h-1/2 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="mt-2 block text-sm font-medium text-gray-900">
          Select a text from the Library to start reading!
        </span>
      </router-link>
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
    const markDocument = async () => {
      if (currentDocument) {
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
      }
    };
    onMounted(async () => {
      markDocument();
    });
    onUpdated(async () => {
      markDocument();
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
