<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1 border-r border-gray-200">
        <div class="flex items-center flex-shrink-0 p-4 bg-white">
          <div class="flex flex-col my-auto">
            <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-blue-gray-700 font-bold leading-6">Common</span>
            <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-blue-gray-700 font-bold leading-6 mt-0.5">Order</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 bg-white space-y-1">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[isActive(item.href) ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base rounded-md']">
              <component :is="item.icon" :class="[isActive(item.href) ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
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
    MenuAlt2Icon,
    SearchIcon,
    XIcon,
  },
  setup() {
    const navStore = useNavigationStore();
    const navigation = navStore.menuItems;
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = (path) => path === activeRoute.value;
    return {
      activeRoute,
      isActive,
      navigation,
    };
  },
};
</script>

<style scoped>

</style>
