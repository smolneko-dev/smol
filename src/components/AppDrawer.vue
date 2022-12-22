<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { defineAsyncComponent, markRaw, shallowRef } from "vue";

const smolnekoNavigation = shallowRef([
  {
    href: "/figures",
    label: "Figures",
    icon: markRaw(
      defineAsyncComponent(() => import("~/components/icons/IconFigure.vue"))
    ),
  },
  // {
  //   href: "/characters",
  //   label: "Characters",
  //   icon: markRaw(
  //     defineAsyncComponent(
  //       () => import("../components/icons/IconCharacters.vue")
  //     )
  //   ),
  // },
  {
    href: "/about",
    label: "About",
    icon: InformationCircleIcon,
  },
]);

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["sidebarClicked"]);

function sidebarButtonClick() {
  emit("sidebarClicked");
}

function menuItemClicked() {
  if (window.innerWidth <= 1024) {
    emit("sidebarClicked");
  }
}
</script>

<template>
  <div class="flex max-w-fit flex-grow">
    <div class="flex h-screen h-[100dvh] flex-col lg:sticky lg:h-full">
      <div
        @click="sidebarButtonClick"
        :style="[isOpen ? '' : 'display: none;']"
        class="fixed left-0 top-0 z-20 h-screen w-full bg-[#14142b] opacity-[0.45] transition-opacity duration-[250ms] ease-in-out lg:hidden lg:h-full"
      ></div>
      <div
        :style="[isOpen ? '' : 'margin-left: -16rem;']"
        class="min-w-64 fixed left-0 top-0 z-30 ml-0 h-screen w-64 flex-grow border-r border-gray-200 bg-white transition-[margin-left] duration-[250ms] ease-in-out md:h-full lg:static lg:h-auto"
      >
        <div
          class="flex h-screen flex-col overflow-y-auto overscroll-contain lg:sticky lg:top-0"
        >
          <div
            class="mx-4 mr-2 flex flex-shrink-0 items-center py-2 text-[#14142B]"
          >
            <NuxtLink to="/figures" class="flex-shrink-0" :no-prefetch="true">
              <IconsIconPaw class="mr-3 inline-flex h-10" />
              <span
                class="inline-flex select-none align-middle text-2xl font-bold"
              >
                smolneko
              </span>
            </NuxtLink>

            <button
              @click="sidebarButtonClick"
              class="invisible ml-auto flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full text-[#4E4B66] transition-colors duration-200 hover:bg-[#EFF0F6] hover:text-[#5F2EEA] active:bg-[#E4DAFF] lg:visible"
              aria-label="Open drawer"
            >
              <span class="sr-only">Close drawer</span>
              <ChevronDoubleLeftIcon class="mr-1 h-6 w-6" />
            </button>
          </div>

          <div class="flex flex-shrink-0 flex-col gap-1 px-4 pt-2">
            <NuxtLink
              v-for="(item, index) in smolnekoNavigation"
              :key="index"
              :to="item.href"
              :no-prefetch="true"
              class="select-none text-left"
              @click="menuItemClicked"
              v-slot="{ isActive }"
            >
              <div
                :class="[
                  isActive
                    ? 'bg-[#EFF0F6] text-[#5F2EEA] hover:bg-[#E4DAFF] hover:text-[#2A00A2]'
                    : 'text-[#4E4B66] transition-colors duration-200 hover:bg-[#EFF0F6] hover:text-[#5F2EEA] active:bg-[#E4DAFF]',
                ]"
                class="group flex w-full items-center rounded-md px-4 py-2 text-base lg:text-lg"
              >
                <component :is="item.icon" class="mr-2 h-6 w-6" />
                {{ item.label }}
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shade {
  transition: opacity 0.3s ease-in-out !important;
}
</style>
