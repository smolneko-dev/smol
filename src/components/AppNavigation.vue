<script setup lang="ts">
import { Bars3Icon, BugAntIcon } from "@heroicons/vue/24/outline";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["sidebarClicked"]);

function sidebarButtonClick() {
  emit("sidebarClicked");
}
</script>

<template>
  <div class="flex min-w-0 flex-shrink flex-grow flex-col bg-[#F7F7FC]">
    <div class="sticky top-0 z-10 border-b border-gray-200 py-2">
      <div
        class="z-9 absolute top-0 left-0 h-full w-full bg-white/40 backdrop-blur-lg"
      ></div>
      <header
        class="container sticky mx-auto flex w-full max-w-screen-2xl items-center justify-center px-4 pl-2 md:px-8 md:pl-6"
      >
        <button
          @click="sidebarButtonClick"
          class="inline-flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full text-[#4E4B66] transition-colors duration-200 hover:bg-[#EFF0F6] hover:text-[#5F2EEA] active:bg-[#E4DAFF]"
          aria-label="Open drawer"
          :style="[isOpen ? 'visibility: hidden;' : '']"
        >
          <span class="sr-only">Open drawer</span>
          <Bars3Icon class="h-6 w-6" />
        </button>
        <NuxtLink
          to="/figures"
          :no-prefetch="true"
          class="ml-4 inline-flex flex-shrink-0 items-center text-2xl font-bold text-[#14142B] transition-transform !duration-300"
          :style="[isOpen ? 'visibility: hidden;' : '']"
        >
          <IconsIconPaw class="mr-3 h-10" />
          <span class="select-none font-bold"> smolneko </span>
        </NuxtLink>
        <div class="flex-grow" />

        <NuxtLink
          class="hidden select-none items-center text-[#ED2E7E] hover:text-[#C30052] focus:outline-none focus:ring sm:inline-flex"
          to="https://github.com/smolneko-team/smolneko/issues"
          :external="true"
          :no-prefetch="true"
          target="_blank"
        >
          <span class="mr-2 text-sm font-medium">Report an error</span>
          <BugAntIcon class="h-6 w-6"></BugAntIcon>
        </NuxtLink>
      </header>
    </div>
    <slot />
  </div>
</template>
