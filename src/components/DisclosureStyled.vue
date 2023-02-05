<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";

defineProps<{
  title: string;
}>();
</script>

<template>
  <Disclosure
    :as="'div'"
    v-slot="{ open }"
    :defaultOpen="false"
    class="border-smol-line rounded-lg border-2 dark:border-[#4E4B66]"
  >
    <DisclosureButton
      class="text-smol-header dark:text-smol-dark-header flex w-full justify-between px-4 py-2 text-left text-base font-semibold focus:outline-none"
    >
      <span class="text-base">{{ title }}</span>
      <ChevronUpIcon
        :class="open ? '-rotate-180 transform' : ''"
        class="text-smol-header dark:text-smol-dark-header h-6 w-6 transition-transform duration-300 ease-in-out"
      />
    </DisclosureButton>
    <transition
      enter-active-class="transition duration-300 ease-in-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-300 ease-in-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel
        class="text-smol-text dark:text-smol-dark-text rounded-lg px-4 pb-4 text-base"
      >
        <slot />
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>
