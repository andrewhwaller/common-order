<template>
  <div class="w-full p-4">
    <div class="w-full max-w-lg p-2 mx-auto rounded-2xl">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
            class="flex justify-between w-full px-4 py-2 text-base font-medium text-left text-blue-gray-700 bg-blue-gray-200 rounded-lg hover:bg-blue-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75"
        >
          <span class="font-display font-bold">Table of Contents</span>
          <ChevronUpIcon
              :class="open ? 'transform rotate-180' : ''"
              class="w-5 h-5 text-blue-gray-500 my-auto"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2">
          <div class="flex flex-col">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="chapter in chapters" :key="chapter.id" class="w-100 py-2 px-2 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-sky-500">
                <div class="flex justify-between space-x-3">
                  <div class="min-w-0 flex-1 mx-auto">
                    <a v-bind:href="'#' + chapter.id" class="flex w-full focus:outline-none">
                      <p class="text-base font-medium text-red-700 font-display">{{ chapter.id }}</p>
                      <p class="ml-3 text-base text-gray-700 font-display">{{ chapter.title }}</p>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/solid';

export default {
  props: {
    chapters: Array,
  },
  name: 'TheTableOfContents.vue',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
  },
};
</script>
