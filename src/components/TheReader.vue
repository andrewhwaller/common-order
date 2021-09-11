<template>
  <div>
    <div id="search" :class="{ 'is-hidden': !showSearch }" class="z-30 sticky top-0 left-0 right-0 border-gray-500 border-b" v-if="currentDocument && $route.name === 'reader'">
      <div class="w-full flex bg-gray-100 px-4 py-2 bg-gray-100">
        <label for="search-field" class="sr-only">{{ t('navbar.search_placeholder') }}</label>
        <div class="relative w-full text-gray-400 focus-within:text-gray-600">
          <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <SearchIcon class="h-5 w-5" aria-hidden="true" />
          </div>
          <input
              id="search-field"
              v-model="searchTerm"
              class="block w-full h-full pl-8 pr-3 py-2 border-transparent
              md:text-lg text-gray-900 placeholder-gray-500 focus:outline-none
              focus:placeholder-gray-400 focus:ring-0 focus:border-transparent
              sm:text-sm bg-gray-100"
              :placeholder="t('navbar.search_placeholder')"
              type="search"
              name="document-search"
              autocomplete="off" />
        </div>
      </div>
    </div>
    <div class="z-20 sm:pt-16 sm:pb-16 pb-32 pt-14">
    <div v-if="currentDocument" class="flex flex-col">
      <h1 id="document-title" class="text-2xl md:text-4xl text-red-700 font-display mx-auto mb-5">{{ currentDocument.data.name }}</h1>
      <p class="text-sm md:text-base font-display mx-auto text-justify mb-5">{{ currentDocument.data.description }}</p>
      <TheTableOfContents :chapters="currentDocument.data.chapters" class="mb-5" />
      <div id="markable">
        <div v-for="chapter in filteredDocument.data.chapters" :key="chapter.name" v-bind:id="chapter.id" class="pt-10">
          <div class="flex flex-row">
            <span class="text-2xl md:text-3xl text-red-700 font-display mr-3">{{ chapter.id }}</span>
            <span class="text-lg md:text-2xl font-display">{{ chapter.title }}</span>
            <button type="button" @click.prevent="scrollToTop" class="my-auto ml-auto inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs rounded bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              <ArrowUpIcon class="h-4 w-4" />
            </button>
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
    </div>
    <div v-else class="flex flex-col">
      <router-link to="/library" class="relative block w-full h-1/2 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="mt-2 block text-sm font-medium text-gray-900">
          {{ t('reader.skeleton_text') }}
        </span>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import {
  computed, onBeforeUnmount, onMounted, onUpdated, toRefs, ref,
} from 'vue';
import Mark from 'mark.js';
import { useI18n } from 'vue-i18n';
import { ArrowUpIcon, SearchIcon } from '@heroicons/vue/solid';
import TheTableOfContents from './TheTableOfContents.vue';
import useDocumentsStore from '../stores/documents';

export default {
  name: 'TheReader',
  components: {
    ArrowUpIcon,
    SearchIcon,
    TheTableOfContents,
  },
  setup() {
    const { t, locale } = useI18n();
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
    const lastScrollPosition = ref(0);
    const scrollOffset = (58);
    const showSearch = ref(true);
    // const columnScrollPosition = computed(() => document.getElementById('main').scrollTop);
    const scrollToTop = () => {
      const main = document.getElementById('main');
      main.scrollTop = 0;
    };
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
    const scrollHandler = () => {
      const columnScrollPosition = document.getElementById('main').scrollTop;
      if (columnScrollPosition < 0) {
        return;
      }
      if (Math.abs(columnScrollPosition - lastScrollPosition.value) < scrollOffset.value) {
        return;
      }
      showSearch.value = searchTerm.value ? true : columnScrollPosition < lastScrollPosition.value;
      lastScrollPosition.value = columnScrollPosition;
    };
    onMounted(async () => {
      lastScrollPosition.value = document.getElementById('main').scrollTop;
      window.addEventListener('scroll', scrollHandler, true);
      markDocument();
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollHandler);
    });
    onUpdated(async () => {
      markDocument();
    });
    return {
      t,
      locale,
      searchTerm,
      showSearch,
      scrollHandler,
      currentDocument,
      filteredDocument,
      scrollToTop,
      lastScrollPosition,
      // columnScrollPosition,
      TheTableOfContents,
    };
  },
};
</script>

<style>
mark {
  @apply bg-green-300 rounded-sm;
}

#search {
  transform: translateY(0);
  transition: transform 250ms linear;
}

#search.is-hidden {
  transform: translateY(-100%);
}
</style>
