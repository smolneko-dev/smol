<script setup lang="ts">
import {
  Bars3Icon,
  BugAntIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";

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

const colorMode = useColorMode();

const toggleColorMode = () =>
  colorMode.value === "light"
    ? (colorMode.preference = "dark")
    : (colorMode.preference = "light");
</script>

<template>
  <div
    class="bg-smol-bg dark:bg-smol-dark-bg flex min-w-0 flex-shrink flex-grow flex-col"
  >
    <div class="sticky top-0 z-10 py-2">
      <div
        class="z-9 dark:bg-smol-dark-bg/[0.65] bg-smol-bg/[0.65] absolute top-0 left-0 h-full w-full backdrop-blur-lg"
      />
      <header
        class="container sticky mx-auto flex h-10 w-full max-w-screen-2xl items-center justify-between px-4 pl-2 md:px-8 md:pl-6"
      >
        <div class="flex">
          <div
            class="flex items-center justify-between space-x-4"
            :style="[isOpen ? 'display: none;' : '']"
          >
            <button
              @click="sidebarButtonClick"
              class="dark:hover:text-smol-dark-primary hover:text-smol-primary text-smol-text dark:text-smol-dark-text inline-flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#EFF0F6] active:bg-[#EBECFE] dark:hover:bg-[#4E4B66] dark:active:bg-[#262338]"
              aria-label="Open drawer"
              :style="[isOpen ? 'display: none;' : '']"
            >
              <span class="sr-only">Open drawer</span>
              <Bars3Icon class="h-6 w-6" />
            </button>
            <NuxtLink
              to="/figures"
              :no-prefetch="true"
              class="text-smol-header dark:text-smol-dark-header inline-flex flex-shrink-0 items-center text-2xl font-bold"
              :style="[isOpen ? 'display: none;' : '']"
            >
              <IconsIconPaw
                class="fill-smol-header dark:fill-smol-dark-header mr-3 h-10"
              />
              <span class="select-none font-bold">smolneko</span>
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <NuxtLink
            class="text-smol-error hover:text-smol-error-strong dark:text-smol-dark-error hidden select-none items-center focus:outline-none dark:hover:text-[#FFABE8] sm:inline-flex"
            to="https://github.com/smolneko-dev/smol/issues"
            :external="true"
            :no-prefetch="true"
            target="_blank"
            title="Report an error"
          >
            <BugAntIcon class="h-6 w-6" />
          </NuxtLink>
          <ClientOnly>
            <button
              @click.prevent="toggleColorMode"
              :title="`Enable ${
                colorMode.value === 'dark' ? 'Light' : 'Dark'
              } Mode`"
              aria-label="Color Mode Toggle"
            >
              <MoonIcon
                class="dark:text-smol-dark-primary h-6 w-6 dark:hover:text-[#BFBEFC]"
                aria-hidden="true"
                v-if="colorMode.value === 'dark'"
              />
              <SunIcon
                v-else
                class="text-smol-primary h-6 w-6 hover:text-[#4700AB] lg:hover:animate-[spin_20s_linear_infinite]"
                aria-hidden="true"
              />
            </button>
          </ClientOnly>
        </div>
      </header>
    </div>
    <slot />
  </div>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
