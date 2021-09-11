<template>
  <div>
    <TheSplashScreen v-bind:display="splashScreen" />
    <div class="h-screen flex overflow-hidden bg-gray-100">
      <TheMobileSidebar />
      <TheDesktopSidebar />
<!--        <button class="flex flex-shrink-0 stick top-0 md:hidden px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 md:hidden" @click="openSidebar()">-->
<!--          <span class="sr-only">Open sidebar</span>-->
<!--          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />-->
<!--        </button>-->
<!--      <div class="absolute top-0 left-0 -mr-12 pt-2">-->
<!--        <button-->
<!--            @click="openSidebar()"-->
<!--            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" tabindex="0">-->
<!--          <span class="sr-only">Open sidebar</span>-->
<!--          <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />-->
<!--        </button>-->
<!--      </div>-->
      <div class="flex flex-col w-0 flex-1 h-full overflow-hidden">
        <main id="main" class="flex-1 relative overflow-y-auto focus:outline-none sm:pt-16 sm:pb-16 pb-32 pt-14">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto px-5 sm:px-0">
                <router-view />
              </div>
            </div>
          <div class="ml-4 flex items-center md:ml-6">
            <div class="ribbon bg-red-500 text-sm whitespace-no-wrap px-5 flex">
              <span class="mx-auto text-white">alpha</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, toRefs } from 'vue';
import { MenuAlt2Icon } from '@heroicons/vue/solid';
import TheMobileSidebar from './components/TheMobileSidebar.vue';
import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
import TheSplashScreen from './components/TheSplashScreen.vue';
import useDocumentsStore from './stores/documents';
import useApplicationStore from './stores/application';
import useNavigationStore from './stores/navigation';

export default {
  components: {
    TheDesktopSidebar,
    TheMobileSidebar,
    TheSplashScreen,
    MenuAlt2Icon,
  },
  setup() {
    const applicationStore = useApplicationStore();
    const { splashScreen } = toRefs(applicationStore);
    const documentsStore = useDocumentsStore();
    const navStore = useNavigationStore();
    const { closeSidebar, openSidebar, sidebarOpen } = navStore;
    onMounted(() => {
      documentsStore.getAllDocuments();
      setTimeout(async () => {
        applicationStore.hideSplashScreen();
      }, 1000);
    });
    return {
      splashScreen,
      closeSidebar,
      openSidebar,
      sidebarOpen,
    };
  },
};
</script>

<style scoped>
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 94px;
  height: 21px;
  margin-right: -22px;
  margin-top: 15px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Safari prior 9.0 */
  transform: rotate(45deg); /* Standard syntax */
}
</style>
