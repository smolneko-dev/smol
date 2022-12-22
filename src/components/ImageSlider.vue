<script setup lang="ts">
import { A11y, Keyboard, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Image } from "~/api/models/Image";
const modules = [Navigation, Pagination, A11y, Keyboard];

const { width } = useWindowSize();

defineProps<{
  images?: Image[];
  alt: string;
}>();
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="width >= 640 ? 'auto' : 1"
    :space-between="24"
    :rewind="true"
    :keyboard="true"
    :grab-cursor="true"
    :navigation="{
      enabled: true,
    }"
    :pagination="{
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    }"
    class=""
  >
    <swiper-slide
      v-for="(image, index) in images"
      :key="index"
      :class="[width >= 640 ? '!w-auto' : 'flex !w-full justify-center']"
    >
      <img
        :src="image.url"
        :alt="alt"
        loading="lazy"
        class="rounded-lg object-cover object-top shadow-lg sm:max-h-[28rem] md:max-h-[32rem]"
        :class="[width >= 640 ? '' : 'h-auto max-h-[24rem] w-auto']"
      />
    </swiper-slide>
  </Swiper>
</template>

<style>
.swiper-wrapper {
  margin-bottom: 2.5rem;
}

.swiper-pagination-bullet-active {
  background-color: #5f2eea !important;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
}

@media (max-width: 640px) {
  .swiper-button-prev,
  .swiper-button-next {
    visibility: hidden !important;
  }
}

.swiper-button-prev,
.swiper-button-next {
  top: calc(50% - 2.5rem);
  height: 2.75rem !important;
  width: 2.75rem !important;
  border-radius: 9999px;
  @apply bg-[#5F2EEA] opacity-30 hover:opacity-100;
  -webkit-tap-highlight-color: transparent;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: #ffffff !important;
  opacity: 100 !important;
  font-size: 24px;
}

.swiper-button-prev::after {
  position: relative;
  left: -2px !important;
}

.swiper-button-next::after {
  position: relative;
  right: -2px !important;
}
</style>
