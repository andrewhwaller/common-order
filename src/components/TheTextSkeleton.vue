<template>
  <div class="flex flex-col">
    <router-link to="/library" class="relative block w-full h-1/2 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <span class="mt-2 block text-sm font-medium text-gray-900">
          {{ t('reader.skeleton_text') }}
        </span>
    </router-link>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'TheTextSkeleton.vue',
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
