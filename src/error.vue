<script setup lang="ts">
const error = useError();

const props = defineProps({
  error: Object,
});

useHead({
  title: `${error.value?.message} — smolneko`,
});
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <div class="grid h-full place-content-center p-8">
        <div class="text-center">
          <h1
            class="text-9xl font-extrabold"
            :class="
              error?.statusCode !== '404' ? 'text-[#ED2E7E]' : 'text-[#F4B740]'
            "
          >
            {{ error?.statusCode }}
          </h1>
          <h2 class="text-4xl font-bold text-[#4E4B66]">
            <template v-if="error?.statusCode !== '404'">UwU</template>
            <template v-else>OwO</template>
          </h2>
          <p class="mt-4 text-[#4E4B66]" v-html="error?.message" />
          <div
            class="mt-6 grid w-full auto-cols-max place-content-center gap-4 sm:gap-6"
            :class="
              error?.statusCode === '404'
                ? 'sm:grid-cols-[repeat(2,_minmax(0,_max-content))]'
                : ''
            "
          >
            <NuxtLink
              v-if="error?.statusCode === '404'"
              to="/figures"
              :no-prefetch="true"
              class="cursor-pointer rounded-md border border-[#5F2EEA] bg-white py-2 px-4 text-[#5F2EEA] outline-none hover:bg-[#5F2EEA] hover:text-white focus:outline-none active:border-[#2A00A2] active:bg-[#2A00A2] active:text-white"
            >
              Go back home
            </NuxtLink>
            <a
              v-if="error?.statusCode === '404'"
              class="cursor-pointer rounded-md border border-[#5F2EEA] bg-white py-2 px-4 text-[#5F2EEA] outline-none hover:bg-[#5F2EEA] hover:text-white focus:outline-none active:border-[#2A00A2] active:bg-[#2A00A2] active:text-white"
              @click="$router.go(-1)"
            >
              Return to previous page
            </a>
            <a
              v-if="error?.statusCode !== '404'"
              class="cursor-pointer rounded-md border border-[#5F2EEA] bg-white py-2 px-4 text-[#5F2EEA] outline-none hover:bg-[#5F2EEA] hover:text-white focus:outline-none active:border-[#2A00A2] active:bg-[#2A00A2] active:text-white"
              @click="$router.go(0)"
            >
              Reload this page
            </a>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
