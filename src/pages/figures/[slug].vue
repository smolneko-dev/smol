<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { type Figure } from "~/api/models/Figure";
import { type Image } from "~/api/models/Image";

definePageMeta({
  validate: async (route) => {
    // Check if the slug is nanoid (21).
    return /^[-_a-zA-Z\d]{21}$/.test(route.params.slug as string);
  },
});

const route = useRoute();
const config = useRuntimeConfig();

interface FigureResponse {
  data: Figure;
}

const { data, error } = await useFetch<FigureResponse>(
  () => `v1/figures/${route.params.slug}`,
  {
    key: route.params.slug as string,
    server: true,
    method: "GET",
    mode: "cors",
    baseURL: config.public.apiURL,
  }
);

if (error.value?.name === "FetchError" && error.value?.statusCode !== 500) {
  throw showError({
    statusCode: 503,
    statusMessage: `smolneko is down for maintenance.<br>Please wait a while, then refresh the page.`,
    fatal: false,
  });
}

if (!data.value?.data) {
  throw showError({
    statusCode: 404,
    statusMessage: "The figure you are looking for does not exist",
  });
}

const figure = data.value?.data;

interface ImagesResponse {
  count: number;
  data: Image[];
}

const { data: images, error: imgError } = useLazyFetch<ImagesResponse>(
  () => `v1/figures/${route.params.slug}/images`,
  {
    key: `${route.params.slug}/images` as string,
    server: true,
    method: "GET",
    mode: "cors",
    baseURL: config.public.apiURL,
  }
);

const isReady = ref(false);
const preview = ref("");
watch(
  images,
  () => {
    isReady.value = true;
    if (images.value?.count != undefined && images.value?.count > 0) {
      preview.value =
        images.value?.data.find((image) => image.preview === true)?.url ||
        images.value?.data[0].url ||
        "";

      useHead({
        meta: [{ property: "og:image", content: preview.value }],
      });
    }
  },
  {
    immediate: true,
  }
);

const empty = "Not specified yet.";

useHead({
  title: figure?.name,
  meta: [
    { name: "description", content: figure?.description || "" },
    { property: "og:title", content: `smolneko — ${figure.name}` },
    { property: "og:description", content: figure?.description || "" },
    { property: "og:image", content: preview.value },
    { property: "og:url", content: config.public.appURL + route.path },
  ],
});
</script>

