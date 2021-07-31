<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-sky-900">
          <div class="flex flex-col my-auto">
            <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-white leading-6">Common</span>
            <span style="font-family: Lusitana;" class="text-3xl tracking-tight text-white leading-6 mt-0.5">Order</span>
          </div>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 bg-sky-800 space-y-1">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-sky-900 text-white' : 'text-sky-300 hover:bg-sky-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
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
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/vue/outline';
import { SearchIcon } from '@heroicons/vue/solid';

const navigation = [
  {
    name: 'Dashboard', href: '#', icon: HomeIcon, current: true,
  },
  {
    name: 'Team', href: '#', icon: UsersIcon, current: false,
  },
  {
    name: 'Projects', href: '#', icon: FolderIcon, current: false,
  },
  {
    name: 'Calendar', href: '#', icon: CalendarIcon, current: false,
  },
  {
    name: 'Documents', href: '#', icon: InboxIcon, current: false,
  },
  {
    name: 'Reports', href: '#', icon: ChartBarIcon, current: false,
  },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

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
    const sidebarOpen = ref(false);

    return {
      navigation,
      userNavigation,
      sidebarOpen,
    };
  },
};
</script>

<style scoped>

</style>
