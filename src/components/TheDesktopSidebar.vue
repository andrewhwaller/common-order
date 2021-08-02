<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
        <div class="flex items-center flex-shrink-0 p-4">
          <svg class="my-auto h-16 w-16 text-red-700 stroke-current fill-current" stroke-width="0.5px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128"><path d="M90 18a5 5 0 00-10 0v10h10zm-2 0h-2v-2.816A3 3 0 0188 18zm-4-2.816V18h-2a3 3 0 012-2.816zM82 20h2v6h-2zm4 6v-6h2v6zM48 18a5 5 0 00-10 0v10h10zm-2 0h-2v-2.816A3 3 0 0146 18zm-4-2.816V18h-2a3 3 0 012-2.816zM40 20h2v6h-2zm4 6v-6h2v6z"/><path d="M85.456 2.1l-.225-.1H42.8l-.225.106A38 38 0 0 0 21 36.261V126h86V36.236A38 38 0 0 0 85.456 2.1zM32.409 45.929A6.926 6.926 0 0 1 34 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 46 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 58 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zM63 36.261V124h-3V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 50 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 38 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 26 50v74h-3V36.261a36 36 0 0 1 20.025-32.15A36 36 0 0 1 63 36.236zm0-12.025A38.062 38.062 0 0 0 46.923 4.01H63zM65 4.01h16.117A38.052 38.052 0 0 0 65 24.259zm9.409 41.919A6.926 6.926 0 0 1 76 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 88 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 100 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zM105 124h-3V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 92 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 80 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 68 50v74h-3V36.261a36 36 0 0 1 20.025-32.15A36 36 0 0 1 105 36.236z"/></svg>
          <div class="flex flex-col mt-1">
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
