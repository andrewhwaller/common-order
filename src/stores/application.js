import { defineStore } from 'pinia';

const useApplicationStore = defineStore('application', {
  state: () => ({
    splashScreen: true,
  }),
  actions: {
    hideSplashScreen() {
      this.splashScreen = false;
    },
    showSplashScreen() {
      this.splashScreen = true;
    },
  },
});

export default useApplicationStore;
