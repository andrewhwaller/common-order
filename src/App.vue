<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TheMobileSidebar />
    <TheDesktopSidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <TheNavbar />
      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
import useReaderStore from './stores/reader';
import TheMobileSidebar from './components/TheMobileSidebar.vue';
import TheReader from './components/TheReader.vue';
import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
import TheNavbar from './components/TheNavbar.vue';
import TheWelcomeScreen from './components/TheWelcomeScreen.vue';

export default {
  components: {
    TheNavbar,
    TheDesktopSidebar,
    TheMobileSidebar,
    TheReader,
    TheWelcomeScreen,
  },
  setup() {

  },
};
</script>
