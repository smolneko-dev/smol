<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { ref } from "vue";

const isOpen = ref(false);

onMounted(async () => {
  await nextTick();
  if (window.innerWidth >= 1024) {
    isOpen.value = true;
  } else {
    isOpen.value = false;
  }
});

if (process.client) {
  useResizeObserver(document.body, () => {
    if (window.innerWidth >= 1024 && isOpen.value == true) {
      document.body.className = "";
    }
    if (window.innerWidth < 1024 && isOpen.value == true) {
      document.body.className = "overflow-hidden";
    }
  });
}

function toggleMenu() {
  if (process.client && window.innerWidth < 1024 && isOpen.value == false) {
    document.body.className = "overflow-hidden";
  } else if (
    process.client &&
    window.innerWidth < 1024 &&
    isOpen.value == true
  ) {
    document.body.className = "";
  }
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="flex min-w-0">
    <AppDrawer :is-open="isOpen" @sidebar-clicked="toggleMenu" />
    <AppNavigation :is-open="isOpen" @sidebar-clicked="toggleMenu">
      <slot />
    </AppNavigation>
  </div>
</template>
