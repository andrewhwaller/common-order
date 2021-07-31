import { defineStore } from 'pinia';

const useReaderStore = defineStore('reader', {
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  getters: {
    doubleCount() {
      return this.counter * 2;
    },
    doubleCountPlusOne() {
      return this.doubleCount * 2 + 1;
    },
  },
  actions: {
    reset() {
      this.counter = 0;
    },
  },
});

export default useReaderStore;
