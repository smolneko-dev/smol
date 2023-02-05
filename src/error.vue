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
              error?.statusCode !== '404'
                ? 'text-smol-error dark:text-smol-dark-error'
                : 'text-smol-warning dark:text-smol-dark-warning'
            "
          >
            {{ error?.statusCode }}
          </h1>
          <h2
            class="text-smol-header dark:text-smol-dark-header text-4xl font-bold"
          >
            <template v-if="error?.statusCode !== '404'">UwU</template>
            <template v-else>OwO</template>
          </h2>
          <p
            class="text-smol-text dark:text-smol-dark-text mt-4"
            v-html="error?.message"
          />
          <div
            class="mt-6 grid w-full auto-cols-max place-content-center gap-4"
          >
            <NuxtLink
              v-if="error?.statusCode === '404'"
              to="/figures"
              :no-prefetch="true"
              class="text-smol-body-bg dark:text-smol-dark-body-bg bg-smol-primary dark:bg-smol-dark-primary inline-flex cursor-pointer items-center justify-center rounded-md py-3 px-6 outline-none hover:bg-[#4700AB] focus:outline-none dark:hover:bg-[#BFBEFC]"
            >
              Go back home
            </NuxtLink>
            <a
              v-if="error?.statusCode === '404'"
              class="text-smol-body-bg dark:text-smol-dark-body-bg bg-smol-primary dark:bg-smol-dark-primary inline-flex cursor-pointer items-center justify-center rounded-md py-3 px-6 outline-none hover:bg-[#4700AB] focus:outline-none dark:hover:bg-[#BFBEFC]"
              @click="$router.go(-1)"
            >
              Return to previous page
            </a>
            <a
              v-if="error?.statusCode !== '404'"
              class="text-smol-body-bg dark:text-smol-dark-body-bg bg-smol-primary dark:bg-smol-dark-primary inline-flex cursor-pointer items-center justify-center rounded-md py-3 px-6 outline-none hover:bg-[#4700AB] focus:outline-none dark:hover:bg-[#BFBEFC]"
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
