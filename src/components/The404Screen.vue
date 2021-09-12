<template>
  <div class="flex flex-col sm:pt-16 sm:pb-16 pb-32 pt-14">
    <div class="flex max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <p class="text-4xl font-extrabold font-display text-red-600 sm:text-5xl">404</p>
      <div class="sm:ml-6">
        <div class="sm:border-l sm:border-gray-200 sm:pl-6">
          <h1 class="text-4xl font-extrabold font-display text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
          <p class="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
        </div>
        <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
          <router-link
              to="/"
              class="inline-flex items-center px-4 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white bg-sky-600
                hover:bg-sky-700 focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-sky-500">
            Go back home
          </router-link>
          <router-link
              to="/library"
              class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border
              border-gray-200 shadow-sm text-blue-gray-600 bg-white hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-blue-gray-500">
            Go the the library
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'The404Screen',
  setup() {
    const { t, locale } = useI18n();
    return {
      t,
      locale,
    };
  },
};
</script>

<style scoped>

</style>
