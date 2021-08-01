<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TheMobileSidebar />
    <TheDesktopSidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <TheNavbar />
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-2 sm:px-2 md:px-36">
            <div class="py-5 px-5 sm:px-10">
              <router-view />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import TheMobileSidebar from './components/TheMobileSidebar.vue';
import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
import TheNavbar from './components/TheNavbar.vue';
import useDocumentsStore from './stores/documents';

export default {
  components: {
    TheNavbar,
    TheDesktopSidebar,
    TheMobileSidebar,
  },
  setup() {
    const documentsStore = useDocumentsStore();
    onMounted(async () => {
      documentsStore.getAllDocuments();
    });
  },
};
</script>
