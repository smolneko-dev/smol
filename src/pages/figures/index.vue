<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
import { Figure } from "~/api/models/Figure";
const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const cursor = ref("");
const count = ref(12);

if (route.query.cursor !== "" && route.query.cursor !== undefined) {
  cursor.value = route.query.cursor as string;
}

interface FigureListResponse {
  data: Figure[];
  next_cursor?: string;
  previous_cursor?: string;
}

const {
  data: res,
  error,
  refresh,
} = await useFetch<FigureListResponse>(() => `v1/figures`, {
  key: cursor.value,
  query: {
    count,
    cursor,
  },
  method: "GET",
  mode: "cors",
  baseURL: config.public.apiURL,
});

if (error.value?.name === "FetchError" && error.value?.statusCode !== 500) {
  throw showError({
    statusCode: 503,
    statusMessage: `smolneko is down for maintenance.<br>Please wait a while, then refresh the page.`,
    fatal: false,
  });
}

if (!res.value?.data) {
  throw showError({
    statusCode: 404,
    statusMessage: "The page you are looking for does not exist.",
  });
}

function fetchNextPage() {
  if (res.value?.next_cursor != "" && res.value?.next_cursor !== undefined) {
    cursor.value = res.value?.next_cursor as string;
  } else return;

  router.push({
    path: "figures",
    query: { cursor: cursor.value },
  });
}

function fetchPrevPage() {
  if (
    res.value?.previous_cursor != "" &&
    res.value?.previous_cursor !== undefined
  ) {
    cursor.value = res.value?.previous_cursor as string;
  } else return;

  router.push({
    path: "figures",
    query: { cursor: cursor.value },
  });
}

function fetchPage() {
  if (cursor.value != "") {
    router.push({
      path: "figures",
      query: { cursor: cursor.value },
    });
  } else {
    router.push({
      path: "figures",
    });
  }
  setTimeout(() => refresh(), 300);
}

watch(
  () => route.query,
  (slug) => {
    console.log("Changed!", route.query, cursor.value, slug);
    cursor.value = (slug.cursor as string) || "";
    fetchPage();
  }
);

useHead({
  title: "Figures",
  meta: [
    { name: "description", content: "All figures list." || "" },
    { property: "og:title", content: "smolneko — Figures" },
    { property: "og:description", content: "All figures list." || "" },
    { property: "og:image", content: `${config.public.appURL}/favicon.png` },
    { property: "og:url", content: config.public.appURL + route.path },
  ],
});
</script>

<template>
  <div
    class="@container/imgrid container mx-auto mb-8 w-full max-w-screen-2xl px-4 md:px-8"
  >
    <div class="mb-4 mt-2 flex md:mb-6">
      <h2
        class="text-smol-header dark:text-smol-dark-header text-4xl font-bold !leading-tight md:text-[48px] lg:text-6xl 2xl:text-[64px]"
      >
        Figures
      </h2>
    </div>

    <div
      class="@2xl/imgrid:!grid-cols-2 @4xl/imgrid:!grid-cols-3 @7xl/imgrid:!grid-cols-4 mb-8 grid gap-6 sm:grid-cols-2 md:gap-y-8 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4"
    >
      <LazyFiguresListItem
        v-for="figure in res?.data"
        :id="figure.id"
        :key="figure.id"
        :src="figure.preview?.url ? figure.preview?.url : ''"
        :type="figure?.type"
        :name="figure.name"
      />
    </div>

    <div class="grid grid-cols-4 gap-x-6 md:gap-x-8">
      <div class="col-start-2 justify-self-end">
        <button
          v-show="res?.previous_cursor"
          :disabled="false"
          title="Previous page"
          class="inline-flex cursor-pointer items-center justify-center rounded-md border border-[#5F2EEA] bg-white py-2 px-4 align-middle text-[#5F2EEA] outline-none hover:bg-[#5F2EEA] hover:text-white focus:outline-none active:border-[#2A00A2] active:bg-[#2A00A2] active:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-100"
          @click.prevent="fetchPrevPage"
        >
          <ArrowLeftIcon class="mr-4 h-6 w-6" />
          Previous
        </button>
      </div>
      <div class="col-start-3 justify-self-start">
        <button
          v-show="res?.data.length == count && res?.next_cursor"
          :disabled="false"
          title="Next page"
          class="col-start-3 inline-flex cursor-pointer items-center justify-center rounded-md border border-[#5F2EEA] bg-white py-2 px-4 text-[#5F2EEA] outline-none hover:bg-[#5F2EEA] hover:text-white focus:outline-none active:border-[#2A00A2] active:bg-[#2A00A2] active:text-white disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-100"
          @click.prevent="fetchNextPage"
        >
          Next
          <ArrowRightIcon class="ml-4 h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</template>
