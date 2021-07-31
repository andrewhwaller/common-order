import { defineStore } from 'pinia';
import {
  BookmarkIcon, HomeIcon, BookOpenIcon,
} from '@heroicons/vue/outline';

const useNavigationStore = defineStore('navigation', {
  state: () => ({
    sidebarOpen: false,
    menuItems: [
      {
        name: 'Home', href: '/', icon: HomeIcon,
      },
      {
        name: 'Library', href: '/library', icon: BookmarkIcon,
      },
      {
        name: 'Reader', href: '/reader', icon: BookOpenIcon,
      },
    ],
  }),
  actions: {
    openSidebar() {
      this.sidebarOpen = true;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
  },
});

export default useNavigationStore;
