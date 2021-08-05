<template>
  <div class="sticky top-0 flex-shrink-0 flex h-16 bg-white shadow">
      <button class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden" @click="openSidebar()">
        <span class="sr-only">Open sidebar</span>
        <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 px-4 flex justify-between">
        <div class="flex-1 flex">
          <div class="w-full flex md:ml-0">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
              <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon class="h-5 w-5" aria-hidden="true" />
              </div>
              <input id="search-field" v-model="searchTerm" class="block w-full h-full pl-8 pr-3 py-2 border-transparent md:text-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm" placeholder="Search" type="search" name="document-search" autocomplete="off" />
            </div>
          </div>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <div class="ribbon bg-red-500 text-sm whitespace-no-wrap px-5 flex">
            <span class="mx-auto text-white">alpha</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import {
  MenuAlt2Icon,
} from '@heroicons/vue/outline';
import { SearchIcon } from '@heroicons/vue/solid';
import { toRefs } from 'vue';
import useNavigationStore from '../stores/navigation';
import useDocumentsStore from '../stores/documents';

export default {
  name: 'TheNavbar',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    MenuAlt2Icon,
    SearchIcon,
  },
  setup() {
    const documentsStore = useDocumentsStore();
    const { searchTerm } = toRefs(documentsStore);
    const navStore = useNavigationStore();
    const { closeSidebar, openSidebar, sidebarOpen } = navStore;
    return {
      searchTerm,
      sidebarOpen,
      openSidebar,
      closeSidebar,
    };
  },
};
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 94px;
  height: 21px;
  margin-right: -22px;
  margin-top: 15px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Safari prior 9.0 */
  transform: rotate(45deg); /* Standard syntax */
}
</style>
