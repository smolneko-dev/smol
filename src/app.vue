<script setup lang="ts">
useHead({
  titleTemplate: (title) => {
    return title ? `${title} — smolneko` : "smolneko";
  },
});
</script>

<template>
  <NuxtLoadingIndicator
    :color="'repeating-linear-gradient(to right,#FFA3FD 0%,#7433FF 100%)'"
    :throttle="0"
    :duration="5000"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
