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
  <div class="group rounded-lg bg-white shadow-lg">
    <NuxtLink
      ref="target"
      :to="{ name: 'figures-slug', params: { slug: id } }"
      rel="noopener noreferrer"
      class="block h-[24rem] min-h-[24rem] overflow-hidden rounded-t-lg md:h-[28rem] 2xl:h-[32rem]"
    >
      <div
        v-if="isLoaded === false"
        class="h-full w-full animate-pulse bg-[#E4DAFF]"
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
        class="text-lg font-bold !leading-tight text-[#14142B] transition duration-200 group-hover:text-[#5F2EEA] group-active:text-[#2A00A2] md:text-xl 2xl:text-2xl"
      >
        {{ name }}
      </NuxtLink>
    </div>
  </div>
</template>
