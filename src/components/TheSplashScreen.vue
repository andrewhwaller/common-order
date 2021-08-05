<template>
  <TransitionRoot as="template" :show="splashScreen">
    <Dialog as="div" static class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <TransitionChild as="template" enter="transform transition ease-in-out duration-1000 sm:duration-500" enter-from="-translate-y-full" enter-to="translate-y-0" leave="transform transition ease-in-out duration-1000 sm:duration-500" leave-from="translate-y-0" leave-to="-translate-y-full">
          <div class="absolute inset-0">
            <div class="min-h-full min-w-full bg-red-800 flex flex-col items-center justify-center">
                <button class="focus:outline-none cursor-default ring-transparent">
                  <svg class="h-48 w-48 text-white stroke-current fill-current" stroke-width="0.5px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 128 128"><path d="M90 18a5 5 0 00-10 0v10h10zm-2 0h-2v-2.816A3 3 0 0188 18zm-4-2.816V18h-2a3 3 0 012-2.816zM82 20h2v6h-2zm4 6v-6h2v6zM48 18a5 5 0 00-10 0v10h10zm-2 0h-2v-2.816A3 3 0 0146 18zm-4-2.816V18h-2a3 3 0 012-2.816zM40 20h2v6h-2zm4 6v-6h2v6z"/><path d="M85.456 2.1l-.225-.1H42.8l-.225.106A38 38 0 0 0 21 36.261V126h86V36.236A38 38 0 0 0 85.456 2.1zM32.409 45.929A6.926 6.926 0 0 1 34 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 46 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 58 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zM63 36.261V124h-3V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 50 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 38 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 26 50v74h-3V36.261a36 36 0 0 1 20.025-32.15A36 36 0 0 1 63 36.236zm0-12.025A38.062 38.062 0 0 0 46.923 4.01H63zM65 4.01h16.117A38.052 38.052 0 0 0 65 24.259zm9.409 41.919A6.926 6.926 0 0 1 76 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 88 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zm12 0A6.926 6.926 0 0 1 100 50v74h-6V50a6.926 6.926 0 0 1 1.591-4.071l.631-.846-.879-.585a3 3 0 1 1 3.314 0l-.879.585zM105 124h-3V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 92 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 80 50v74h-2V50a8.33 8.33 0 0 0-1.447-4.484 5 5 0 1 0-7.106 0A8.33 8.33 0 0 0 68 50v74h-3V36.261a36 36 0 0 1 20.025-32.15A36 36 0 0 1 105 36.236z"/></svg>
                </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { toRefs } from 'vue';
import useApplicationStore from '../stores/application';

export default {
  props: {
    display: Boolean,
  },
  name: 'TheSplashScreen',
  components: {
    Dialog,
    TransitionChild,
    TransitionRoot,
  },
  setup() {
    const applicationStore = useApplicationStore();
    const { splashScreen } = toRefs(applicationStore);
    return {
      splashScreen,
    };
  },
};
</script>

<style scoped>

</style>
