<template>
  <div class="flex flex-col">
    <div class="mx-auto max-w-md px-4 xs:max-w-2xl xs:px-6 xs:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
      <div class="lg:py-24">
        <h1 class="mb-4 text-3xl tracking-tight font-bold text-sky-900 xs:mt-5 xs:text-4xl lg:mt-6 xl:text-5xl">
          <span class="block">Welcome</span>
        </h1>
        <p class="text-base text-gray-900 xs:text-xl lg:text-lg xl:text-xl">
          Ready to get started?
        </p>
        <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div class="rounded-md shadow">
            <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent
                      text-base font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900 md:py-4
                      md:text-lg md:px-10">
              Open the library
            </a>
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent
                      text-base font-medium rounded-md text-blue-gray-600 bg-white hover:bg-gray-50 md:py-4
                      md:text-lg md:px-10">
              Learn more
            </a>
          </div>
        </div>
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
