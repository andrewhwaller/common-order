<template>
  <div class="flex flex-col">
    <h1 id="document-title" class="text-2xl md:text-4xl text-red-700 font-display mx-auto mb-5">{{ currentDocument.data.name }}</h1>
    <p class="text-sm md:text-base font-display mx-auto text-justify mb-5">{{ currentDocument.data.description }}</p>
    <TheTableOfContents v-if="currentDocument.data.chapters" :chapters="currentDocument.data.chapters" class="mb-5" />
    <div id="markable">
      <div v-if="filteredDocument.data.chapters" v-for="chapter in filteredDocument.data.chapters" :key="chapter.name" v-bind:id="chapter.id" class="pt-10">
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
      <div v-else class="pt-10">
        <div class="flex flex-col px-5">
          <div class="my-2">
            <p class="text-base md:text-lg font-display text-justify whitespace-pre-wrap leading-relaxed">{{ filteredDocument.data.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed, onMounted, onUpdated, ref, toRefs, watch,
} from 'vue';
import Mark from 'mark.js';
import { useI18n } from 'vue-i18n';
import { createScriptLoader } from '@bigcommerce/script-loader';
import { ArrowUpIcon } from '@heroicons/vue/solid';
import TheTableOfContents from './TheTableOfContents.vue';
import useDocumentsStore from '../stores/documents';
import useApplicationStore from '../stores/application';
import router from '../router';

export default {
  name: 'TheTextDisplay',
  components: {
    ArrowUpIcon,
    TheTableOfContents,
  },
  props: {
    document: Object,
  },
  async beforeRouteEnter(to, from, next) {
    const documentsStore = useDocumentsStore();
    const applicationStore = useApplicationStore();
    const { documents, currentDocument } = toRefs(documentsStore);
    if (to.params.slug && currentDocument.value === null) {
      documentsStore.loading = true;
      await applicationStore.showSplashScreen();
      await documentsStore.getAllDocuments();
      const document = documents.value.find((element) => element.data.slug === to.params.slug);
      if (!document) {
        router.push('404');
      }
      documentsStore.setCurrentDocument(document);
      applicationStore.hideSplashScreen();
    }
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    const documentsStore = useDocumentsStore();
    const applicationStore = useApplicationStore();
    const { documents, currentDocument } = toRefs(documentsStore);
    if (to.params.slug && currentDocument.value === null) {
      documentsStore.loading = true;
      await applicationStore.showSplashScreen();
      await documentsStore.getAllDocuments();
      const document = documents.value.find((element) => element.data.slug === to.params.slug);
      documentsStore.setCurrentDocument(document);
      applicationStore.hideSplashScreen();
    }
    next();
  },
  setup() {
    const { t, locale } = useI18n();
    const reactiveLocale = ref(locale);
    const documentsStore = useDocumentsStore();
    const { searchTerm, currentDocument } = toRefs(documentsStore);
    const filteredDocument = computed(() => {
      if (searchTerm.value.length && currentDocument.value.data.chapters) {
        const document = {
          data: {
            chapters: [],
          },
        };

        currentDocument.value.data.chapters.forEach((chapter) => {
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
      return currentDocument.value;
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
      }
      window.refTagger.tag(document.getElementById('markable'));
    };
    const scrollToTop = () => {
      const main = document.getElementById('main');
      main.scrollTop = 0;
    };
    onMounted(async () => {
      await markDocument();
    });
    onUpdated(async () => {
      await markDocument();
    });
    return {
      reactiveLocale,
      currentDocument,
      filteredDocument,
      scrollToTop,
    };
  },
};
</script>

<style>
a.rtBibleRef {
  color: #0EA5E9;
}
mark {
  @apply bg-green-300 rounded-sm;
}
</style>
