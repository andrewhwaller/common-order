<template>
  <div class="flex flex-col">
    <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h1 class="text-2xl md:text-4xl text-red-700 font-semibold font-display mb-5">Welcome to Common Order!</h1>
      <p class="mt-4 text-lg leading-6 text-gray-900">Common Order is an growing online repository of doctrinal and liturgical resources from the historical Presbyterian tradition.</p>
      <div class="mx-auto mt-8 flex flex-col sm:flex-row justify-center">
        <router-link to="/library" class="items-center px-5 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
          Browse the library
        </router-link>
        <a href="https://commonorder.org" class="mt-3 sm:ml-3 sm:mt-0 items-center px-5 py-3 border border-gray-200 shadow-sm text-base font-medium rounded-md text-blue-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500">
          Learn more
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheWelcomeScreen',
};
</script>

<style scoped>

</style>
