<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" static class="fixed inset-0 flex z-40 md:hidden">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
          <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="closeSidebar()">
                <span class="sr-only">Close sidebar</span>
                <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="flex items-center flex-shrink-0 p-4 bg-white">
            <div class="flex flex-col my-auto">
              <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-blue-gray-700 font-bold leading-6">Common</span>
              <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-blue-gray-700 font-bold leading-6 mt-0.5">Order</span>
            </div>
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href" @click="closeSidebar" :class="[isActive(item.href) ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base rounded-md']">
                <component :is="item.icon" :class="[isActive(item.href) ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                {{ item.name }}
              </router-link>
            </nav>
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { toRefs, computed } from 'vue';
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  BellIcon,
  BookmarkIcon,
  BookOpenIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
} from '@heroicons/vue/outline';
import { SearchIcon } from '@heroicons/vue/solid';
import useNavigationStore from '../stores/navigation';
import router from '../router';

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    BellIcon,
    BookmarkIcon,
    BookOpenIcon,
    HomeIcon,
    MenuAlt2Icon,
    SearchIcon,
    XIcon,
  },
  setup() {
    const navStore = useNavigationStore();
    const { closeSidebar } = navStore;
    const { sidebarOpen } = toRefs(navStore);
    const navigation = navStore.menuItems;
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = (path) => path === activeRoute.value;
    return {
      activeRoute,
      isActive,
      navigation,
      closeSidebar,
      sidebarOpen,
    };
  },
};
</script>
