<script setup lang="ts">
onMounted(() => {
  console.log(`    ⠀⠀⠀⠀⠀⠀⠀⢀⣶⣿⣿⣷⣶⠀⠀⠀⠀⣶⣾⣿⣿⣶⡀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣷⠀⠀⣾⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
    ⢀⣤⣶⣶⣦⣄⠀⢹⣿⣿⣿⣿⣿⣿⠃⠘⣿⣿⣿⣿⣿⣿⡏⠀⣠⣴⣶⣶⣤⡀
    ⣼⣿⣿⣿⣿⣿⣧⡀⠹⢿⣿⣿⡿⠏⠀⠀⠹⢿⣿⣿⡿⠟⢀⣼⣿⣿⣿⣿⣿⣧
    ⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠈⠉⢀⣠⣤⣤⣄⡀⠉⠁⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿
    ⢸⣿⣿⣿⣿⣿⣿⣿⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠇
    ⠀⠘⢿⣿⣿⣿⣿⠏⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠹⣿⣿⣿⣿⡿⠋⠀
    ⠀⠀⠀⠈⠉⠉⠁⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠈⠉⠉⠁⠀⠀⠀
    ⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
    ⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀
    ⠀⠀⠀⠀⠈⠻⢿⣿⣿⣿⠿⠟⠛⠋⠉⠉⠙⠛⠻⠿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀`);
});

useHead({
  titleTemplate: (title) => {
    return title ? `${title} — smolneko` : "smolneko";
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator
      :color="'repeating-linear-gradient(to right,#FFA3FD 0%,#7433FF 100%)'"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  /* To remove the blue highlight that appears over a link while it's being tapped.
  https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-tap-highlight-color */
  -webkit-tap-highlight-color: transparent;
}

* {
  font-family: "Open Sans", sans-serif;
}

@font-face {
  font-family: "Open Sans";
  src: url("~/assets/fonts/OpenSans-VariableFont.woff2")
      format("woff2 supports variations"),
    url("~/assets/fonts/OpenSans-VariableFont.woff2") format("woff2-variations");
  font-weight: 300 800;
  font-style: normal;
  font-display: swap;
}
</style>
