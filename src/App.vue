<template>
  <div>
    <TheSplashScreen v-bind:display="splashScreen" />
    <div class="h-screen flex overflow-hidden bg-gray-100">
      <TheMobileSidebar />
      <TheDesktopSidebar />
      <div class="flex flex-col w-0 flex-1 h-full overflow-hidden">
        <TheNavbar />
        <main id="main" class="flex-1 relative overflow-y-auto focus:outline-none sm:pt-16 sm:pb-16 pb-32 pt-14">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto px-5 sm:px-0">
                <router-view />
              </div>
            </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue';
import TheMobileSidebar from './components/TheMobileSidebar.vue';
import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
import TheNavbar from './components/TheNavbar.vue';
import TheSplashScreen from './components/TheSplashScreen.vue';
import useDocumentsStore from './stores/documents';
import useApplicationStore from './stores/application';

export default {
  components: {
    TheNavbar,
    TheDesktopSidebar,
    TheMobileSidebar,
    TheSplashScreen,
  },
  setup() {
    const applicationStore = useApplicationStore();
    const { splashScreen } = toRefs(applicationStore);
    const documentsStore = useDocumentsStore();
    onMounted(() => {
      documentsStore.getAllDocuments();
      setTimeout(async () => {
        applicationStore.hideSplashScreen();
      }, 1000);
    });
    return {
      splashScreen,
    };
  },
};
</script>
