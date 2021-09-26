<template>
  <div id="search" :class="{ 'is-hidden': !showSearch }" class="z-30 sticky top-0 left-0 right-0 border-gray-500 border-b" v-if="$route.params.slug">
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
            name="document-search"
            autocomplete="off" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  toRefs, ref, onMounted, onBeforeUnmount,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { SearchIcon } from '@heroicons/vue/solid';
import useDocumentsStore from '../stores/documents';

export default {
  name: 'TheReaderSearchInput.vue',
  components: {
    SearchIcon,
  },
  setup() {
    const { t, locale } = useI18n();
    const documentsStore = useDocumentsStore();
    const { searchTerm } = toRefs(documentsStore);
    const lastScrollPosition = ref(0);
    const scrollOffset = (58);
    const showSearch = ref(true);
    const scrollHandler = () => {
      console.log('scrolling');
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
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollHandler);
    });
    return {
      t,
      locale,
      searchTerm,
      showSearch,
      scrollHandler,
      lastScrollPosition,
    };
  },
};
</script>

<style scoped>
#search {
  transform: translateY(0);
  transition: transform 250ms linear;
}

#search.is-hidden {
  transform: translateY(-100%);
}
</style>
