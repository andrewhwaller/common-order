<template>
  <li>
    <a @click="goToItem(document)" class="cursor-pointer block hover:bg-gray-50">
      <div class="px-4 py-4 sm:px-6">
        <div class="flex items-center justify-between">
          <span class="text-sm md:text-base font-medium text-sky-700">
            {{ document.data.name }}
          </span>
          <div class="ml-2 flex-shrink-0 flex">
            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ document.data.category }}
            </p>
          </div>
        </div>
        <div class="mt-2 sm:flex sm:justify-between">
          <div class="sm:flex">
            <p class="mt-2 flex items-center text-sm text-gray-500">
              {{ document.data.description }}
            </p>
          </div>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
import useDocumentsStore from '../stores/documents';
import router from '../router';

export default {
  name: 'LibraryItem',
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const documentsStore = useDocumentsStore();
    const { setCurrentDocument } = documentsStore;
    const goToItem = async (item) => {
      setCurrentDocument(item);
      router.push({
        name: 'text',
        params: {
          slug: item.data.slug,
        },
      });
    };
    return {
      goToItem,
    };
  },
};
</script>