<template>
  <div class="mx-auto w-full max-w-screen-2xl">
    <div class="px-4 pb-4 md:px-8 md:pb-8">
      <div class="mb-4 mt-2 flex md:mb-6">
        <h1
          class="text-smol-header dark:text-smol-dark-header text-4xl font-bold !leading-tight md:text-[48px] lg:text-6xl 2xl:text-[64px]"
        >
          {{ figure?.name }}
        </h1>
      </div>

      <ClientOnly>
        <template #fallback>
          <div
            class="mb-12 grid h-[24rem] min-h-[24rem] w-full animate-pulse grid-rows-1 gap-x-4 overflow-y-auto sm:h-[28rem] sm:grid-cols-2 md:h-[32rem] md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4"
          >
            <div class="col-span-1 rounded-lg bg-[#E4DAFF]" />
            <div class="col-span-1 rounded-lg bg-[#E4DAFF] lg:col-span-2" />
            <div class="col-span-1 rounded-lg bg-[#E4DAFF]" />
          </div>
        </template>
        <ImageSlider
          v-if="isReady === true && images?.count !== 0"
          :images="images?.data"
          :alt="figure?.type ? figure?.type + ' ' + figure.name : figure.name"
          class="min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem]"
        />
        <div
          v-else
          class="mb-12 grid h-[24rem] min-h-[24rem] w-full place-items-center rounded-lg"
        >
          <p class="text-smol-text dark:text-smol-dark-text">
            No images for this figure...
          </p>
        </div>
      </ClientOnly>

      <div class="info mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <div
          class="bg-smol-body-bg dark:bg-smol-dark-body-bg rounded-lg py-2 shadow-[0_35px_40px_0px_rgba(0,0,0,0.06)]"
        >
          <h2
            class="text-smol-header dark:text-smol-dark-header mb-2 px-6 text-[32px] font-bold leading-tight"
          >
            Details
          </h2>
          <div class="px-4">
            <table class="w-full border-collapse text-left">
              <tbody
                class="border-smol-line border-t align-baseline dark:border-[#4E4B66]"
              >
                <tr class="group">
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Character ID
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-2 pr-4 text-base font-normal leading-6"
                  >
                    <template v-if="figure?.character_id">
                      <NuxtLink
                        :to="'/characters/' + figure?.character_id"
                        :no-prefetch="true"
                        class="active:text-[#5F2EEA] group-hover:underline group-hover:underline-offset-4"
                        >{{ figure?.character_id }}</NuxtLink
                      >
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Version
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pr-4 pl-2 text-base leading-6"
                  >
                    <template v-if="figure?.version">
                      {{ figure?.version }}
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Type
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-2 pr-4 text-base leading-6"
                  >
                    <template v-if="figure?.type">
                      {{ figure?.type }}
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Size
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pr-4 pl-2 text-base leading-6"
                  >
                    <template v-if="figure?.size">
                      {{ figure?.size }}
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Height
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pr-4 pl-2 text-base leading-6"
                  >
                    <template v-if="figure?.height">
                      {{ figure?.height }}&nbsp;mm
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Materials
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-2 pr-4 text-base leading-6"
                  >
                    <template v-if="figure?.materials">
                      <ul class="flex space-x-1">
                        <template
                          v-for="(material, index) in figure?.materials"
                        >
                          <li>
                            {{ material }}
                          </li>
                          <li v-if="index != figure?.materials.length - 1">
                            &middot;
                          </li>
                        </template>
                      </ul>
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-4 pr-2 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Release Date
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-2 pr-4 text-base leading-6"
                  >
                    <template v-if="figure?.release_date">
                      {{
                        useDateFormat(figure?.release_date, "DD-MM-YYYY").value
                      }}
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
                <tr
                  class="border-smol-line group border-t dark:border-[#4E4B66]"
                >
                  <td
                    class="text-smol-label group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pr-2 pl-4 text-base font-bold leading-6 dark:text-[#A0A3BD]"
                  >
                    Price
                  </td>
                  <td
                    translate="no"
                    class="text-smol-text dark:text-smol-dark-text group-hover:text-smol-primary dark:group-hover:text-smol-dark-primary whitespace-normal py-2 pl-2 pr-4 text-base leading-6"
                  >
                    <template v-if="figure?.price">
                      <ul class="flex space-x-1">
                        <template v-for="(price, index) in figure?.price">
                          <li>
                            {{ price }}
                          </li>
                          <li v-if="index != figure?.price.length - 1">
                            &middot;
                          </li>
                        </template>
                      </ul>
                    </template>
                    <template v-else>{{ empty }}</template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="bg-smol-body-bg dark:bg-smol-dark-body-bg rounded-lg py-2 shadow-[0_35px_40px_0px_rgba(0,0,0,0.06)]"
        >
          <h2
            class="text-smol-header dark:text-smol-dark-header mb-2 px-6 text-[32px] font-bold leading-tight"
          >
            Links
          </h2>
          <ul class="px-4">
            <template v-if="figure?.links">
              <li
                v-for="link in figure?.links"
                :key="link.link"
                class="text-smol-text dark:text-smol-dark-text hover:text-smol-primary dark:hover:text-smol-dark-primary hover:bg-smol-input relative rounded-md px-4 py-2 active:bg-[#EBECFE] dark:hover:bg-[#14142B] dark:active:bg-[#4E4B66]"
              >
                <h3 class="text-base font-bold leading-6">
                  {{ link.description }}
                </h3>
                <ul
                  class="text-smol-label mt-1 flex space-x-1 text-sm font-normal leading-4 dark:text-[#A0A3BD]"
                >
                  <li>
                    {{
                      link?.type
                        ? link.type.charAt(0).toUpperCase() +
                          link.type.substring(1)
                        : ""
                    }}
                  </li>
                </ul>
                <NuxtLink
                  :to="link?.link"
                  :external="true"
                  :no-prefetch="true"
                  class="absolute inset-0 rounded-md focus:z-10 focus:outline-none"
                />
              </li>
            </template>
            <template v-else>
              <p class="text-smol-text dark:text-smol-dark-text px-4 pb-2">
                No external links available for this figure.
              </p>
            </template>
          </ul>
        </div>
        <div
          class="bg-smol-body-bg dark:bg-smol-dark-body-bg rounded-lg py-2 shadow-[0_35px_40px_0px_rgba(0,0,0,0.06)] md:col-span-2"
        >
          <h2
            class="text-smol-header dark:text-smol-dark-header mb-2 px-6 text-[32px] font-bold leading-tight"
          >
            Description
          </h2>
          <div class="px-4">
            <p
              class="text-smol-text dark:text-smol-dark-text px-4 pb-2 text-left text-base font-normal"
            >
              {{
                figure?.description
                  ? figure?.description
                  : "There is no description for this figure yet."
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
