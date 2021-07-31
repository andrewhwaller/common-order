<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TheMobileSidebar :sidebar-open="sidebarOpen" />
    <TheDesktopSidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <TheNavbar />
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-5 px-5 sm:px-10">
              <TheReader />
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TheMobileSidebar from './components/TheMobileSidebar.vue';
import TheReader from './components/TheReader.vue';
import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
import TheNavbar from './components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
    TheDesktopSidebar,
    TheMobileSidebar,
    TheReader,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
