<script setup lang="ts">
const props = defineProps<{
  id: string;
  src?: string;
  type?: string;
  name: string;
}>();

const target = ref(null);
const targetIsVisible = ref(false);
const srcImg = ref("");
const isLoaded = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
  if (targetIsVisible.value) {
    srcImg.value = props?.src || "";
  }
});

function loadImg() {
  isLoaded.value = true;
}

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div
    class="dark:bg-smol-dark-body-bg bg-smol-body-bg group rounded-lg shadow-[0_35px_40px_0px_rgba(0,0,0,0.06)]"
  >
    <NuxtLink
      ref="target"
      :to="{ name: 'figures-slug', params: { slug: id } }"
      rel="noopener noreferrer"
      :no-prefetch="true"
      class="block h-[24rem] min-h-[24rem] overflow-hidden rounded-t-lg md:h-[28rem] 2xl:h-[32rem]"
    >
      <div
        v-if="isLoaded === false"
        class="h-full w-full animate-pulse bg-[#E4DAFF] dark:bg-[#4E4B66]"
      />
      <img
        v-show="isLoaded"
        :src="srcImg"
        @load="loadImg"
        :alt="type + ' ' + name"
        class="h-full w-full border-red-600 object-cover object-top sm:transition sm:duration-200 sm:hover:scale-105 2xl:object-center"
      />
    </NuxtLink>

    <div class="flex flex-col items-start p-4">
      <span class="mb-1 text-sm text-[#6E7191]">{{ type }}</span>
      <NuxtLink
        :to="{ name: 'figures-slug', params: { slug: id } }"
        rel="noopener noreferrer"
        :no-prefetch="true"
        class="group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary text-smol-header dark:text-smol-dark-header group-active:text-smol-primary text-lg font-bold !leading-tight transition duration-200 md:text-xl 2xl:text-2xl"
      >
        {{ name }}
      </NuxtLink>
    </div>
  </div>
</template>
