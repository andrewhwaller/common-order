<template>
  <div>
    <TheReaderSearchInput />
    <div class="z-20 sm:pt-16 sm:pb-16 pb-32 pt-14">
      <router-view></router-view>
  </div>
  </div>
</template>

<script>
import TheReaderSearchInput from './TheReaderSearchInput.vue';

export default {
  name: 'TheReader',
  components: {
    TheReaderSearchInput,
  },
};
</script>

<style>
mark {
  @apply bg-green-300 rounded-sm;
}
</style>
