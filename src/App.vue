<template>
  <div>
    <TransitionRoot
        :show="splashScreen"
        leave="transition-opacity duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
    >
      <TheSplashScreen />
    </TransitionRoot>
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
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue';
import { TransitionRoot } from '@headlessui/vue';
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
    TransitionRoot,
  },
  setup() {
    const applicationStore = useApplicationStore();
    const { splashScreen } = toRefs(applicationStore);
    const documentsStore = useDocumentsStore();
    onMounted(() => {
      setTimeout(async () => {
        await documentsStore.getAllDocuments();
        applicationStore.hideSplashScreen();
      }, 2000);
    });
    return {
      splashScreen,
    };
  },
};
</script>
